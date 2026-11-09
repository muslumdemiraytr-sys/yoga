/* ==========================================================================
   Visual QA Agent – sayfa içi denetim motoru (çerçeveden bağımsız)
   Tarayıcıda (konsol, Playwright page.evaluate, tarayıcı paneli) çalışır ve
   o anki sayfayı ölçer. Hiçbir şeyi değiştirmez; yalnızca bulgu döndürür.

   Kullanım:  VisualQA.audit({ route: '#/pozlar', width: 375 })  → { stats, issues[] }
   Bulgu:     { type, severity, component, selector, detail, value }
   ========================================================================== */
(function () {
  const CARD_SEL = ['.card', '.course-card', '.feature', '.pose-card', '.day-tile', '.metric', '.vz-kpi', '.badge-card',
    '.theme-card', '.step-card', '.module-card', '.quiz-card', '.program-card', '.tech-card', '.an-card', '.an-catcard',
    '.vz-node', '.vz-branch', '.vz-icons > li', '.jn', '.mini-card'].join(',');
  // Görsel bileşen → beklenen oran / sığdırma kuralı (rapor ve öneri için)
  const IMAGE_RULES = [
    { sel: '.cc-banner img', ratio: '16 / 9', fit: 'contain', note: 'Kurs kartı illüstrasyonu – tamamı görünmeli' },
    { sel: '.band-ill', ratio: '4 / 3', fit: 'contain', note: 'Sayfa başlığı illüstrasyonu (400×300)' },
    { sel: '.video-thumb img', ratio: '16 / 9', fit: 'cover', note: 'YouTube küçük resmi (4:3, üst-alt siyah bantlı)', allowCrop: true },
    { sel: '.lesson-ill img, .visual-box img, .infographic img', ratio: 'doğal', fit: 'contain', note: 'Ders şeması – kırpılmamalı' },
    { sel: '.brand img, .menu-head img', ratio: '1 / 1', fit: 'contain', note: 'Logo' },
    { sel: '.empty-state img', ratio: '4 / 3', fit: 'contain', note: '404 illüstrasyonu' }
  ];
  const vis = (el) => { const r = el.getBoundingClientRect(); const cs = getComputedStyle(el); return r.width > 0 && r.height > 0 && cs.visibility !== 'hidden' && cs.display !== 'none' && !el.closest('[hidden]'); };
  function sel(el) {
    if (el.id) return '#' + el.id;
    const parts = []; let e = el;
    for (let i = 0; e && e.nodeType === 1 && i < 4 && e !== document.body; i++) {
      let s = e.tagName.toLowerCase(); const c = [...e.classList].filter(x => !/^(on|sel|done|active|is-read|flash|enter|r-[a-z]|lv\d|k-[a-z0-9]+)$/.test(x)).slice(0, 2);
      if (c.length) s += '.' + c.join('.');
      parts.unshift(s); if (e.id) { parts[0] = '#' + e.id; break; } e = e.parentElement;
    }
    return parts.join(' > ');
  }
  const component = (el) => { const c = el.closest(CARD_SEL); if (!c) return el.classList[0] || el.tagName.toLowerCase(); return [...c.classList].find(x => x !== 'card') || 'card'; };
  const scrollParent = (el) => { for (let e = el.parentElement; e && e !== document.body; e = e.parentElement) { const o = getComputedStyle(e).overflowX; if (o === 'auto' || o === 'scroll') return e; } return null; };

  function audit(opts = {}) {
    const issues = []; const add = (type, severity, el, detail, value) => issues.push({ type, severity, component: el ? component(el) : 'sayfa', selector: el ? sel(el) : 'html', detail, value: value ?? null, route: opts.route, width: opts.width });
    const vw = document.documentElement.clientWidth; const main = document.getElementById('main') || document.body;
    const all = [...main.querySelectorAll('*')].filter(vis);

    // 1) Yatay kaydırma ve görüntü alanı dışına taşan öğeler
    if (document.documentElement.scrollWidth > vw + 1) add('yatay-kaydirma', 'yüksek', null, `Sayfa ${document.documentElement.scrollWidth - vw}px yatay kaydırma üretiyor`, document.documentElement.scrollWidth - vw);
    all.forEach(el => { const r = el.getBoundingClientRect(); if ((r.right > vw + 1 || r.left < -1) && !scrollParent(el) && !el.closest('.band')) add('viewport-tasmasi', 'yüksek', el, `Öğe ekran dışına taşıyor (${Math.round(r.left)}–${Math.round(r.right)} / ${vw}px)`, Math.round(Math.max(r.right - vw, -r.left))); });

    // 2) Görseller: oran bozulması, olası kırpma, boyut öznitelikleri, çözünürlük
    const imgs = [...main.querySelectorAll('img')].filter(vis);
    imgs.forEach(img => {
      const r = img.getBoundingClientRect(); const cs = getComputedStyle(img);
      if (img.naturalWidth && img.naturalHeight) {
        const nat = img.naturalWidth / img.naturalHeight, ren = r.width / r.height, diff = Math.abs(ren - nat) / nat;
        if (cs.objectFit === 'fill' && diff > 0.02) add('oran-bozulmasi', 'yüksek', img, `Görsel orantısız esniyor (doğal ${nat.toFixed(2)}, ekranda ${ren.toFixed(2)})`, +(diff * 100).toFixed(1));
        const accepted = IMAGE_RULES.some(rule => rule.allowCrop && img.matches(rule.sel)); // kabul edilmiş kırpma (ör. YouTube siyah bantları)
        if (cs.objectFit === 'cover' && diff > 0.25 && !accepted) add('olasi-kirpma', 'orta', img, `object-fit: cover görselin %${Math.round(diff * 100)} kadarını kırpıyor olabilir`, Math.round(diff * 100));
        if (img.src.endsWith('.svg') === false && (img.naturalWidth < r.width * (window.devicePixelRatio || 1) * 0.75)) add('dusuk-cozunurluk', 'düşük', img, `Görsel çözünürlüğü (${img.naturalWidth}px) gösterim boyutuna göre düşük`, img.naturalWidth);
      }
      if (!img.getAttribute('width') || !img.getAttribute('height')) add('boyut-ozniteligi-yok', 'düşük', img, 'width/height öznitelikleri yok; yüklenirken düzen kayabilir (CLS)');
      const card = img.closest(CARD_SEL); if (card) { const c = card.getBoundingClientRect(); if (r.right > c.right + 1 || r.left < c.left - 1 || r.bottom > c.bottom + 1) add('gorsel-kart-disina-tasiyor', 'yüksek', img, 'Görsel kart sınırlarının dışına taşıyor'); }
    });
    // inline SVG çizimleri: oran koruma
    [...main.querySelectorAll('svg[viewBox]')].filter(vis).forEach(svg => { if (svg.getAttribute('preserveAspectRatio') === 'none') add('svg-oran', 'orta', svg, 'SVG oranı korunmuyor (preserveAspectRatio="none")'); });

    // 3) Kartlar: kart dışına taşan içerik, aynı satırda yükseklik farkı, tutarlılık
    const cards = [...main.querySelectorAll(CARD_SEL)].filter(vis);
    cards.forEach(card => {
      const c = card.getBoundingClientRect(); const cs = getComputedStyle(card);
      if (cs.overflow === 'visible') [...card.querySelectorAll('*')].filter(vis).forEach(ch => { if (scrollParent(ch) && card.contains(scrollParent(ch))) return; const r = ch.getBoundingClientRect(); if (r.right > c.right + 2 || r.left < c.left - 2) add('kart-icerik-tasmasi', 'orta', ch, `İçerik kartın yanından ${Math.round(Math.max(r.right - c.right, c.left - r.left))}px taşıyor`); });
    });
    // aynı ebeveyn + aynı satır → yükseklik tutarlılığı
    const groups = new Map(); cards.forEach(cd => { const p = cd.parentElement; if (!groups.has(p)) groups.set(p, []); groups.get(p).push(cd); });
    groups.forEach((list, parent) => {
      if (list.length < 2) return; const pd = getComputedStyle(parent).display; if (!/grid|flex/.test(pd)) return;
      const rows = {}; list.forEach(cd => { const t = Math.round(cd.getBoundingClientRect().top / 4); (rows[t] = rows[t] || []).push(cd); });
      Object.values(rows).forEach(row => { if (row.length < 2) return; const hs = row.map(x => x.getBoundingClientRect().height); const d = Math.max(...hs) - Math.min(...hs); if (d > 4) add('kart-yukseklik-tutarsiz', 'orta', row[0], `Aynı satırdaki ${row.length} kartın yüksekliği ${Math.round(d)}px farklı`, Math.round(d)); });
      const radii = new Set(list.map(x => getComputedStyle(x).borderTopLeftRadius)); if (radii.size > 1) add('kart-radius-tutarsiz', 'düşük', list[0], `Aynı gruptaki kartlarda farklı köşe yuvarlaklığı: ${[...radii].join(', ')}`);
      // örtüşme
      for (let i = 0; i < list.length; i++) for (let j = i + 1; j < list.length; j++) { const a = list[i].getBoundingClientRect(), b = list[j].getBoundingClientRect(); const ox = Math.min(a.right, b.right) - Math.max(a.left, b.left), oy = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top); if (ox > 2 && oy > 2) add('kart-ortusmesi', 'yüksek', list[j], `Kartlar ${Math.round(ox)}×${Math.round(oy)}px üst üste biniyor`); }
    });

    // 4) Metin taşmaları
    // .sr / .sr-only: yalnızca ekran okuyucular için bilerek 1px'e sıkıştırılmış metin → taşma sayılmaz
    all.filter(el => el.children.length === 0 && el.textContent.trim().length > 2 && !/^(svg|path|text|tspan|i|input|select|option|textarea)$/i.test(el.tagName) && !el.matches('.sr, .sr-only, .visually-hidden'))
      .forEach(el => { if (el.scrollWidth > el.clientWidth + 1 && getComputedStyle(el).overflowX !== 'auto' && !scrollParent(el)) { const cs = getComputedStyle(el), ov = cs.overflow, ell = cs.textOverflow === 'ellipsis'; add('metin-tasmasi', ov === 'hidden' ? 'düşük' : 'orta', el, `Metin ${el.scrollWidth - el.clientWidth}px sığmıyor${ell ? ' (üç noktayla kısaltılıyor)' : ov === 'hidden' ? ' (kesiliyor)' : ''}`, el.scrollWidth - el.clientWidth); } });

    // 5) Mobil dokunma hedefleri (≤ 480px)
    if (vw <= 480) [...main.querySelectorAll('button, a.btn, .opt, select, input[type=range]')].filter(vis).forEach(b => { const r = b.getBoundingClientRect(); if (r.height < 36 || r.width < 36) add('kucuk-dokunma-hedefi', 'düşük', b, `Dokunma hedefi ${Math.round(r.width)}×${Math.round(r.height)}px (önerilen ≥ 44px)`); });

    // Görsel kural tablosu ile karşılaştır (öneri üretmek için)
    const imageRules = IMAGE_RULES.map(rule => { const els = [...main.querySelectorAll(rule.sel)].filter(vis); if (!els.length) return null; const cs = getComputedStyle(els[0]); return { ...rule, count: els.length, actualRatio: cs.aspectRatio, actualFit: cs.objectFit, ok: cs.objectFit === rule.fit || (rule.fit === 'contain' && cs.objectFit === 'fill' && els.every(e => { const r = e.getBoundingClientRect(); return !e.naturalWidth || Math.abs(r.width / r.height - e.naturalWidth / e.naturalHeight) < 0.02; })) }; }).filter(Boolean);
    return { stats: { route: opts.route, width: vw, cards: cards.length, images: imgs.length, svgs: main.querySelectorAll('svg').length, elements: all.length }, issues, imageRules };
  }

  /** Bir sayfa listesini sırayla tarar (tek sayfalık uygulamalar için hash yönlendirmesi kullanır). */
  async function scan(routes, opts = {}) {
    const wait = opts.wait ?? 300; const out = [];
    for (const r of routes) { if (location.hash !== r) { location.hash = r; await new Promise(s => setTimeout(s, wait)); } await new Promise(s => requestAnimationFrame(() => requestAnimationFrame(s))); out.push(audit({ route: r, width: document.documentElement.clientWidth })); }
    return out;
  }
  /** Bulguları tür/bileşen bazında özetler (aynı bileşenin tekrarlarını birleştirir). */
  function summarize(results) {
    const issues = results.flatMap(r => r.issues); const key = (i) => [i.type, i.component, i.selector.replace(/:nth-child\(\d+\)/g, '')].join('|');
    const uniq = new Map(); issues.forEach(i => { const k = key(i); if (!uniq.has(k)) uniq.set(k, { ...i, routes: new Set(), widths: new Set(), count: 0 }); const u = uniq.get(k); u.count++; u.routes.add(i.route); u.widths.add(i.width); });
    return { pages: new Set(results.map(r => r.stats.route)).size, runs: results.length, cards: results.reduce((a, r) => a + r.stats.cards, 0), images: results.reduce((a, r) => a + r.stats.images, 0),
      issues: [...uniq.values()].map(u => ({ ...u, routes: [...u.routes], widths: [...u.widths].sort((a, b) => a - b) })) };
  }
  window.VisualQA = { audit, scan, summarize, CARD_SEL, IMAGE_RULES, version: '1.0.0' };
})();
