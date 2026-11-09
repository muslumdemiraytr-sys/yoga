/* ==========================================================================
   Veri saklama – tarayıcının localStorage alanı
   NOT: Veriler yalnızca bu tarayıcıda tutulur; cihazlar/tarayıcılar arasında
   otomatik senkronize olmaz. Taşımak için JSON dışa/içe aktarma kullanılır.
   ========================================================================== */
const Store = (() => {
  const KEY = 'yogaAkademisi.v1';
  const VERSION = 1;
  let available = true;

  const defaults = () => ({
    version: VERSION,
    profile: { name: '', createdAt: null, dailyGoal: 10, onboarded: false, safetyAck: false },
    days: {},          // { [gün]: { done, date, ts, minutes, answer } }
    dayAnswers: {},    // günlük soru cevapları
    sessions: [],      // { id, date, ts, minutes, type, label, ref }
    read: {},          // { [modülId]: [bölümId, ...] }
    quizzes: {},       // { [quizId]: { best, last, attempts, history[] } }
    assessments: [],   // { date, flex, balance, awareness, energy, relax }
    badges: {}         // { [rozetId]: tarih }
  });

  function merge(base, data) {
    const out = defaults();
    Object.keys(out).forEach(k => {
      if (data && data[k] !== undefined && data[k] !== null) {
        out[k] = (typeof out[k] === 'object' && !Array.isArray(out[k]))
          ? Object.assign({}, out[k], data[k]) : data[k];
      }
    });
    return out;
  }

  function load() {
    try {
      const t = '__ya_test__';
      localStorage.setItem(t, '1'); localStorage.removeItem(t);
      const raw = localStorage.getItem(KEY);
      return raw ? merge(defaults(), JSON.parse(raw)) : defaults();
    } catch (e) {
      available = false;
      console.warn('localStorage kullanılamıyor; ilerleme bu oturumla sınırlı kalacak.', e);
      return defaults();
    }
  }

  const api = {
    state: load(),
    get available() { return available; },
    save() {
      if (!available) return false;
      try { localStorage.setItem(KEY, JSON.stringify(api.state)); return true; }
      catch (e) { console.warn('Kayıt başarısız', e); return false; }
    },
    update(fn) { fn(api.state); api.save(); return api.state; },
    reset() { api.state = defaults(); api.save(); },

    exportJSON() {
      const payload = Object.assign({ app: 'yoga-akademisi', exportedAt: new Date().toISOString() }, api.state);
      const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `yoga-akademisi-yedek-${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    },

    /** Metin olarak verilen JSON yedeğini doğrular ve yükler. */
    importJSON(text) {
      let data;
      try { data = JSON.parse(text); } catch (e) { throw new Error('Dosya geçerli bir JSON değil.'); }
      if (!data || typeof data !== 'object' || data.app !== 'yoga-akademisi') {
        throw new Error('Bu dosya bir Yoga Akademisi yedeği gibi görünmüyor.');
      }
      if (typeof data.days !== 'object' || !Array.isArray(data.sessions)) {
        throw new Error('Yedek dosyası eksik ya da bozuk.');
      }
      delete data.app; delete data.exportedAt;
      api.state = merge(defaults(), data);
      api.save();
      return api.state;
    }
  };
  return api;
})();
