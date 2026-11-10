/* ==========================================================================
   Areluma Yoga – Figür ve illüstrasyon motoru
   --------------------------------------------------------------------------
   • Poz verisindeki eklem koordinatlarından (200×200) hacimli, oranlı bir insan
     figürü çizer: incelen uzuv kapsülleri, gövde silueti, el/ayak, saç topuzu.
   • Renkler CSS sınıflarıyla gelir (fg-*) → 10 temanın hepsine uyum sağlar.
   • İki poz arasında eklem AÇILARINI enterpole ederek doğal geçiş üretir
     (koordinat enterpolasyonu uzuvları kısaltırdı; açı uzayı boyları korur).
   • Sayfa başlıkları için aynı dilde sahne illüstrasyonları (Areluma kemeri).
   Harici kütüphane kullanmaz; hareketler Web Animations API + requestAnimationFrame.
   ========================================================================== */
const Figure = (() => {
  const r1 = (n) => Math.round(n * 10) / 10;
  const sub = (a, b) => [a[0] - b[0], a[1] - b[1]];
  const add = (a, b) => [a[0] + b[0], a[1] + b[1]];
  const mul = (a, k) => [a[0] * k, a[1] * k];
  const len = (a) => Math.hypot(a[0], a[1]);
  const unit = (a) => { const l = len(a) || 1e-6; return [a[0] / l, a[1] / l]; };
  const P = (a) => `${r1(a[0])} ${r1(a[1])}`;
  const reduced = () => { try { return matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) { return false; } };

  /* ---- Ölçüler (200 birimlik görünümde; baş çapı ≈ 20, boy ≈ 7.5 baş) */
  const SIZE = { thigh: [7.2, 4.9], shin: [4.9, 3.2], uarm: [4.4, 3.4], farm: [3.4, 2.6], neck: 3.9, head: 10 };
  // Gövde yarı genişliği: yandan görünüm ve önden görünüm (omuz/kalça daha geniş)
  const TORSO_W = [[0, 8.4], [0.15, 9.9], [0.42, 8.9], [0.66, 7.5], [0.86, 8.7], [1, 9.1]];
  const TORSO_WF = [[0, 12.6], [0.14, 12.4], [0.42, 10.2], [0.66, 8.6], [0.86, 10.4], [1, 10.4]];
  /** Önden görünüm mü? (dikey omurga + dirsekler iki yanda + dizler aynı tarafa yığılmamış) */
  function frontness(f) {
    if (f.fv != null) return f.fv;
    if (f.top) return 0;
    const vertical = Math.abs(f.n[0] - f.p[0]) < 5 && f.n[1] < f.p[1] && Math.abs(f.h[0] - f.n[0]) < 6;
    const el = f.le[0] - f.n[0], er = f.re[0] - f.n[0], kl = f.lk[0] - f.p[0], kr = f.rk[0] - f.p[0];
    const armsSplit = (el < -4 && er > 4) || (el > 4 && er < -4);
    const kneesStacked = (kl > 15 && kr > 15) || (kl < -15 && kr < -15);
    return vertical && armsSplit && !kneesStacked ? 1 : 0;
  }
  /** Türetilmiş eklemler: omuz ve kalça noktaları (önden görünümde iki yana açılır) */
  function joints(f) {
    const fv = frontness(f), s0 = spineAt(f, 0), s1 = spineAt(f, 1);
    const side = (j, base, nrm, w) => { const d = sub(f[j], base); const sg = Math.sign(d[0] * nrm[0] + d[1] * nrm[1]) || 1; return add(base, mul(nrm, sg * w)); };
    return { fv, ls: side('le', f.n, s0.n, 9.2 * fv), rs: side('re', f.n, s0.n, 9.2 * fv), lp: side('lk', f.p, s1.n, 5.6 * fv), rp: side('rk', f.p, s1.n, 5.6 * fv) };
  }

  /** İncelen, hafif kas kavisli kapsül (A→B) */
  function capsule(A, B, ra, rb, bulge = 0) {
    const u = unit(sub(B, A)), n = [-u[1], u[0]], L = len(sub(B, A));
    const a1 = add(A, mul(n, ra)), b1 = add(B, mul(n, rb)), b2 = sub(B, mul(n, rb)), a2 = sub(A, mul(n, ra));
    if (!bulge || L < 8) return `M${P(a1)}L${P(b1)}A${r1(rb)} ${r1(rb)} 0 0 0 ${P(b2)}L${P(a2)}A${r1(ra)} ${r1(ra)} 0 0 0 ${P(a1)}Z`;
    const m = add(A, mul(u, L * 0.4)), rm = Math.max(ra, rb) * (1 + bulge) * 1.08;
    return `M${P(a1)}Q${P(add(m, mul(n, rm)))} ${P(b1)}A${r1(rb)} ${r1(rb)} 0 0 0 ${P(b2)}Q${P(sub(m, mul(n, rm)))} ${P(a2)}A${r1(ra)} ${r1(ra)} 0 0 0 ${P(a1)}Z`;
  }

  /* ---- Gövde: boyun (n) → pelvis (p) eğrisi boyunca genişlik profili */
  const spineAt = (f, t) => {
    const c = f.c || mul(add(f.n, f.p), 0.5), m = 1 - t;
    const pt = [m * m * f.n[0] + 2 * m * t * c[0] + t * t * f.p[0], m * m * f.n[1] + 2 * m * t * c[1] + t * t * f.p[1]];
    const tg = unit([2 * m * (c[0] - f.n[0]) + 2 * t * (f.p[0] - c[0]), 2 * m * (c[1] - f.n[1]) + 2 * t * (f.p[1] - c[1])]);
    return { pt, n: [-tg[1], tg[0]] };
  };
  const profile = (T, t) => {
    for (let i = 1; i < T.length; i++) {
      const [t0, w0] = T[i - 1], [t1, w1] = T[i];
      if (t <= t1) { const k = (t - t0) / (t1 - t0); return w0 + (w1 - w0) * (0.5 - Math.cos(k * Math.PI) / 2); }
    }
    return T[T.length - 1][1];
  };
  const widthAt = (t, fv = 0) => profile(TORSO_W, t) * (1 - fv) + profile(TORSO_WF, t) * fv;
  /** Catmull-Rom → kübik Bézier ile yumuşak çizgi */
  function smooth(pts) {
    let d = '';
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2;
      const c1 = add(p1, mul(sub(p2, p0), 1 / 6)), c2 = sub(p2, mul(sub(p3, p1), 1 / 6));
      d += `C${P(c1)} ${P(c2)} ${P(p2)}`;
    }
    return d;
  }
  function torsoPath(f, t0 = 0, t1 = 1, scale = 1) {
    const N = 9, L = [], R = [], fv = frontness(f);
    for (let i = 0; i <= N; i++) {
      const t = t0 + (t1 - t0) * i / N, s = spineAt(f, t), w = widthAt(t, fv) * scale;
      L.push(add(s.pt, mul(s.n, w))); R.push(sub(s.pt, mul(s.n, w)));
    }
    const wb = widthAt(t1, fv) * scale, wt = widthAt(t0, fv) * scale;
    // önden görünümde omuz ve kalça kapakları basık elips olur
    const rot = (t) => r1(Math.atan2(spineAt(f, t).n[1], spineAt(f, t).n[0]) * 180 / Math.PI);
    const ryT = wt + (5.2 - wt) * fv, ryB = wb + (7 - wb) * fv;
    const capB = t1 >= 1 ? `A${r1(wb)} ${r1(ryB)} ${rot(1)} 0 0 ${P(R[N])}` : `L${P(R[N])}`;
    const capT = t0 <= 0 ? `A${r1(wt)} ${r1(ryT)} ${rot(0)} 0 0 ${P(L[0])}` : `L${P(L[0])}`;
    R.reverse();
    return `M${P(L[0])}${smooth(L)}${capB}${smooth(R)}${capT}Z`;
  }

  /* ---- Yön tahmini: ayak parmakları ve baş */
  function footDir(f, k, a) {
    const shin = sub(a, k);
    if (Math.abs(shin[1]) < Math.abs(shin[0]) * 0.75) return unit(shin);            // uzanmış bacak: ayak bileği uzatılmış
    const ground = a[1] > 166;
    // Kalça bükülüyse (V şekli) gövdenin olduğu taraf ön taraftır
    const leg = unit(sub(a, f.p)), tor = sub(f.n, f.p);
    const d = tor[0] * leg[0] + tor[1] * leg[1];
    const perp = sub(tor, mul(leg, d));
    let sx = 0;
    if (d > 0.15 * len(tor) && len(perp) > 0.3 * len(tor)) sx = Math.sign(perp[0]);  // belirgin kalça fleksiyonu
    else if (Math.abs(k[0] - f.p[0]) > 5) sx = Math.sign(k[0] - f.p[0]);             // diz hangi yöne bakıyorsa
    if (!sx) return ground ? [Math.sign(a[0] - f.p[0] || (a === f.lf ? -1 : 1)) * 0.55, 0.84] : unit(shin);
    return ground ? [sx, 0] : unit([sx * 0.9, 0.45]);
  }
  function footFor(f, side) {
    const k = f[side + 'k'], a = f[side + 'f'];
    // f.ft = [solAyak, sağAyak]: -1 sola, 1 sağa, 0 önden görünüm, [x, y] serbest yön
    if (f.ft && f.ft[side === 'l' ? 0 : 1] != null) {
      const v = f.ft[side === 'l' ? 0 : 1];
      if (Array.isArray(v)) return unit(v);
      return v === 0 ? [Math.sign(a[0] - f.p[0] || 1) * 0.55, 0.84] : [v, 0];
    }
    return footDir(f, k, a);
  }

  /* ---- Uzuvlar */
  function arm(f, side, cls, J) {
    const e = f[side + 'e'], hnd = f[side + 'h'], sh = J[side + 's'];
    const u = unit(sub(hnd, e)), hc = add(hnd, mul(u, 1.6));
    return `<path class="${cls}" d="${capsule(sh, e, SIZE.uarm[0], SIZE.uarm[1], 0.08)}"/><path class="${cls}" d="${capsule(e, hnd, SIZE.farm[0], SIZE.farm[1], 0.05)}"/><circle class="${cls}" cx="${r1(hc[0])}" cy="${r1(hc[1])}" r="3.1"/>`;
  }
  function leg(f, side, pants, skin, J) {
    const k = f[side + 'k'], a = f[side + 'f'], fd = footFor(f, side), hp = J[side + 'p'];
    const toe = add(a, mul(fd, 9.5));
    const front = (fd[1] > 0.6 && Math.abs(fd[0]) < 0.7);                            // önden görünüm: kısa ayak
    const foot = front ? `<ellipse class="${skin}" cx="${r1(a[0] + fd[0] * 3)}" cy="${r1(a[1] + 1.6)}" rx="4.4" ry="3"/>`
      : `<path class="${skin}" d="${capsule(a, toe, 3.3, 2.4)}"/>`;
    return `<path class="${pants}" d="${capsule(hp, k, SIZE.thigh[0], SIZE.thigh[1], 0.12)}"/><path class="${pants}" d="${capsule(k, a, SIZE.shin[0], SIZE.shin[1], 0.14)}"/>${foot}`;
  }
  function head(f) {
    const up = unit(sub(f.h, f.n));
    const nk = add(f.n, mul(sub(f.h, f.n), 0.62));
    const hair = add(f.h, mul(up, 1.4)), face = sub(f.h, mul(up, 1.1)), bun = add(f.h, mul(up, 11.2));
    return `<path class="fg-skin" d="${capsule(f.n, nk, SIZE.neck, SIZE.neck - 0.4)}"/>
      <circle class="fg-hair" cx="${r1(bun[0])}" cy="${r1(bun[1])}" r="4.7"/>
      <circle class="fg-hair" cx="${r1(hair[0])}" cy="${r1(hair[1])}" r="10.6"/>
      <circle class="fg-skin" cx="${r1(face[0])}" cy="${r1(face[1])}" r="9.4"/>`;
  }

  /* ---- Kas/eklem vurgusu (eğitim çizimleri) */
  const MUSCLE_SEG = {
    quadriceps: 'thigh', hamstrings: 'thigh', adductors: 'thigh', gastrocnemius: 'shin', tibialis: 'shin',
    gluteusMax: 'hips', gluteusMed: 'hips', hipFlexors: 'hips', rectusAbd: 'core', obliques: 'core', transversus: 'core',
    erector: 'back', latissimus: 'chest', trapezius: 'neck', pectoralis: 'chest', serratus: 'chest', intercostals: 'chest', diaphragm: 'chest',
    deltoid: 'uarm', triceps: 'uarm', biceps: 'uarm', forearm: 'farm', neck: 'neck'
  };
  const RANK = { a: 3, s: 2, t: 1, n: 0 };
  /** Anatomy.POSES[..].m → { bölge: rol } */
  function focusFrom(list) {
    const out = {};
    (list || []).forEach(([m, r]) => {
      const s = MUSCLE_SEG[m]; if (!s || r === 'n') return;
      const segs = s === 'back' ? ['chest', 'core'] : [s];
      segs.forEach(x => { if (!out[x] || RANK[r] > RANK[out[x]]) out[x] = r; });
    });
    return out;
  }
  function highlight(f, focus, J) {
    if (!focus) return '';
    const g = [];
    const cls = (r) => `fg-hl r-${r}`;
    const both = (fn) => ['l', 'r'].map(fn).join('');
    if (focus.thigh) g.push(both(s => `<path class="${cls(focus.thigh)}" d="${capsule(J[s + 'p'], f[s + 'k'], SIZE.thigh[0] - 1, SIZE.thigh[1] - 1, 0.12)}"/>`));
    if (focus.shin) g.push(both(s => `<path class="${cls(focus.shin)}" d="${capsule(f[s + 'k'], f[s + 'f'], SIZE.shin[0] - 0.8, SIZE.shin[1] - 0.6, 0.14)}"/>`));
    if (focus.uarm) g.push(both(s => `<path class="${cls(focus.uarm)}" d="${capsule(J[s + 's'], f[s + 'e'], SIZE.uarm[0] - 0.8, SIZE.uarm[1] - 0.7)}"/>`));
    if (focus.farm) g.push(both(s => `<path class="${cls(focus.farm)}" d="${capsule(f[s + 'e'], f[s + 'h'], SIZE.farm[0] - 0.6, SIZE.farm[1] - 0.5)}"/>`));
    if (focus.chest) g.push(`<path class="${cls(focus.chest)}" d="${torsoPath(f, 0.08, 0.44, 0.84)}"/>`);
    if (focus.core) g.push(`<path class="${cls(focus.core)}" d="${torsoPath(f, 0.44, 0.78, 0.84)}"/>`);
    if (focus.hips) g.push(`<path class="${cls(focus.hips)}" d="${torsoPath(f, 0.78, 1, 0.86)}"/>`);
    if (focus.neck) { const nk = add(f.n, mul(sub(f.h, f.n), 0.55)); g.push(`<path class="${cls(focus.neck)}" d="${capsule(f.n, nk, 3.6, 3)}"/>`); }
    return `<g class="fg-hls">${g.join('')}</g>`;
  }

  /* ---- Zemin, gölge, sandalye */
  function ground(f) {
    if (f.top) return '<rect x="14" y="30" width="172" height="140" rx="12" class="fg-mat-top"/><rect x="14" y="30" width="172" height="140" rx="12" class="fg-mat-edge"/>';
    const pts = ['h', 'n', 'p', 'lh', 'rh', 'lf', 'rf', 'lk', 'rk'].map(k => f[k]).filter(q => q && q[1] > 158);
    let shadow = '';
    if (pts.length) {
      const xs = pts.map(q => q[0]), x0 = Math.min(...xs), x1 = Math.max(...xs);
      shadow = `<ellipse class="fg-shadow" cx="${r1((x0 + x1) / 2)}" cy="184" rx="${r1((x1 - x0) / 2 + 12)}" ry="3.6"/>`;
    }
    return `<rect x="10" y="182" width="180" height="5.5" rx="2.75" class="fg-mat"/>${shadow}`;
  }
  const chair = (f) => f.chair ? '<path class="fg-chair" d="M66 124H142M74 124V184M134 124V184M70 124V58"/>' : '';

  /** SVG iç içeriği (dış <svg> olmadan) */
  function inner(f, opts = {}) {
    const J = joints(f);
    return `${opts.noGround ? '' : ground(f)}${chair(f)}<g class="${opts.focus ? 'fg-anat' : 'fg-body'}">
      <g class="fg-back">${arm(f, 'r', 'fg-skin-b', J)}${leg(f, 'r', 'fg-pants-b', 'fg-skin-b', J)}</g>
      <g class="fg-front">${leg(f, 'l', 'fg-pants', 'fg-skin', J)}
        <path class="fg-top" d="${torsoPath(f)}"/><path class="fg-pants" d="${torsoPath(f, 0.8, 1, 1.01)}"/>
        ${head(f)}${arm(f, 'l', 'fg-skin', J)}</g>${highlight(f, opts.focus, J)}</g>`;
  }
  /** Figür verisi, YA.extraFigs anahtarı ya da poz kimliği kabul eder */
  function resolve(f) {
    if (typeof f !== 'string') return f;
    const Y = window.YA; if (!Y) return null;
    const pose = Y.poses && Y.poses.find(x => x.id === f);
    return pose ? pose.fig : (Y.extraFigs[f] || Y.extraFigs.ayakta);
  }
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  /** Tam SVG – App.figure() ile aynı sözleşme: tek <svg>, viewBox 200×200, sonu </svg> */
  function svg(f, opts = {}) {
    f = resolve(f); if (!f) return '';
    return `<svg class="pose-fig fg ${opts.small ? 'small' : ''}" viewBox="0 0 200 200" role="img" aria-label="${esc(opts.label || 'Pozisyon çizimi')}">${inner(f, opts)}</svg>`;
  }

  /* ================= Pozlar arası geçiş (açı uzayında enterpolasyon) */
  const BONES = [['n', 'p'], ['h', 'n'], ['le', 'n'], ['lh', 'le'], ['re', 'n'], ['rh', 're'], ['lk', 'p'], ['lf', 'lk'], ['rk', 'p'], ['rf', 'rk']];
  function toSkel(f) {
    const s = { root: f.p.slice(), top: !!f.top, chair: !!f.chair, ft: f.ft, fv: frontness(f) };
    BONES.forEach(([j, par]) => { const v = sub(f[j], f[par]); s[j] = [Math.atan2(v[1], v[0]), len(v)]; });
    // gövde eğrisi: omurga eksenine göre yerel konum
    const ax = sub(f.n, f.p), L = len(ax) || 1, u = unit(ax), nn = [-u[1], u[0]];
    const c = f.c ? sub(f.c, mul(add(f.n, f.p), 0.5)) : [0, 0];
    s.c = [(c[0] * u[0] + c[1] * u[1]) / L, (c[0] * nn[0] + c[1] * nn[1]) / L];
    return s;
  }
  function fromSkel(s) {
    const f = { p: s.root.slice() };
    BONES.forEach(([j, par]) => { const [a, l] = s[j]; f[j] = add(f[par], [Math.cos(a) * l, Math.sin(a) * l]); });
    if (Math.abs(s.c[0]) + Math.abs(s.c[1]) > 0.01) {
      const ax = sub(f.n, f.p), L = len(ax), u = unit(ax), nn = [-u[1], u[0]];
      f.c = add(mul(add(f.n, f.p), 0.5), add(mul(u, s.c[0] * L), mul(nn, s.c[1] * L)));
    }
    if (s.top) f.top = true; if (s.chair) f.chair = true; if (s.ft) f.ft = s.ft;
    f.fv = s.fv;
    return f;
  }
  const lerp = (a, b, t) => a + (b - a) * t;
  const lerpAng = (a, b, t) => { let d = b - a; while (d > Math.PI) d -= 2 * Math.PI; while (d < -Math.PI) d += 2 * Math.PI; return a + d * t; };
  function mix(fa, fb, t) {
    const A = toSkel(fa), B = toSkel(fb), S = { root: [lerp(A.root[0], B.root[0], t), lerp(A.root[1], B.root[1], t)], c: [lerp(A.c[0], B.c[0], t), lerp(A.c[1], B.c[1], t)] };
    BONES.forEach(([j]) => { S[j] = [lerpAng(A[j][0], B[j][0], t), lerp(A[j][1], B[j][1], t)]; });
    const pick = t < 0.5 ? A : B; S.top = pick.top; S.chair = pick.chair; S.ft = pick.ft; S.fv = lerp(A.fv, B.fv, t);
    const f = fromSkel(S);
    // ara karelerde hiçbir eklem zeminin (mat) altına inmesin
    if (!f.top) Object.keys(f).forEach(k => { const v = f[k]; if (Array.isArray(v) && v.length === 2 && v[1] > 181) v[1] = 181; });
    return f;
  }
  const easeInOut = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  /** Bir <svg class="pose-fig"> içindeki figürü a → b'ye akıcı biçimde taşır */
  function morph(el, a, b, opts = {}) {
    a = resolve(a); b = resolve(b);
    if (!el || !a || !b) return { cancel() {} };
    if (el._fgAnim) el._fgAnim.cancel();
    const o = { focus: opts.focus };
    if (reduced() || a === b || !!a.top !== !!b.top) {
      el.innerHTML = inner(b, o);
      if (!reduced() && a !== b && el.animate) el.animate([{ opacity: 0.2 }, { opacity: 1 }], { duration: 420, easing: 'ease-out' });
      if (opts.onDone) opts.onDone();
      return { cancel() {} };
    }
    const dur = opts.duration || 900, t0 = performance.now();
    let raf = 0, live = true;
    const step = (now) => {
      if (!live) return;
      const k = Math.min(1, (now - t0) / dur);
      el.innerHTML = inner(k >= 1 ? b : mix(a, b, easeInOut(k)), o);
      if (k < 1) raf = requestAnimationFrame(step); else { el._fgAnim = null; if (opts.onDone) opts.onDone(); }
    };
    raf = requestAnimationFrame(step);
    el._fgAnim = { cancel() { live = false; cancelAnimationFrame(raf); el.innerHTML = inner(b, o); el._fgAnim = null; } };
    return el._fgAnim;
  }

  /* ================= Sahne illüstrasyonları (Areluma kemeri) */
  const sparkle = (x, y, s = 1, cls = 'sc-spark') => `<path class="${cls}" d="M${x} ${y - 7 * s}C${x + 1 * s} ${y - 2 * s} ${x + 2 * s} ${y - 1 * s} ${x + 7 * s} ${y}C${x + 2 * s} ${y + 1 * s} ${x + 1 * s} ${y + 2 * s} ${x} ${y + 7 * s}C${x - 1 * s} ${y + 2 * s} ${x - 2 * s} ${y + 1 * s} ${x - 7 * s} ${y}C${x - 2 * s} ${y - 1 * s} ${x - 1 * s} ${y - 2 * s} ${x} ${y - 7 * s}Z"/>`;
  const leafSprig = (x, y, s = 1, flip = 1) => {
    const L = (dx, dy, a) => `<path class="sc-leaf" transform="translate(${x + dx * s * flip} ${y + dy * s}) rotate(${a * flip}) scale(${s})" d="M0 0C6-10 18-12 26-10C22-2 12 4 0 0Z"/>`;
    return `<path class="sc-stem" d="M${x} ${y}C${x + 4 * flip * s} ${y - 30 * s} ${x + 2 * flip * s} ${y - 58 * s} ${x - 6 * flip * s} ${y - 84 * s}"/>${L(1, -14, -60)}${L(3, -34, -20)}${L(1, -52, -70)}${L(-3, -70, -30)}`;
  };
  const pot = (x, y) => `<path class="sc-pot" d="M${x - 18} ${y - 22}H${x + 18}L${x + 13} ${y}H${x - 13}Z"/><rect class="sc-pot-rim" x="${x - 20}" y="${y - 26}" width="40" height="6" rx="3"/>`;
  const arch = (opts = {}) => {
    const x0 = opts.x0 || 118, x1 = opts.x1 || 282, top = opts.top || 34, bot = 262, r = (x1 - x0) / 2;
    return `<path class="sc-arch ${opts.night ? 'night' : ''}" d="M${x0} ${bot}V${top + r}A${r} ${r} 0 0 1 ${x1} ${top + r}V${bot}Z"/>
      <path class="sc-arch-line" d="M${x0 + 10} ${bot}V${top + r}A${r - 10} ${r - 10} 0 0 1 ${x1 - 10} ${top + r}V${bot}"/>`;
  };
  const sun = (x, y, rr = 24) => `<circle class="sc-sun" cx="${x}" cy="${y}" r="${rr}"/><circle class="sc-sun-halo" cx="${x}" cy="${y}" r="${rr + 9}"/>`;
  const moon = (x, y) => `<path class="sc-sun" d="M${x} ${y - 24}A24 24 0 1 0 ${x + 20} ${y + 13}A19 19 0 1 1 ${x} ${y - 24}Z"/>`;
  const floor = () => '<path class="sc-floor" d="M30 262H370"/><ellipse class="sc-floor-shade" cx="200" cy="264" rx="150" ry="7"/>';
  const place = (f, cx = 200, gy = 262, s = 1.18) => {
    f = resolve(f);
    return `<g transform="translate(${r1(cx - 100 * s)} ${r1(gy - 184.5 * s)}) scale(${s})">${inner(f)}</g>`;
  };
  const book = (x, y) => `<g transform="translate(${x} ${y})"><path class="sc-card" d="M0 6C14 0 28 0 40 8C52 0 66 0 80 6V52C66 46 52 46 40 54C28 46 14 46 0 52Z"/><path class="sc-line" d="M40 8V54M10 16C18 13 26 13 32 17M10 26C18 23 26 23 32 27M48 17C54 13 62 13 70 16M48 27C54 23 62 23 70 26"/></g>`;
  const card = (x, y, w, hh, body = '') => `<g transform="translate(${x} ${y})"><rect class="sc-card" width="${w}" height="${hh}" rx="10"/>${body}</g>`;
  const check = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><circle class="sc-accent" r="9"/><path class="sc-check" d="M-4 0L-1 3L4.5-3"/></g>`;
  const calendar = (x, y) => card(x, y, 78, 70, `<rect class="sc-accent" width="78" height="16" rx="8"/><rect class="sc-accent" y="8" width="78" height="8"/>${[0, 1, 2, 3].map(r => [0, 1, 2, 3].map(c => {
    const on = r * 4 + c < 9;
    return `<rect class="${on ? 'sc-dot-on' : 'sc-dot'}" x="${8 + c * 17}" y="${22 + r * 11.5}" width="11" height="8" rx="3"/>`;
  }).join('')).join('')}`);
  const bars = (x, y) => card(x, y, 84, 74, `${[18, 28, 24, 40, 52].map((v, i) => `<rect class="${i === 4 ? 'sc-accent' : 'sc-dot-on'}" x="${10 + i * 14}" y="${62 - v}" width="9" height="${v}" rx="4.5"/>`).join('')}<path class="sc-line" d="M8 64H76"/>`);
  const ringCard = (x, y) => card(x, y, 70, 70, `<circle class="sc-ring-bg" cx="35" cy="35" r="22"/><path class="sc-ring" d="M35 13A22 22 0 1 1 13.3 38.6"/><text class="sc-text" x="35" y="40" text-anchor="middle">%72</text>`);
  const medal = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path class="sc-ribbon" d="M-14-38L-4-12H6L-4-38ZM14-38L4-12H-6L4-38Z"/><circle class="sc-accent" r="22"/><circle class="sc-medal-in" r="15"/>${sparkle(0, 0, 1.15, 'sc-medal-star')}</g>`;
  const bubble = (x, y, mark) => `<g transform="translate(${x} ${y})"><path class="sc-card" d="M0 10A10 10 0 0 1 10 0H58A10 10 0 0 1 68 10V36A10 10 0 0 1 58 46H24L12 58V46H10A10 10 0 0 1 0 36Z"/>${mark}</g>`;
  const waves = (x, y) => [0, 1, 2].map(i => `<path class="sc-wave" style="opacity:${0.85 - i * 0.25}" d="M${x + i * 12} ${y - 22 - i * 8}C${x + 16 + i * 14} ${y - 8} ${x + 16 + i * 14} ${y + 8} ${x + i * 12} ${y + 22 + i * 8}"/>`).join('');
  const books = (x, y) => `<g transform="translate(${x} ${y})"><rect class="sc-accent" x="0" y="-18" width="70" height="16" rx="4"/><rect class="sc-card" x="6" y="-36" width="62" height="16" rx="4"/><rect class="sc-dot-on" x="-2" y="-54" width="66" height="16" rx="4"/><path class="sc-line" d="M10-10H40M14-28H50M8-46H44"/></g>`;
  const timer = (x, y) => `<g transform="translate(${x} ${y})"><rect class="sc-accent" x="-6" y="-36" width="12" height="7" rx="3"/><circle class="sc-card" r="27"/><path class="sc-ring" d="M0-19A19 19 0 0 1 17.2 8"/><path class="sc-line" d="M0 0V-12M0 0L8 5"/></g>`;
  const swatches = (x, y) => `<g transform="translate(${x} ${y})">${['sc-accent', 'sc-dot-on', 'sc-sun', 'sc-leaf'].map((c, i) => `<circle class="${c}" cx="${i * 20}" cy="${(i % 2) * -12}" r="11"/>`).join('')}</g>`;
  const qmark = (x, y) => `<g transform="translate(${x} ${y})"><circle class="sc-card" r="24"/><path class="sc-q" d="M-7-6A7.5 7.5 0 1 1 3 1C0 3 0 5 0 8"/><circle class="sc-accent" cy="15" r="2.6"/></g>`;
  const stars = () => sparkle(70, 70, 0.9) + sparkle(340, 150, 0.7) + sparkle(96, 130, 0.55);
  const nightStars = () => [[72, 64, 1], [104, 112, 0.6], [330, 140, 0.8], [350, 60, 0.55], [300, 214, 0.5]].map(([x, y, s]) => sparkle(x, y, s, 'sc-star')).join('');

  const SCENES = {
    hero: () => `${arch()}${sun(290, 72)}${stars()}${floor()}${leafSprig(64, 262, 1.05)}${pot(64, 262)}${place('savasci-2', 200, 262, 1.24)}`,
    baslangic: () => `${arch()}${sun(108, 78, 20)}${floor()}${card(286, 120, 74, 92, [0, 1, 2].map(i => `${check(16, 22 + i * 26, 0.8)}<rect class="sc-dot" x="30" y="${18 + i * 26}" width="34" height="7" rx="3.5"/>`).join(''))}<rect class="sc-mat-roll" x="40" y="236" width="70" height="26" rx="13"/><circle class="sc-mat-end" cx="53" cy="249" r="10"/>${place('tadasana', 200, 262, 1.18)}`,
    moduller: () => `${arch()}${sun(296, 70, 20)}${floor()}${book(276, 158)}${leafSprig(78, 262, 0.95)}${pot(78, 262)}${place('nefes', 196, 262, 1.25)}`,
    pozlar: () => `${arch()}${sun(298, 68)}${stars()}${floor()}${leafSprig(330, 262, 1, -1)}${pot(330, 262)}${place('agac', 200, 262, 1.2)}`,
    nefes: () => `${arch()}${floor()}${waves(262, 150)}<g transform="translate(400 0) scale(-1 1)">${waves(262, 150)}</g>${sparkle(300, 82, 0.9)}${leafSprig(66, 262, 0.9)}${place('nefes', 200, 262, 1.25)}`,
    meditasyon: () => `${arch({ night: true })}${moon(292, 70)}${nightStars()}${floor()}<rect class="sc-candle" x="310" y="224" width="14" height="38" rx="4"/><path class="sc-flame" d="M317 206C322 214 323 219 317 222C311 219 312 214 317 206Z"/>${place('nefes', 200, 262, 1.25)}`,
    program: () => `${arch()}${sun(108, 74, 18)}${floor()}${calendar(286, 112)}${place('kobra', 192, 262, 1.22)}`,
    panel: () => `${arch()}${floor()}${bars(290, 100)}${ringCard(36, 120)}${place('yarim-ay', 204, 262, 1.15)}`,
    quiz: () => `${arch()}${floor()}${bubble(286, 86, `${check(22, 22)}<rect class="sc-dot" x="36" y="18" width="22" height="7" rx="3.5"/>`)}${bubble(40, 120, `<path class="sc-q" transform="translate(34 16) scale(.8)" d="M-7-6A7.5 7.5 0 1 1 3 1C0 3 0 5 0 8"/><circle class="sc-accent" cx="34" cy="31" r="2.2"/>`)}${place('oturus', 196, 262, 1.18)}`,
    rozetler: () => `${arch()}${stars()}${floor()}${medal(298, 120, 1.1)}${medal(84, 168, 0.8)}${place('ayakta', 196, 262, 1.18)}`,
    kaynakca: () => `${arch()}${sun(292, 70, 18)}${floor()}${books(286, 262)}${book(42, 150)}${place('nefes', 196, 262, 1.22)}`,
    programlar: () => `${arch({ x0: 128, x1: 272 })}${floor()}${timer(330, 120)}${place('tadasana', 92, 262, 0.82)}${place('savasci-1', 200, 262, 1.12)}${place('agac', 322, 262, 0.82)}`,
    ayarlar: () => `${arch()}${floor()}${swatches(276, 110)}${leafSprig(70, 262, 0.95)}${pot(70, 262)}${place('tadasana', 200, 262, 1.18)}`,
    kayip: () => `${arch()}${floor()}${qmark(300, 96)}${stars()}${place('balasana', 200, 262, 1.25)}`
  };
  /** Sahne SVG'si; poz kimlikleri hem YA.poses hem YA.extraFigs içinden çözülür */
  function scene(name, label, cls) {
    const fn = SCENES[name]; if (!fn) return '';
    const body = fn();
    return `<svg class="scene ${cls || ''}" viewBox="0 0 400 300" role="img" aria-label="${esc(label || '')}">${body}</svg>`;
  }

  /** Logo işareti: kemer + oturan figür + güneş */
  const mark = (size = 34) => `<svg class="arl-mark" width="${size}" height="${size}" viewBox="0 0 64 64" aria-hidden="true"><rect width="64" height="64" rx="18" class="m-bg"/><path class="m-arch" d="M17 50V30A15 15 0 0 1 47 30V50"/><circle class="m-sun" cx="45" cy="17" r="4.2"/><circle class="m-fig" cx="32" cy="27.5" r="4"/><path class="m-fig" d="M32 33C27 33 25.5 37 25.5 41.5L22 46C26 47.5 29 48 32 48S38 47.5 42 46L38.5 41.5C38.5 37 37 33 32 33Z"/></svg>`;

  return { svg, inner, morph, mix, resolve, scene, mark, focusFrom };
})();
