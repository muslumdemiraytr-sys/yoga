/* ==========================================================================
   İlerleme hesaplamaları, seri (streak) ve rozet sistemi
   ========================================================================== */
YA.badges = [
  { id: 'ilk-adim', title: 'İlk Adım', desc: 'İlk yoga pratiğini tamamladı.', icon: 'footprints', color: '#879B83' },
  { id: 'nefes-ustasi', title: 'Nefes Ustası', desc: 'Nefes modülündeki tüm teknikleri tamamladı.', icon: 'lungs', color: '#6E9AA6' },
  { id: '7-gun', title: '7 Günlük Disiplin', desc: '7 günlük kesintisiz pratik serisi yaptı.', icon: 'flame', color: '#C47F4E' },
  { id: 'denge', title: 'Denge Arayışı', desc: 'Denge görevlerini (Gün 12, 19, 26) ve Ağaç Duruşu’nu tamamladı.', icon: 'balance', color: '#8E7CA8' },
  { id: 'kasif', title: 'Yoga Kaşifi', desc: '10 farklı pozisyonu “öğrendim” olarak işaretledi.', icon: 'compass', color: '#5F8C6E' },
  { id: 'istikrarli', title: 'İstikrarlı Yogacı', desc: '15 farklı günde pratik yaptı.', icon: 'calcheck', color: '#776858' },
  { id: 'yolculuk', title: 'Yoga Yolculuğu', desc: '30 günlük programı tamamladı.', icon: 'mountain', color: '#A68A3E' },
  { id: 'zihin', title: 'Sakin Zihin', desc: 'Meditasyon modülünü bitirdi ve bir meditasyon seansı yaptı.', icon: 'lotus', color: '#B07A8C' },
  { id: 'bilgi', title: 'Bilgi Bahçesi', desc: 'Tüm modül sınavlarında %80 ve üzeri puan aldı.', icon: 'graduation-cap', color: '#4F7A8C' },
  { id: 'akademisyen', title: 'Akademi Mezunu', desc: 'Final sınavında %80 ve üzeri puan aldı.', icon: 'trophy', color: '#9C6B4E' }
];

const Progress = (() => {
  const st = () => Store.state;
  const DAY = 86400000;

  function dateStr(d) {
    const z = (n) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${z(d.getMonth() + 1)}-${z(d.getDate())}`;
  }
  function parse(s) { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); }
  function addDays(s, n) { const d = parse(s); d.setDate(d.getDate() + n); return dateStr(d); }

  /* ---------- Kayıt işlemleri */
  function logSession({ minutes, type, label, ref }) {
    minutes = Math.max(0, Math.round(minutes * 10) / 10);
    if (!minutes) return null;
    const s = { id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6), date: dateStr(new Date()), ts: Date.now(), minutes, type, label, ref: ref || null };
    Store.update(x => { x.sessions.push(s); if (!x.profile.createdAt) x.profile.createdAt = s.date; });
    return s;
  }
  function completeDay(n, minutes) {
    const d = YA.days.find(x => x.n === n);
    let sid = null;
    if (minutes > 0) sid = logSession({ minutes, type: 'gorev', label: `Gün ${n}: ${d.title}`, ref: 'day-' + n });
    Store.update(x => {
      x.days[n] = { done: true, date: dateStr(new Date()), ts: Date.now(), minutes, sessionId: sid ? sid.id : null, answer: x.dayAnswers ? x.dayAnswers[n] : undefined };
      if (!x.profile.createdAt) x.profile.createdAt = dateStr(new Date());
    });
  }
  function undoDay(n) {
    Store.update(x => {
      const r = x.days[n];
      if (r && r.sessionId) x.sessions = x.sessions.filter(s => s.id !== r.sessionId);
      delete x.days[n];
    });
  }
  function setRead(moduleId, sectionId, val) {
    Store.update(x => {
      const arr = new Set(x.read[moduleId] || []);
      val ? arr.add(sectionId) : arr.delete(sectionId);
      x.read[moduleId] = [...arr];
    });
  }
  function isRead(moduleId, sectionId) { return (st().read[moduleId] || []).includes(sectionId); }

  /* ---------- Modül ilerlemesi */
  function moduleSections(m) {
    if (m.kind === 'text') return m.sections.map(s => s.id);
    if (m.kind === 'breath') return YA.breaths.map(b => b.id);
    if (m.kind === 'poses') return YA.poses.map(p => p.id);
    if (m.kind === 'programs') return YA.programs.map(p => p.id);
    return [];
  }
  function moduleStats(id) {
    const m = YA.modules.find(x => x.id === id);
    const ids = moduleSections(m);
    const read = st().read[id] || [];
    const done = ids.filter(i => read.includes(i)).length;
    return { done, total: ids.length, pct: ids.length ? Math.round(done / ids.length * 100) : 0, complete: done === ids.length };
  }
  function posesLearned() { return (st().read.m4 || []).length; }

  /* ---------- Pratik metrikleri */
  function minutesByDate() {
    const map = {};
    st().sessions.forEach(s => { map[s.date] = (map[s.date] || 0) + s.minutes; });
    return map;
  }
  function practiceDates() { return Object.keys(minutesByDate()).sort(); }
  function streak() {
    const set = new Set(practiceDates());
    let cur = dateStr(new Date());
    if (!set.has(cur)) cur = addDays(cur, -1);
    let n = 0;
    while (set.has(cur)) { n++; cur = addDays(cur, -1); }
    return n;
  }
  function bestStreak() {
    const dates = practiceDates();
    let best = 0, run = 0, prev = null;
    dates.forEach(d => { run = (prev && addDays(prev, 1) === d) ? run + 1 : 1; best = Math.max(best, run); prev = d; });
    return best;
  }
  function lastNDays(n) {
    const map = minutesByDate(); const out = [];
    const today = dateStr(new Date());
    for (let i = n - 1; i >= 0; i--) { const d = addDays(today, -i); out.push({ date: d, minutes: Math.round((map[d] || 0) * 10) / 10 }); }
    return out;
  }

  function summary() {
    const s = st();
    const totalMin = s.sessions.reduce((a, b) => a + b.minutes, 0);
    const week = lastNDays(7);
    const weekSessions = s.sessions.filter(x => x.date >= week[0].date).length;
    const goal = s.profile.dailyGoal || 10;
    const goalDays = week.filter(d => d.minutes >= goal).length;
    const daysDone = Object.keys(s.days).length;
    const mods = YA.modules.map(m => ({ id: m.id, title: m.title, ...moduleStats(m.id) }));
    const modulesDone = mods.filter(m => m.complete).length;
    const secTotal = mods.reduce((a, m) => a + m.total, 0), secDone = mods.reduce((a, m) => a + m.done, 0);
    const quizIds = YA.quizzes.map(q => q.id);
    const quizPassed = quizIds.filter(id => s.quizzes[id] && s.quizzes[id].best >= 80).length;
    // Öğrenme ilerlemesi: %50 günlük görevler, %30 modül bölümleri, %20 sınavlar
    const learning = Math.round((daysDone / 30) * 50 + (secDone / secTotal) * 30 + (quizPassed / quizIds.length) * 20);
    const todayMin = week[6].minutes;
    return {
      totalMin: Math.round(totalMin), sessions: s.sessions.length, weekSessions, weekMinutes: Math.round(week.reduce((a, d) => a + d.minutes, 0)),
      goal, todayMin, todayGoalPct: Math.min(100, Math.round(todayMin / goal * 100)), goalRate: Math.round(goalDays / 7 * 100),
      streak: streak(), bestStreak: bestStreak(), practiceDays: practiceDates().length,
      daysDone, modules: mods, modulesDone, secDone, secTotal, quizPassed, quizTotal: quizIds.length,
      learning, poses: posesLearned()
    };
  }

  /* ---------- Rozetler */
  const checks = {
    'ilk-adim': (x) => x.sessions > 0 || x.daysDone > 0,
    'nefes-ustasi': () => moduleStats('m3').complete,
    '7-gun': (x) => x.bestStreak >= 7,
    'denge': () => [12, 19, 26].every(n => st().days[n]) && isRead('m4', 'agac'),
    'kasif': (x) => x.poses >= 10,
    'istikrarli': (x) => x.practiceDays >= 15,
    'yolculuk': (x) => x.daysDone >= 30,
    'zihin': () => moduleStats('m5').complete && st().sessions.some(s => s.type === 'meditasyon'),
    'bilgi': () => YA.quizzes.filter(q => !q.final).every(q => st().quizzes[q.id] && st().quizzes[q.id].best >= 80),
    'akademisyen': () => st().quizzes.final && st().quizzes.final.best >= 80
  };
  function badgeProgress(id) {
    const x = summary();
    switch (id) {
      case 'ilk-adim': return [Math.min(1, x.sessions + x.daysDone), 1];
      case 'nefes-ustasi': { const m = moduleStats('m3'); return [m.done, m.total]; }
      case '7-gun': return [Math.min(7, x.bestStreak), 7];
      case 'denge': return [[12, 19, 26].filter(n => st().days[n]).length + (isRead('m4', 'agac') ? 1 : 0), 4];
      case 'kasif': return [Math.min(10, x.poses), 10];
      case 'istikrarli': return [Math.min(15, x.practiceDays), 15];
      case 'yolculuk': return [x.daysDone, 30];
      case 'zihin': { const m = moduleStats('m5'); return [m.done + (st().sessions.some(s => s.type === 'meditasyon') ? 1 : 0), m.total + 1]; }
      case 'bilgi': { const qs = YA.quizzes.filter(q => !q.final); return [qs.filter(q => st().quizzes[q.id] && st().quizzes[q.id].best >= 80).length, qs.length]; }
      case 'akademisyen': return [st().quizzes.final && st().quizzes.final.best >= 80 ? 1 : 0, 1];
    }
    return [0, 1];
  }
  function checkBadges(silent) {
    const x = summary();
    const earned = [];
    YA.badges.forEach(b => {
      if (!st().badges[b.id] && checks[b.id](x)) earned.push(b);
    });
    if (earned.length) {
      Store.update(s => earned.forEach(b => { s.badges[b.id] = dateStr(new Date()); }));
      if (!silent) earned.forEach((b, i) => setTimeout(() => App.badgeToast(b), 400 + i * 900));
    }
    return earned;
  }

  return { logSession, completeDay, undoDay, setRead, isRead, moduleStats, moduleSections, summary, lastNDays, minutesByDate, streak, bestStreak, checkBadges, badgeProgress, dateStr, addDays };
})();
