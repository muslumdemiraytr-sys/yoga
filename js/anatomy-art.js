/* ==========================================================================
   Areluma Yoga – Anatomik kas çizimleri (ön / arka)
   --------------------------------------------------------------------------
   Atlas tarzı, özgün çizim: A-duruşunda insan figürü; kaslar gerçek
   şekilleriyle, lif yönü dokusu ve hacim gölgesiyle; kemik ve tendon
   noktaları krem rengiyle. Tek yarım çizilir, diğer yarı aynalanır.
   Kas kimlikleri anatomy.js içindeki MUSCLES anahtarlarıyla aynıdır.
   ========================================================================== */
const AnatomyArt = (() => {
  const W = 200, H = 464;
  /* Kapalı Catmull-Rom → kübik Bézier: kontrol noktalarından organik şekil */
  function blob(pts, t = 0.5) {
    const n = pts.length; let d = `M${pts[0][0]} ${pts[0][1]}`;
    for (let i = 0; i < n; i++) {
      const p0 = pts[(i - 1 + n) % n], p1 = pts[i], p2 = pts[(i + 1) % n], p3 = pts[(i + 2) % n];
      const c1 = [p1[0] + (p2[0] - p0[0]) * t / 3, p1[1] + (p2[1] - p0[1]) * t / 3];
      const c2 = [p2[0] - (p3[0] - p1[0]) * t / 3, p2[1] - (p3[1] - p1[1]) * t / 3];
      d += `C${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${p2[0]} ${p2[1]}`;
    }
    return d + 'Z';
  }
  const mirrorPts = (pts) => pts.map(([x, y]) => [W - x, y]);
  /* Kas şeklini ağırlık merkezinden biraz dışarı it: komşu kaslar birbirine yaslanır */
  const grow = (pts, k = 1.4) => {
    const cx = pts.reduce((a, p) => a + p[0], 0) / pts.length, cy = pts.reduce((a, p) => a + p[1], 0) / pts.length;
    return pts.map(([x, y]) => { const dx = x - cx, dy = y - cy, l = Math.hypot(dx, dy) || 1; return [+(x + dx / l * k).toFixed(1), +(y + dy / l * k).toFixed(1)]; });
  };

  /* ---- Gövde silueti (sol yarı; orta hatta x=100) */
  const BODY_HALF = [[100, 58], [88, 60], [86, 74], [72, 80], [58, 84], [50, 90], [40, 104], [34, 130], [30, 152], [26, 172], [20, 200], [14, 226], [8, 238], [4, 256], [6, 268], [12, 274], [18, 266],
    [20, 250], [24, 232], [32, 204], [40, 176], [46, 154], [52, 130], [58, 116], [60, 134], [62, 160], [60, 184], [58, 204], [58, 230], [60, 262], [62, 300], [66, 330], [64, 350], [64, 378],
    [70, 412], [72, 436], [70, 446], [64, 456], [80, 461], [88, 456], [86, 440], [86, 412], [90, 384], [88, 352], [90, 330], [94, 296], [98, 254], [100, 236]];
  const bodyPath = (() => { const L = BODY_HALF, R = mirrorPts(BODY_HALF).reverse(); return blob(L.concat(R.slice(1, -1)), 0.45); })();

  /* ---- Kaslar: [kimlik | null, noktalar, lif açısı (°)]; null = adı olmayan nötr kas */
  const FRONT = [
    [null, [[62, 206], [70, 212], [68, 246], [60, 238]], 95],                                            // tensor fasciae latae
    ['quadriceps', [[60, 236], [68, 244], [68, 296], [74, 324], [66, 328], [60, 300], [58, 262]], 95],     // vastus lateralis
    ['quadriceps', [[72, 228], [80, 234], [84, 296], [80, 322], [74, 322], [68, 294], [68, 244]], 92],     // rectus femoris
    ['quadriceps', [[86, 282], [92, 300], [88, 320], [80, 326], [80, 304]], 115],                         // vastus medialis
    ['adductors', [[86, 236], [99, 240], [98, 258], [92, 286], [86, 280], [82, 254]], 115],
    [null, [[66, 208], [72, 212], [92, 322], [88, 330], [84, 326], [68, 220]], 72],                       // sartorius
    ['hipFlexors', [[84, 214], [94, 224], [90, 240], [80, 232]], 70],
    ['tibialis', [[68, 350], [74, 350], [76, 396], [78, 430], [74, 432], [68, 398], [65, 362]], 92],
    ['gastrocnemius', [[84, 354], [89, 362], [88, 392], [82, 398], [80, 372]], 90],
    ['obliques', [[84, 140], [85, 198], [80, 214], [66, 208], [60, 172], [60, 150], [70, 138]], 60],
    ['serratus', [[60, 128], [70, 132], [62, 140], [70, 146], [62, 152], [68, 158], [58, 156], [58, 138]], 160],
    ['rectusAbd', [[99, 132], [99, 224], [92, 224], [86, 198], [85, 152], [88, 134]], 90],
    ['pectoralis', [[98, 88], [98, 126], [88, 134], [72, 130], [60, 118], [62, 102], [72, 90]], 18],
    ['trapezius', [[86, 60], [90, 70], [86, 82], [64, 84], [72, 76]], 150],
    ['neck', [[84, 50], [89, 50], [99, 84], [94, 88], [90, 84]], 65],
    ['deltoid', [[60, 84], [74, 88], [64, 100], [52, 118], [42, 112], [40, 98], [48, 88]], 100],
    [null, [[30, 160], [34, 172], [24, 198], [20, 196], [26, 170]], 110],                                  // brachioradialis
    ['biceps', [[48, 116], [52, 128], [46, 156], [40, 170], [34, 166], [36, 142], [42, 120]], 105],
    ['forearm', [[42, 176], [38, 196], [28, 226], [18, 226], [22, 206], [28, 182]], 112]
  ];
  const BACK = [
    [null, [[84, 108], [92, 130], [84, 136], [70, 128], [64, 110], [70, 98]], 160],                       // infraspinatus
    ['latissimus', [[92, 138], [99, 152], [99, 192], [90, 208], [76, 198], [64, 166], [60, 136], [70, 130]], 140],
    ['erector', [[99, 150], [99, 214], [92, 214], [88, 188], [88, 162]], 90],
    ['trapezius', [[100, 60], [100, 152], [92, 136], [84, 110], [66, 92], [56, 88], [70, 80], [88, 70]], 130],
    ['deltoid', [[60, 84], [74, 90], [66, 102], [52, 118], [42, 112], [40, 98], [48, 88]], 100],
    ['triceps', [[48, 112], [54, 126], [48, 156], [40, 172], [32, 166], [36, 140], [42, 118]], 100],
    ['forearm', [[42, 176], [38, 196], [28, 226], [18, 226], [22, 206], [28, 182]], 112],
    ['gluteusMed', [[62, 204], [82, 196], [86, 210], [72, 220], [60, 218]], 160],
    ['gluteusMax', [[99, 214], [99, 252], [90, 262], [70, 260], [60, 240], [64, 222], [80, 212]], 150],
    [null, [[58, 262], [62, 262], [66, 330], [62, 332]], 95],                                              // iliotibial band (tendon)
    ['hamstrings', [[62, 266], [76, 268], [76, 318], [70, 330], [62, 322], [60, 290]], 92],               // biceps femoris
    ['hamstrings', [[80, 266], [96, 266], [94, 298], [88, 328], [80, 322]], 88],                          // semitendinosus
    [null, [[66, 382], [90, 382], [86, 410], [80, 414], [70, 410]], 90],                                   // soleus
    ['gastrocnemius', [[66, 344], [78, 346], [78, 386], [72, 394], [66, 380], [63, 358]], 90],
    ['gastrocnemius', [[80, 344], [90, 348], [91, 372], [84, 396], [80, 386]], 90]
  ];
  const TENDON_IDS = new Set(['back:9']);   // IT bandı tendon rengindedir
  /* Ten renginde kalan uçlar: eller ve ayaklar */
  const HAND = [[26, 230], [14, 224], [8, 238], [4, 256], [6, 268], [12, 274], [18, 266], [21, 250]];
  const FOOT = [[71, 434], [70, 446], [64, 456], [80, 461], [88, 456], [87, 436]];

  /* ---- Kemik / tendon noktaları ve yardımcı çizgiler */
  const BONES = {
    front: [
      blob([[98, 86], [80, 82], [64, 82], [64, 86], [80, 87], [98, 90]], 0.4),                            // köprücük kemiği
      blob([[72, 330], [80, 328], [84, 336], [80, 344], [72, 342]], 0.5),                                 // diz kapağı
      blob([[77, 348], [80, 348], [82, 428], [79, 430]], 0.4)                                             // kaval kemiği (tibia)
    ],
    back: [
      blob([[78, 408], [84, 408], [83, 440], [79, 440]], 0.4)                                             // Aşil tendonu
    ]
  };
  const LINES = {
    front: ['M100 132V224', 'M87 152H99M86 172H99M87 194H99', 'M66 212Q80 220 92 232'],                   // linea alba, tendinöz kesişimler, kasık bağı
    back: ['M100 64V230']
  };

  /* ---- Ortak tanımlar (lif dokusu, hacim gölgesi) – belgeye bir kez eklenir */
  function ensureDefs() {
    if (typeof document === 'undefined' || document.getElementById('arl-anat-defs')) return;
    const angs = Array.from({ length: 18 }, (_, i) => i * 10);
    const pats = angs.map(a => `<pattern id="af-${a}" patternUnits="userSpaceOnUse" width="2.6" height="6" patternTransform="rotate(${a - 90})"><path d="M1.3 0V6" stroke="#fff" stroke-opacity=".2" stroke-width=".5"/></pattern>`).join('');
    const box = document.createElement('div');
    box.innerHTML = `<svg id="arl-anat-defs" width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><defs>${pats}
      <radialGradient id="af-shade" cx=".38" cy=".3" r=".8"><stop offset="0" stop-color="#fff" stop-opacity=".2"/><stop offset=".55" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#2a0c08" stop-opacity=".26"/></radialGradient>
      <linearGradient id="af-skin" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#000" stop-opacity=".06"/><stop offset=".5" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".06"/></linearGradient></defs></svg>`;
    document.body.appendChild(box.firstChild);
  }
  const ang = (a) => (Math.round((((a % 180) + 180) % 180) / 10) * 10) % 180;

  /**
   * view: 'front' | 'back'
   * o.role(id) → 'a' | 's' | 't' | 'n'   (adı olan kasın rolü)
   * o.attrs(id, role) → ek öznitelikler (etkileşim için)
   * o.cls: ek SVG sınıfı · o.label: erişilebilir ad
   */
  function svg(view, o = {}) {
    ensureDefs();
    const list = view === 'back' ? BACK : FRONT;
    const role = o.role || (() => 'n');
    const parts = list.map(([id, pts, a], i) => {
      const r = id ? role(id) : 'n';
      const tendon = TENDON_IDS.has(`${view}:${i}`);
      const tendonGrow = (p) => tendon ? p : grow(p);
      const one = (p, mirror) => {
        const d = blob(tendonGrow(p));
        const base = id ? `<path d="${d}" class="an-m am-m r-${r} ${o.sel === id ? 'sel' : ''}" data-m="${id}"${o.attrs ? ' ' + o.attrs(id, r, mirror) : ''}/>`
          : `<path d="${d}" class="am-m ${tendon ? 'am-tendon' : 'am-n'}"/>`;
        return `${base}${tendon ? '' : `<path d="${d}" class="am-fib" fill="url(#af-${ang(a)})"/><path d="${d}" class="am-shade"/>`}`;
      };
      return `<g class="am-pair">${one(pts)}<g transform="translate(${W} 0) scale(-1 1)">${one(pts, true)}</g></g>`;
    }).join('');
    const bones = BONES[view].map(d => `<path d="${d}" class="am-bone"/><g transform="translate(${W} 0) scale(-1 1)"><path d="${d}" class="am-bone"/></g>`).join('');
    const lines = LINES[view].map(d => `<path d="${d}" class="am-line"/>`).join('') + `<g transform="translate(${W} 0) scale(-1 1)">${view === 'front' ? `<path d="${LINES.front[2]}" class="am-line"/>` : ''}</g>`;
    const head = view === 'back'
      ? `<ellipse cx="100" cy="34" rx="20" ry="27" class="am-hair"/><circle cx="100" cy="14" r="9" class="am-hair"/>`
      : `<ellipse cx="100" cy="34" rx="20" ry="27" class="am-skin"/><path d="M80 30C80 10 92 5 100 5S120 10 120 30C116 20 108 16 100 16S84 20 80 30Z" class="am-hair"/><circle cx="100" cy="6" r="7" class="am-hair"/>`;
    return `<svg viewBox="0 0 ${W} ${H}" class="am-svg ${o.cls || ''}" ${o.interactive ? 'role="group"' : 'role="img"'} aria-label="${o.label || (view === 'back' ? 'Arka görünüm kas haritası' : 'Ön görünüm kas haritası')}">
      <path d="${bodyPath}" class="am-deep"/><path d="${bodyPath}" class="am-fib" fill="url(#af-90)"/><path d="${bodyPath}" fill="url(#af-skin)"/>
      ${[HAND, FOOT].map(q => `<path d="${blob(q)}" class="am-skin"/><g transform="translate(${W} 0) scale(-1 1)"><path d="${blob(q)}" class="am-skin"/></g>`).join('')}
      <g class="am-muscles">${parts}</g>${bones}<g class="am-lines">${lines}</g>${head}</svg>`;
  }

  return { svg, ensureDefs, FRONT, BACK };
})();
