/* ==========================================================================
   Areluma Yoga – Nefes görselleri
   Ritim grafiği (akciğer hacmi eğrisi), diyafram yan kesiti, dönüşümlü burun
   nefesi adımları ve kutu nefesi. Hepsi tema renkli SVG; hareket yalnızca
   ritmi göstermek için kullanılır ve prefers-reduced-motion'da kapanır.
   ========================================================================== */
const BreathViz = (() => {
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const r1 = (n) => Math.round(n * 10) / 10;
  const still = () => { try { return matchMedia('(prefers-reduced-motion: reduce)').matches || navigator.webdriver === true; } catch (e) { return false; } };
  let uid = 0;

  /* ------------------------------------------------ 1. Ritim: akciğer hacmi eğrisi */
  function rhythm(b, holdOverride) {
    const p = b.pattern.slice();
    if (b.box && holdOverride != null) { p[1] = holdOverride; p[3] = holdOverride; }
    const names = ['Nefes al', 'Bekle', 'Nefes ver', 'Bekle'];
    const kinds = ['in', 'hold', 'out', 'hold'];
    const phases = p.map((s, i) => ({ s, i, kind: kinds[i], name: names[i] })).filter(x => x.s > 0);
    const T = phases.reduce((a, x) => a + x.s, 0);
    const X0 = 40, X1 = 328, TOP = 30, BASE = 132, W = (X1 - X0) / T;
    let x = X0, y = BASE, d = `M${X0} ${BASE}`;
    const bands = [], seps = [], vals = [BASE], times = [0], splines = [];
    let t = 0;
    phases.forEach((ph, k) => {
      const nx = x + ph.s * W, ny = ph.kind === 'in' ? TOP : ph.kind === 'out' ? BASE : y, dx = nx - x;
      d += ph.kind === 'hold' ? `L${r1(nx)} ${ny}` : `C${r1(x + dx * 0.45)} ${y} ${r1(nx - dx * 0.45)} ${ny} ${r1(nx)} ${ny}`;
      bands.push(`<g class="br-band k-${ph.kind}"><rect x="${r1(x + 2)}" y="148" width="${r1(Math.max(4, dx - 4))}" height="9" rx="4.5"/>
        <text x="${r1(x + dx / 2)}" y="176" class="br-band-t">${esc(ph.name)}</text><text x="${r1(x + dx / 2)}" y="193" class="br-band-s">${ph.s} sn</text></g>`);
      if (k) seps.push(`<path class="br-sep" d="M${r1(x)} ${TOP - 8}V157"/>`);
      t += ph.s; vals.push(ny); times.push(t / T); splines.push(ph.kind === 'hold' ? '0 0 1 1' : '.45 0 .55 1');
      x = nx; y = ny;
    });
    const id = 'brg' + (++uid);
    const area = `${d}L${X1} ${BASE + 6}L${X0} ${BASE + 6}Z`;
    const anim = still() ? '' : `<animate attributeName="cx" from="${X0}" to="${X1}" dur="${T}s" repeatCount="indefinite"/>
      <animate attributeName="cy" values="${vals.join(';')}" keyTimes="${times.map(v => r1(v * 1000) / 1000).join(';')}" calcMode="spline" keySplines="${splines.join(';')}" dur="${T}s" repeatCount="indefinite"/>`;
    const head = still() ? '' : `<line class="br-head" x1="${X0}" x2="${X0}" y1="${TOP - 10}" y2="${BASE + 6}"><animate attributeName="x1" from="${X0}" to="${X1}" dur="${T}s" repeatCount="indefinite"/><animate attributeName="x2" from="${X0}" to="${X1}" dur="${T}s" repeatCount="indefinite"/></line>`;
    const svg = `<svg class="br-rhythm" viewBox="0 0 340 200" role="img" aria-label="${esc(`${b.title} ritmi: ${phases.map(x => `${x.name} ${x.s} saniye`).join(', ')}. Bir tur ${T} saniye.`)}">
      <defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" class="br-g0"/><stop offset="1" class="br-g1"/></linearGradient></defs>
      <path class="br-grid" d="M${X0} ${TOP}H${X1}M${X0} ${(TOP + BASE) / 2}H${X1}M${X0} ${BASE}H${X1}"/>
      <text class="br-axis" x="${X0 - 8}" y="${TOP + 4}">dolu</text><text class="br-axis" x="${X0 - 8}" y="${BASE + 4}">boş</text>
      ${seps.join('')}<path class="br-area" d="${area}" fill="url(#${id})"/><path class="br-line" d="${d}"/>
      ${head}<circle class="br-dot" cx="${X0}" cy="${BASE}" r="7">${anim}</circle>${bands.join('')}</svg>`;
    const inS = p[0], outS = p[2];
    const chips = [`<span><b>${T} sn</b> 1 tur</span>`, `<span><b>≈ ${Math.round(60 / T)}</b> nefes / dk</span>`, `<span>Al : Ver <b>${inS} : ${outS}</b></span>`];
    if (outS > inS) chips.push('<span class="br-chip-note">Veriş, alıştan uzun</span>');
    if (b.alternate) chips.push('<span class="br-chip-note">Alış bir, veriş diğer burun deliğinden</span>');
    return `<figure class="br-card"><figcaption class="br-title">Nefes ritmi <small>akciğerdeki hava, bir tur boyunca</small></figcaption>${svg}<div class="br-chips">${chips.join('')}</div></figure>`;
  }

  /* ------------------------------------------------ 2. Diyafram: yan kesit, iki an */
  function torsoPanel(inhale) {
    const s = inhale ? 1 : 0;
    const bx = 158 + 13 * s;                 // karın ön çizgisi
    const dt = 108 + 18 * s;                 // diyafram kubbesinin tepe noktası
    const ctrl = dt - 16 + 10 * s;           // kubbe eğriliği (verişte daha kubbeli)
    const torso = `M104 70C84 76 77 102 80 132C83 162 76 186 82 214L150 216C157 200 ${bx} 188 ${bx} 168C${bx} 148 151 134 150 120C153 98 149 82 138 73C131 68 119 66 104 70Z`;
    const lung = `M117 80C133 79 147 95 147 ${dt + 8}Q117 ${ctrl} 88 ${dt + 14}C86 112 98 82 117 80Z`;
    const dome = `M88 ${dt + 17}Q117 ${ctrl} 151 ${dt + 9}`;
    const arrowV = inhale
      ? `<path class="dg-arrow" d="M117 ${dt + 12}V${dt + 36}M110 ${dt + 29}L117 ${dt + 37}L124 ${dt + 29}"/>`
      : `<path class="dg-arrow" d="M117 ${dt + 40}V${dt + 16}M110 ${dt + 23}L117 ${dt + 15}L124 ${dt + 23}"/>`;
    const arrowH = inhale
      ? `<path class="dg-arrow b" d="M${bx + 6} 168H${bx + 26}M${bx + 19} 161L${bx + 27} 168L${bx + 19} 175"/>`
      : `<path class="dg-arrow b" d="M${bx + 26} 168H${bx + 6}M${bx + 13} 161L${bx + 5} 168L${bx + 13} 175"/>`;
    const lbl = (tx, ty, px, py, text) => `<path class="dg-lead" d="M${px} ${py}L${tx - 6} ${ty - 4}"/><text class="dg-label" x="${tx}" y="${ty}">${text}</text>`;
    return `<svg class="dg-svg" viewBox="0 0 276 236" role="img" aria-label="${inhale ? 'Nefes alırken diyafram aşağı iner, akciğerler genişler, karın öne çıkar' : 'Nefes verirken diyafram yukarı döner, akciğerler küçülür, karın içe iner'}">
      <circle class="dg-hair" cx="113" cy="34" r="21"/><circle class="dg-hair" cx="96" cy="24" r="8"/><circle class="dg-skin" cx="123" cy="38" r="18.5"/>
      <path class="dg-skin" d="M110 50H130V74H110Z"/>
      <path class="dg-body" d="${torso}"/>
      <path class="dg-rib" d="M84 96Q116 88 150 100M83 112Q116 104 150 116M84 80Q112 74 140 84"/>
      <path class="dg-trachea" d="M122 56C122 66 120 74 118 86"/>
      <path class="dg-lung" d="${lung}"/><path class="dg-bronch" d="M118 86C114 96 108 102 100 108M118 90C124 98 132 104 138 108"/>
      <path class="dg-dome" d="${dome}"/>${arrowV}${arrowH}
      ${lbl(204, 92, 142, 100, 'Akciğer')}${lbl(204, dt + 22, 150, dt + 10, 'Diyafram')}${lbl(204, 200, bx - 4, 190, 'Karın')}</svg>`;
  }
  function diaphragm() {
    const panel = (inhale) => `<div class="dg-panel ${inhale ? 'in' : 'out'}"><p class="dg-head"><span class="dg-pill">${inhale ? 'Nefes alırken' : 'Nefes verirken'}</span></p>${torsoPanel(inhale)}
      <p class="dg-cap">${inhale ? 'Diyafram aşağı iner ve düzleşir; karın öne doğru genişler.' : 'Diyafram gevşeyip kubbe şekline döner; karın içe çekilir.'}</p></div>`;
    return `<figure class="br-card dg"><figcaption class="br-title">Diyafram nasıl çalışır? <small>yandan kesit</small></figcaption><div class="dg-grid">${panel(true)}${panel(false)}</div></figure>`;
  }

  /* ------------------------------------------------ 3. Dönüşümlü burun nefesi: dört adım */
  function nostrils(open, dir) {
    const L = [52, 112], R = [88, 112];
    const nose = 'M70 20C66 50 58 76 45 94C36 108 43 124 58 124C64 124 66 120 70 120C74 120 76 124 82 124C97 124 104 108 95 94C82 76 74 50 70 20Z';
    const hole = (c) => `<ellipse class="nd-hole" cx="${c[0]}" cy="${c[1]}" rx="6.5" ry="4" transform="rotate(${c === L ? 18 : -18} ${c[0]} ${c[1]})"/>`;
    const finger = (c) => `<g class="nd-finger"><ellipse cx="${c[0]}" cy="${c[1] + 3}" rx="15" ry="10"/><path d="M${c[0] - 6} ${c[1] - 2}Q${c[0]} ${c[1] - 7} ${c[0] + 6} ${c[1] - 2}"/></g>`;
    const oc = open === 'L' ? L : R, cc = open === 'L' ? R : L;
    const arrow = dir === 'in'
      ? `<path class="nd-flow in" d="M${oc[0]} 158V${oc[1] + 10}M${oc[0] - 7} ${oc[1] + 18}L${oc[0]} ${oc[1] + 9}L${oc[0] + 7} ${oc[1] + 18}"/>`
      : `<path class="nd-flow out" d="M${oc[0]} ${oc[1] + 9}V156M${oc[0] - 7} 148L${oc[0]} 157L${oc[0] + 7} 148"/>`;
    return `<svg class="nd-svg" viewBox="0 0 140 168" aria-hidden="true"><text class="nd-side" x="16" y="30">SOL</text><text class="nd-side" x="124" y="30">SAĞ</text>
      <path class="nd-nose" d="${nose}"/>${hole(L)}${hole(R)}${finger(cc)}${arrow}</svg>`;
  }
  function nadi() {
    const steps = [['L', 'in', 'Soldan al'], ['R', 'out', 'Sağdan ver'], ['R', 'in', 'Sağdan al'], ['L', 'out', 'Soldan ver']];
    return `<figure class="br-card nd"><figcaption class="br-title">Bir tur, dört adım <small>kendi bakış açınla</small></figcaption>
      <ol class="nd-steps">${steps.map(([o, d, t], i) => `<li class="${d}"><span class="nd-no">${i + 1}</span>${nostrils(o, d)}<strong>${t}</strong><span class="nd-sub">${o === 'L' ? 'sağ' : 'sol'} burun deliği kapalı</span></li>`).join('')}</ol>
      <p class="br-note">Sağ elin başparmağı sağ burun deliğini, yüzük parmağı sol burun deliğini nazikçe kapatır. Zorlamadan, sessiz ve yavaş nefes al.</p></figure>`;
  }

  /* ------------------------------------------------ 4. Kutu nefesi */
  function box() {
    const A = 78, B = 222, sq = `M${A} ${B}V${A}H${B}V${B}Z`;
    const seg = (d, k, dash) => `<path class="bx-side k-${k} ${dash ? 'opt' : ''}" d="${d}"/>`;
    const corner = (x, y, n) => `<g class="bx-corner"><circle cx="${x}" cy="${y}" r="12"/><text x="${x}" y="${y + 4}">${n}</text></g>`;
    const motion = still() ? '' : `<animateMotion dur="12s" repeatCount="indefinite" path="${sq}" keyPoints="0;0.25;0.5;0.75;1" keyTimes="0;0.3333;0.5;0.8333;1" calcMode="linear"/>`;
    return `<figure class="br-card bx"><figcaption class="br-title">Kutu nefesi <small>dört eşit kenar</small></figcaption>
      <svg class="bx-svg" viewBox="0 0 300 300" role="img" aria-label="Kutu nefesi: 4 saniye nefes al, isteğe bağlı en fazla 3 saniye bekle, 4 saniye nefes ver, isteğe bağlı en fazla 3 saniye bekle">
        <rect class="bx-fill" x="${A}" y="${A}" width="${B - A}" height="${B - A}" rx="18"/>
        ${seg(`M${A} ${B - 14}V${A + 14}`, 'in')}${seg(`M${A + 14} ${A}H${B - 14}`, 'hold', 1)}${seg(`M${B} ${A + 14}V${B - 14}`, 'out')}${seg(`M${B - 14} ${B}H${A + 14}`, 'hold', 1)}
        ${corner(A, B, 1)}${corner(A, A, 2)}${corner(B, A, 3)}${corner(B, B, 4)}
        <text class="bx-big" x="150" y="146">1 tur</text><text class="bx-small" x="150" y="166">8–14 sn</text>
        <g class="bx-lab" transform="translate(40 150)"><text class="t">Al</text><text class="s" y="18">4 sn</text></g>
        <g class="bx-lab" transform="translate(150 46)"><text class="t">Bekle</text><text class="s" y="16">0–3 sn · isteğe bağlı</text></g>
        <g class="bx-lab" transform="translate(260 150)"><text class="t">Ver</text><text class="s" y="18">4 sn</text></g>
        <g class="bx-lab" transform="translate(150 254)"><text class="t">Bekle</text><text class="s" y="16">0–3 sn · isteğe bağlı</text></g>
        <circle class="bx-dot" r="9" cx="${motion ? 0 : A}" cy="${motion ? 0 : B}">${motion}</circle></svg>
      <p class="br-note">Nokta kenarlar boyunca ilerler: alış ve veriş eşit süredir. Bekleme isteğe bağlıdır; başlangıçta beklemeden uygula.</p></figure>`;
  }

  return { rhythm, diaphragm, nadi, box };
})();
