/* ==========================================================================
   Yoga Akademisi – Görsel anlatım bileşenleri (SVG + CSS)
   Metni infografiğe dönüştüren küçük, veri odaklı bileşenler. Hepsi tema
   değişkenleriyle renklenir, animasyon kullanmaz ve metin alternatifi içerir.
   ========================================================================== */
const Viz = (() => {
  const h = (s) => App.h(s);
  const ic = (n) => App.icon(n);
  const yi = (n) => App.yi(n);
  const fig = (title, body, cap, cls) => `<figure class="vz ${cls || ''}">${title ? `<figcaption class="vz-title">${title}</figcaption>` : ''}${body}${cap ? `<p class="vz-cap">${cap}</p>` : ''}</figure>`;

  /* ---------- Akış / süreç (yatay ya da dikey) */
  function flow(items, o = {}) {
    return fig(o.title, `<ol class="vz-flow ${o.vertical ? 'vertical' : ''}" ${o.label ? `aria-label="${h(o.label)}"` : ''}>${items.map((it, i) => `
      <li class="vz-node ${it.state || ''}">
        <span class="vz-num" aria-hidden="true">${it.icon ? ic(it.icon) : (o.numbers === false ? '' : i + 1)}</span>
        <div class="vz-node-body">${it.title ? `<strong>${it.href ? `<a href="${it.href}">${h(it.title)}</a>` : h(it.title)}</strong>` : ''}${it.text ? `<p>${it.html ? it.text : h(it.text)}</p>` : ''}
        ${it.tags ? `<span class="vz-tags">${it.tags.map(t => `<span class="vz-tag ${t.kind || ''}">${t.icon ? ic(t.icon) : ''}${h(t.label)}</span>`).join('')}</span>` : ''}</div>
      </li>`).join('')}</ol>`, o.cap);
  }

  /* ---------- Zihin haritası: merkez + dallar (masaüstünde iki yana, mobilde dikey) */
  function mindmap(center, branches, o = {}) {
    const half = Math.ceil(branches.length / 2);
    const br = (b) => `<div class="vz-branch">${b.icon ? `<span class="vz-branch-ic">${yi(b.icon)}</span>` : ''}<div>
        <strong>${b.href ? `<a href="${b.href}">${h(b.title)}</a>` : h(b.title)}</strong>
        ${b.items ? `<ul>${b.items.map(x => `<li>${h(x)}</li>`).join('')}</ul>` : ''}${b.text ? `<p>${h(b.text)}</p>` : ''}</div>
        ${b.done != null ? `<span class="vz-dot ${b.done ? 'on' : ''}" title="${b.done ? 'Tamamlandı' : 'Henüz değil'}"></span>` : ''}</div>`;
    return fig(o.title, `<div class="vz-mind" role="group" aria-label="${h(center)} konu haritası">
      <div class="vz-mind-side left">${branches.slice(0, half).map(br).join('')}</div>
      <div class="vz-mind-center"><span>${h(center)}</span>${o.sub ? `<small>${h(o.sub)}</small>` : ''}</div>
      <div class="vz-mind-side right">${branches.slice(half).map(br).join('')}</div></div>`, o.cap);
  }

  /* ---------- Döngü halkası (nefes ritmi vb.) */
  function arcPath(cx, cy, r, a0, a1) {
    const p = (a) => [cx + r * Math.cos(a), cy + r * Math.sin(a)];
    const [x0, y0] = p(a0), [x1, y1] = p(a1);
    return `M${x0.toFixed(1)} ${y0.toFixed(1)}A${r} ${r} 0 ${a1 - a0 > Math.PI ? 1 : 0} 1 ${x1.toFixed(1)} ${y1.toFixed(1)}`;
  }
  function cycle(segs, o = {}) {
    const total = segs.reduce((a, s) => a + s.value, 0) || 1;
    const gap = segs.length > 1 ? 0.06 : 0; let a = -Math.PI / 2;
    const arcs = segs.map((s, i) => { const span = (s.value / total) * Math.PI * 2; const d = arcPath(100, 100, 74, a + gap / 2, a + span - gap / 2);
      const mid = a + span / 2; a += span;
      const lx = 100 + 74 * Math.cos(mid), ly = 100 + 74 * Math.sin(mid);
      return `<path d="${d}" class="vz-arc k-${s.kind || 'n' + (i % 4)}"/><circle cx="${lx.toFixed(1)}" cy="${ly.toFixed(1)}" r="11" class="vz-arc-dot"/><text x="${lx.toFixed(1)}" y="${(ly + 4).toFixed(1)}" class="vz-arc-num">${i + 1}</text>`; }).join('');
    const svg = `<svg viewBox="0 0 200 200" class="vz-cycle-svg" role="img" aria-label="${h(o.label || 'Döngü diyagramı')}">${arcs}
      <text x="100" y="96" class="vz-center-big">${h(o.center || '')}</text><text x="100" y="116" class="vz-center-small">${h(o.centerSub || '')}</text></svg>`;
    const legend = `<ol class="vz-legend">${segs.map((s, i) => `<li><span class="sw k-${s.kind || 'n' + (i % 4)}"></span><b>${i + 1}.</b> ${h(s.label)}${s.note ? ` <em>${h(s.note)}</em>` : ''}</li>`).join('')}</ol>`;
    return fig(o.title, `<div class="vz-cycle">${svg}${legend}</div>`, o.cap);
  }
  const loop = (labels, o = {}) => cycle(labels.map((l, i) => ({ label: l, value: 1, kind: 'n' + (i % 4) })), o);

  /* ---------- Basamaklar (yükselen yol) */
  function stairs(items, o = {}) {
    return fig(o.title, `<ol class="vz-stairs">${items.map((it, i) => `<li style="--i:${i};--n:${items.length}" class="${it.group || ''}">
      <span class="vz-step-n">${i + 1}</span><div><strong>${h(it.title)}</strong><span>${h(it.text)}</span></div></li>`).join('')}</ol>
      ${o.groups ? `<div class="vz-stairs-groups">${o.groups.map(g => `<span class="${g.cls}">${h(g.label)}</span>`).join('')}</div>` : ''}`, o.cap);
  }

  /* ---------- Venn (2 ya da 3 küme) */
  function venn(sets, o = {}) {
    if (sets.length === 3) {
      const svg = `<svg viewBox="0 0 260 230" class="vz-venn-svg" role="img" aria-label="${h(o.label || '')}">
        <circle cx="95" cy="88" r="62" class="vs a"/><circle cx="165" cy="88" r="62" class="vs b"/><circle cx="130" cy="148" r="62" class="vs c"/>
        <text x="72" y="70" class="vt">${h(sets[0].title)}</text><text x="188" y="70" class="vt">${h(sets[1].title)}</text><text x="130" y="190" class="vt">${h(sets[2].title)}</text>
        <text x="130" y="112" class="vt center">${h(o.center || '')}</text></svg>`;
      return fig(o.title, `<div class="vz-venn">${svg}<ul class="vz-venn-list three">${sets.map((s, i) => `<li><span class="sw v${i}"></span><strong>${h(s.title)}</strong><p>${h(s.text)}</p></li>`).join('')}</ul></div>`, o.cap);
    }
    const svg = `<svg viewBox="0 0 280 170" class="vz-venn-svg" role="img" aria-label="${h(o.label || '')}">
      <circle cx="105" cy="85" r="72" class="vs a"/><circle cx="175" cy="85" r="72" class="vs b"/>
      <text x="72" y="89" class="vt">${h(sets[0].title)}</text><text x="208" y="89" class="vt">${h(sets[1].title)}</text><text x="140" y="89" class="vt center">Ortak</text></svg>`;
    const col = (t, items, cls) => `<div class="${cls}"><strong>${h(t)}</strong><ul>${items.map(x => `<li>${h(x)}</li>`).join('')}</ul></div>`;
    return fig(o.title, `<div class="vz-venn">${svg}<div class="vz-venn-cols">${col('Yalnızca ' + sets[0].title.toLocaleLowerCase('tr'), sets[0].items, 'a')}${col('Her ikisinde', o.both, 'ab')}${col('Yalnızca ' + sets[1].title.toLocaleLowerCase('tr'), sets[1].items, 'b')}</div></div>`, o.cap);
  }

  /* ---------- Dağılım (iki eksenli konumlandırma) */
  function scatter(points, o = {}) {
    const L = 64, R = 344, T = 26, B = 226, X = (v) => L + v * (R - L) / 100, Y = (v) => B - v * (B - T) / 100;
    const grid = [25, 50, 75].map(v => `<path class="sc2-grid" d="M${X(v)} ${T}V${B}M${L} ${Y(v)}H${R}"/>`).join('');
    const zone = o.zone ? `<rect x="${X(o.zone[0])}" y="${Y(o.zone[3])}" width="${X(o.zone[1]) - X(o.zone[0])}" height="${Y(o.zone[2]) - Y(o.zone[3])}" rx="12" class="sc2-zone"/>
      <g class="sc2-zone-tag" transform="translate(${X(o.zone[0]) + 2} ${Y(o.zone[3]) - 22})"><rect width="${(o.zoneLabel || '').length * 6.4 + 22}" height="18" rx="9"/><circle cx="10" cy="9" r="3.5"/><text x="18" y="13">${h(o.zoneLabel || '')}</text></g>` : '';
    const pts = points.map((p, i) => {
      const cx = X(p.x), cy = Y(p.y), end = p.anchor === 'end';
      return `<g class="sc2-pt k-n${i % 5}"><circle cx="${cx}" cy="${cy}" r="13" class="halo"/><circle cx="${cx}" cy="${cy}" r="7.5" class="dot"/>
        <text x="${cx + (end ? -14 : 14)}" y="${cy + 4.5}" text-anchor="${end ? 'end' : 'start'}">${h(p.label)}</text></g>`;
    }).join('');
    const svg = `<svg viewBox="0 0 360 272" class="vz-scatter-svg sc2" role="img" aria-label="${h(o.label || '')}">
      ${grid}${zone}<path d="M${L} ${T - 6}V${B}H${R + 6}" class="sc2-axis"/>
      <text x="${L}" y="${B + 20}" class="sc2-tick">yavaş</text><text x="${R}" y="${B + 20}" class="sc2-tick end">hızlı</text>
      <text x="${(L + R) / 2}" y="${B + 40}" class="sc2-axis-t">${h(o.x)} →</text>
      <text x="${L - 10}" y="${B}" class="sc2-tick end">hafif</text><text x="${L - 10}" y="${T + 6}" class="sc2-tick end">yoğun</text>
      <text x="18" y="${(T + B) / 2}" class="sc2-axis-t" transform="rotate(-90 18 ${(T + B) / 2})">${h(o.y)} →</text>${pts}</svg>`;
    const list = `<ul class="vz-scatter-list sc2-list">${points.map((p, i) => `<li><span class="sw k-n${i % 5}"></span><div><strong>${h(p.label)}</strong><span>${h((p.text || '').replace(/^–\s*/, ''))}</span></div></li>`).join('')}</ul>`;
    return fig(o.title, `<div class="vz-scatter">${svg}${list}</div>`, o.cap);
  }

  /* ---------- Zaman çizelgesi */
  function timeline(events, o = {}) {
    return fig(o.title, `<ol class="vz-time">${events.map(e => `<li><span class="vz-when">${h(e.when)}</span><span class="vz-pin" aria-hidden="true"></span><div><strong>${h(e.title)}</strong><p>${h(e.text)}</p></div></li>`).join('')}</ol>`, o.cap);
  }

  /* ---------- Karşılaştırma (iki sütun) */
  function compare(a, b, o = {}) {
    const side = (s, cls) => `<div class="vz-cmp-side ${cls} ${s.tone || ''}"><div class="vz-cmp-head">${s.icon ? ic(s.icon) : ''}<strong>${h(s.title)}</strong></div><ul>${s.items.map(x => `<li>${o.html ? x : h(x)}</li>`).join('')}</ul></div>`;
    return fig(o.title, `<div class="vz-cmp">${side(a, 'l')}<span class="vz-vs" aria-hidden="true">${h(o.vs || 've')}</span>${side(b, 'r')}</div>`, o.cap);
  }

  /* ---------- Segment çubuğu (oranlar, süreler) */
  function segbar(segs, o = {}) {
    const total = segs.reduce((a, s) => a + s.value, 0) || 1;
    const bar = `<div class="vz-seg" role="img" aria-label="${h(o.label || segs.map(s => `${s.label}: ${s.value}`).join(', '))}">${segs.map((s, i) => `<span class="k-${s.kind || 'n' + (i % 4)}" style="flex:${s.value}" title="${h(s.label)}: ${h(s.display || s.value)}">${o.inline !== false && s.value / total > 0.09 ? `<em>${h(s.short || s.display || s.value)}</em>` : ''}</span>`).join('')}</div>`;
    const legend = o.legend === false ? '' : `<ul class="vz-seg-legend">${(o.legendItems || segs).map((s, i) => `<li><span class="sw k-${s.kind || 'n' + (i % 4)}"></span>${h(s.label)}${s.display != null ? ` <b>${h(s.display)}</b>` : ''}</li>`).join('')}</ul>`;
    return fig(o.title, bar + (o.scale ? `<div class="vz-seg-scale"><span>0</span><span>${h(o.scale)}</span></div>` : '') + legend, o.cap);
  }

  /* ---------- İkon ızgarası */
  function iconGrid(items, o = {}) {
    return fig(o.title, `<ul class="vz-icons ${o.tone || ''}">${items.map(it => `<li><span class="vz-ic">${it.yi ? yi(it.yi) : ic(it.icon)}</span><strong>${h(it.title)}</strong>${it.text ? `<p>${h(it.text)}</p>` : ''}</li>`).join('')}</ul>`, o.cap);
  }

  /* ---------- Ölçek (ör. mat kalınlığı) */
  function scale(o) {
    const pct = (v) => ((v - o.min) / (o.max - o.min)) * 100;
    return fig(o.title, `<div class="vz-scale" role="img" aria-label="${h(o.label)}">
      <div class="vz-scale-track"><span class="vz-scale-band" style="left:${pct(o.band[0])}%;width:${pct(o.band[1]) - pct(o.band[0])}%"><em>${h(o.bandLabel)}</em></span></div>
      <div class="vz-scale-ticks">${o.ticks.map(t => `<span style="left:${pct(t.v)}%"><b>${h(t.v + (o.unit || ''))}</b>${h(t.label || '')}</span>`).join('')}</div></div>`, o.cap);
  }

  /* ---------- Vücut haritası (ön / arka) */
  const REGION_LABEL = { neck: 'Boyun', shoulders: 'Omuzlar', arms: 'Kollar', chest: 'Göğüs', core: 'Karın (core)', hipflex: 'Kalça bükücüler', quads: 'Ön uyluk', back: 'Sırt', glutes: 'Kalça kasları', hamstrings: 'Arka uyluk', calves: 'Baldır ve bacak' };
  const SHAPES = [
    ['neck', 'neck', 'r', 54, 33, 12, 9, 3], ['shoulders', 'shoulders', 'r', 28, 42, 24, 14, 7], ['shoulders', 'shoulders', 'r', 68, 42, 24, 14, 7],
    ['chest', 'back', 'r', 42, 44, 36, 28, 8], ['core', 'back', 'r', 44, 74, 32, 34, 8],
    ['arms', 'arms', 'r', 22, 58, 13, 38, 6], ['arms', 'arms', 'r', 85, 58, 13, 38, 6], ['arms', 'arms', 'r', 20, 98, 12, 36, 6], ['arms', 'arms', 'r', 88, 98, 12, 36, 6],
    ['hipflex', 'glutes', 'r', 42, 110, 36, 17, 8],
    ['quads', 'hamstrings', 'r', 42, 129, 17, 52, 8], ['quads', 'hamstrings', 'r', 61, 129, 17, 52, 8],
    ['calves', 'calves', 'r', 44, 184, 13, 50, 6], ['calves', 'calves', 'r', 63, 184, 13, 50, 6]
  ];
  /* Bölge → kas eşlemesi: atlas çizimindeki kaslar bölge açıkken "aktif" renklenir */
  const REGION_MUSCLES = { neck: ['neck', 'trapezius'], shoulders: ['deltoid'], arms: ['biceps', 'triceps', 'forearm'], chest: ['pectoralis', 'serratus'],
    core: ['rectusAbd', 'obliques'], hipflex: ['hipFlexors'], quads: ['quadriceps'], back: ['trapezius', 'latissimus', 'erector'], glutes: ['gluteusMax', 'gluteusMed'],
    hamstrings: ['hamstrings'], calves: ['gastrocnemius', 'tibialis'] };
  function bodySvg(active, back) {
    const on = new Set(active.flatMap(r => REGION_MUSCLES[r] || []));
    return AnatomyArt.svg(back ? 'back' : 'front', { role: (id) => on.has(id) ? 'a' : 'n', cls: 'vz-body-svg', label: back ? 'Arka görünüm' : 'Ön görünüm' }).replace('role="img"', 'aria-hidden="true"');
  }
  function bodymap(regions, o = {}) {
    const names = regions.map(r => REGION_LABEL[r]).filter(Boolean);
    return fig(o.title, `<div class="vz-body" role="img" aria-label="Çalışan bölgeler: ${h(names.join(', ') || 'yok')}">
      <div class="vz-body-views"><div>${bodySvg(regions, false)}<span>Ön</span></div><div>${bodySvg(regions, true)}<span>Arka</span></div></div>
      ${o.list === false ? '' : `<ul class="vz-body-list">${names.length ? names.map(n => `<li><span class="sw on"></span>${h(n)}</li>`).join('') : '<li>Aktif kas çalışması yok – tamamen gevşeme.</li>'}</ul>`}</div>`, o.cap);
  }

  /* ---------- Halka (yüzde) */
  function donut(pct, label, sub) {
    const r = 42, c = 2 * Math.PI * r, v = Math.max(0, Math.min(100, pct));
    return `<div class="vz-donut"><svg viewBox="0 0 110 110" role="img" aria-label="${h(label)}: %${Math.round(v)}"><circle cx="55" cy="55" r="${r}" class="vd-bg"/>
      <circle cx="55" cy="55" r="${r}" class="vd-fg" stroke-dasharray="${(c * v / 100).toFixed(1)} ${c.toFixed(1)}" transform="rotate(-90 55 55)"/>
      <text x="55" y="61" class="vd-t">%${Math.round(v)}</text></svg><strong>${h(label)}</strong>${sub ? `<span>${h(sub)}</span>` : ''}</div>`;
  }

  /* ---------- Isı haritası takvimi (günlük dakika) */
  function heatmap(days, goal) {
    const max = Math.max(goal, ...days.map(d => d.minutes));
    const first = new Date(days[0].date + 'T12:00:00'); const pad = (first.getDay() + 6) % 7; // Pazartesi başlangıç
    const cells = Array(pad).fill('<span class="hm empty"></span>').concat(days.map(d => {
      const lvl = d.minutes <= 0 ? 0 : d.minutes >= goal ? (d.minutes >= max * 0.8 && max > goal ? 4 : 3) : d.minutes >= goal / 2 ? 2 : 1;
      return `<span class="hm l${lvl}" title="${App.fmtDate(d.date)}: ${d.minutes} dk"></span>`;
    })).join('');
    return `<div class="vz-heat"><div class="vz-heat-days" aria-hidden="true"><span>Pzt</span><span></span><span>Çar</span><span></span><span>Cum</span><span></span><span>Paz</span></div>
      <div class="vz-heat-grid" role="img" aria-label="Günlük pratik ısı haritası, ${days.filter(d => d.minutes > 0).length} aktif gün">${cells}</div></div>
      <div class="vz-heat-legend"><span>Az</span><span class="hm l0"></span><span class="hm l1"></span><span class="hm l2"></span><span class="hm l3"></span><span class="hm l4"></span><span>Çok</span><span class="muted">· hedef: ${goal} dk</span></div>`;
  }

  /* ================================================================ İçerik eşlemeleri */
  /** Pozların çalıştırdığı bölgeler (vücut haritası için) */
  const POSE_REGIONS = {
    tadasana: ['quads', 'core', 'back', 'calves'], balasana: ['back', 'glutes', 'shoulders'], 'kedi-inek': ['back', 'core', 'neck', 'shoulders'],
    'asagi-kopek': ['hamstrings', 'calves', 'shoulders', 'arms', 'back', 'core'], kobra: ['back', 'glutes', 'chest'],
    'savasci-1': ['quads', 'glutes', 'hipflex', 'shoulders', 'core'], 'savasci-2': ['quads', 'glutes', 'shoulders', 'arms'],
    agac: ['calves', 'quads', 'glutes', 'core'], kopru: ['glutes', 'hamstrings', 'back', 'hipflex', 'chest'],
    'oturarak-one-egilme': ['hamstrings', 'calves', 'back'], 'sirtustu-burgu': ['back', 'core', 'glutes', 'chest'], savasana: [],
    ucgen: ['hamstrings', 'core', 'quads', 'shoulders'], sandalye: ['quads', 'glutes', 'core', 'back', 'shoulders'],
    'yan-aci': ['quads', 'glutes', 'core', 'shoulders'], 'yarim-ay': ['glutes', 'quads', 'core', 'calves'],
    karga: ['arms', 'shoulders', 'core', 'hipflex'], kayik: ['core', 'hipflex', 'back']
  };
  const BREATH_RE = { in: /nefes al/i, out: /nefes ver/i };

  /** Modül bölümlerine eşlik eden infografikler */
  const SECTION = {
    'm1/nedir': () => mindmap('Yoga', [
      { title: 'Asana', icon: 'pose', items: ['Fiziksel duruşlar', 'Kuvvet, denge, hareketlilik'], href: '#/pozlar' },
      { title: 'Pranayama', icon: 'wind', items: ['Nefesin ritmi ve derinliği', 'Sakinleşme'], href: '#/nefes' },
      { title: 'Meditasyon', icon: 'lotus', items: ['Dikkat ve farkındalık', 'Gevşeme'], href: '#/meditasyon' }
    ], { title: 'Modern yoganın üç bileşeni', sub: 'zihin–beden uygulaması' }),
    'm1/tarihce': () => timeline([
      { when: 'Antik dönem', title: 'Vedalar ve Upanişadlar', text: 'Meditasyon ve iç gözleme dair ilk metinler.' },
      { when: 'MÖ 2. – MS 5. yy', title: 'Yoga Sutraları', text: 'Patanjali; sekiz basamaklı yol.' },
      { when: '11.–15. yy', title: 'Hatha Yoga metinleri', text: 'Duruş ve nefes ön plana çıkar.' },
      { when: '1893', title: 'Batı’ya açılış', text: 'Vivekananda, Chicago.' },
      { when: '20. yy', title: 'Modern duruş yogası', text: 'Krishnamacharya ve öğrencileri.' }
    ], { title: 'Yoganın tarih şeridi' }),
    'm1/felsefe': () => stairs([
      { title: 'Yama', text: 'Etik ilkeler', group: 'outer' }, { title: 'Niyama', text: 'Kişisel disiplin', group: 'outer' },
      { title: 'Asana', text: 'Duruş', group: 'outer' }, { title: 'Pranayama', text: 'Nefes', group: 'outer' },
      { title: 'Pratyahara', text: 'Duyuları içe çekme', group: 'inner' }, { title: 'Dharana', text: 'Konsantrasyon', group: 'inner' },
      { title: 'Dhyana', text: 'Meditasyon', group: 'inner' }, { title: 'Samadhi', text: 'Bütünleşme', group: 'inner' }
    ], { title: 'Sekiz basamak (Ashtanga) – geleneksel çerçeve', groups: [{ label: '1–4 Dış uygulamalar', cls: 'outer' }, { label: '5–8 İç uygulamalar', cls: 'inner' }] }),
    'm1/boyutlar': () => compare(
      { title: 'Fiziksel boyut', icon: 'dumbbell', items: ['Kas kuvveti', 'Eklem hareketliliği', 'Esneklik ve denge', 'Beden farkındalığı'] },
      { title: 'Zihinsel boyut', icon: 'brain', items: ['Nefese dikkat', 'Şimdiye odaklanma', 'Gevşeme', 'Stresle başa çıkmaya destek'] },
      { title: 'Yoga iki düzlemde birlikte çalışır', vs: '+' }),
    'm1/turler': () => scatter([
      { label: 'Restoratif', x: 8, y: 8, text: '– destekli, en sakin' }, { label: 'Yin', x: 16, y: 30, text: '– pasif, uzun tutuşlar' },
      { label: 'Hatha', x: 38, y: 42, text: '– tek tek, yavaş; başlangıç için ideal' }, { label: 'Vinyasa', x: 72, y: 64, text: '– nefesle akış' },
      { label: 'Ashtanga', x: 88, y: 88, anchor: 'end', text: '– sabit seri, yoğun' }
    ], { title: 'Yoga stilleri: tempo ve yoğunluk', x: 'Tempo', y: 'Fiziksel yoğunluk', zone: [0, 50, 0, 50], zoneLabel: 'Başlangıç için uygun', label: 'Yoga stillerinin tempo ve yoğunluğa göre konumu' }),
    'm1/meditasyon-farki': () => venn([
      { title: 'Yoga', items: ['Duruşlar ve hareket', 'Kas çalışması', 'Akışlar'] },
      { title: 'Meditasyon', items: ['Hareketsiz oturuş', 'Tek bir odak', 'Tek başına uygulanabilir'] }
    ], { both: ['Nefes farkındalığı', 'Dikkati toplama', 'Gevşeme'], title: 'Yoga ve meditasyon: farklar ve ortak alan', label: 'Yoga ve meditasyonun kesişimi' }),
    'm2/ekipman': () => iconGrid([
      { icon: 'layers', title: 'Mat', text: 'Kaymaz zemin · ev alternatifi: katlanmış battaniye' },
      { icon: 'box', title: 'Blok (2)', text: 'Zemini yükseltir · alternatif: kalın kitap' },
      { icon: 'link', title: 'Kayış', text: 'Kolu uzatır · alternatif: kemer, havlu' },
      { icon: 'bed', title: 'Battaniye', text: 'Destek ve sıcaklık' },
      { icon: 'droplet', title: 'Su', text: 'Pratik öncesi ve sonrası' }
    ], { title: 'Başlangıç ekipmanı ve evdeki karşılıkları' }),
    'm1/yanlislar': () => compare(
      { title: 'Yaygın yanlış', icon: 'circle-x', tone: 'bad', items: ['Önce esnek olmak gerekir', 'Ne kadar acıtırsa o kadar etkili', 'Yalnızca kadınlar / gençler içindir', 'Tıbbi tedavinin yerini alabilir', 'Hiç yaralanma riski yoktur'] },
      { title: 'Doğrusu', icon: 'circle-check', tone: 'good', items: ['Esneklik pratikle gelir; destekler bunun için var', 'Keskin ağrı bir uyarıdır, dur', 'Her yaşa ve bedene uyarlanabilir', 'Bazı kişilerde yardımcı olabilir; tıbbi değerlendirme veya tedavinin yerine geçmez', 'Yaralanma olabilir; zorlamadan, kendi sınırınla çalış'] },
      { title: 'Doğru bilinen yanlışlar ve gerçekleri', vs: '→' }),
    'm2/blok-kayis': () => compare(
      { title: 'Blok', icon: 'box', items: ['Zemini yükseltir', '3 farklı yükseklik', 'Ör. Üçgen’de eli bloğa koy'] },
      { title: 'Kayış', icon: 'link', items: ['Kolu uzatır', 'Ayak tabanından geçir', 'Ör. Oturarak Öne Eğilme'] }, { title: 'İki temel destek', vs: '+' }),
    'm2/kiyafet': () => iconGrid([
      { icon: 'shirt', title: 'Esneyen, oturan kıyafet', text: 'Çok bol değil' }, { icon: 'wind', title: 'Nefes alan kumaş' },
      { icon: 'footprints', title: 'Çıplak ayak', text: 'Kaymaz, tabanı hissettirir' }, { icon: 'watch', title: 'Takıları çıkar' }, { icon: 'bed', title: 'Gevşeme için örtü' }
    ], { title: 'Kıyafet kontrol listesi' }),
    'm2/ortam': () => iconGrid([
      { icon: 'maximize', title: '2 × 2,5 m alan', text: 'Kollar açıkken çarpma yok' }, { icon: 'square', title: 'Düz, kaymaz zemin' },
      { icon: 'thermometer', title: 'Havalandırılmış oda' }, { icon: 'bell-off', title: 'Bildirimler sessizde' },
      { icon: 'utensils', title: 'Yemekten sonra bekle', text: 'Ağır: 2–3 sa · hafif: ~1 sa' }, { icon: 'clock', title: 'Aynı saat, aynı köşe', text: 'Alışkanlığı kolaylaştırır' }
    ], { title: 'Pratik alanı hazırlığı' }),
    'm2/hatalar': () => flow([
      { title: 'Nefesi tutmak', text: '→ duruşu hafiflet' }, { title: 'Kıyaslamak', text: '→ kendi bedenine bak' }, { title: 'Eklemleri kilitlemek', text: '→ hafif büküm bırak' },
      { title: 'Isınmadan derin esneme', text: '→ önce Kedi-İnek' }, { title: 'Savasana’yı atlamak', text: '→ gevşemeyle bitir' }, { title: 'Çok uzun başlamak', text: '→ 5–15 dk yeterli' },
      { title: 'Destekten çekinmek', text: '→ blok ve kayış kullan' }
    ], { title: 'Yedi yaygın hata ve çözümü' }),
    'm5/rehberli': () => flow([
      { icon: 'flower-2', title: 'Uygulamayı seç', text: 'Nefes, beden taraması ya da farkındalık' }, { icon: 'timer', title: 'Süreyi seç', text: '3–15 dakika' },
      { icon: 'bell', title: 'Zil ile başla', text: 'Ekrandaki yönergeleri izle' }, { icon: 'bell-ring', title: 'Zil ile bitir', text: 'Süre otomatik kaydedilir' }
    ], { title: 'Rehberli meditasyon zamanlayıcısı nasıl çalışır?' }),
    'm5/nidra': () => flow([
      { title: 'Uzan ve yerleş' }, { title: 'Niyet belirle' }, { title: 'Bedende dikkat gezdir' }, { title: 'Nefes farkındalığı' }, { title: 'İmgeleme' }, { title: 'Yavaşça uyan' }
    ], { title: 'Tipik bir Yoga Nidra seansının aşamaları' }),
    'm2/mat': () => scale({ title: 'Mat kalınlığı rehberi', min: 1, max: 9, unit: ' mm', band: [4, 6], bandLabel: 'Başlangıç için ideal', label: 'Önerilen mat kalınlığı 4–6 mm',
      ticks: [{ v: 2, label: ' ince · diz rahatsız olabilir' }, { v: 5, label: ' denge + konfor' }, { v: 8, label: ' kalın · denge zorlaşır' }] }),
    'm2/durus': () => flow([
      { icon: 'arrow-up', title: 'Baş', text: 'Çene yere paralel, tepe tavana uzanır' },
      { icon: 'move-horizontal', title: 'Omuzlar', text: 'Kulaklardan uzak, geriye-aşağı' },
      { icon: 'align-center-vertical', title: 'Omurga', text: 'Uzun, doğal eğriler korunur' },
      { icon: 'circle-dot', title: 'Pelvis', text: 'Nötr; bel çukuru abartılı değil' },
      { icon: 'chevrons-down-up', title: 'Dizler', text: 'Yumuşak, kilitli değil' },
      { icon: 'footprints', title: 'Ayaklar', text: 'Ağırlık eşit dağılır' }
    ], { title: 'Ayakta hizalama: baştan ayağa kontrol noktaları', vertical: true }),
    'm2/guvenlik': () => iconGrid([
      { icon: 'rotate-cw', title: 'Baş dönmesi' }, { icon: 'heart-pulse', title: 'Göğüs ağrısı' }, { icon: 'wind', title: 'Nefes darlığı' },
      { icon: 'zap', title: 'Keskin ağrı' }, { icon: 'hand', title: 'Uyuşma / karıncalanma' }, { icon: 'frown', title: 'Bulantı, bulanık görme' }
    ], { title: 'Bunlardan biri olursa pratiği hemen durdur', tone: 'warn' }),
    'm5/giris': () => loop(['Odağı seç (ör. nefes)', 'Dikkat dağılır – bu doğaldır', 'Dağıldığını fark et', 'Nazikçe odağa dön'], { title: 'Meditasyonun temel döngüsü', center: 'Dikkat', centerSub: 'döngüsü', label: 'Odaklanma, dağılma, fark etme ve geri dönme döngüsü' }),
    'm5/mindfulness': () => iconGrid([
      { yi: 'compass', title: 'Merak', text: '“Şu an ne hissediyorum?”' }, { yi: 'balance', title: 'Yargısızlık', text: 'İyi/kötü etiketi yok' }, { yi: 'lotus', title: 'Nezaket', text: 'Kendine kızmadan geri dön' }
    ], { title: 'Bilinçli farkındalığın üç tutumu' }),
    'm5/beden-taramasi': () => flow([
      { title: 'Ayaklar' }, { title: 'Baldır ve dizler' }, { title: 'Uyluklar ve kalça' }, { title: 'Karın ve sırt' }, { title: 'Göğüs, kollar, eller' }, { title: 'Boyun, yüz, başın tepesi' }
    ], { title: 'Beden taraması: dikkatin yolculuğu (5–15 dk)' }),
    'm5/odaklanma': () => flow([
      { title: 'Rahat otur', text: 'Omurga uzun' }, { title: 'Çapayı bul', text: 'Burun, göğüs ya da karın' },
      { title: 'Say', text: 'Al–ver = 1 … 10' }, { title: 'Kaçırdın mı?', text: '1’den yeniden başla' }
    ], { title: 'Nefes sayma meditasyonu' }),
    'm5/gunluk': () => iconGrid([
      { icon: 'smartphone', title: 'Tek nefes molası' }, { icon: 'utensils', title: 'Farkındalıkla ilk üç lokma' }, { icon: 'eye', title: '5-4-3-2-1 duyular' },
      { icon: 'footprints', title: 'Yürüyüş farkındalığı' }, { icon: 'moon', title: 'Gün sonu taraması' }
    ], { title: 'Günlük hayata taşınan mini egzersizler' }),
    'm6/omurga': () => segbar([
      { label: 'Boyun (servikal)', value: 7, display: '7 omur', kind: 'n0' }, { label: 'Sırt (torakal)', value: 12, display: '12 omur', kind: 'n1' },
      { label: 'Bel (lomber)', value: 5, display: '5 omur', kind: 'n2' }, { label: 'Sakrum + kuyruk sokumu', value: 5, display: 'kaynaşmış', kind: 'n3' }
    ], { title: 'Omurga bölümleri', label: 'Omurga: 7 boyun, 12 sırt, 5 bel omuru ve kaynaşmış sakrum' }),
    'm6/kalca': () => mindmap('Kalça eklemi', [
      { title: 'Bükücüler', items: ['İliopsoas', 'Savaşçı I’de esner'], href: '#/poz/savasci-1' },
      { title: 'Dış rotatorlar', items: ['Dizi yana açar', 'Ağaç Duruşu'], href: '#/poz/agac' },
      { title: 'Ekstansörler', items: ['Büyük kalça kası', 'Köprü Duruşu'], href: '#/poz/kopru' }
    ], { title: 'Kalça çevresindeki kas grupları', sub: 'top-yuva eklem' }),
    'm6/omuz': () => bodymap(['shoulders', 'arms', 'chest'], { title: 'Omuz kuşağı ve çevresi' }),
    'm6/hamstring': () => bodymap(['hamstrings', 'calves'], { title: 'Arka zincir: hamstring ve baldır' }),
    'm6/core': () => mindmap('Core', [
      { title: 'Ön', items: ['Rectus abdominis', 'Transversus abdominis'] }, { title: 'Yanlar', items: ['İç ve dış oblikler'] },
      { title: 'Arka', items: ['Multifidus', 'Omurga kasları'] }, { title: 'Üst ve alt', items: ['Diyafram', 'Pelvik taban'] }
    ], { title: 'Core: gövdeyi saran kas silindiri' }),
    'm6/denge': () => venn([{ title: 'Görme', text: 'Sabit bir noktaya bakmak (drishti)' }, { title: 'İç kulak', text: 'Başın konumu ve hareketi' }, { title: 'Propriosepsiyon', text: 'Kas ve eklemlerden konum bilgisi' }], { center: 'Denge', title: 'Dengeyi sağlayan üç sistem', label: 'Görme, iç kulak ve propriosepsiyonun kesişimi denge' }),
    'm6/esneklik': () => compare(
      { title: 'Statik esneme', icon: 'pause', items: ['Bir pozisyonda kalmak', 'Ör. Çocuk Duruşu', 'Pratik sonunda'] },
      { title: 'Dinamik esneme', icon: 'repeat', items: ['Kontrollü, tekrarlı hareket', 'Ör. Kedi-İnek', 'Isınmada'] }, { title: 'İki esneme biçimi', vs: 'vs' }),
    'm6/rom': () => compare(
      { title: 'Aktif hareket açıklığı', icon: 'dumbbell', items: ['Kendi kas gücünle', 'Savaşçı duruşları'] },
      { title: 'Pasif hareket açıklığı', icon: 'feather', items: ['Yerçekimi ya da destekle', 'Yin tarzı yer duruşları'] }, { title: 'Eklem hareket açıklığı (ROM)', vs: 'vs' })
  };

  /** Bir nefes tekniğinin ritim döngüsü */
  function breathCycle(b, holdOverride) {
    const p = b.pattern.slice(); if (b.box && holdOverride != null) { p[1] = holdOverride; p[3] = holdOverride; }
    const segs = [{ label: b.alternate ? 'Nefes al (bir burun deliği)' : 'Nefes al', value: p[0], kind: 'in', note: p[0] + ' sn' }];
    if (p[1]) segs.push({ label: 'Bekle (isteğe bağlı)', value: p[1], kind: 'hold', note: p[1] + ' sn' });
    segs.push({ label: b.alternate ? 'Nefes ver (diğer burun deliği)' : 'Nefes ver', value: p[2], kind: 'out', note: p[2] + ' sn' });
    if (p[3]) segs.push({ label: 'Bekle (isteğe bağlı)', value: p[3], kind: 'hold', note: p[3] + ' sn' });
    const t = p.reduce((a, v) => a + v, 0);
    return cycle(segs, { title: 'Nefes döngüsü', center: t + ' sn', centerSub: '1 tur', label: `${b.title} ritmi: ${segs.map(s => s.label + ' ' + s.note).join(', ')}`, cap: `Dakikada yaklaşık ${Math.round(60 / t)} nefes.` });
  }

  /** Programın zaman şeridi */
  function programStrip(p) {
    const kind = (s) => s.rest ? 'rest' : s.pose ? 'pose' : 'breath';
    const segs = p.steps.map(s => ({ label: s.rest ? 'Dinlenme' : s.pose ? App.poseById(s.pose).tr + (s.side ? ' (' + s.side + ')' : '') : s.name, value: s.s, kind: kind(s), display: s.s + ' sn' }));
    const sum = (k) => p.steps.filter(s => kind(s) === k).reduce((a, s) => a + s.s, 0);
    const fmt = (x) => `${Math.floor(x / 60)}:${String(x % 60).padStart(2, '0')}`;
    return segbar(segs, { title: 'Zaman şeridi', inline: false, scale: fmt(sum('pose') + sum('rest') + sum('breath')) + ' dk',
      legendItems: [{ label: 'Duruş', kind: 'pose', display: fmt(sum('pose')) }, { label: 'Nefes / oturuş', kind: 'breath', display: fmt(sum('breath')) }, { label: 'Dinlenme', kind: 'rest', display: fmt(sum('rest')) }],
      label: `${p.title}: ${p.steps.length} adım` });
  }

  /** Bir pozun bütün bilgilerini görsel kartlara dönüştürür */
  function poseInfographic(p) {
    const tag = (txt) => BREATH_RE.in.test(txt) ? [{ label: 'Nefes al', kind: 'in', icon: 'arrow-down-to-line' }] : BREATH_RE.out.test(txt) ? [{ label: 'Nefes ver', kind: 'out', icon: 'arrow-up-from-line' }] : null;
    const stages = p.steps.slice(1).map(s => ({ text: s, html: true, tags: tag(s) }));
    return `
      <div class="callout info small">${ic('info')} <div>Adımları kendi hızında uygula. Zorlanırsan hareketi bırak ya da aşağıdaki kolaylaştırılmış alternatife geç. Bu hareket herkes için uygun olmayabilir; sağlık durumundan emin değilsen uzmana danış.</div></div>
      <div class="pi-grid">
        <section class="card pi-card pi-start"><h2>${ic('flag')} Başlangıç pozisyonu</h2><p>${p.steps[0]}</p>
          <dl class="pi-facts"><div><dt>Seviye</dt><dd>${p.level === 'b' ? 'Başlangıç' : 'Orta'}</dd></div><div><dt>Süre</dt><dd>${h(p.hold)}</dd></div><div><dt>Adım</dt><dd>${p.steps.length}</dd></div></dl></section>
        <section class="card pi-card pi-breath"><h2>${ic('wind')} Nefes noktaları</h2>
          <p>${h(p.breath)}</p>
          ${stages.some(s => s.tags) ? `<p class="tiny muted">Adımlarda <span class="vz-tag in">${ic('arrow-down-to-line')}Nefes al</span> ve <span class="vz-tag out">${ic('arrow-up-from-line')}Nefes ver</span> işaretleri bulunur.</p>` : ''}</section>
      </div>
      <section class="card pi-card">${flow(stages, { title: `${ic('list-ordered')} Uygulama aşamaları`, label: 'Uygulama aşamaları' })}</section>
      <div class="pi-grid">
        <section class="card pi-card"><h2>${ic('ruler')} Doğru vücut hizalaması</h2>
          <div class="pi-align"><div class="pi-align-fig">${App.figure(p.fig, { label: p.tr + ' hizalama çizimi' })}</div>
          <ol class="pi-checks">${p.align.map(a => `<li>${ic('check')}<span>${h(a)}</span></li>`).join('')}</ol></div></section>
        <section class="card pi-card">${bodymap(POSE_REGIONS[p.id] || [], { title: `${ic('dumbbell')} Çalışan kas grupları` })}
          ${typeof Anatomy !== 'undefined' && Anatomy.has(p.id) ? `<p class="tiny"><a href="javascript:void 0" onclick="document.getElementById('anatomi').scrollIntoView({behavior:'smooth'})">Ayrıntılı, etkileşimli anatomi gösterimine git ${ic('arrow-down')}</a></p>` : ''}
          <div class="tags">${p.muscles.map(x => `<span class="tag">${h(x)}</span>`).join('')}</div></section>
      </div>
      <section class="card pi-card">${compare(
        { title: 'Sık yapılan hatalar', icon: 'circle-x', items: p.mistakes, tone: 'bad' },
        { title: 'Kolaylaştırılmış alternatif', icon: 'hand-heart', items: [p.easier], tone: 'good' }, { title: '', vs: '→' })}</section>
      <section class="card pi-card warn-card"><h2>${ic('triangle-alert')} Güvenlik uyarıları</h2><p>${h(p.caution)}</p>
        <ul class="pi-stop">${['Keskin ağrı', 'Baş dönmesi', 'Nefes darlığı', 'Uyuşma'].map(x => `<li>${ic('octagon-x')}${x} → hemen çık</li>`).join('')}</ul></section>`;
  }

  /* ================================================================ Gelişim: 30/60/90 günlük görsel rapor */
  function progressReport(range) {
    const st = Store.state, s = Progress.summary(), goal = st.profile.dailyGoal || 10;
    const days = Progress.lastNDays(range);
    const from = days[0].date;
    const active = days.filter(d => d.minutes > 0);
    const total = Math.round(days.reduce((a, d) => a + d.minutes, 0));
    const tasks = Object.values(st.days).filter(d => d.date >= from).length;
    const goalDays = days.filter(d => d.minutes >= goal).length;
    // haftalık toplamlar
    const weeks = []; for (let i = 0; i < days.length; i += 7) { const w = days.slice(i, i + 7); weeks.push({ label: App.fmtDate(w[0].date).replace(/ \d{4}$/, ''), min: Math.round(w.reduce((a, d) => a + d.minutes, 0)) }); }
    const wmax = Math.max(1, ...weeks.map(w => w.min));
    const last14 = Progress.lastNDays(14);
    const kpi = (icn, val, label) => `<div class="vz-kpi"><span>${ic(icn)}</span><b>${val}</b><small>${label}</small></div>`;
    return `
      <div class="vz-kpis">
        ${kpi('timer', total + ' dk', 'Toplam çalışma')}${kpi('calendar-days', active.length + '/' + range, 'Aktif gün')}
        ${kpi('gauge', active.length ? Math.round(total / active.length) + ' dk' : '–', 'Aktif gün ortalaması')}${kpi('circle-check', tasks, 'Tamamlanan görev')}
        ${kpi('person-standing', s.poses + '/' + YA.poses.length, 'Öğrenilen poz')}${kpi('flame', s.bestStreak + ' gün', 'En uzun seri')}
      </div>
      <div class="vz-report-grid">
        <section class="card"><h3>${ic('calendar')} Günlük çalışma süresi</h3>${heatmap(days, goal)}</section>
        <section class="card"><h3>${ic('bar-chart-3')} Haftalık gelişim</h3>
          <ol class="vz-bars" role="img" aria-label="Haftalık toplam dakikalar: ${weeks.map(w => w.label + ' ' + w.min + ' dk').join(', ')}">${weeks.map(w => `<li><span class="vz-bar-v" style="--h:${(w.min / wmax * 100).toFixed(1)}%"><em>${w.min || ''}</em></span><small>${h(w.label)}</small></li>`).join('')}</ol>
          <p class="tiny muted">Her sütun bir haftanın toplam pratik dakikası.</p></section>
        <section class="card vz-donuts"><h3>${ic('target')} Tamamlama oranları</h3>
          <div class="vz-donut-row">${donut(goalDays / range * 100, 'Günlük hedef', `${goalDays} / ${range} gün`)}${donut(s.daysDone / 30 * 100, '30 günlük görev', `${s.daysDone} / 30 gün`)}${donut(s.secDone / s.secTotal * 100, 'Eğitimler', `${s.secDone} / ${s.secTotal} bölüm`)}</div></section>
        <section class="card"><h3>${ic('flame')} Seri takibi</h3>
          <div class="vz-streak"><b>${s.streak}</b><span>günlük güncel seri</span></div>
          <ol class="vz-streak-row" aria-label="Son 14 gün">${last14.map(d => `<li class="${d.minutes > 0 ? 'on' : ''}" title="${App.fmtDate(d.date)}: ${d.minutes} dk"><span>${['Pa', 'Pt', 'Sa', 'Ça', 'Pe', 'Cu', 'Ct'][new Date(d.date + 'T12:00:00').getDay()]}</span></li>`).join('')}</ol>
          <p class="tiny muted">Son 14 gün · dolu daireler pratik yapılan günler. En uzun seri: ${s.bestStreak} gün.</p></section>
      </div>
      <section class="card"><h3>${ic('person-standing')} Öğrenilen yoga pozları</h3>
        <ul class="vz-poses">${YA.poses.map(p => { const on = Progress.isRead('m4', p.id); return `<li class="${on ? 'on' : ''}"><a href="#/poz/${p.id}" title="${h(p.tr)}${on ? ' – öğrenildi' : ''}">${App.figure(p.fig, { small: true, label: p.tr })}<span>${h(p.tr)}</span></a></li>`; }).join('')}</ul></section>
      <section class="card"><h3>${ic('book-open')} Tamamlanan eğitimler</h3>
        <ul class="vz-modules">${s.modules.map((m, i) => `<li><a href="#/modul/${m.id}">M${i + 1} · ${h(m.title)}</a><span class="vz-pips" aria-label="${m.done}/${m.total} bölüm">${Array.from({ length: m.total }, (_, k) => `<i class="${k < m.done ? 'on' : ''}"></i>`).join('')}</span><b>%${m.pct}</b></li>`).join('')}</ul></section>`;
  }

  return { flow, mindmap, cycle, loop, stairs, venn, scatter, timeline, compare, segbar, iconGrid, scale, bodymap, bodySvg, donut, heatmap,
    SECTION, POSE_REGIONS, REGION_LABEL, breathCycle, programStrip, poseInfographic, progressReport };
})();

/* ==========================================================================
   Öğrenme Haritası sayfası
   ========================================================================== */
Viz.renderMap = function (el) {
  const h = (s) => App.h(s), ic = (n) => App.icon(n), yi = (n) => App.yi(n);
  const st = Store.state, days = (a, b) => { let n = 0; for (let i = a; i <= b; i++) if (st.days[i]) n++; return [n, b - a + 1]; };
  const ms = (id) => Progress.moduleStats(id);
  const posesDone = (lv) => YA.poses.filter(p => p.level === lv && Progress.isRead('m4', p.id)).length;
  const sum = (...parts) => parts.reduce((a, [d, t]) => [a[0] + d, a[1] + t], [0, 0]);
  const stages = [
    { title: 'Temeller', sub: 'Modül 1–2 · Hafta 1', icon: 'sprout', href: '#/modul/m1', p: sum([ms('m1').done, ms('m1').total], [ms('m2').done, ms('m2').total], days(1, 7)) },
    { title: 'Nefes', sub: 'Modül 3 · 6 teknik', icon: 'wind', href: '#/nefes', p: sum([ms('m3').done, ms('m3').total]) },
    { title: 'Başlangıç pozları', sub: '12 poz · Hafta 2', icon: 'pose', href: '#/pozlar', p: sum([posesDone('b'), 12], days(8, 14)) },
    { title: 'Hareket ve anatomi', sub: 'Modül 6 · Hafta 3', icon: 'spine', href: '#/modul/m6', p: sum([ms('m6').done, ms('m6').total], days(15, 21)) },
    { title: 'Bağımsız pratik', sub: 'Modül 5 ve 7 · Hafta 4', icon: 'lotus', href: '#/programlar', p: sum([ms('m5').done, ms('m5').total], [ms('m7').done, ms('m7').total], days(22, 30)) },
    { title: 'Orta seviye', sub: '6 poz · 30 günden sonra', icon: 'mountain', href: '#/pozlar', p: [posesDone('i'), 6] },
    { title: 'İleri seviye', sub: 'Yalnızca bilgi · uygulanmaz', icon: 'trophy', href: '#/pozlar', info: true }
  ];
  let cur = false;
  stages.forEach(s => { if (s.info) { s.state = 'info'; return; } s.pct = Math.round(s.p[0] / s.p[1] * 100); s.state = s.pct === 100 ? 'done' : (!cur ? (cur = true, 'current') : 'next'); });
  const badge = { done: 'Tamamlandı', current: 'Şu an buradasın', next: 'Sırada', info: 'Bilgi' };

  // pozlar arası geçişler – programlardaki gerçek sıralamadan
  const order = [], edges = {};
  YA.programs.forEach(pr => {
    let prev = null;
    pr.steps.forEach(s => {
      if (s.rest) return;
      if (!s.pose) { prev = null; return; }
      if (!order.includes(s.pose)) order.push(s.pose);
      if (prev && prev !== s.pose) { const k = [prev, s.pose].join('>'); edges[k] = edges[k] || { a: prev, b: s.pose, n: 0, progs: new Set() }; edges[k].n++; edges[k].progs.add(pr.id); }
      prev = s.pose;
    });
  });
  const E = Object.values(edges), sp = 30, x0 = 150, yOf = (id) => 20 + order.indexOf(id) * sp;
  const maxR = (order.length - 1) * sp / 2;
  const arcSvg = `<svg viewBox="0 0 ${x0 + maxR + 20} ${order.length * sp + 10}" class="arc-svg" role="img" aria-label="Programlarda pozların birbirini izleme sıklığı">
    ${E.map(e => { const y1 = Math.min(yOf(e.a), yOf(e.b)), y2 = Math.max(yOf(e.a), yOf(e.b)), r = (y2 - y1) / 2;
      return `<path class="ae" data-a="${e.a}" data-b="${e.b}" d="M${x0} ${y1}A${r} ${r} 0 0 1 ${x0} ${y2}" stroke-width="${(1.2 + e.n * 1.3).toFixed(1)}"><title>${h(App.poseById(e.a).tr)} → ${h(App.poseById(e.b).tr)}: ${e.n} kez</title></path>`; }).join('')}
    ${order.map(id => `<g class="an" data-id="${id}" tabindex="0" role="button" aria-label="${h(App.poseById(id).tr)} geçişlerini vurgula"><text x="${x0 - 12}" y="${yOf(id) + 4}">${h(App.poseById(id).tr)}</text><circle cx="${x0}" cy="${yOf(id)}" r="5.5"/></g>`).join('')}</svg>`;
  const top = E.slice().sort((a, b) => b.n - a.n || b.progs.size - a.progs.size).slice(0, 7);

  const regions = Object.keys(Viz.REGION_LABEL).filter(r => Object.values(Viz.POSE_REGIONS).some(v => v.includes(r)));
  const posesFor = (r) => YA.poses.filter(p => (Viz.POSE_REGIONS[p.id] || []).includes(r));

  el.innerHTML = `
    <section class="page-head"><p class="eyebrow">Öğrenme Haritası</p><h1>Yogayı görerek öğren</h1>
      <p class="lead">Eğitimin tamamı tek bakışta: nereden başladın, şu an neredesin ve konular birbirine nasıl bağlanıyor. Haritalar senin ilerlemenle güncellenir.</p></section>
    <nav class="map-nav" aria-label="Haritalar">${[['yolculuk', 'Öğrenme yolculuğu'], ['turler', 'Yoga türleri'], ['felsefe', 'Felsefe ve kavramlar'], ['anatomi', 'Anatomi'], ['nefes-haritasi', 'Nefes teknikleri'], ['gecisler', 'Pozlar arası geçişler']].map(([id, t]) => `<a href="javascript:void 0" data-jump="${id}">${t}</a>`).join('')}</nav>

    <section class="map-section" id="yolculuk"><h2>${yi('compass')} Başlangıçtan ileri seviyeye öğrenme yolculuğu</h2>
      <ol class="journey">${stages.map(s => `<li class="${s.state}"><a class="jn" href="${s.href}">${yi(s.icon)}<div><strong>${h(s.title)}</strong><small>${h(s.sub)}</small><br><span class="jn-badge">${badge[s.state]}</span></div>
        ${s.info ? `<span class="jn-ring"><span>${ic('info')}</span></span>` : `<span class="jn-ring" style="--p:${s.pct}" aria-label="%${s.pct} tamamlandı"><span>%${s.pct}</span></span>`}</a></li>`).join('')}</ol></section>

    <section class="map-section" id="turler"><h2>${yi('book')} Yoga türleri arasındaki ilişkiler</h2>
      ${Viz.mindmap('Hatha', [
        { title: 'Vinyasa', items: ['Hatha duruşlarını nefesle akışa bağlar'], href: '#/modul/m1/turler' },
        { title: 'Ashtanga', items: ['Sabit seri, yoğun tempo', 'Vinyasa tarzı akışın kökeni'] },
        { title: 'Yin', items: ['Pasif, yerde, uzun tutuşlar'] },
        { title: 'Restoratif', items: ['Desteklerle tam dinlenme'] }
      ], { title: 'Ortak kök: Hatha (duruş + nefes)', sub: 'temel çatı' })}
      ${Viz.SECTION['m1/turler']()}</section>

    <section class="map-section" id="felsefe"><h2>${yi('lotus')} Yoga felsefesi ve temel kavramlar</h2>
      <div class="callout tradition small"><strong>Geleneksel görüş</strong> – kültürel ve tarihsel bilgi olarak sunulur; bilimsel iddia içermez.</div>
      ${Viz.SECTION['m1/felsefe']()}
      ${Viz.mindmap('Temel kavramlar', [
        { title: 'Ahimsa', items: ['Zarar vermemek', 'Pratikte: zorlamadan çalış'] }, { title: 'Prana', items: ['Nefes / yaşam enerjisi', 'Pranayama’nın kökü'] },
        { title: 'Drishti', items: ['Bakış noktası', 'Dengeyi destekler'] }, { title: 'Sthira–Sukha', items: ['Sabit ve rahat duruş', 'Asananın tanımı'] }
      ], { title: 'Pratiğe yansıyan kavramlar' })}</section>

    <section class="map-section" id="anatomi"><h2>${yi('spine')} Anatomi ve kas grupları</h2>
      <p class="muted">Bir bölge seç; o bölgeyi çalıştıran pozlar listelenir.</p>
      <div class="anat-regions" role="group" aria-label="Vücut bölgesi seç">${regions.map((r, i) => `<button type="button" data-region="${r}" aria-pressed="${i === 0}">${h(Viz.REGION_LABEL[r])}</button>`).join('')}</div>
      <div class="anat"><div class="vz-body-views" id="anatBody"></div><div><h3 id="anatTitle"></h3><ul class="anat-poses" id="anatPoses"></ul>
        <p class="tiny"><a href="#/modul/m6">Modül 6: Yoga ve Anatomi’yi oku ${ic('arrow-right')}</a></p></div></div></section>

    <section class="map-section" id="nefes-haritasi"><h2>${yi('wind')} Nefes teknikleri haritası</h2>
      ${Viz.mindmap('Pranayama', [
        { title: 'Karın Nefesi', items: ['Gözlem · en kolay'], href: '#/nefes/karin', done: Progress.isRead('m3', 'karin') },
        { title: 'Diyafram Nefesi', items: ['Uzun veriş · gevşeme'], href: '#/nefes/diyafram', done: Progress.isRead('m3', 'diyafram') },
        { title: 'Ujjayi', items: ['Ses ve odak · akışta'], href: '#/nefes/ujjayi', done: Progress.isRead('m3', 'ujjayi') },
        { title: 'Nadi Shodhana', items: ['Dönüşümlü · denge'], href: '#/nefes/nadi', done: Progress.isRead('m3', 'nadi') },
        { title: 'Kutu Nefesi', items: ['Eşit ritim · bekleme isteğe bağlı'], href: '#/nefes/kutu', done: Progress.isRead('m3', 'kutu') },
        { title: 'Nefes–Hareket', items: ['Açılırken al, kapanırken ver'], href: '#/nefes/koordinasyon', done: Progress.isRead('m3', 'koordinasyon') }
      ], { title: 'Kolaydan yapılandırılmışa altı teknik', sub: 'nefesle çalışma' })}</section>

    <section class="map-section" id="gecisler"><h2>${yi('sequence')} Pozlar arasındaki geçişler</h2>
      <p class="muted">Hazır programlardaki gerçek hareket sırasından hesaplanır. Çizgi kalınlığı geçişin kaç kez kullanıldığını gösterir; bir poza dokunarak bağlantılarını vurgula.</p>
      <div class="arc-wrap"><div class="card">${arcSvg}</div>
        <div><h3>En sık geçişler</h3><ol class="arc-top">${top.map(e => `<li><span><b>${h(App.poseById(e.a).tr)}</b> → <b>${h(App.poseById(e.b).tr)}</b></span><small>${e.n} kez · ${e.progs.size} programda</small></li>`).join('')}</ol>
        <p class="tiny"><a href="#/programlar">Programları incele ${ic('arrow-right')}</a></p></div></div></section>`;

  // gezinme kısayolları (hash yönlendirmesini bozmadan)
  el.querySelectorAll('[data-jump]').forEach(a => a.addEventListener('click', (e) => { e.preventDefault(); document.getElementById(a.dataset.jump).scrollIntoView({ behavior: 'smooth' }); }));
  // anatomi etkileşimi
  const showRegion = (r) => {
    el.querySelectorAll('.anat-regions button').forEach(b => b.setAttribute('aria-pressed', b.dataset.region === r));
    el.querySelector('#anatBody').innerHTML = `<div>${Viz.bodySvg([r], false)}<span>Ön</span></div><div>${Viz.bodySvg([r], true)}<span>Arka</span></div>`;
    const list = posesFor(r);
    el.querySelector('#anatTitle').textContent = `${Viz.REGION_LABEL[r]} · ${list.length} poz`;
    el.querySelector('#anatPoses').innerHTML = list.map(p => `<li><a href="#/poz/${p.id}">${App.figure(p.fig, { small: true, label: p.tr })}${h(p.tr)}</a></li>`).join('');
  };
  el.querySelectorAll('.anat-regions button').forEach(b => b.addEventListener('click', () => showRegion(b.dataset.region)));
  showRegion(regions[0]);
  // geçiş diyagramı vurgusu
  const svg = el.querySelector('.arc-svg');
  const focus = (id) => {
    if (!id) { svg.classList.remove('focus'); svg.querySelectorAll('.hl').forEach(x => x.classList.remove('hl')); return; }
    svg.classList.add('focus');
    svg.querySelectorAll('.ae').forEach(p => p.classList.toggle('hl', p.dataset.a === id || p.dataset.b === id));
    const linked = new Set([id]); svg.querySelectorAll('.ae.hl').forEach(p => { linked.add(p.dataset.a); linked.add(p.dataset.b); });
    svg.querySelectorAll('.an').forEach(n => n.classList.toggle('hl', linked.has(n.dataset.id)));
  };
  svg.querySelectorAll('.an').forEach(n => {
    n.addEventListener('mouseenter', () => focus(n.dataset.id)); n.addEventListener('focus', () => focus(n.dataset.id));
    n.addEventListener('click', () => focus(n.dataset.id)); n.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); focus(n.dataset.id); } });
  });
  svg.addEventListener('mouseleave', () => focus(null));
};
