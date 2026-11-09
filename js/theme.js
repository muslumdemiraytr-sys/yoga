/* ==========================================================================
   Yoga Akademisi – Tema motoru (10 renk teması)
   Her tema 5 temel renk tanımlar; diğer tüm tasarım değişkenleri buradan,
   WCAG kontrast hedefleri (≥ 4.5:1 metin) gözetilerek hesaplanır.
   Bu dosya <head> içinde senkron yüklenir: seçili tema ilk boyamadan önce uygulanır.
   ========================================================================== */
(function () {
  const KEY = 'yogaAkademisi.theme';
  const DEFAULT = 'sage-serenity';

  const THEMES = [
    { id: 'sage-serenity', name: 'Sage Serenity', desc: 'Adaçayı yeşili, sakin ve dengeli', bg: '#F5F3EB', primary: '#879B83', secondary: '#DCE5D5', accent: '#C4A98A', text: '#455A48' },
    { id: 'warm-zen', name: 'Warm Zen', desc: 'Kum ve kil tonlarında sıcak sadelik', bg: '#F8F5EF', primary: '#C8B69C', secondary: '#E8DCC8', accent: '#847665', text: '#514331' },
    { id: 'lavender-mind', name: 'Lavender Mind', desc: 'Lavanta tonlarıyla zihinsel dinginlik', bg: '#F8F6FA', primary: '#A99ACB', secondary: '#E8E0F1', accent: '#66567F', text: '#514568' },
    { id: 'earth-soul', name: 'Earth & Soul', desc: 'Pişmiş toprak ve kahve, topraklayıcı', bg: '#F5EEE5', primary: '#B8755B', secondary: '#E5C9B5', accent: '#654B3D', text: '#654B3D' },
    { id: 'ocean-balance', name: 'Ocean Balance', desc: 'Deniz yeşili, ferah ve berrak', bg: '#F1F7F4', primary: '#527F7A', secondary: '#BBD5CF', accent: '#315C5A', text: '#315C5A' },
    { id: 'botanical-green', name: 'Botanical Green', desc: 'Yaprak yeşili ve doğal keten', bg: '#F4F2E9', primary: '#697C50', secondary: '#D5DDC3', accent: '#B7A77D', text: '#3C4B35' },
    { id: 'blush-harmony', name: 'Blush Harmony', desc: 'Pudra pembesi, yumuşak ve şefkatli', bg: '#FBF6F3', primary: '#D6AFA8', secondary: '#F0DDD7', accent: '#866A69', text: '#49312F' },
    { id: 'deep-nature', name: 'Deep Nature', desc: 'Derin orman yeşili ve altın vurgu', bg: '#F2F0E8', primary: '#263F35', secondary: '#D6DFD2', accent: '#B69B73', text: '#263F35' },
    { id: 'sunset-energy', name: 'Sunset Energy', desc: 'Gün batımı turuncusu, enerjik', bg: '#FFF4E9', primary: '#D98C69', secondary: '#F0C9A8', accent: '#8C5946', text: '#65412F' },
    { id: 'modern-minimal', name: 'Modern Minimal', desc: 'Siyah, kum ve kırık beyaz', bg: '#F8F7F4', primary: '#252525', secondary: '#E5E1D9', accent: '#B5A995', text: '#252525' }
  ];

  /* ---------------- Renk yardımcıları */
  const hex2rgb = (h) => { h = h.replace('#', ''); if (h.length === 3) h = h.split('').map(c => c + c).join(''); return [0, 2, 4].map(i => parseInt(h.substr(i, 2), 16)); };
  const rgb2hex = (r) => '#' + r.map(v => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, '0')).join('');
  /** a ile b'yi karıştırır; t = b'nin oranı (0..1) */
  const mix = (a, b, t) => { const x = hex2rgb(a), y = hex2rgb(b); return rgb2hex(x.map((v, i) => v + (y[i] - v) * t)); };
  const lum = (h) => { const c = hex2rgb(h).map(v => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }); return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]; };
  const contrast = (a, b) => { const l1 = lum(a), l2 = lum(b); return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05); };
  const rgba = (h, a) => { const [r, g, b] = hex2rgb(h); return `rgba(${r}, ${g}, ${b}, ${a})`; };
  const WHITE = '#ffffff', BLACK = '#000000';

  /** `base` rengini `toward` yönünde, `against` üzerinde `ratio` kontrastına ulaşana kadar koyulaştırır/açar. */
  function ensure(base, against, ratio, toward) {
    if (contrast(base, against) >= ratio) return base;
    for (let t = 0.05; t <= 1.0001; t += 0.05) { const c = mix(base, toward, t); if (contrast(c, against) >= ratio) return c; }
    return toward;
  }
  /** Bir zemin rengi üzerinde okunabilir buton metni: beyaz ya da temanın koyu metni. */
  function onColor(bg, text) {
    const w = contrast(bg, WHITE), d = contrast(bg, text);
    if (w >= 4.5 && w >= d) return WHITE;
    if (d >= 4.5) return text;
    return w >= d ? WHITE : ensure(text, bg, 4.5, BLACK);
  }
  /** Ton (hue) döndürme – grafiklerde temayla uyumlu ek seri renkleri için */
  function rotate(h, deg, sat) {
    let [r, g, b] = hex2rgb(h).map(v => v / 255);
    const max = Math.max(r, g, b), min = Math.min(r, g, b); let hh = 0, s = 0; const l = (max + min) / 2;
    if (max !== min) { const d = max - min; s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      hh = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4; hh /= 6; }
    hh = (hh + deg / 360) % 1; s = Math.max(sat || 0.35, s); const L = Math.min(0.52, Math.max(0.38, l));
    const q = L < 0.5 ? L * (1 + s) : L + s - L * s, p = 2 * L - q;
    const f = (t) => { t = (t + 1) % 1; return t < 1 / 6 ? p + (q - p) * 6 * t : t < 1 / 2 ? q : t < 2 / 3 ? p + (q - p) * (2 / 3 - t) * 6 : p; };
    return rgb2hex([f(hh + 1 / 3), f(hh), f(hh - 1 / 3)].map(v => v * 255));
  }

  /* ---------------- Temadan tüm tasarım değişkenlerini üret */
  function build(t) {
    const surface = mix(WHITE, t.bg, 0.22);                                     // kartlar (%60 açık yüzey)
    const text = ensure(t.text, t.bg, 7, BLACK);                                // gövde metni (AAA hedefi)
    const heading = ensure(mix(t.text, BLACK, 0.18), t.bg, 7, BLACK);
    const strong = ensure(t.primary, WHITE, 4.6, t.text === t.primary ? BLACK : mix(t.text, BLACK, 0.3)); // beyaz metinli marka alanları
    const deep = ensure(mix(strong, BLACK, 0.22), WHITE, 7, BLACK);
    const ctaBase = t.accent;
    const ctaText = onColor(ctaBase, text);
    const cta = contrast(ctaBase, ctaText) >= 4.5 ? ctaBase : ensure(ctaBase, WHITE, 4.5, BLACK);
    const ctaFg = contrast(cta, ctaText) >= 4.5 ? ctaText : WHITE;
    const ctaHover = contrast(cta, BLACK) > contrast(cta, WHITE) ? mix(cta, BLACK, 0.12) : mix(cta, WHITE, 0.14);
    const muted = ensure(mix(t.text, t.bg, 0.38), t.bg, 4.6, text);
    const accentInk = ensure(t.accent, surface, 4.5, text);                     // metin olarak kullanılan vurgu
    const primaryInk = ensure(t.primary, surface, 4.5, text);                   // metin/ikon olarak kullanılan marka
    const success = ensure('#4f7f52', surface, 4.6, BLACK), warning = ensure('#9a5b2c', surface, 4.6, BLACK), danger = ensure('#a34b44', surface, 4.6, BLACK);
    // Grafik serileri: temayla uyumlu, birbirinden ayırt edilebilir renkler (RGB uzaklığı ≥ 90)
    const dist = (a, b) => { const x = hex2rgb(a), y = hex2rgb(b); return Math.hypot(x[0] - y[0], x[1] - y[1], x[2] - y[2]); };
    const pool = [ensure(t.accent, surface, 3, text), rotate(t.primary, 150, 0.4), rotate(t.primary, 60, 0.45), rotate(t.primary, -75, 0.4),
      rotate(t.primary, -150, 0.42), rotate(t.primary, 105, 0.4), rotate(t.primary, 30, 0.5), rotate(t.primary, -30, 0.5)];
    for (let a = 15; a < 360; a += 30) pool.push(rotate(t.primary, a, 0.45));
    const chart = [strong];
    for (const thr of [90, 75, 60, 45]) {
      for (const c of pool) { if (chart.length === 5) break; if (chart.every(x => dist(x, c) >= thr)) chart.push(c); }
    }
    return {
      '--color-background': t.bg, '--color-primary': t.primary, '--color-secondary': t.secondary, '--color-accent': t.accent, '--color-text': text,
      '--color-heading': heading, '--color-surface': surface, '--color-surface-2': mix(t.bg, t.secondary, 0.45),
      '--color-border': mix(t.bg, t.text, 0.14), '--color-muted': muted,
      '--color-primary-strong': strong, '--color-primary-deep': deep, '--color-primary-ink': primaryInk,
      '--color-secondary-soft': mix(t.secondary, surface, 0.5), '--color-accent-ink': accentInk, '--color-accent-deep': ensure(mix(t.accent, t.text, 0.4), surface, 5.5, BLACK),
      '--color-cta': cta, '--color-cta-hover': ctaHover, '--color-cta-text': ctaFg,
      '--color-button-text': onColor(strong, text), '--color-focus': ensure(t.primary, t.bg, 3, text),
      '--color-success': success, '--color-success-bg': mix(surface, success, 0.12),
      '--color-warning': warning, '--color-warning-bg': mix(surface, warning, 0.12),
      '--color-danger': danger, '--color-danger-bg': mix(surface, danger, 0.11),
      '--color-info-bg': mix(surface, t.primary, 0.14),
      '--color-shadow': rgba(t.text, 0.07), '--color-shadow-strong': rgba(t.text, 0.13),
      '--color-ring': rgba(t.primary, 0.28), '--color-overlay': rgba(mix(t.text, BLACK, 0.4), 0.55),
      '--color-limb-back': mix(t.secondary, t.primary, 0.35),
      '--chart-1': chart[0], '--chart-2': chart[1], '--chart-3': chart[2], '--chart-4': chart[3], '--chart-5': chart[4],
      '--chart-soft': mix(t.secondary, surface, 0.25), '--chart-grid': rgba(t.text, 0.12)
    };
  }

  function current() { try { return localStorage.getItem(KEY) || DEFAULT; } catch (e) { return DEFAULT; } }
  function apply(id) {
    const t = THEMES.find(x => x.id === id) || THEMES[0];
    const vars = build(t);
    const root = document.documentElement;
    Object.entries(vars).forEach(([k, v]) => root.style.setProperty(k, v));
    root.dataset.theme = t.id;
    root.style.colorScheme = 'light';
    const meta = document.querySelector('meta[name="theme-color"]'); if (meta) meta.setAttribute('content', vars['--color-primary-strong']);
    return t;
  }
  function set(id) {
    const t = apply(id);
    try { localStorage.setItem(KEY, t.id); } catch (e) { /* depolama kapalı */ }
    if (typeof Store !== 'undefined' && Store.state) Store.update(s => { s.profile.theme = t.id; });
    document.dispatchEvent(new CustomEvent('themechange', { detail: t }));
    return t;
  }
  function vars() { const cs = getComputedStyle(document.documentElement); const o = {}; Object.keys(build(THEMES[0])).forEach(k => { o[k] = cs.getPropertyValue(k).trim(); }); return o; }

  window.Theme = { THEMES, DEFAULT, current, apply, set, build, vars, contrast };
  apply(current());
})();
