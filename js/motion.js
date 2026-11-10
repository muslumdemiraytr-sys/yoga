/* ==========================================================================
   Areluma Yoga – Hareket sistemi
   --------------------------------------------------------------------------
   Kütüphane yok: tarayıcının Web Animations API'si (element.animate) yeterli.
   İlke: her hareketin bir amacı var (yön gösterme, ilerlemeyi anlatma, geri
   bildirim). Sürekli dekoratif döngü yok; prefers-reduced-motion'da hareketler
   kapanır ya da anlık geçişe döner. Yalnızca transform/opacity canlandırılır.
   ========================================================================== */
const Motion = (() => {
  const mq = (() => { try { return matchMedia('(prefers-reduced-motion: reduce)'); } catch (e) { return { matches: false, addEventListener() {} }; } })();
  const reduced = () => mq.matches;
  /* Otomatik ekran görüntüsü/test araçlarında içerik hemen görünür kalsın */
  const automated = () => { try { return navigator.webdriver === true; } catch (e) { return false; } };
  const EASE = { out: 'cubic-bezier(.22, 1, .36, 1)', inOut: 'cubic-bezier(.65, 0, .35, 1)', breath: 'cubic-bezier(.45, .05, .55, .95)', spring: 'cubic-bezier(.34, 1.4, .64, 1)' };
  const canAnimate = (el) => el && typeof el.animate === 'function';

  /* ------------------------------------------------ Sayfa açılışı: kademeli belirme */
  const REVEAL = [
    '.course-grid > *', '.home-grid > *', '.feature-grid > *', '.card-grid > *', '.pose-grid > *', '.questions > *',
    '.badge-grid > *', '.metric-grid > *', '.day-grid', '.breath-list > *', '.module-list > *', '.seq > li',
    '.pi-steps > *', '.vz-flow > *', '.flow > li', '.pose-hero', '.pacer-card', '.med-card', '.stepper-card'
  ].join(',');
  let io = null;
  function reveal(root) {
    if (reduced() || automated() || !('IntersectionObserver' in window) || !root) return;
    const items = Array.from(root.querySelectorAll(REVEAL)).filter(el => !el.closest('.player'));
    if (!items.length) return;
    if (io) io.disconnect();
    const groups = new Map();
    io = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        const el = en.target; io.unobserve(el);
        const g = el.parentElement; const n = groups.get(g) || 0; groups.set(g, n + 1);
        const a = el.animate([{ opacity: 0, transform: 'translateY(14px)' }, { opacity: 1, transform: 'none' }],
          { duration: 560, delay: Math.min(n, 6) * 55, easing: EASE.out, fill: 'backwards' });
        a.onfinish = () => { el.style.opacity = ''; };
        el.style.opacity = '';
      });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.05 });
    items.forEach(el => { el.style.opacity = '0'; io.observe(el); });
    // güvenlik ağı: gözlemci tetiklenmezse içerik görünmez kalmasın
    setTimeout(() => items.forEach(el => { if (el.style.opacity === '0' && el.getBoundingClientRect().top < innerHeight) el.style.opacity = ''; }), 1600);
  }

  /* ------------------------------------------------ İlerleme halkaları: 0'dan değere doğal dolum */
  function rings(root) {
    if (!root) return;
    root.querySelectorAll('.ring, .score-ring, .jn-ring[style*="--p"]').forEach(el => {
      if (el.id === 'mRing' || el.dataset.live != null) return;
      const target = parseFloat(getComputedStyle(el).getPropertyValue('--p')) || 0;
      const label = el.querySelector('span');
      const m = label && /^(%?)(\d+)(%?)$/.exec(label.textContent.trim());
      if (reduced() || automated() || !target) return;
      const run = () => {
        const dur = 900 + target * 6;
        if (canAnimate(el)) el.animate([{ '--p': 0 }, { '--p': target }], { duration: dur, easing: EASE.out });
        if (m) {
          const t0 = performance.now(), end = Number(m[2]);
          const tick = (now) => {
            const k = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - k, 3);
            label.textContent = `${m[1]}${Math.round(end * e)}${m[3]}`;
            if (k < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      };
      if (!('IntersectionObserver' in window)) return run();
      const o = new IntersectionObserver((es) => { if (es[0].isIntersecting) { o.disconnect(); run(); } }, { threshold: 0.4 });
      o.observe(el);
    });
    // SVG halkalar (rapor/panel): çizgi uzunluğunu sıfırdan aç
    if (reduced() || automated()) return;
    root.querySelectorAll('circle.vd-fg[stroke-dasharray]').forEach(c => {
      const [v, total] = c.getAttribute('stroke-dasharray').split(' ').map(Number);
      if (!canAnimate(c) || !total) return;
      c.animate([{ strokeDasharray: `0 ${total}` }, { strokeDasharray: `${v} ${total}` }], { duration: 1100, easing: EASE.out });
    });
  }

  /** Her sayfa çiziminden sonra çağrılır */
  function enhance(root) { reveal(root); rings(root); }

  /* ------------------------------------------------ Başarı anı: görev tamamlandı */
  function celebrate({ title, text, fig } = {}) {
    const host = document.createElement('div');
    host.className = 'celebrate';
    host.setAttribute('role', 'status');
    host.setAttribute('aria-live', 'polite');
    const figure = (typeof Figure !== 'undefined' && fig) ? Figure.svg(fig, { label: '' }) : '';
    host.innerHTML = `<div class="cel-card" tabindex="-1">
      <div class="cel-stage">
        <svg class="cel-ring" viewBox="0 0 120 120" aria-hidden="true"><circle class="cel-track" cx="60" cy="60" r="52"/><circle class="cel-arc" cx="60" cy="60" r="52" pathLength="1"/></svg>
        <div class="cel-fig">${figure}</div>
        <span class="cel-check" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5 12.5l4.2 4.2L19 7" pathLength="1"/></svg></span>
        <div class="cel-burst" aria-hidden="true">${Array.from({ length: 10 }, (_, i) => `<i style="--a:${i * 36}deg;--d:${i % 2 ? 58 : 70}px"></i>`).join('')}</div>
      </div>
      <h2>${title || 'Tamamlandı'}</h2>${text ? `<p>${text}</p>` : ''}
      <button class="btn primary" type="button">Devam et</button></div>`;
    document.body.appendChild(host);
    const close = () => {
      if (!host.isConnected) return;
      document.removeEventListener('keydown', onKey);
      if (reduced() || !canAnimate(host)) return host.remove();
      host.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 220, easing: 'ease-in' }).onfinish = () => host.remove();
    };
    const onKey = (e) => { if (e.key === 'Escape') close(); };
    document.addEventListener('keydown', onKey);
    host.addEventListener('click', (e) => { if (e.target === host || e.target.closest('button')) close(); });
    const btn = host.querySelector('button'); setTimeout(() => btn.focus({ preventScroll: true }), 60);
    if (reduced() || !canAnimate(host)) { host.classList.add('static'); return { close }; }

    const card = host.querySelector('.cel-card');
    host.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 240, easing: 'ease-out' });
    card.animate([{ opacity: 0, transform: 'translateY(18px) scale(.96)' }, { opacity: 1, transform: 'none' }], { duration: 520, easing: EASE.out });
    host.querySelector('.cel-arc').animate([{ strokeDashoffset: 1 }, { strokeDashoffset: 0 }], { duration: 900, delay: 160, easing: EASE.inOut, fill: 'both' });
    host.querySelector('.cel-check').animate([{ opacity: 0, transform: 'scale(.4)' }, { opacity: 1, transform: 'scale(1)' }], { duration: 460, delay: 880, easing: EASE.spring, fill: 'both' });
    host.querySelector('.cel-check path').animate([{ strokeDashoffset: 1 }, { strokeDashoffset: 0 }], { duration: 360, delay: 980, easing: EASE.out, fill: 'both' });
    host.querySelectorAll('.cel-burst i').forEach((d, i) => d.animate([
      { opacity: 0, transform: 'rotate(var(--a)) translateY(0) scale(.4)' },
      { opacity: 1, transform: 'rotate(var(--a)) translateY(calc(var(--d) * -.75)) scale(1)', offset: 0.45 },
      { opacity: 0, transform: 'rotate(var(--a)) translateY(calc(var(--d) * -1)) scale(.6)' }
    ], { duration: 900, delay: 900 + (i % 3) * 30, easing: EASE.out, fill: 'both' }));
    const fg = host.querySelector('.cel-fig svg');
    if (fg && typeof Figure !== 'undefined') Figure.morph(fg, 'nefes', fig, { duration: 1000 });
    return { close };
  }

  /* ------------------------------------------------ Nefes rehberi: evre ilerleme yayı */
  function phaseArc(el, seconds) {
    if (!el || !canAnimate(el)) return;
    if (el._a) el._a.cancel();
    el._a = el.animate([{ strokeDashoffset: 1 }, { strokeDashoffset: 0 }], { duration: seconds * 1000, easing: 'linear', fill: 'forwards' });
  }
  function resetArc(el) { if (el && el._a) { el._a.cancel(); el._a = null; } }

  return { reduced, automated, enhance, reveal, rings, celebrate, phaseArc, resetArc, EASE };
})();
