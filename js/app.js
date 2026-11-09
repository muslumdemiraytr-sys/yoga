/* ==========================================================================
   Yoga Akademisi – uygulama çekirdeği: yönlendirme, ortak bileşenler, sayfalar
   ========================================================================== */
const App = (() => {
  const main = () => document.getElementById('main');
  let cleanups = [];

  /* ------------------------------------------------ Yardımcılar */
  const h = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const icon = (n) => `<i data-lucide="${n}" aria-hidden="true"></i>`;
  /** Özgün ikon seti (assets/icons/ya-icons.svg) */
  const yi = (n, cls) => `<svg class="yi ${cls || ''}" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><use href="#${n}"></use></svg>`;
  const bar = (pct, label) => `<div class="bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${Math.round(pct)}"${label ? ` aria-label="${h(label)}"` : ''}><span style="width:${Math.max(0, Math.min(100, pct))}%"></span></div>`;
  const today = () => Progress.dateStr(new Date());
  const fmtDate = (s) => { if (!s) return ''; const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short', year: 'numeric' }); };
  const poseById = (id) => YA.poses.find(p => p.id === id);
  const fmtSec = (s) => { s = Math.max(0, Math.round(s)); return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`; };
  function refreshIcons() { if (window.lucide && lucide.createIcons) { try { lucide.createIcons({ attrs: { 'stroke-width': 1.75 } }); } catch (e) { console.warn(e); } } }
  function go(r) { if (location.hash === r) route(); else location.hash = r; }
  function onCleanup(fn) { cleanups.push(fn); }

  function toast(msg, type) {
    const root = document.getElementById('toast-root');
    const t = document.createElement('div');
    t.className = 'toast ' + (type || '');
    t.setAttribute('role', 'status');
    t.innerHTML = `${icon(type === 'warn' ? 'triangle-alert' : 'circle-check')}<span>${h(msg)}</span>`;
    root.appendChild(t); refreshIcons();
    setTimeout(() => t.classList.add('out'), 3200);
    setTimeout(() => t.remove(), 3700);
  }
  function badgeMedal(b, earned, small) {
    return `<div class="medal ${earned ? 'earned' : 'locked'} ${small ? 'small' : ''}" style="--c:${b.color}">
      <div class="medal-disc"><svg viewBox="0 0 100 100" aria-hidden="true"><defs><linearGradient id="g-${b.id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".55"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient></defs>
        <path d="M50 4 L61 12 L74 10 L80 22 L92 28 L90 41 L96 52 L88 62 L88 76 L75 80 L66 92 L53 88 L40 94 L32 83 L19 80 L17 66 L8 56 L14 44 L11 31 L23 24 L29 12 L42 13 Z" class="medal-edge"/>
        <circle cx="50" cy="50" r="33" class="medal-face"/><circle cx="50" cy="50" r="33" fill="url(#g-${b.id})"/></svg>
        <span class="medal-icon">${earned ? yi(b.icon) : icon('lock')}</span></div>
      ${small ? `<span class="medal-name">${h(b.title)}</span>` : ''}</div>`;
  }
  function badgeToast(b) {
    const root = document.getElementById('toast-root');
    const t = document.createElement('div');
    t.className = 'toast badge-toast';
    t.setAttribute('role', 'status');
    t.innerHTML = `${badgeMedal(b, true)}<div><strong>Yeni rozet: ${h(b.title)}</strong><span>${h(b.desc)}</span></div>`;
    root.appendChild(t); refreshIcons();
    setTimeout(() => t.classList.add('out'), 5000);
    setTimeout(() => t.remove(), 5600);
  }

  /* ------------------------------------------------ Çizgi figür (pozisyon illüstrasyonu) */
  function figure(f, opts = {}) {
    if (typeof f === 'string') f = YA.extraFigs[f] || YA.extraFigs.ayakta;
    if (!f) return '';
    const P = (a) => `${a[0]},${a[1]}`;
    const limb = (a, b, c, cls) => `<polyline points="${P(a)} ${P(b)} ${P(c)}" class="${cls}"/>`;
    const torso = f.c ? `<path d="M${P(f.n)} Q${P(f.c)} ${P(f.p)}" class="torso"/>` : `<line x1="${f.n[0]}" y1="${f.n[1]}" x2="${f.p[0]}" y2="${f.p[1]}" class="torso"/>`;
    const ground = f.top
      ? '<rect x="14" y="30" width="172" height="140" rx="10" class="mat-top"/>'
      : '<rect x="8" y="182" width="184" height="6" rx="3" class="mat"/>';
    const chair = f.chair ? '<path d="M70 124 H140 M76 124 V184 M136 124 V184 M72 124 V60" class="chair"/>' : '';
    return `<svg class="pose-fig ${opts.small ? 'small' : ''}" viewBox="0 0 200 200" role="img" aria-label="${h(opts.label || 'Pozisyon çizimi')}">
      ${ground}${chair}
      <g class="back">${limb(f.p, f.rk, f.rf, 'limb')}${limb(f.n, f.re, f.rh, 'limb')}</g>
      <g class="front">${limb(f.p, f.lk, f.lf, 'limb')}${torso}${limb(f.n, f.le, f.lh, 'limb')}<circle cx="${f.h[0]}" cy="${f.h[1]}" r="11" class="head"/></g>
    </svg>`;
  }

  function sourceList(keys) {
    return `<div class="sources"><h3>${icon('library')} Kaynakça</h3><ul>${keys.map(k => {
      const s = YA.sources[k]; if (!s) return '';
      return `<li><a href="${s.url}" target="_blank" rel="noopener noreferrer">${h(s.title)}</a> <span class="muted">– ${h(s.org)}</span></li>`;
    }).join('')}</ul><p class="tiny muted">Erişim: ${YA.sourcesAccessed}. İçerikler bu kaynaklardan yararlanılarak özgün Türkçe anlatımla hazırlanmıştır.</p></div>`;
  }
  /* ------------------------------------------------ Videolu gösterim (YouTube, tıklayınca yüklenir) */
  function videoBlock(key, trSearch) {
    const v = YA.videos && YA.videos[key];
    const search = trSearch ? `<a class="link" href="https://www.youtube.com/results?search_query=${encodeURIComponent(trSearch)}" target="_blank" rel="noopener noreferrer">${icon('search')} YouTube’da Türkçe video ara</a>` : '';
    if (!v) return search ? `<div class="video-wrap"><p class="muted tiny">Bu bölüm için seçilmiş bir video yok.</p>${search}</div>` : '';
    return `<div class="video-wrap">
      <button class="video-thumb" data-yt="${v.id}" aria-label="Videoyu oynat: ${h(v.title)}">
        <img src="https://i.ytimg.com/vi/${v.id}/hqdefault.jpg" alt="" loading="lazy">
        <span class="play">${icon('play')}</span><span class="vlen">${h(v.len)}</span>
      </button>
      <p class="video-meta"><strong>${h(v.title)}</strong><br><span class="muted">${h(v.ch)} · İngilizce · Türkçe altyazı için videoda <b>CC → Ayarlar → Otomatik çevir</b></span></p>
      ${v.note ? `<p class="tiny callout warn small">${h(v.note)}</p>` : ''}
      <div class="btn-row"><a class="link" href="https://www.youtube.com/watch?v=${v.id}" target="_blank" rel="noopener noreferrer">${icon('external-link')} YouTube’da aç</a>${search}</div>
    </div>`;
  }
  function bindVideos(el) {
    el.querySelectorAll('.video-thumb').forEach(b => b.addEventListener('click', () => {
      const id = b.dataset.yt;
      const f = document.createElement('iframe');
      f.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&cc_load_policy=1&hl=tr&cc_lang_pref=tr`;
      f.title = b.getAttribute('aria-label');
      f.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      f.allowFullscreen = true; f.loading = 'lazy'; f.className = 'video-frame';
      b.replaceWith(f);
    }));
  }

  function notFound(el) {
    el.innerHTML = `<div class="card empty-state"><img src="assets/illustrations/kayip.svg" alt="" width="300" height="225"><h1>Sayfa bulunamadı</h1><p>Aradığın sayfa taşınmış ya da hiç var olmamış olabilir.</p><a class="btn primary" href="#/">Ana sayfaya dön</a></div>`;
  }
  const safetyNote = () => `<div class="callout warn small">${icon('shield-alert')} <div>Yoga tıbbi tedavinin yerine geçmez. Baş dönmesi, nefes darlığı veya ağrı hissedersen pratiği durdur. Hamilelik, yaralanma, kronik rahatsızlık veya denge problemin varsa uzman görüşü al.</div></div>`;

  /* ------------------------------------------------ Ses (zil) */
  let actx = null;
  function bell(freq = 528, dur = 2.2, vol = 0.18) {
    try {
      actx = actx || new (window.AudioContext || window.webkitAudioContext)();
      const t = actx.currentTime;
      [1, 2.01].forEach((m, i) => {
        const o = actx.createOscillator(), g = actx.createGain();
        o.type = 'sine'; o.frequency.value = freq * m;
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(vol / (i + 1), t + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
        o.connect(g).connect(actx.destination); o.start(t); o.stop(t + dur + 0.05);
      });
    } catch (e) { /* ses desteklenmiyor */ }
  }
  let wakeLock = null;
  async function keepAwake(on) {
    try {
      if (on && 'wakeLock' in navigator) wakeLock = await navigator.wakeLock.request('screen');
      else if (!on && wakeLock) { await wakeLock.release(); wakeLock = null; }
    } catch (e) { /* desteklenmiyor */ }
  }

  /* ================================================ SAYFALAR */
  /* ---------- Ana sayfa (kurs açılış sayfası düzeni) */
  function pageHome(el) {
    const s = Progress.summary();
    const st = Store.state;
    const next = Daily.nextDay();
    const last = Daily.lastCompleted();
    const doy = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
    const msg = YA.motivation[doy % YA.motivation.length];
    const name = st.profile.name;
    const nextSec = firstUnreadSection();
    el.innerHTML = `
      <section class="band band-center home-band">
        <a class="announce" href="#/pozlar">${icon('sparkles')} <span><strong>Yeni:</strong> Her pozisyon için videolu anlatım eklendi.</span> <u>Göz at</u></a>
        <h1 class="display">${name ? `Hoş geldin, ${h(name)}!` : 'Yoga Akademisi’ne hoş geldin!'}</h1>
        <p class="lead">Sıfırdan başlayanlar için ücretsiz, Türkçe ve adım adım bir yoga eğitimi. Kendi hızında öğren, günlük pratiğini takip et.</p>
        <img class="band-ill" src="assets/illustrations/hero.svg" alt="Bitki ve güneşin yanında matın üzerinde meditasyon yapan kişi illüstrasyonu" width="400" height="300">
        <div class="btn-row center">
          ${next ? `<a class="btn pill light lg" href="#/gun/${next.n}">${s.daysDone ? `Gün ${next.n} ile devam et` : 'Eğitime başla'} ${icon('arrow-right')}</a>` : `<a class="btn pill light lg" href="#/rapor">Raporunu gör ${icon('arrow-right')}</a>`}
          <button class="btn pill outline-light lg" id="toCourses">Eğitimlere göz at ${icon('arrow-down')}</button>
        </div>
      </section>

      <section class="questions" aria-label="Bu eğitim kimin için?">
        <div class="q-item">${yi('sprout')}<p>Yogaya nereden başlayacağını mı merak ediyorsun?</p></div>
        <div class="q-item">${yi('wind')}<p>Nefesini ve bedenini daha iyi tanımak mı istiyorsun?</p></div>
        <div class="q-item">${yi('calendar')}<p>Kısa ama düzenli bir pratik alışkanlığı mı kurmak istiyorsun?</p></div>
      </section>

      <section class="goal">
        <h2>Amacımız: yogayı herkes için anlaşılır kılmak</h2>
        <p>Yoga Akademisi; temel bilgileri, güvenli pratik kurallarını ve 18 temel pozisyonu güvenilir kaynaklara dayanarak sade bir dille anlatır. Teoriyi kısa günlük pratiklerle birleştirir; esneklik ya da zor duruşlar değil, güvenli ve sürdürülebilir bir alışkanlık hedeflenir.</p>
      </section>

      <section id="egitimler" class="courses">
        <h2 class="center-title">Eğitimler</h2>
        <div class="course-grid">
          <article class="course-card">
            <a class="cc-banner tone-1" href="#/program"><img src="assets/illustrations/program.svg" alt="" loading="lazy"></a>
            <div class="cc-body"><p class="cc-label">Bölüm 1</p><h3><a href="#/program">30 Günlük Program</a></h3>
              <p>Her gün bir konu, bir öğrenme hedefi, kısa bir pratik ve değerlendirme sorusu. 4 haftada sıfırdan bağımsız pratiğe.</p>
              ${bar(s.daysDone / 30 * 100)}<p class="tiny muted">${s.daysDone}/30 gün tamamlandı</p>
              <a class="link" href="${next ? '#/gun/' + next.n : '#/program'}">${s.daysDone ? 'Devam et' : 'Programa başla'} ${icon('arrow-right')}</a></div>
          </article>
          <article class="course-card">
            <a class="cc-banner tone-2" href="#/moduller"><img src="assets/illustrations/moduller.svg" alt="" loading="lazy"></a>
            <div class="cc-body"><p class="cc-label">Bölüm 2</p><h3><a href="#/moduller">Eğitim Modülleri</a></h3>
              <p>Felsefeden anatomiye 7 modül, 61 bölüm. Her modülün sonunda kısa bir sınav ve kaynakça.</p>
              ${bar(s.secDone / s.secTotal * 100)}<p class="tiny muted">${s.secDone}/${s.secTotal} bölüm okundu</p>
              <a class="link" href="${nextSec ? nextSec.href : '#/moduller'}">${s.secDone ? 'Kaldığın yerden devam et' : 'Modüllere başla'} ${icon('arrow-right')}</a></div>
          </article>
        </div>
      </section>

      <h2 class="center-title">Bugün</h2>
      <div class="home-grid">
        <article class="card today-card">
          <div class="tc-head"><span class="icon-badge">${yi('calcheck')}</span><div><p class="eyebrow">Günlük görev</p>
          <h2>${next ? `Gün ${next.n}: ${h(next.title)}` : 'Tüm görevler tamamlandı!'}</h2></div></div>
          ${next ? `<p>${h(next.goal)}</p>
            <div class="meta-row"><span class="chip">${icon('clock')} ${next.min} dk</span><span class="chip">Hafta ${next.w}: ${h(YA.weeks[next.w - 1].title)}</span></div>
            <a class="btn primary" href="#/gun/${next.n}">${icon('arrow-right')} Göreve git</a>`
            : `<p>30 günlük programı bitirdin. Programlar bölümünden pratiğe devam edebilirsin.</p><a class="btn primary" href="#/programlar">Programlar</a>`}
        </article>
        <article class="card ring-card">
          <div class="ring" style="--p:${s.learning}"><span>%${s.learning}</span></div>
          <div><p class="eyebrow">İlerleme</p><h3>Öğrenme ilerlemesi</h3>
            <p class="muted">${s.daysDone}/30 gün · ${s.secDone}/${s.secTotal} bölüm · ${s.quizPassed}/${s.quizTotal} sınav</p>
            <a class="link" href="#/panel">Gelişim paneline git ${icon('arrow-right')}</a></div>
        </article>
        <article class="card">
          <p class="eyebrow">Son tamamlanan görev</p>
          ${last ? `<h3>Gün ${last.n}: ${h(last.title)}</h3><p class="muted">${fmtDate(Store.state.days[last.n].date)}</p><a class="link" href="#/gun/${last.n}">Tekrar incele ${icon('arrow-right')}</a>` : '<h3>Henüz görev yok</h3><p class="muted">İlk görevini tamamladığında burada görünecek.</p>'}
        </article>
        <article class="card stat-mini">
          <div><span class="big">${s.streak}</span><span class="muted">günlük seri ${icon('flame')}</span></div>
          <div><span class="big">${s.totalMin}</span><span class="muted">toplam dakika</span></div>
          <div><span class="big">${Object.keys(st.badges).length}</span><span class="muted">rozet</span></div>
        </article>
        <article class="card quote-card wide">
          ${icon('quote')}
          <p class="quote">${h(msg)}</p>
          <p class="muted tiny">Günün motivasyon mesajı</p>
        </article>
      </div>

      <h2 class="center-title">Araçlar</h2>
      <div class="feature-grid">
        <a class="feature" href="#/pozlar">${yi('pose')}<h3>18 pozisyon</h3><p>Adım adım anlatım, video, hatalar ve alternatifler.</p></a>
        <a class="feature" href="#/nefes">${yi('wind')}<h3>Nefes rehberi</h3><p>Animasyonlu nefes zamanlayıcısıyla 6 teknik.</p></a>
        <a class="feature" href="#/meditasyon">${yi('lotus')}<h3>Meditasyon</h3><p>Rehberli, zilli meditasyon zamanlayıcısı.</p></a>
        <a class="feature" href="#/programlar">${yi('sequence')}<h3>Hazır programlar</h3><p>5–20 dakikalık zamanlayıcılı rutinler.</p></a>
        <a class="feature" href="#/quiz">${yi('quiz')}<h3>Quiz ve sınavlar</h3><p>Anında geri bildirim ve final değerlendirmesi.</p></a>
        <a class="feature" href="#/panel">${yi('chart')}<h3>Gelişim paneli</h3><p>Grafikler, seri ve öz-değerlendirme.</p></a>
      </div>
      ${safetyNote()}`;
    el.querySelector('#toCourses').addEventListener('click', () => el.querySelector('#egitimler').scrollIntoView({ behavior: 'smooth' }));
  }

  /* ---------- Yoga'ya Başlangıç */
  function pageStart(el) {
    const st = Store.state;
    el.innerHTML = `
      <section class="page-head">
        <p class="eyebrow">Yoga'ya Başlangıç</p>
        <h1>Başlamadan önce bilmen gerekenler</h1>
        <p class="lead">Bu akademi hiç yoga yapmamış biri için tasarlandı. Hedef; esneklik ya da zor duruşlar değil, güvenli temel bilgi ve düzenli bir alışkanlık.</p>
      </section>
      <div class="steps-grid">
        <div class="step-card"><span>1</span><h3>Profilini ayarla</h3><p>Adını ve günlük pratik hedefini belirle.</p></div>
        <div class="step-card"><span>2</span><h3>Güvenlik listesini oku</h3><p>Uzman görüşü gerektiren durumları kontrol et.</p></div>
        <div class="step-card"><span>3</span><h3>Gün 1’e başla</h3><p>Her gün 10–20 dakikalık tek bir görev.</p></div>
        <div class="step-card"><span>4</span><h3>Gelişimini izle</h3><p>Panel, rozetler ve haftalık değerlendirmeler.</p></div>
      </div>
      <div class="grid-2">
        <div class="card">
          <h2>${icon('user')} Profil</h2>
          <form id="profileForm" class="stack">
            <label class="field"><span>Adın (isteğe bağlı)</span><input name="name" maxlength="40" value="${h(st.profile.name)}" autocomplete="given-name" placeholder="Örn. Deniz"></label>
            <label class="field"><span>Günlük pratik hedefin</span><select name="goal">${[5, 10, 15, 20, 30].map(v => `<option value="${v}" ${v === st.profile.dailyGoal ? 'selected' : ''}>${v} dakika</option>`).join('')}</select></label>
            <button class="btn primary" type="submit">${icon('save')} Kaydet</button>
          </form>
          <p class="tiny muted">Hesap ya da sunucu yoktur. Bilgilerin yalnızca bu tarayıcıda saklanır ve cihazlar arasında otomatik senkronize olmaz; Gelişim Paneli’nden JSON yedeği alabilirsin.</p>
        </div>
        <div class="card">
          <h2>${icon('shield-check')} Sağlık ve güvenlik kontrol listesi</h2>
          <p>Aşağıdakilerden biri senin için geçerliyse başlamadan önce doktoruna veya bir sağlık profesyoneline danış:</p>
          <ul class="check-list" id="safetyList">
            ${['Hamileyim ya da yakın zamanda doğum yaptım', 'Son 6 ayda ameliyat geçirdim ya da sakatlandım', 'Kalp-damar hastalığım veya kontrolsüz yüksek tansiyonum var', 'Bel/boyun fıtığı, osteoporoz ya da eklem problemim var', 'Sık baş dönmesi veya denge problemi yaşıyorum', 'Glokom ya da göz tansiyonu tanım var', 'Başka bir kronik rahatsızlık için tedavi görüyorum'].map((t, i) => `<li><label><input type="checkbox" data-i="${i}"> ${t}</label></li>`).join('')}
          </ul>
          <div class="feedback" id="safetyFb" aria-live="polite"></div>
        </div>
      </div>
      <div class="card">
        <h2>${icon('heart-handshake')} Güvenli pratiğin 5 altın kuralı</h2>
        <ol class="rules">
          <li><strong>Ağrı yok, zorlama yok.</strong> Hafif germe hissi normaldir; keskin ağrı durma sinyalidir.</li>
          <li><strong>Nefes akmalı.</strong> Nefesini tutuyorsan duruşu hafiflet.</li>
          <li><strong>Destek kullan.</strong> Blok, kayış ve battaniye seni doğru hizaya taşır.</li>
          <li><strong>Hemen dur:</strong> baş dönmesi, nefes darlığı, göğüs ağrısı, uyuşma ya da bulantı olursa.</li>
          <li><strong>İleri duruşlara acele etme.</strong> Bu programda ileri seviye duruşlar yalnızca bilgi amaçlıdır.</li>
        </ol>
      </div>
      <div class="feature-grid">
        <a class="feature" href="#/modul/m1">${yi('sprout')}<h3>Modül 1: Yoga'ya Giriş</h3><p>Yoga nedir, tarihçe, felsefe ve stiller.</p></a>
        <a class="feature" href="#/modul/m2">${yi('mat')}<h3>Modül 2: Yoga'ya Hazırlık</h3><p>Ekipman, ortam, duruş ve güvenlik.</p></a>
        <a class="feature" href="#/gun/1">${yi('calendar')}<h3>Gün 1’e başla</h3><p>Yoga nedir? 5 dk bilgi + 5 dk nefes.</p></a>
      </div>`;
    el.querySelector('#profileForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const f = new FormData(e.target);
      Store.update(s => { s.profile.name = String(f.get('name') || '').trim().slice(0, 40); s.profile.dailyGoal = Number(f.get('goal')); s.profile.onboarded = true; if (!s.profile.createdAt) s.profile.createdAt = today(); });
      toast('Profilin kaydedildi.', 'ok'); updateChrome();
    });
    el.querySelectorAll('#safetyList input').forEach(cb => cb.addEventListener('change', () => {
      const any = [...el.querySelectorAll('#safetyList input')].some(x => x.checked);
      el.querySelector('#safetyFb').innerHTML = any
        ? `<div class="callout warn small">${icon('stethoscope')} İşaretlediğin durum(lar) için başlamadan önce sağlık profesyoneline danışmanı öneriyoruz. Onay aldıktan sonra pratiği kendi durumuna göre uyarlayarak ve mümkünse nitelikli bir eğitmenle yapabilirsin.</div>`
        : '';
      refreshIcons();
    }));
  }

  /* ---------- Kurs yapısı: modül → bölüm satırları */
  const MOD_ILL = { m1: 'moduller', m2: 'baslangic', m3: 'nefes', m4: 'pozlar', m5: 'meditasyon', m6: 'spine', m7: 'programlar' };
  const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI', 'XVII', 'XVIII'];
  const tone = (m) => 'tone-' + ((YA.modules.indexOf(m) % 4) + 1);
  function moduleRows(m) {
    const read = (id) => Progress.isRead(m.id, id);
    if (m.kind === 'text') return m.sections.map(x => ({ id: x.id, title: x.title, href: `#/modul/${m.id}/${x.id}`, done: read(x.id) }));
    if (m.kind === 'breath') return YA.breaths.map(x => ({ id: x.id, title: x.title, href: `#/nefes/${x.id}`, done: read(x.id) }));
    if (m.kind === 'poses') return YA.poses.map(x => ({ id: x.id, title: `${x.tr} (${x.sa})`, href: `#/poz/${x.id}`, done: read(x.id), group: x.level === 'b' ? 'Başlangıç seviyesi' : 'Orta seviye' }));
    return YA.programs.map(x => ({ id: x.id, title: x.title, href: `#/programlar/${x.id}`, done: read(x.id) }));
  }
  function firstUnreadSection() {
    for (const m of YA.modules) { const r = moduleRows(m).find(x => !x.done); if (r) return Object.assign({ module: m }, r); }
    return null;
  }
  const statusCell = (done) => `<td class="st ${done ? 'done' : ''}">${done ? `${icon('check')}<span class="sr">Tamamlandı</span> 1/1` : '0/1'}</td>`;
  function secTable(m, rows, limit) {
    const shown = limit ? rows.slice(0, limit) : rows;
    let lastGroup = null;
    const body = shown.map((r, k) => {
      const g = !limit && r.group && r.group !== lastGroup ? `<tr class="grp"><td colspan="2">${h(r.group)}</td></tr>` : '';
      lastGroup = r.group;
      return `${g}<tr><td><a href="${r.href}"><span class="rn">${ROMAN[k] || k + 1}.</span> ${h(r.title)}</a></td>${statusCell(r.done)}</tr>`;
    }).join('');
    const more = limit && rows.length > limit ? `<tr class="more"><td colspan="2"><a href="#/modul/${m.id}">+${rows.length - limit} bölüm daha</a></td></tr>` : '';
    return `<table class="sec-table"><thead><tr><th>Bölüm</th><th>Durum</th></tr></thead><tbody>${body}${more}</tbody></table>`;
  }

  /* ---------- Kurs özeti (modül listesi) */
  function pageModules(el) {
    const s = Progress.summary();
    const nx = firstUnreadSection();
    el.innerHTML = `
      <section class="band band-center">
        <p class="band-label">Eğitim Modülleri</p>
        <h1 class="display">Hoş geldin!</h1>
        <p class="lead">7 modül ve ${s.secTotal} bölümle yoganın temellerini öğren. Hesap gerekmez; ilerlemen bu tarayıcıda saklanır.</p>
        <div class="btn-row center">
          ${nx ? `<a class="btn pill light lg" href="${nx.href}">${s.secDone ? 'Kaldığın yerden devam et' : 'Modül 1’e başla'} ${icon('arrow-right')}</a>` : ''}
          <a class="btn pill outline-light lg" href="#/quiz">Sınavlar</a>
        </div>
        <div class="band-progress">${bar(s.secDone / s.secTotal * 100)}<span>${s.secDone}/${s.secTotal} bölüm · ${s.modulesDone}/7 modül tamamlandı</span></div>
      </section>
      <div class="course-grid">${YA.modules.map(m => {
        const ms = Progress.moduleStats(m.id);
        return `<article class="course-card">
          <a class="cc-banner ${tone(m)}" href="#/modul/${m.id}" aria-label="Modül ${m.no}: ${h(m.title)}"><img src="assets/illustrations/${MOD_ILL[m.id]}.svg" alt="" loading="lazy"></a>
          <div class="cc-body">
            <p class="cc-label">Modül ${m.no} ${ms.complete ? `<span class="chip ok">${icon('check')} Tamamlandı</span>` : ''}</p>
            <h3><a href="#/modul/${m.id}">${h(m.title)}</a></h3>
            ${secTable(m, moduleRows(m), 5)}
          </div></article>`;
      }).join('')}</div>`;
  }

  /* ---------- Modül (bölüm listesi) */
  function pageModule(el, id, sec) {
    const m = YA.modules.find(x => x.id === id);
    if (!m) return notFound(el);
    if (sec && m.kind === 'text') return pageSection(el, m, sec);
    const ms = Progress.moduleStats(m.id);
    const idx = YA.modules.indexOf(m);
    const prev = YA.modules[idx - 1], next = YA.modules[idx + 1];
    const rows = moduleRows(m);
    const first = rows.find(r => !r.done) || rows[0];
    el.innerHTML = `
      <section class="band band-center chapter-band ${tone(m)}">
        <p class="band-label">Modül ${m.no}/${YA.modules.length}</p>
        <h1 class="display">${h(m.title)}</h1>
        <img class="band-ill" src="assets/illustrations/${MOD_ILL[m.id]}.svg" alt="" width="400" height="300">
      </section>
      <div class="reading">
        <p class="intro-lead">${h(m.summary)}</p>
        ${m.intro ? `<div class="prose">${m.intro}</div>` : ''}
        <h2 class="list-title">Modül ${m.no}’de şu bölümleri işleyeceğiz. Başlamak için bir bölüme tıkla:</h2>
        ${secTable(m, rows)}
        <div class="module-progress">${bar(ms.pct)}<span class="muted">${ms.done}/${ms.total} bölüm · %${ms.pct}</span></div>
        <div class="btn-row"><a class="btn primary pill lg" href="${first.href}">${ms.done ? 'Kaldığın yerden devam et' : 'İlk bölüme başla'} ${icon('arrow-right')}</a></div>
        <div class="card quiz-cta"><div><h3>${icon('list-checks')} Modül ${m.no} sınavı</h3><p class="muted">Bilgini ${YA.quizzes.find(q => q.id === m.id).qs.length} soruluk kısa sınavla pekiştir.</p></div><a class="btn primary" href="#/quiz/${m.id}">Sınava başla</a></div>
        ${sourceList(m.sources)}
        <div class="pager">${prev ? `<a class="btn ghost" href="#/modul/${prev.id}">${icon('arrow-left')} Modül ${prev.no}</a>` : '<span></span>'}${next ? `<a class="btn ghost" href="#/modul/${next.id}">Modül ${next.no} ${icon('arrow-right')}</a>` : ''}</div>
      </div>`;
  }

  /* ---------- Tek bölüm (okuma sayfası) */
  function pageSection(el, m, secId) {
    const i = m.sections.findIndex(x => x.id === secId);
    if (i < 0) return notFound(el);
    const s = m.sections[i];
    const prev = m.sections[i - 1], next = m.sections[i + 1];
    const read = Progress.isRead(m.id, s.id);
    el.innerHTML = `
      <section class="band section-band ${tone(m)}"><img class="band-ill" src="assets/illustrations/${MOD_ILL[m.id]}.svg" alt="" width="400" height="300"></section>
      <article class="reading lesson-page">
        <p class="sec-progress">Modül ${m.no}: ${h(m.title)} · Bölüm ${i + 1}/${m.sections.length}</p>
        <div class="sec-dots" aria-hidden="true">${m.sections.map((x, k) => `<a href="#/modul/${m.id}/${x.id}" class="${k === i ? 'cur' : ''} ${Progress.isRead(m.id, x.id) ? 'done' : ''}" tabindex="-1"></a>`).join('')}</div>
        <h1 class="sec-title"><span class="rn">${ROMAN[i]}.</span> ${h(s.title)}</h1>
        ${s.ill ? `<figure class="lesson-ill"><img src="${s.ill}" alt="${h(s.title)} illüstrasyonu" loading="lazy"></figure>` : ''}
        <div class="prose prose-lg">${s.html}</div>
        <div class="sec-end">
          <p class="muted">${read ? `${icon('circle-check')} Bu bölümü okudun.` : 'Bölümü bitirdiğinde işaretleyip devam et.'}</p>
          <div class="btn-row">
            ${prev ? `<a class="btn ghost pill" href="#/modul/${m.id}/${prev.id}">${icon('arrow-left')} Önceki bölüm</a>` : `<a class="btn ghost pill" href="#/modul/${m.id}">${icon('arrow-left')} Modül özeti</a>`}
            <button class="btn primary pill lg" id="readNext">${next ? 'Okudum, sonraki bölüm' : 'Okudum, modül sınavına geç'} ${icon('arrow-right')}</button>
          </div>
          ${read ? '<button class="linkbtn tiny" id="unread">Okunmadı olarak işaretle</button>' : ''}
        </div>
        ${sourceList(m.sources)}
      </article>`;
    el.querySelector('#readNext').addEventListener('click', () => {
      Progress.setRead(m.id, s.id, true);
      if (Progress.moduleStats(m.id).complete) toast(`Modül ${m.no} tamamlandı!`, 'ok');
      Progress.checkBadges(); updateChrome();
      go(next ? `#/modul/${m.id}/${next.id}` : `#/quiz/${m.id}`);
    });
    const un = el.querySelector('#unread');
    if (un) un.addEventListener('click', () => { Progress.setRead(m.id, s.id, false); updateChrome(); pageSection(el, m, secId); refreshIcons(); });
  }

  /* ---------- Pozisyonlar */
  const LV = { b: ['Başlangıç', 'lvl-b'], i: ['Orta', 'lvl-i'], a: ['İleri', 'lvl-a'] };
  function poseCard(p) {
    const learned = Progress.isRead('m4', p.id);
    return `<a class="card pose-card" href="#/poz/${p.id}" data-level="${p.level}" data-search="${h((p.tr + ' ' + p.sa + ' ' + p.en).toLocaleLowerCase('tr'))}">
      <div class="pc-fig">${figure(p.fig, { label: p.tr })}</div>
      <div class="pc-body"><span class="lvl ${LV[p.level][1]}">${LV[p.level][0]}</span>${learned ? `<span class="learned" title="Öğrenildi">${icon('circle-check')}</span>` : ''}${YA.videos[p.id] ? `<span class="has-video" title="Videolu gösterim var">${icon('video')}</span>` : ''}
      <h3>${h(p.tr)}</h3><p class="sa">${h(p.sa)}</p><p class="tiny muted">${h(p.en)}</p></div></a>`;
  }
  function pagePoses(el) {
    const learned = (Store.state.read.m4 || []).length;
    el.innerHTML = `
      <section class="page-head"><p class="eyebrow">Yoga Pozisyonları</p><h1>Asana kütüphanesi</h1>
      <p class="lead">${YA.poses.length} pozisyon; her biri Türkçe ve Sanskritçe adı, amacı, çalışan kaslar, adım adım uygulama, hizalanma, nefes, yaygın hatalar, kolaylaştırılmış alternatif ve dikkat edilecek durumlarla. <strong>${learned}</strong> pozisyonu öğrendin.</p></section>
      <div class="toolbar">
        <div class="seg" role="tablist" aria-label="Seviye filtresi">
          <button class="active" data-f="all">Tümü</button><button data-f="b">Başlangıç</button><button data-f="i">Orta</button><button data-f="a">İleri (bilgi)</button>
        </div>
        <label class="search">${icon('search')}<input type="search" id="poseSearch" placeholder="Pozisyon ara (ör. köpek, Tadasana)" aria-label="Pozisyon ara"></label>
      </div>
      <div class="pose-grid" id="poseGrid">${YA.poses.map(poseCard).join('')}</div>
      <section id="advanced" class="advanced">
        <h2 class="section-title">İleri seviye pozisyonlar – yalnızca bilgi amaçlı</h2>
        <div class="callout warn">${icon('octagon-alert')} <div>Bu duruşlar <strong>yeni başlayanlar için uygun değildir</strong> ve bu programda uygulanmaz. Uygulama talimatı verilmemiştir. İlerleyen dönemde yalnızca nitelikli bir eğitmen gözetiminde, uzun bir hazırlık sürecinden sonra öğrenilmelidir.</div></div>
        <div class="card-grid">${YA.advancedPoses.map(a => `<div class="card adv-card"><span class="lvl lvl-a">İleri</span><h3>${h(a.tr)}</h3><p class="sa">${h(a.sa)} · <span class="muted">${h(a.en)}</span></p><p>${h(a.why)}</p></div>`).join('')}</div>
      </section>`;
    let f = 'all', q = '';
    const apply = () => {
      el.querySelectorAll('.pose-card').forEach(c => {
        const ok = (f === 'all' || c.dataset.level === f) && (!q || c.dataset.search.includes(q));
        c.hidden = !ok || f === 'a';
      });
      el.querySelector('#advanced').hidden = !(f === 'all' || f === 'a');
    };
    el.querySelectorAll('.seg button').forEach(b => b.addEventListener('click', () => {
      el.querySelectorAll('.seg button').forEach(x => x.classList.remove('active')); b.classList.add('active'); f = b.dataset.f; apply();
    }));
    el.querySelector('#poseSearch').addEventListener('input', (e) => { q = e.target.value.trim().toLocaleLowerCase('tr'); apply(); });
  }
  function pagePose(el, id) {
    const p = poseById(id);
    if (!p) return notFound(el);
    const i = YA.poses.indexOf(p);
    const prev = YA.poses[i - 1], next = YA.poses[i + 1];
    const learned = Progress.isRead('m4', p.id);
    const list = (arr, cls) => `<ul class="${cls || ''}">${arr.map(x => `<li>${x}</li>`).join('')}</ul>`;
    el.innerHTML = `
      <nav class="crumbs"><a href="#/pozlar">Yoga Pozisyonları</a> › ${h(p.tr)}</nav>
      <div class="pose-hero card">
        <div class="ph-fig">${figure(p.fig, { label: p.tr + ' çizimi' })}</div>
        <div class="ph-info">
          <span class="lvl ${LV[p.level][1]}">${LV[p.level][0]} seviye</span>
          <h1>${h(p.tr)}</h1>
          <p class="sa big-sa">${h(p.sa)}</p><p class="muted">${h(p.en)}</p>
          <div class="meta-row"><span class="chip">${icon('timer')} ${h(p.hold)}</span></div>
          <p><strong>Amaç:</strong> ${h(p.purpose)}</p>
          ${p.level === 'i' ? `<div class="callout info small">${icon('info')} Orta seviye: 30 günlük programı tamamladıktan sonra, kolaylaştırılmış alternatifiyle başlaman önerilir.</div>` : ''}
          <button class="btn ${learned ? 'is-read' : 'primary'}" id="learnBtn">${icon(learned ? 'circle-check' : 'graduation-cap')} ${learned ? 'Öğrenildi' : 'Öğrendim'}</button>
        </div>
      </div>
      <div class="card video-card"><h2>${icon('video')} Videolu gösterim</h2>
        ${p.level === 'i' ? `<p class="tiny muted">Orta seviye duruştur; videoyu izlerken kolaylaştırılmış alternatifi tercih et.</p>` : ''}
        ${videoBlock(p.id, `${p.sa} ${p.tr} yoga nasıl yapılır`)}</div>
      <div class="pose-detail">
        <div class="card"><h2>${icon('dumbbell')} Çalışan kas grupları</h2><div class="tags">${p.muscles.map(x => `<span class="tag">${h(x)}</span>`).join('')}</div></div>
        <div class="card"><h2>${icon('list-ordered')} Adım adım uygulama</h2><ol class="steps">${p.steps.map(x => `<li>${x}</li>`).join('')}</ol></div>
        <div class="card"><h2>${icon('ruler')} Doğru hizalanma</h2>${list(p.align, 'check')}</div>
        <div class="card"><h2>${icon('wind')} Nefes koordinasyonu</h2><p>${h(p.breath)}</p></div>
        <div class="card"><h2>${icon('circle-x')} Yaygın hatalar</h2>${list(p.mistakes, 'x-list')}</div>
        <div class="card"><h2>${icon('hand-heart')} Kolaylaştırılmış alternatif</h2><p>${h(p.easier)}</p></div>
        <div class="card warn-card"><h2>${icon('triangle-alert')} Dikkat edilmesi gereken durumlar</h2><p>${h(p.caution)}</p><p class="tiny">Ağrı, baş dönmesi veya nefes darlığı hissedersen duruştan hemen çık. Ağrıya rağmen pozisyonda kalma.</p></div>
      </div>
      ${sourceList(['yogaJournalPoses', 'nhsYoga', 'nccihYogaSafety'])}
      <div class="pager">${prev ? `<a class="btn ghost" href="#/poz/${prev.id}">${icon('arrow-left')} ${h(prev.tr)}</a>` : '<span></span>'}${next ? `<a class="btn ghost" href="#/poz/${next.id}">${h(next.tr)} ${icon('arrow-right')}</a>` : ''}</div>`;
    bindVideos(el);
    el.querySelector('#learnBtn').addEventListener('click', () => {
      Progress.setRead('m4', p.id, !Progress.isRead('m4', p.id));
      if (Progress.isRead('m4', p.id)) toast(`${p.tr} öğrenildi olarak işaretlendi.`, 'ok');
      Progress.checkBadges(); pagePose(el, id); refreshIcons(); updateChrome();
    });
  }

  /* ---------- Nefes */
  function pageBreath(el, id) {
    const sel = YA.breaths.find(b => b.id === id) || null;
    el.innerHTML = `
      <section class="page-head"><p class="eyebrow">Nefes Teknikleri · Modül 3</p><h1>Pranayama: nefesle çalışmak</h1></section>
      <article class="card lesson"><div class="prose">${YA.modules.find(m => m.id === 'm3').intro}</div></article>
      <div class="card pacer-card" id="pacer">
        <div class="pacer-controls">
          <h2>${icon('wind')} Nefes rehberi</h2>
          <label class="field"><span>Teknik</span><select id="pTech">${YA.breaths.map(b => `<option value="${b.id}" ${sel && sel.id === b.id ? 'selected' : ''}>${h(b.title)}</option>`).join('')}</select></label>
          <label class="field"><span>Süre</span><select id="pDur">${[1, 2, 3, 5].map(v => `<option value="${v}" ${v === 3 ? 'selected' : ''}>${v} dakika</option>`).join('')}</select></label>
          <label class="field" id="holdField" hidden><span>Bekleme süresi (isteğe bağlı): <output id="holdOut">2</output> sn</span><input type="range" id="pHold" min="0" max="4" value="2"></label>
          <p class="tiny muted" id="pPattern"></p>
          <div class="btn-row"><button class="btn primary" id="pStart">${icon('play')} Başlat</button><button class="btn ghost" id="pStop" disabled>${icon('square')} Bitir</button></div>
          <p class="tiny muted">Baş dönmesi ya da nefes darlığı hissedersen “Bitir”e bas ve normal nefesine dön.</p>
        </div>
        <div class="pacer-stage" aria-live="polite">
          <div class="pacer-circle" id="pCircle"><div class="pacer-inner"><span id="pPhase">Hazır</span><small id="pCount"></small></div></div>
          <p class="pacer-time" id="pTime"></p>
        </div>
      </div>
      <div class="breath-list">${YA.breaths.map(b => `
        <article class="card breath-card ${sel && sel.id === b.id ? 'flash' : ''}" id="br-${b.id}">
          <div class="bc-head"><div><span class="chip">${h(b.level)}</span><h2>${h(b.title)}</h2><p class="muted">${h(b.alt)}</p></div>
            ${Progress.isRead('m3', b.id) ? `<span class="chip ok">${icon('check')} Tamamlandı</span>` : ''}</div>
          <div class="bc-grid">
            <div>
              <h3>1. Açıklama</h3><p>${b.desc}</p>
              <h3>2. Uygulama adımları</h3><ol class="steps">${b.steps.map(s => `<li>${s}</li>`).join('')}</ol>
              <h3>3. Süre</h3><p>${h(b.duration)} · Ritim: al ${b.pattern[0]} sn${b.pattern[1] ? ` · bekle ${b.pattern[1]} sn (isteğe bağlı)` : ''} · ver ${b.pattern[2]} sn${b.pattern[3] ? ` · bekle ${b.pattern[3]} sn (isteğe bağlı)` : ''}</p>
              <h3>5. Dikkat edilmesi gerekenler</h3><ul class="x-list warnish">${b.cautions.map(c => `<li>${c}</li>`).join('')}</ul>
            </div>
            <div><h3>4. Görsel anlatım</h3>${breathInfographic(b)}<h3>${icon('video')} Videolu gösterim</h3>${videoBlock('nefes-' + b.id, b.title + ' nefes tekniği nasıl yapılır')}</div>
          </div>
          <div class="btn-row"><button class="btn primary try" data-id="${b.id}">${icon('play')} Rehberle uygula</button>
          <button class="btn read-b ${Progress.isRead('m3', b.id) ? 'is-read' : ''}" data-id="${b.id}">${icon(Progress.isRead('m3', b.id) ? 'circle-check' : 'circle')} ${Progress.isRead('m3', b.id) ? 'Tamamlandı' : 'Okudum ve uyguladım'}</button></div>
        </article>`).join('')}</div>
      ${sourceList(YA.modules.find(m => m.id === 'm3').sources)}`;
    initPacer(el); bindVideos(el);
    el.querySelectorAll('.try').forEach(b => b.addEventListener('click', () => {
      el.querySelector('#pTech').value = b.dataset.id; el.querySelector('#pTech').dispatchEvent(new Event('change'));
      el.querySelector('#pacer').scrollIntoView({ behavior: 'smooth' });
    }));
    el.querySelectorAll('.read-b').forEach(b => b.addEventListener('click', () => {
      const v = !Progress.isRead('m3', b.dataset.id);
      Progress.setRead('m3', b.dataset.id, v);
      b.classList.toggle('is-read', v);
      b.innerHTML = `${icon(v ? 'circle-check' : 'circle')} ${v ? 'Tamamlandı' : 'Okudum ve uyguladım'}`;
      Progress.checkBadges(); refreshIcons(); updateChrome();
    }));
    if (sel) setTimeout(() => { const t = document.getElementById('br-' + sel.id); if (t) t.scrollIntoView({ behavior: 'smooth' }); }, 60);
  }
  function breathInfographic(b) {
    if (b.ill) return `<figure class="infographic"><img src="${b.ill}" alt="Diyafram nefesinde diyaframın hareketini gösteren şema" loading="lazy"><figcaption>Nefes alırken diyafram aşağı iner; verirken yukarı, gevşeme konumuna döner.</figcaption></figure>`;
    if (b.box) return `<figure class="infographic"><svg viewBox="0 0 220 220" class="box-svg" role="img" aria-label="Kutu nefesi şeması"><rect x="40" y="40" width="140" height="140" rx="10"/><circle r="8" class="dot"><animateMotion dur="12s" repeatCount="indefinite" path="M40,180 L40,40 L180,40 L180,180 Z"/></circle>
      <text x="20" y="115" transform="rotate(-90 20 115)">Al · 4</text><text x="110" y="28">Bekle · 2 (isteğe bağlı)</text><text x="200" y="110" transform="rotate(90 200 110)">Ver · 4</text><text x="110" y="205">Bekle · 2 (isteğe bağlı)</text></svg>
      <figcaption>Kare boyunca ilerleyen nokta: dört eşit kenar, dört evre.</figcaption></figure>`;
    if (b.alternate) return `<figure class="infographic"><svg viewBox="0 0 240 150" class="nadi-svg" role="img" aria-label="Dönüşümlü burun nefesi şeması">
      <path d="M120 20 C100 60 95 90 92 110 Q120 128 148 110 C145 90 140 60 120 20Z" class="nose"/>
      <circle cx="106" cy="112" r="6" class="nos"/><circle cx="134" cy="112" r="6" class="nos"/>
      <path d="M40 120 C60 120 80 116 100 112" class="arrow in"/><path d="M140 112 C160 116 180 120 200 120" class="arrow out"/>
      <text x="40" y="140">Sol: al</text><text x="160" y="140">Sağ: ver</text><text x="70" y="30">Sonra tersi: sağdan al, soldan ver</text></svg>
      <figcaption>Bir tur: soldan al → sağdan ver → sağdan al → soldan ver.</figcaption></figure>`;
    return `<figure class="infographic"><svg viewBox="0 0 260 120" class="wave-svg" role="img" aria-label="Nefes ritmi dalgası">
      <path d="M10 90 C40 90 50 30 ${10 + b.pattern[0] * 15} 30 S ${20 + (b.pattern[0] + b.pattern[2]) * 15} 90 ${20 + (b.pattern[0] + b.pattern[2]) * 15} 90" class="wave"/>
      <text x="20" y="20">Al · ${b.pattern[0]} sn</text><text x="${30 + b.pattern[0] * 15}" y="110">Ver · ${b.pattern[2]} sn</text></svg>
      <figcaption>Nefes ritmi: ${b.pattern[2] > b.pattern[0] ? 'veriş alıştan uzun, bu da rahatlamayı destekler.' : 'alış ve veriş eşit, yumuşak ve sessiz.'}</figcaption></figure>`;
  }
  function initPacer(el) {
    const $ = (s) => el.querySelector(s);
    let timer = null, tickInt = null, running = false, started = 0, endAt = 0, cycle = 0;
    const update = () => {
      const b = YA.breaths.find(x => x.id === $('#pTech').value);
      $('#holdField').hidden = !b.box;
      const hold = b.box ? Number($('#pHold').value) : null;
      const pat = b.box ? [b.pattern[0], hold, b.pattern[2], hold] : b.pattern;
      $('#pPattern').textContent = `Ritim: al ${pat[0]} sn${pat[1] ? `, bekle ${pat[1]} sn` : ''}, ver ${pat[2]} sn${pat[3] ? `, bekle ${pat[3]} sn` : ''}.`;
      return { b, pat };
    };
    $('#pTech').addEventListener('change', update);
    $('#pHold').addEventListener('input', () => { $('#holdOut').textContent = $('#pHold').value; update(); });
    update();
    const circle = $('#pCircle');
    function phase(i, cfg) {
      if (!running) return;
      if (Date.now() >= endAt && (i === 0)) return finish(true);
      const names = ['Nefes al', 'Bekle', 'Nefes ver', 'Bekle'];
      const dur = cfg.pat[i];
      if (!dur) return phase((i + 1) % 4, cfg);
      let label = names[i];
      if (cfg.b.alternate && (i === 0 || i === 2)) {
        const side = (cycle % 2 === 0) ? (i === 0 ? 'Sol' : 'Sağ') : (i === 0 ? 'Sağ' : 'Sol');
        label = `${side} burundan ${i === 0 ? 'al' : 'ver'}`;
      }
      $('#pPhase').textContent = label;
      circle.style.transitionDuration = dur + 's';
      circle.className = 'pacer-circle ' + (i === 0 ? 'grow' : i === 2 ? 'shrink' : (i === 1 ? 'hold-big' : 'hold-small'));
      let left = dur; $('#pCount').textContent = left;
      clearInterval(tickInt);
      tickInt = setInterval(() => { if (!running) return; left--; if (left > 0) $('#pCount').textContent = left; $('#pTime').textContent = 'Kalan: ' + fmtSec((endAt - Date.now()) / 1000); }, 1000);
      timer = setTimeout(() => { clearInterval(tickInt); if (i === 3 || (i === 2 && !cfg.pat[3])) cycle++; phase((i + 1) % 4, cfg); }, dur * 1000);
    }
    function stopTimers() { clearTimeout(timer); clearInterval(tickInt); timer = null; tickInt = null; }
    function finish(complete) {
      running = false; stopTimers(); keepAwake(false);
      const cfg = update();
      const mins = (Date.now() - started) / 60000;
      circle.className = 'pacer-circle'; circle.style.transitionDuration = '1s';
      $('#pPhase').textContent = complete ? 'Tamamlandı' : 'Durduruldu'; $('#pCount').textContent = ''; $('#pTime').textContent = '';
      $('#pStart').disabled = false; $('#pStop').disabled = true;
      if (mins >= 0.5) {
        Progress.logSession({ minutes: Math.round(mins * 10) / 10, type: 'nefes', label: cfg.b.title, ref: cfg.b.id });
        if (complete) { Progress.setRead('m3', cfg.b.id, true); bell(440, 1.6, .12); }
        toast(`${cfg.b.title}: ${Math.round(mins * 10) / 10} dk kaydedildi.`, 'ok');
        Progress.checkBadges(); updateChrome();
      }
    }
    $('#pStart').addEventListener('click', () => {
      const cfg = update();
      running = true; cycle = 0; started = Date.now(); endAt = started + Number($('#pDur').value) * 60000;
      $('#pStart').disabled = true; $('#pStop').disabled = false;
      keepAwake(true); bell(440, 1.2, .1);
      phase(0, cfg);
    });
    $('#pStop').addEventListener('click', () => finish(false));
    onCleanup(() => { if (running) { running = false; stopTimers(); keepAwake(false); } });
  }

  /* ---------- Meditasyon */
  function pageMeditation(el) {
    const m = YA.modules.find(x => x.id === 'm5');
    const ms = Progress.moduleStats('m5');
    el.innerHTML = `
      <section class="page-head"><p class="eyebrow">Meditasyon · Modül 5</p><h1>Meditasyon ve zihinsel farkındalık</h1>
      <p class="lead">Rehberli zamanlayıcıyla birkaç dakikalık meditasyon yap; modül içeriğini aşağıdan oku.</p></section>
      <div class="card med-card">
        <div class="med-controls">
          <h2>${icon('flower-2')} Rehberli meditasyon zamanlayıcısı</h2>
          <label class="field"><span>Uygulama</span><select id="mType">${YA.meditations.map(x => `<option value="${x.id}">${h(x.title)}</option>`).join('')}</select></label>
          <label class="field"><span>Süre</span><select id="mDur">${[3, 5, 10, 15].map(v => `<option value="${v}" ${v === 5 ? 'selected' : ''}>${v} dakika</option>`).join('')}</select></label>
          <label class="check-inline"><input type="checkbox" id="mBell" checked> Başlangıç ve bitişte zil sesi</label>
          <div class="btn-row"><button class="btn primary" id="mStart">${icon('play')} Başlat</button><button class="btn ghost" id="mPause" disabled>${icon('pause')} Duraklat</button><button class="btn ghost" id="mStop" disabled>${icon('square')} Bitir</button></div>
        </div>
        <div class="med-stage">
          <div class="ring big" id="mRing" style="--p:0"><span id="mTime">5:00</span></div>
          <p class="med-cue" id="mCue" aria-live="polite">Rahat bir oturuş bul ve “Başlat”a bas.</p>
        </div>
      </div>
      <div class="module-progress">${bar(ms.pct)}<span class="muted">Modül 5: ${ms.done}/${ms.total} bölüm</span></div>
      ${m.sections.map(s => `<article class="card lesson" id="sec-${s.id}"><h2>${h(s.title)}</h2><div class="prose">${s.html}</div>
        <button class="btn read-btn ${Progress.isRead('m5', s.id) ? 'is-read' : ''}" data-sec="${s.id}">${icon(Progress.isRead('m5', s.id) ? 'circle-check' : 'circle')} ${Progress.isRead('m5', s.id) ? 'Okundu' : 'Okudum'}</button></article>`).join('')}
      ${sourceList(m.sources)}`;
    el.querySelectorAll('.read-btn').forEach(b => b.addEventListener('click', () => {
      const v = !Progress.isRead('m5', b.dataset.sec); Progress.setRead('m5', b.dataset.sec, v);
      b.classList.toggle('is-read', v); b.innerHTML = `${icon(v ? 'circle-check' : 'circle')} ${v ? 'Okundu' : 'Okudum'}`;
      Progress.checkBadges(); refreshIcons(); updateChrome();
    }));
    const $ = (s) => el.querySelector(s);
    let total = 0, remaining = 0, int = null, running = false, paused = false, startedAt = 0, elapsed = 0;
    $('#mDur').addEventListener('change', () => { if (!running) $('#mTime').textContent = fmtSec($('#mDur').value * 60); });
    function render() {
      const med = YA.meditations.find(x => x.id === $('#mType').value);
      $('#mTime').textContent = fmtSec(remaining);
      $('#mRing').style.setProperty('--p', Math.round((1 - remaining / total) * 100));
      const idx = Math.min(med.cues.length - 1, Math.floor((total - remaining) / (total / med.cues.length)));
      if ($('#mCue').dataset.i !== String(idx)) { $('#mCue').dataset.i = idx; $('#mCue').textContent = med.cues[idx]; $('#mCue').classList.remove('fade'); void $('#mCue').offsetWidth; $('#mCue').classList.add('fade'); }
    }
    function end(complete) {
      clearInterval(int); running = false; keepAwake(false);
      const mins = elapsed / 60;
      $('#mStart').disabled = false; $('#mPause').disabled = true; $('#mStop').disabled = true; $('#mType').disabled = false; $('#mDur').disabled = false;
      $('#mCue').textContent = complete ? 'Meditasyon tamamlandı. Birkaç nefes daha al ve yavaşça gözlerini aç.' : 'Meditasyon sonlandırıldı.';
      if (complete && $('#mBell').checked) bell(528, 3);
      if (mins >= 1) {
        const med = YA.meditations.find(x => x.id === $('#mType').value);
        Progress.logSession({ minutes: Math.round(mins * 10) / 10, type: 'meditasyon', label: 'Meditasyon: ' + med.title, ref: med.id });
        toast(`${Math.round(mins * 10) / 10} dk meditasyon kaydedildi.`, 'ok'); Progress.checkBadges(); updateChrome();
      }
    }
    $('#mStart').addEventListener('click', () => {
      total = remaining = Number($('#mDur').value) * 60; elapsed = 0; running = true; paused = false;
      $('#mStart').disabled = true; $('#mPause').disabled = false; $('#mStop').disabled = false; $('#mType').disabled = true; $('#mDur').disabled = true;
      $('#mCue').dataset.i = ''; if ($('#mBell').checked) bell(528, 3); keepAwake(true); render();
      int = setInterval(() => { if (paused) return; remaining--; elapsed++; if (remaining <= 0) { remaining = 0; render(); end(true); } else render(); }, 1000);
    });
    $('#mPause').addEventListener('click', () => { paused = !paused; $('#mPause').innerHTML = paused ? `${icon('play')} Devam` : `${icon('pause')} Duraklat`; refreshIcons(); });
    $('#mStop').addEventListener('click', () => end(false));
    onCleanup(() => { if (running) { clearInterval(int); running = false; keepAwake(false); } });
  }

  /* ---------- Programlar */
  const progTotal = (p) => p.steps.reduce((a, s) => a + s.s, 0);
  function programCard(p) {
    const done = Progress.isRead('m7', p.id);
    return `<a class="card program-card" href="#/programlar/${p.id}">
      <div class="mc-top"><span class="icon-badge">${yi(PROG_ICON[p.id] || 'sequence')}</span>${done ? `<span class="chip ok">${icon('check')} Yapıldı</span>` : `<span class="chip">${h(p.level)}</span>`}</div>
      <h3>${h(p.title)}</h3><p class="muted">${h(p.desc)}</p>
      <div class="meta-row"><span class="chip">${icon('clock')} ~${Math.round(progTotal(p) / 60)} dk</span><span class="chip">${p.steps.length} adım</span><span class="chip">${h(p.focus)}</span></div></a>`;
  }
  function pagePrograms(el) {
    const m = YA.modules.find(x => x.id === 'm7');
    el.innerHTML = `<section class="page-head"><p class="eyebrow">Yoga Programları · Modül 7</p><h1>Hazır pratik programları</h1></section>
      <article class="card lesson"><div class="prose">${m.intro}</div></article>
      <div class="card-grid">${YA.programs.map(programCard).join('')}</div>${sourceList(m.sources)}`;
  }
  function stepInfo(s) {
    if (s.rest) return { name: 'Dinlenme', cue: s.cue || 'Rahat bir pozisyonda nefesini izle. Gerekirse Çocuk Duruşu.', fig: YA.poses.find(p => p.id === 'balasana').fig, rest: true };
    if (s.pose) { const p = poseById(s.pose); return { name: p.tr + (s.side ? ` – ${s.side}` : ''), sa: p.sa, cue: s.cue || p.breath, fig: p.fig, id: p.id }; }
    return { name: s.name, cue: s.cue, fig: YA.extraFigs[s.fig] || YA.extraFigs.ayakta };
  }
  function pageProgram(el, id) {
    const p = YA.programs.find(x => x.id === id);
    if (!p) return notFound(el);
    const total = progTotal(p);
    const restTotal = p.steps.filter(s => s.rest).reduce((a, s) => a + s.s, 0);
    el.innerHTML = `
      <nav class="crumbs"><a href="#/programlar">Yoga Programları</a> › ${h(p.title)}</nav>
      <section class="page-head"><p class="eyebrow">${h(p.level)} · ${h(p.focus)}</p><h1>${h(p.title)}</h1><p class="lead">${h(p.desc)}</p>
        <div class="meta-row"><span class="chip">${icon('clock')} Toplam ${fmtSec(total)}</span><span class="chip">${p.steps.length} adım</span><span class="chip">${icon('coffee')} Dinlenme: ${fmtSec(restTotal)}</span></div>
        <div class="btn-row"><button class="btn primary lg" id="startProg">${icon('play')} Programı başlat</button>
        <button class="btn ${Progress.isRead('m7', p.id) ? 'is-read' : ''}" id="readProg">${icon(Progress.isRead('m7', p.id) ? 'circle-check' : 'circle')} ${Progress.isRead('m7', p.id) ? 'İncelendi' : 'İnceledim'}</button></div></section>
      ${safetyNote()}
      ${YA.videos['program-' + p.id] ? `<div class="card video-card"><h2>${icon('video')} Videolu gösterim</h2>${videoBlock('program-' + p.id, p.title + ' yoga')}</div>` : ''}
      <h2 class="section-title">Hareket sırası</h2>
      <ol class="seq">${p.steps.map((s, i) => { const x = stepInfo(s); return `<li class="${x.rest ? 'rest' : ''}">
        <span class="seq-no">${i + 1}</span>
        <div class="seq-fig">${x.rest ? `<div class="rest-ico">${icon('coffee')}</div>` : figure(x.fig, { small: true, label: x.name })}</div>
        <div class="seq-body"><strong>${h(x.name)}</strong>${x.sa ? ` <span class="sa">${h(x.sa)}</span>` : ''}<p class="tiny muted">${h(x.cue || '')}</p></div>
        <span class="chip">${fmtSec(s.s)}</span>
        ${x.id ? `<a class="seq-link" href="#/poz/${x.id}" aria-label="${h(x.name)} detay">${icon('info')}</a>` : ''}</li>`; }).join('')}</ol>
      <div id="player" class="player" hidden></div>`;
    el.querySelector('#readProg').addEventListener('click', () => { Progress.setRead('m7', p.id, !Progress.isRead('m7', p.id)); Progress.checkBadges(); pageProgram(el, id); refreshIcons(); updateChrome(); });
    el.querySelector('#startProg').addEventListener('click', () => runPlayer(el, p));
    bindVideos(el);
  }
  function runPlayer(el, p) {
    const pl = el.querySelector('#player');
    let i = 0, left = p.steps[0].s, paused = false, elapsed = 0, int = null;
    const total = progTotal(p);
    document.body.classList.add('no-scroll');
    pl.hidden = false;
    const done = () => p.steps.slice(0, i).reduce((a, s) => a + s.s, 0) + (p.steps[i] ? p.steps[i].s - left : 0);
    function draw() {
      const s = p.steps[i]; const x = stepInfo(s); const nx = p.steps[i + 1] ? stepInfo(p.steps[i + 1]) : null;
      pl.innerHTML = `<div class="player-inner" role="dialog" aria-modal="true" aria-label="${h(p.title)} oynatıcı">
        <div class="pl-top"><span>${h(p.title)}</span><button class="icon-btn" id="plClose" aria-label="Kapat">${icon('x')}</button></div>
        ${bar(done() / total * 100, 'Program ilerlemesi')}
        <div class="pl-main ${x.rest ? 'rest' : ''}">
          <div class="pl-fig">${figure(x.fig, { label: x.name })}</div>
          <div class="pl-info"><p class="eyebrow">Adım ${i + 1}/${p.steps.length}</p><h2>${h(x.name)}</h2>${x.sa ? `<p class="sa">${h(x.sa)}</p>` : ''}
            <p class="pl-cue">${h(x.cue || '')}</p>
            <div class="pl-count" aria-live="off">${fmtSec(left)}</div>
            ${nx ? `<p class="muted tiny">Sıradaki: ${h(nx.name)}</p>` : '<p class="muted tiny">Son adım</p>'}</div>
        </div>
        <div class="pl-controls">
          <button class="btn ghost" id="plPrev" ${i === 0 ? 'disabled' : ''}>${icon('skip-back')} Önceki</button>
          <button class="btn primary" id="plPause">${icon(paused ? 'play' : 'pause')} ${paused ? 'Devam' : 'Duraklat'}</button>
          <button class="btn ghost" id="plNext">${icon('skip-forward')} ${i === p.steps.length - 1 ? 'Bitir' : 'Sonraki'}</button>
        </div>
        <p class="tiny pl-warn">${icon('triangle-alert')} Ağrı, baş dönmesi veya nefes darlığında duraklat ve dinlen.</p></div>`;
      refreshIcons();
      pl.querySelector('#plClose').onclick = () => stop(false);
      pl.querySelector('#plPrev').onclick = () => { if (i > 0) { i--; left = p.steps[i].s; draw(); } };
      pl.querySelector('#plNext').onclick = () => next();
      pl.querySelector('#plPause').onclick = () => { paused = !paused; draw(); };
    }
    function tickDraw() {
      const c = pl.querySelector('.pl-count'); if (c) c.textContent = fmtSec(left);
      const b = pl.querySelector('.bar span'); if (b) b.style.width = (done() / total * 100) + '%';
    }
    function next() { i++; if (i >= p.steps.length) return stop(true); left = p.steps[i].s; bell(660, .5, .08); draw(); }
    function stop(complete) {
      clearInterval(int); keepAwake(false);
      document.body.classList.remove('no-scroll');
      pl.hidden = true; pl.innerHTML = '';
      const mins = elapsed / 60;
      if (complete) {
        bell(528, 2.5);
        Progress.setRead('m7', p.id, true);
        Progress.logSession({ minutes: Math.max(1, Math.round(mins)), type: 'program', label: p.title, ref: p.id });
        toast(`Tebrikler! ${p.title} tamamlandı.`, 'ok');
        Progress.checkBadges(); updateChrome(); pageProgram(el, p.id); refreshIcons();
      } else if (mins >= 1 && confirm(`Program yarıda kaldı. Yapılan ${Math.round(mins)} dakikalık pratik kaydedilsin mi?`)) {
        Progress.logSession({ minutes: Math.round(mins), type: 'program', label: p.title + ' (kısmi)', ref: p.id });
        Progress.checkBadges(); updateChrome(); toast('Pratik kaydedildi.', 'ok');
      }
    }
    keepAwake(true); bell(528, 1.5, .1); draw();
    int = setInterval(() => { if (paused) return; left--; elapsed++; if (left <= 0) next(); else tickDraw(); }, 1000);
    onCleanup(() => { clearInterval(int); document.body.classList.remove('no-scroll'); keepAwake(false); });
    const esc = (e) => { if (e.key === 'Escape' && !pl.hidden) stop(false); };
    document.addEventListener('keydown', esc); onCleanup(() => document.removeEventListener('keydown', esc));
  }

  /* ---------- Rozetler */
  function pageBadges(el) {
    const st = Store.state;
    const n = Object.keys(st.badges).length;
    el.innerHTML = `<section class="page-head"><p class="eyebrow">Başarı Rozetleri</p><h1>Rozet koleksiyonun</h1>
      <p class="lead">${n}/${YA.badges.length} rozet kazandın. Rozetler; pratik düzenine, tamamlanan modüllere ve sınav başarına göre otomatik verilir.</p></section>
      <div class="badge-grid">${YA.badges.map(b => {
        const e = !!st.badges[b.id]; const [c, t] = Progress.badgeProgress(b.id);
        return `<div class="card badge-card ${e ? 'earned' : ''}">${badgeMedal(b, e)}<h3>${h(b.title)}</h3><p class="muted">${h(b.desc)}</p>
          ${e ? `<span class="chip ok">${icon('check')} ${fmtDate(st.badges[b.id])}</span>` : `${bar(c / t * 100)}<span class="tiny muted">${c}/${t}</span>`}</div>`;
      }).join('')}</div>`;
  }

  /* ---------- Kaynakça */
  function pageSources(el) {
    const used = {};
    YA.modules.forEach(m => m.sources.forEach(k => { (used[k] = used[k] || []).push('M' + m.no); }));
    el.innerHTML = `<section class="page-head"><p class="eyebrow">Kaynakça</p><h1>Güvenilir kaynaklar ve referanslar</h1>
      <p class="lead">Eğitim içerikleri aşağıdaki kurumların yayınlarından yararlanılarak, doğrudan kopyalanmadan özgün Türkçe anlatımla hazırlanmıştır. Bağlantılar ${YA.sourcesAccessed} tarihinde kontrol edilmiştir.</p></section>
      <div class="card"><h2>${icon('book-marked')} İçerik ilkeleri</h2><ul>
        <li>Sağlık ve güvenlik ifadeleri NCCIH, NHS, Harvard Health Publishing ve Cleveland Clinic gibi kurumların yayınlarına dayanır.</li>
        <li>Geleneksel yoga felsefesi “Geleneksel görüş” kutularında; bilimsel bulgular “Bilimsel çerçeve” kutularında ayrı gösterilir.</li>
        <li>Kaynağı doğrulanamayan sağlık iddialarına yer verilmemiştir. Kanıtın sınırlı olduğu konular açıkça belirtilmiştir.</li>
        <li>Kaynak sayfaların yayın/güncelleme tarihleri kurumlar tarafından değiştirilebilir; güncel sürüm için bağlantıları ziyaret et.</li></ul></div>
      <div class="card"><table class="table src-table"><thead><tr><th>Kurum</th><th>Kaynak</th><th>Kullanıldığı modüller</th></tr></thead><tbody>
        ${Object.entries(YA.sources).map(([k, s]) => `<tr><td>${h(s.org)}</td><td><a href="${s.url}" target="_blank" rel="noopener noreferrer">${h(s.title)} ${icon('external-link')}</a></td><td>${(used[k] || ['Genel']).join(', ')}</td></tr>`).join('')}
      </tbody></table></div>
      <div class="card"><h2>${icon('image')} Görsel kaynakları ve lisanslar</h2><ul>
        <li><strong>Sayfa illüstrasyonları, menü/modül/rozet ikon seti (<code>assets/icons/ya-icons.svg</code>), pozisyon çizimleri, anatomi şemaları ve nefes infografikleri:</strong> bu proje için özgün olarak hazırlanmış SVG çizimlerdir (kontur + tek vurgu rengi stili, svgs.app’teki “Minimal Outline Accent” yaklaşımından esinlenilmiştir; hiçbir çizim oradan kopyalanmamıştır); projeyle aynı lisans altında serbestçe kullanılabilir. Tüm görseller <code>assets/</code> klasöründe yereldir.</li>
        <li><strong>Fotoğraf eklemek istersen:</strong> Unsplash (unsplash.com/license) ve Pexels (pexels.com/license) lisansları ücretsiz ticari/kişisel kullanıma izin verir. Fotoğrafı <code>assets/images/</code> klasörüne indirip <code>assets/images/CREDITS.md</code> dosyasına fotoğrafçı adı ve bağlantısını ekle.</li>
        <li><strong>Küçük arayüz ikonları:</strong> Lucide Icons (ISC lisansı). <strong>Grafikler:</strong> Chart.js (MIT lisansı). <strong>Yazı tipleri:</strong> Fraunces ve Nunito Sans – Google Fonts (SIL Open Font License).</li></ul></div>
      <div class="card"><h2>${icon('video')} Video kaynakları</h2>
        <p>Poz ve nefes sayfalarındaki videolar YouTube’dan gömülüdür; içerik ve telif hakları ilgili kanallara aittir. Videolar yalnızca “oynat”a basıldığında, gizlilik odaklı <code>youtube-nocookie.com</code> alanından yüklenir. Bağlantılar ${YA.sourcesAccessed} tarihinde kontrol edilmiştir.</p>
        <ul>${[...new Set(Object.values(YA.videos).map(v => v.ch))].map(c => `<li>${h(c)} – ${Object.values(YA.videos).filter(v => v.ch === c).length} video</li>`).join('')}</ul></div>
      <div class="callout warn">${icon('shield-alert')} <div>Bu platform eğitim amaçlıdır ve tıbbi tavsiye yerine geçmez. Sağlık durumunla ilgili kararlar için bir sağlık profesyoneline danış.</div></div>`;
  }

  /* ---------- Ayarlar: Görünüm ve Tema + profil */
  function themePreview(t) {
    const v = Theme.build(t);
    return `<span class="tc-preview" style="background:${v['--color-background']}" aria-hidden="true">
        <span class="tp-bar" style="background:${v['--color-primary-strong']}"></span>
        <span class="tp-card" style="background:${v['--color-surface']};border:1px solid ${v['--color-border']}">
          <span class="tp-line" style="background:${v['--color-secondary']}"></span>
          <span class="tp-btn" style="background:${v['--color-cta']}"></span>
        </span>
      </span>
      <span class="tc-swatches" aria-hidden="true">${[t.bg, t.primary, t.secondary, t.accent, t.text].map(c => `<span style="background:${c}"></span>`).join('')}</span>`;
  }
  function pageSettings(el) {
    const st = Store.state;
    const cur = Theme.current();
    el.innerHTML = `
      <section class="page-head"><p class="eyebrow">Ayarlar</p><h1>Ayarlar</h1>
        <p class="lead">Görünümü kendine göre düzenle. Tema yalnızca renkleri değiştirir; ilerlemen, görevlerin ve tüm içerik aynen korunur.</p></section>
      <section class="settings-section" aria-labelledby="themeTitle">
        <h2 id="themeTitle">${yi('lotus')} Görünüm ve Tema</h2>
        <p class="muted">10 renk temasından birini seç. Değişiklik anında uygulanır ve sayfa yenilendiğinde korunur.</p>
        <div class="theme-grid" role="radiogroup" aria-labelledby="themeTitle">
          ${Theme.THEMES.map(t => `<button class="theme-card" role="radio" aria-checked="${t.id === cur}" data-theme-id="${t.id}" tabindex="${t.id === cur ? 0 : -1}">
            ${themePreview(t)}
            <span class="tc-info"><strong>${h(t.name)}${t.id === Theme.DEFAULT ? ' <small style="display:inline">· varsayılan</small>' : ''}</strong><small>${h(t.desc)}</small></span>
            <span class="tc-check">${icon('check')}</span>
          </button>`).join('')}
        </div>
        <p class="tiny muted theme-note">Renk dağılımı: açık yüzeyler ~%60 · marka rengi (menü, başlık bantları) ~%25 · ikincil yüzeyler ~%10 · vurgu (ana butonlar, ilerleme) ~%5. Metin ve buton renkleri her temada okunabilirlik için otomatik ayarlanır.</p>
      </section>
      <section class="settings-section">
        <h2>${yi('sprout')} Profil</h2>
        <div class="card">
          <form id="setProfile" class="grid-2" style="margin:0;align-items:end">
            <label class="field"><span>Adın (isteğe bağlı)</span><input name="name" maxlength="40" value="${h(st.profile.name)}" autocomplete="given-name"></label>
            <label class="field"><span>Günlük pratik hedefin</span><select name="goal">${[5, 10, 15, 20, 30].map(v => `<option value="${v}" ${v === st.profile.dailyGoal ? 'selected' : ''}>${v} dakika</option>`).join('')}</select></label>
            <div><button class="btn primary" type="submit">${icon('save')} Kaydet</button></div>
          </form>
        </div>
      </section>
      <section class="settings-section">
        <h2>${yi('chart')} Verilerin</h2>
        <div class="card"><p>İlerlemen ve tema seçimin yalnızca bu tarayıcıda saklanır; cihazlar arasında otomatik senkronize olmaz. Yedek almak ya da başka bir tarayıcıya taşımak için Gelişim Paneli’ndeki JSON dışa/içe aktarma araçlarını kullan.</p>
          <a class="btn" href="#/panel/oz">${icon('download')} Veri araçlarına git</a></div>
      </section>`;
    const cards = [...el.querySelectorAll('.theme-card')];
    const select = (card, focus) => {
      const t = Theme.set(card.dataset.themeId);
      cards.forEach(c => { const on = c === card; c.setAttribute('aria-checked', on); c.tabIndex = on ? 0 : -1; });
      if (focus) card.focus();
      toast(`${t.name} teması uygulandı.`, 'ok');
    };
    cards.forEach((c, i) => {
      c.addEventListener('click', () => select(c));
      c.addEventListener('keydown', (e) => {
        const d = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
        if (d) { e.preventDefault(); select(cards[(i + d + cards.length) % cards.length], true); }
      });
    });
    el.querySelector('#setProfile').addEventListener('submit', (e) => {
      e.preventDefault(); const f = new FormData(e.target);
      Store.update(s => { s.profile.name = String(f.get('name') || '').trim().slice(0, 40); s.profile.dailyGoal = Number(f.get('goal')); });
      toast('Profilin kaydedildi.', 'ok'); updateChrome();
    });
  }

  /* ================================================ Yönlendirme */
  const NAV = [
    ['#/', 'home', 'Ana Sayfa'], ['#/baslangic', 'sprout', "Yoga'ya Başlangıç"], ['#/moduller', 'book', 'Eğitim Modülleri'],
    ['#/pozlar', 'pose', 'Yoga Pozisyonları'], ['#/nefes', 'wind', 'Nefes Teknikleri'], ['#/meditasyon', 'lotus', 'Meditasyon'],
    ['#/program', 'calendar', '30 Günlük Program'], ['#/panel', 'chart', 'Gelişim Paneli'], ['#/quiz', 'quiz', 'Quiz ve Sınavlar'],
    ['#/rozetler', 'medal', 'Başarı Rozetleri'], ['#/kaynakca', 'books', 'Kaynakça'], ['#/ayarlar', 'settings', 'Ayarlar']
  ];
  const navKey = { '': '#/', baslangic: '#/baslangic', moduller: '#/moduller', modul: '#/moduller', pozlar: '#/pozlar', poz: '#/pozlar', nefes: '#/nefes', meditasyon: '#/meditasyon', program: '#/program', gun: '#/program', panel: '#/panel', rapor: '#/panel', quiz: '#/quiz', rozetler: '#/rozetler', kaynakca: '#/kaynakca', programlar: '#/moduller', ayarlar: '#/ayarlar' };
  const TITLES = { '': 'Ana Sayfa', baslangic: "Yoga'ya Başlangıç", moduller: 'Eğitim Modülleri', modul: 'Modül', pozlar: 'Yoga Pozisyonları', poz: 'Pozisyon', nefes: 'Nefes Teknikleri', meditasyon: 'Meditasyon', program: '30 Günlük Program', gun: 'Günlük Görev', panel: 'Gelişim Paneli', rapor: 'Gelişim Raporu', quiz: 'Quiz ve Sınavlar', rozetler: 'Başarı Rozetleri', kaynakca: 'Kaynakça', programlar: 'Yoga Programları', ayarlar: 'Ayarlar' };

  function renderCrumbs(p0, p1, p2) {
    const c = [['#/', 'Ana Sayfa']];
    const add = (href, t) => c.push([href, t]);
    if (p0 === 'modul') {
      const m = YA.modules.find(x => x.id === p1); add('#/moduller', 'Eğitim Modülleri');
      if (m) { add(`#/modul/${m.id}`, `Modül ${m.no}: ${m.title}`); const sx = p2 && m.sections && m.sections.find(x => x.id === p2); if (sx) add('', sx.title); }
    } else if (p0 === 'poz') { add('#/pozlar', 'Yoga Pozisyonları'); const p = poseById(p1); if (p) add('', p.tr); }
    else if (p0 === 'nefes' && p1) { add('#/nefes', 'Nefes Teknikleri'); const b = YA.breaths.find(x => x.id === p1); if (b) add('', b.title); }
    else if (p0 === 'programlar' && p1) { add('#/programlar', 'Yoga Programları'); const p = YA.programs.find(x => x.id === p1); if (p) add('', p.title); }
    else if (p0 === 'gun') { add('#/program', '30 Günlük Program'); add('', 'Gün ' + p1); }
    else if (p0 === 'quiz' && p1) { add('#/quiz', 'Quiz ve Sınavlar'); const q = YA.quizzes.find(x => x.id === p1); if (q) add('', q.title); }
    else if (p0 === 'rapor') { add('#/panel', 'Gelişim Paneli'); add('', 'Gelişim Raporu'); }
    else if (p0) add('', TITLES[p0] || 'Sayfa');
    c[c.length - 1][0] = '';
    document.getElementById('crumbbar').innerHTML = `<ol>${c.map(([href, t]) => `<li>${href ? `<a href="${href}">${h(t)}</a>` : `<span aria-current="page">${h(t)}</span>`}</li>`).join('')}</ol>`;
  }
  function setMenu(open) {
    document.body.classList.toggle('nav-open', open);
    document.getElementById('menuBtn').setAttribute('aria-expanded', open);
    document.getElementById('sidebar').setAttribute('aria-hidden', !open);
    if (open) setTimeout(() => { const a = document.querySelector('#nav a.active') || document.querySelector('#nav a'); a && a.focus(); }, 60);
  }

  function buildNav() {
    document.getElementById('nav').innerHTML = NAV.map(([href, ic, label]) => `<a href="${href}" data-nav="${href}">${yi(ic)}<span>${label}</span></a>`).join('');
  }
  function updateChrome() {
    const s = Progress.summary();
    const el = document.getElementById('chromeStats');
    if (el) el.innerHTML = `<span class="chip" title="Kesintisiz seri">${icon('flame')} ${s.streak}</span><span class="chip" title="Öğrenme ilerlemesi">${icon('graduation-cap')} %${s.learning}</span>`;
    const sb = document.getElementById('sideProgress');
    if (sb) sb.innerHTML = `<p class="tiny">30 günlük program</p>${bar(s.daysDone / 30 * 100)}<p class="tiny muted">${s.daysDone}/30 gün · ${s.totalMin} dk</p>`;
    refreshIcons();
  }

  function route() {
    cleanups.forEach(fn => { try { fn(); } catch (e) { console.warn(e); } }); cleanups = [];
    if (typeof Dashboard !== 'undefined') Dashboard.destroyCharts();
    const parts = (location.hash.replace(/^#\/?/, '') || '').split('/').filter(Boolean).map(decodeURIComponent);
    const [p0 = '', p1, p2] = parts;
    const el = main();
    switch (p0) {
      case '': pageHome(el); break;
      case 'baslangic': pageStart(el); break;
      case 'moduller': pageModules(el); break;
      case 'modul': pageModule(el, p1, p2); break;
      case 'pozlar': pagePoses(el); break;
      case 'poz': pagePose(el, p1); break;
      case 'nefes': pageBreath(el, p1); break;
      case 'meditasyon': pageMeditation(el); break;
      case 'programlar': p1 ? pageProgram(el, p1) : pagePrograms(el); break;
      case 'program': Daily.renderList(el); break;
      case 'gun': Daily.renderDay(el, Number(p1)); break;
      case 'panel': Dashboard.render(el, { scroll: p1 === 'oz' ? 'oz' : null }); break;
      case 'rapor': Dashboard.renderReport(el); break;
      case 'quiz': p1 ? Quiz.renderQuiz(el, p1) : Quiz.renderList(el); break;
      case 'rozetler': pageBadges(el); break;
      case 'kaynakca': pageSources(el); break;
      case 'ayarlar': pageSettings(el); break;
      default: notFound(el);
    }
    decorateHead(el, p0, p1);
    renderCrumbs(p0, p1, p2);
    const key = navKey[p0] || '#/';
    document.querySelectorAll('#nav a').forEach(a => { const on = a.dataset.nav === (p0 === 'programlar' ? '#/moduller' : key); a.classList.toggle('active', on); on ? a.setAttribute('aria-current', 'page') : a.removeAttribute('aria-current'); });
    document.title = `${TITLES[p0] || 'Sayfa'} · Yoga Akademisi`;
    if (document.body.classList.contains('nav-open')) setMenu(false);
    const hasSection = (p0 === 'nefes' && p1) || (p0 === 'panel' && p1);
    if (!hasSection) window.scrollTo(0, 0);
    el.classList.remove('enter'); void el.offsetWidth; el.classList.add('enter');
    refreshIcons();
  }

  /* ------------------------------------------------ Karşılama penceresi */
  function onboarding() {
    if (Store.state.profile.safetyAck) return;
    const root = document.getElementById('modal-root');
    root.innerHTML = `<div class="modal-back"><div class="modal card" role="dialog" aria-modal="true" aria-labelledby="obTitle">
      <img src="assets/icons/logo.svg" alt="" width="56" height="56">
      <h2 id="obTitle">Yoga Akademisi’ne hoş geldin</h2>
      <p>Sıfırdan başlayarak 30 günde güvenli bir yoga alışkanlığı kurman için buradayız.</p>
      <label class="field"><span>Sana nasıl hitap edelim? (isteğe bağlı)</span><input id="obName" maxlength="40" placeholder="Adın"></label>
      <div class="callout warn small">${icon('shield-alert')} <div><strong>Önemli:</strong> Yoga tıbbi tedavinin yerine geçmez. Hamilelik, yaralanma, kronik rahatsızlık veya denge problemin varsa başlamadan önce uzman görüşü al. Baş dönmesi, nefes darlığı veya ağrı olursa pratiği durdur.</div></div>
      <div class="callout info small">${icon('hard-drive')} <div>İlerlemen yalnızca bu tarayıcıda saklanır ve cihazlar arasında otomatik senkronize olmaz. Gelişim Paneli’nden JSON yedeği alabilirsin.</div></div>
      <label class="check-inline"><input type="checkbox" id="obAck"> Güvenlik uyarılarını okudum ve anladım.</label>
      <button class="btn primary block" id="obGo" disabled>${icon('arrow-right')} Başlayalım</button></div></div>`;
    refreshIcons();
    const ack = root.querySelector('#obAck'), go_ = root.querySelector('#obGo');
    ack.addEventListener('change', () => { go_.disabled = !ack.checked; });
    go_.addEventListener('click', () => {
      Store.update(s => { s.profile.safetyAck = true; s.profile.onboarded = true; s.profile.name = root.querySelector('#obName').value.trim().slice(0, 40) || s.profile.name; if (!s.profile.createdAt) s.profile.createdAt = today(); });
      root.innerHTML = ''; route(); updateChrome();
    });
    setTimeout(() => root.querySelector('#obName').focus(), 50);
  }

  /* ------------------------------------------------ Sayfa başlığı illüstrasyonları */
  const PROG_ICON = { p5: 'sprout', 'p10-sabah': 'home', 'p15-temel': 'pose', 'p20-tum': 'mountain', 'p10-aksam': 'lotus', 'p-masa': 'chart', 'p-denge': 'balance' };
  const HEAD_ILL = {
    baslangic: ['baslangic', 'Kontrol listesi ve mat ile yogaya hazırlanan kişi'], pozlar: ['pozlar', 'Savaşçı II duruşunda kişi'],
    nefes: ['nefes', 'Nefese odaklanan kişi ve nefes dalgaları'], meditasyon: ['meditasyon', 'Ay ışığında meditasyon yapan kişi'],
    program: ['program', 'Tamamlanan günleri gösteren takvim ve büyüyen bitki'], gun: ['program', 'Takvim ve büyüyen bitki'],
    panel: ['panel', 'Yükselen gelişim grafiği'], rapor: ['panel', 'Yükselen gelişim grafiği'], quiz: ['quiz', 'Soru ve onay işaretli konuşma balonları'],
    rozetler: ['rozetler', 'Kupa ve madalyalar'], ayarlar: ['baslangic', 'Hazırlanan kişi ve kontrol listesi'], kaynakca: ['kaynakca', 'Kitap yığını ve büyüteç'], programlar: ['programlar', 'Ağaç duruşunda kişi ve kronometre']
  };
  function decorateHead(el, p0, p1) {
    const ill = HEAD_ILL[p0];
    const head = el.querySelector('.page-head');
    if (!head) return;
    head.classList.add('band', 'band-center');
    const eb = head.querySelector('.eyebrow'); if (eb) eb.classList.add('band-label');
    const h1 = head.querySelector('h1'); if (h1) h1.classList.add('display');
    if (ill && !(p0 === 'quiz' && p1)) head.insertAdjacentHTML('beforeend', `<img class="band-ill" src="assets/illustrations/${ill[0]}.svg" alt="${h(ill[1])}" width="400" height="300">`);
  }
  async function loadSprite() {
    try {
      const r = await fetch('assets/icons/ya-icons.svg');
      if (!r.ok) throw new Error(r.status);
      const box = document.createElement('div');
      box.hidden = true; box.innerHTML = await r.text();
      document.body.prepend(box);
    } catch (e) { console.warn('İkon seti yüklenemedi (yerel sunucu üzerinden açın).', e); }
  }

  function init() {
    loadSprite();
    try { if (!localStorage.getItem('yogaAkademisi.theme') && Store.state.profile.theme) Theme.set(Store.state.profile.theme); } catch (e) { /* yok say */ }
    document.addEventListener('themechange', () => { const p0 = (location.hash.replace(/^#\/?/, '').split('/')[0]) || ''; if (p0 === 'panel' || p0 === 'rapor') route(); });
    buildNav();
    document.getElementById('menuBtn').addEventListener('click', () => setMenu(!document.body.classList.contains('nav-open')));
    document.getElementById('menuClose').addEventListener('click', () => { setMenu(false); document.getElementById('menuBtn').focus(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && document.body.classList.contains('nav-open')) { setMenu(false); document.getElementById('menuBtn').focus(); } });
    window.addEventListener('hashchange', route);
    if (!Store.available) setTimeout(() => toast('Tarayıcın yerel depolamaya izin vermiyor; ilerlemen kaydedilmeyecek.', 'warn'), 600);
    Progress.checkBadges(true);
    route(); updateChrome(); onboarding();
  }

  return { init, videoBlock, bindVideos, h, icon, bar, today, fmtDate, toast, badgeToast, badgeMedal, figure, poseById, sourceList, notFound, refreshIcons, updateChrome, go };
})();

document.addEventListener('DOMContentLoaded', App.init);
