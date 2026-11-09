/* ==========================================================================
   Gelişim Paneli (Dashboard), öz-değerlendirme ve kişisel gelişim raporu
   ========================================================================== */
const Dashboard = (() => {
  const h = (s) => App.h(s);
  const charts = [];
  let C = {};
  /** Grafik renkleri seçili temadan okunur (js/theme.js) */
  function palette() {
    const v = (typeof Theme !== 'undefined' ? Theme.vars() : {});
    C = { sage: v['--chart-1'] || '#647663', sageD: v['--color-primary-deep'] || '#44583f', brown: v['--color-accent-deep'] || '#776858', sand: v['--chart-soft'] || '#e6e1d4', sky: v['--chart-3'] || '#7FA3AE', rose: v['--chart-5'] || '#B98A8A', plum: v['--chart-4'] || '#8E7CA8', accent: v['--chart-2'] || '#C4A98A', grid: v['--chart-grid'] || 'rgba(0,0,0,.1)', text: v['--color-muted'] || '#5c5348', tip: v['--color-heading'] || '#3d362e', rest: v['--color-surface-2'] || '#E8E1D2' };
    DIMS[0].color = v['--chart-1'] || DIMS[0].color; DIMS[1].color = v['--chart-3'] || DIMS[1].color; DIMS[2].color = v['--chart-4'] || DIMS[2].color; DIMS[3].color = v['--chart-2'] || DIMS[3].color; DIMS[4].color = v['--chart-5'] || DIMS[4].color;
  }
  const DIMS = [
    { k: 'flex', label: 'Esneklik algısı', color: C.sage },
    { k: 'balance', label: 'Denge algısı', color: C.sky },
    { k: 'awareness', label: 'Beden farkındalığı', color: C.plum },
    { k: 'energy', label: 'Enerji seviyesi', color: '#C9A15B' },
    { k: 'relax', label: 'Rahatlama seviyesi', color: C.rose }
  ];
  const DISCLAIMER = 'Bu puanlar tamamen senin kendi algına dayanır. Tıbbi bir ölçüm ya da objektif fiziksel gelişim göstergesi değildir.';

  function destroyCharts() { while (charts.length) { try { charts.pop().destroy(); } catch (e) { /* yok say */ } } }

  function metric(icon, value, label, sub) {
    return `<div class="metric"><span class="m-icon">${App.icon(icon)}</span><div><div class="m-val">${value}</div><div class="m-label">${label}</div>${sub ? `<div class="m-sub">${sub}</div>` : ''}</div></div>`;
  }

  function render(el, opts = {}) {
    destroyCharts();
    const s = Progress.summary();
    const st = Store.state;
    const last = st.assessments[st.assessments.length - 1];
    const name = st.profile.name ? `, ${h(st.profile.name)}` : '';
    el.innerHTML = `
      <section class="page-head">
        <p class="eyebrow">Gelişim Paneli</p>
        <h1>Kişisel gelişimin${name}</h1>
        <p class="lead">Pratik süren, görevlerin, öğrenme ilerlemen ve kendi değerlendirmelerin tek bakışta.</p>
      </section>

      <h2 class="section-title">Günlük ve haftalık metrikler</h2>
      <div class="metrics">
        ${metric('circle-check', `${s.daysDone}<small>/30</small>`, 'Tamamlanan günlük görev')}
        ${metric('timer', `${s.totalMin}<small> dk</small>`, 'Toplam pratik süresi', `${s.sessions} kayıtlı seans`)}
        ${metric('calendar-days', s.weekSessions, 'Bu haftaki pratik sayısı', `Son 7 gün: ${s.weekMinutes} dk`)}
        ${metric('target', `%${s.todayGoalPct}`, 'Bugünkü hedef', `${s.todayMin} / ${s.goal} dk · 7 günlük oran %${s.goalRate}`)}
        ${metric('flame', `${s.streak}<small> gün</small>`, 'Kesintisiz seri', `En uzun seri: ${s.bestStreak} gün`)}
        ${metric('book-open', `${s.modulesDone}<small>/${YA.modules.length}</small>`, 'Tamamlanan modül', `${s.secDone}/${s.secTotal} bölüm`)}
        ${metric('graduation-cap', `%${s.learning}`, 'Öğrenme ilerlemesi', 'Görev %50 · Bölüm %30 · Sınav %20')}
        ${metric('award', `${Object.keys(st.badges).length}<small>/${YA.badges.length}</small>`, 'Kazanılan rozet')}
      </div>

      <div class="card goal-card">
        <label class="field inline"><span>${App.icon('target')} Günlük pratik hedefin</span>
          <select id="goalSel">${[5, 10, 15, 20, 30].map(v => `<option value="${v}" ${v === s.goal ? 'selected' : ''}>${v} dakika</option>`).join('')}</select></label>
        <button class="btn small" id="quickLog">${App.icon('plus')} Serbest pratik ekle</button>
      </div>

      <h2 class="section-title">Grafikler</h2>
      ${typeof Chart === 'undefined' ? '<div class="callout warn">Grafik kütüphanesi yüklenemedi (internet bağlantısını kontrol et). Metrikler yukarıda gösterilmeye devam ediyor.</div>' : ''}
      <div class="chart-grid">
        <div class="card chart-card"><h3>Haftalık yoga süreleri</h3><p class="muted tiny">Son 7 gün, dakika</p><div class="chart-box"><canvas id="chWeek" aria-label="Son 7 günün pratik süreleri" role="img"></canvas></div></div>
        <div class="card chart-card"><h3>Aylık pratik grafiği</h3><p class="muted tiny">Son 30 gün, dakika</p><div class="chart-box"><canvas id="chMonth" aria-label="Son 30 günün pratik süreleri" role="img"></canvas></div></div>
        <div class="card chart-card"><h3>Görev tamamlama</h3><p class="muted tiny">30 günlük plan, haftalara göre</p><div class="chart-box"><canvas id="chTasks" aria-label="Haftalara göre tamamlanan görevler" role="img"></canvas></div></div>
        <div class="card chart-card"><h3>Öğrenme modüllerindeki ilerleme</h3><p class="muted tiny">Okunan / öğrenilen bölüm yüzdesi</p><div class="chart-box"><canvas id="chModules" aria-label="Modül ilerleme yüzdeleri" role="img"></canvas></div></div>
        <div class="card chart-card wide"><h3>Gelişim değerlendirme grafiği</h3><p class="muted tiny">${DISCLAIMER}</p><div class="chart-box tall"><canvas id="chAssess" aria-label="Öz-değerlendirme puanlarının zaman içindeki değişimi" role="img"></canvas></div>
          ${st.assessments.length ? '' : '<p class="empty">Henüz öz-değerlendirme yok. Aşağıdan ilkini ekle.</p>'}</div>
      </div>

      <h2 class="section-title" id="oz">Fiziksel gelişim takibi – öz-değerlendirme</h2>
      <div class="card">
        <div class="callout info small">${App.icon('info')} ${DISCLAIMER} Haftada bir (ör. 7., 14., 21. ve 30. günlerde) doldurman önerilir.</div>
        <form id="assessForm" class="assess">
          ${DIMS.map(d => {
            const v = last ? last[d.k] : 3;
            return `<label class="range-field"><span>${d.label}</span>
              <input type="range" name="${d.k}" min="1" max="5" step="1" value="${v}" aria-valuetext="${v} / 5">
              <output>${v}</output><span class="scale"><em>1 · düşük</em><em>5 · yüksek</em></span></label>`;
          }).join('')}
          <button class="btn primary" type="submit">${App.icon('save')} Değerlendirmeyi kaydet</button>
          ${last ? `<p class="muted tiny">Son kayıt: ${App.fmtDate(last.date)} · Toplam ${st.assessments.length} kayıt</p>` : ''}
        </form>
      </div>

      <h2 class="section-title">Son pratikler</h2>
      <div class="card">
        ${st.sessions.length ? `<ul class="session-list">${st.sessions.slice(-8).reverse().map(x => `<li><span class="chip">${App.fmtDate(x.date)}</span><span>${h(x.label || x.type)}</span><strong>${x.minutes} dk</strong></li>`).join('')}</ul>` : '<p class="empty">Henüz pratik kaydı yok. Bir program, nefes ya da meditasyon seansı başlat veya bir günü tamamla.</p>'}
      </div>

      <h2 class="section-title">Verilerin</h2>
      <div class="card data-card">
        <div class="callout warn small">${App.icon('hard-drive')} <div><strong>Verilerin yalnızca bu tarayıcıda saklanır.</strong> Tarayıcı ya da cihaz değiştirdiğinde ilerlemen <strong>otomatik olarak senkronize olmaz</strong>; tarayıcı verilerini temizlersen kaybolabilir. Düzenli olarak JSON yedeği almanı öneririz.${Store.available ? '' : ' <br><strong>Uyarı:</strong> Bu tarayıcıda yerel depolama kapalı; ilerlemen sayfa kapanınca kaybolacak.'}</div></div>
        <div class="btn-row">
          <button class="btn" id="exp">${App.icon('download')} JSON olarak dışa aktar</button>
          <label class="btn" for="impFile">${App.icon('upload')} JSON yedeğini içe aktar</label>
          <input type="file" id="impFile" accept="application/json,.json" hidden>
          <a class="btn ghost" href="#/rapor">${App.icon('file-text')} Gelişim raporu</a>
          <button class="btn danger ghost" id="resetAll">${App.icon('trash-2')} Tüm verileri sıfırla</button>
        </div>
      </div>`;

    bind(el);
    drawCharts(s);
    if (opts.scroll) setTimeout(() => { const t = el.querySelector('#' + opts.scroll); if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 60);
  }

  function bind(el) {
    el.querySelector('#goalSel').addEventListener('change', (e) => {
      Store.update(s => { s.profile.dailyGoal = Number(e.target.value); });
      App.toast('Günlük hedef güncellendi.', 'ok'); render(el); App.refreshIcons();
    });
    el.querySelector('#quickLog').addEventListener('click', () => {
      const v = prompt('Bugün kaç dakika serbest yoga pratiği yaptın?', '10');
      if (v === null) return;
      const n = parseInt(v, 10);
      if (!n || n < 1 || n > 240) { App.toast('Lütfen 1–240 arasında bir sayı gir.', 'warn'); return; }
      Progress.logSession({ minutes: n, type: 'serbest', label: 'Serbest pratik' });
      Progress.checkBadges(); App.toast(`${n} dk pratik kaydedildi.`, 'ok'); render(el); App.refreshIcons(); App.updateChrome();
    });
    el.querySelectorAll('.range-field input').forEach(r => r.addEventListener('input', () => {
      r.nextElementSibling.textContent = r.value; r.setAttribute('aria-valuetext', r.value + ' / 5');
    }));
    el.querySelector('#assessForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const f = new FormData(e.target);
      const rec = { date: App.today() };
      DIMS.forEach(d => { rec[d.k] = Number(f.get(d.k)); });
      Store.update(s => {
        const i = s.assessments.findIndex(a => a.date === rec.date);
        if (i >= 0) s.assessments[i] = rec; else s.assessments.push(rec);
      });
      App.toast('Öz-değerlendirmen kaydedildi.', 'ok'); render(el); App.refreshIcons();
    });
    el.querySelector('#exp').addEventListener('click', () => { Store.exportJSON(); App.toast('Yedek dosyası indirildi.', 'ok'); });
    el.querySelector('#impFile').addEventListener('change', (e) => {
      const file = e.target.files[0]; if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        try {
          if (!confirm('İçe aktarılan yedek, bu tarayıcıdaki mevcut ilerlemenin yerine geçecek. Devam edilsin mi?')) return;
          Store.importJSON(reader.result);
          if (typeof Theme !== 'undefined' && Store.state.profile.theme) Theme.set(Store.state.profile.theme);
          Progress.checkBadges(true);
          App.toast('Yedek başarıyla içe aktarıldı.', 'ok'); render(el); App.refreshIcons(); App.updateChrome();
        } catch (err) { App.toast(err.message, 'warn'); }
      };
      reader.readAsText(file);
    });
    el.querySelector('#resetAll').addEventListener('click', () => {
      if (!confirm('Tüm ilerleme, rozetler, sınav sonuçları ve değerlendirmeler silinecek. Bu işlem geri alınamaz. Önce yedek almak isteyebilirsin. Devam edilsin mi?')) return;
      Store.reset(); App.toast('Tüm veriler sıfırlandı.', 'ok'); App.go('#/');
    });
  }

  function baseOpts(extra) {
    return Object.assign({
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false }, tooltip: { backgroundColor: C.tip, padding: 10, cornerRadius: 8 } },
      scales: {
        x: { grid: { display: false }, ticks: { color: C.text, font: { family: 'Nunito Sans' } } },
        y: { beginAtZero: true, grid: { color: C.grid }, ticks: { color: C.text, precision: 0 } }
      }
    }, extra || {});
  }
  const dayLabel = (d) => { const p = d.split('-'); return `${p[2]}.${p[1]}`; };
  const wd = (d) => ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'][new Date(d + 'T12:00:00').getDay()];

  function drawCharts(s) {
    if (typeof Chart === 'undefined') return;
    palette();
    Chart.defaults.font.family = "'Nunito Sans', system-ui, sans-serif";
    const w = Progress.lastNDays(7);
    charts.push(new Chart(document.getElementById('chWeek'), {
      type: 'bar',
      data: { labels: w.map(d => wd(d.date)), datasets: [
        { label: 'Dakika', data: w.map(d => d.minutes), backgroundColor: w.map(d => d.minutes >= s.goal ? C.sage : C.accent), borderRadius: 8, maxBarThickness: 36 },
        { type: 'line', label: 'Hedef', data: w.map(() => s.goal), borderColor: C.brown, borderDash: [5, 5], pointRadius: 0, borderWidth: 1.5 }
      ] },
      options: baseOpts({ plugins: { legend: { display: true, labels: { boxWidth: 12, color: C.text } } } })
    }));
    const m = Progress.lastNDays(30);
    charts.push(new Chart(document.getElementById('chMonth'), {
      type: 'line',
      data: { labels: m.map(d => dayLabel(d.date)), datasets: [{ label: 'Dakika', data: m.map(d => d.minutes), borderColor: C.sageD, backgroundColor: C.sand, fill: true, tension: .35, pointRadius: 2 }] },
      options: baseOpts({ scales: { x: { grid: { display: false }, ticks: { maxTicksLimit: 8, color: C.text } }, y: { beginAtZero: true, grid: { color: C.grid }, ticks: { color: C.text, precision: 0 } } } })
    }));
    const weeks = YA.weeks.map(wk => {
      const ds = YA.days.filter(d => d.w === wk.no);
      return { done: ds.filter(d => Store.state.days[d.n]).length, total: ds.length };
    });
    charts.push(new Chart(document.getElementById('chTasks'), {
      type: 'bar',
      data: { labels: YA.weeks.map(w => 'Hafta ' + w.no), datasets: [
        { label: 'Tamamlanan', data: weeks.map(w => w.done), backgroundColor: C.sage, borderRadius: 6 },
        { label: 'Kalan', data: weeks.map(w => w.total - w.done), backgroundColor: C.rest, borderRadius: 6 }
      ] },
      options: baseOpts({ plugins: { legend: { display: true, labels: { boxWidth: 12, color: C.text } } }, scales: { x: { stacked: true, grid: { display: false }, ticks: { color: C.text } }, y: { stacked: true, beginAtZero: true, max: 9, grid: { color: C.grid }, ticks: { color: C.text, precision: 0 } } } })
    }));
    charts.push(new Chart(document.getElementById('chModules'), {
      type: 'bar',
      data: { labels: s.modules.map((x, i) => 'M' + (i + 1)), datasets: [{ label: '%', data: s.modules.map(x => x.pct), backgroundColor: s.modules.map(x => x.complete ? C.sage : C.accent), borderRadius: 6 }] },
      options: baseOpts({ indexAxis: 'y', plugins: { legend: { display: false }, tooltip: { callbacks: { title: (it) => s.modules[it[0].dataIndex].title, label: (it) => ` %${it.raw} tamamlandı` } } }, scales: { x: { beginAtZero: true, max: 100, grid: { color: C.grid }, ticks: { color: C.text } }, y: { grid: { display: false }, ticks: { color: C.text } } } })
    }));
    const a = Store.state.assessments;
    charts.push(new Chart(document.getElementById('chAssess'), {
      type: 'line',
      data: { labels: a.map(x => dayLabel(x.date)), datasets: DIMS.map(d => ({ label: d.label, data: a.map(x => x[d.k]), borderColor: d.color, backgroundColor: d.color, tension: .3, pointRadius: 4 })) },
      options: baseOpts({ plugins: { legend: { display: true, position: 'bottom', labels: { boxWidth: 12, color: C.text } } }, scales: { x: { grid: { display: false }, ticks: { color: C.text } }, y: { min: 1, max: 5, ticks: { stepSize: 1, color: C.text }, grid: { color: C.grid } } } })
    }));
  }

  /* ---------- Kişisel gelişim raporu (30. gün) */
  function renderReport(el) {
    destroyCharts();
    const s = Progress.summary();
    const st = Store.state;
    const a = st.assessments;
    const first = a[0], last = a[a.length - 1];
    const fin = st.quizzes.final;
    const strong = YA.quizzes.filter(q => st.quizzes[q.id]).map(q => ({ t: q.title, b: st.quizzes[q.id].best })).sort((x, y) => y.b - x.b);
    el.innerHTML = `
      <section class="page-head">
        <p class="eyebrow">Kişisel Gelişim Raporu</p>
        <h1>${st.profile.name ? h(st.profile.name) + ' – ' : ''}30 Günlük Yolculuk Raporu</h1>
        <p class="lead">Rapor tarihi: ${App.fmtDate(App.today())}${st.profile.createdAt ? ` · Başlangıç: ${App.fmtDate(st.profile.createdAt)}` : ''}</p>
        <div class="btn-row no-print"><button class="btn" onclick="window.print()">${App.icon('printer')} Yazdır / PDF olarak kaydet</button><a class="btn ghost" href="#/panel">Panele dön</a></div>
      </section>
      <div class="metrics">
        ${metric('circle-check', `${s.daysDone}/30`, 'Tamamlanan gün')}
        ${metric('timer', `${s.totalMin} dk`, 'Toplam pratik')}
        ${metric('flame', `${s.bestStreak} gün`, 'En uzun seri')}
        ${metric('calendar-check', s.practiceDays, 'Pratik yapılan gün')}
        ${metric('person-standing', `${s.poses}/${YA.poses.length}`, 'Öğrenilen pozisyon')}
        ${metric('graduation-cap', `%${s.learning}`, 'Öğrenme ilerlemesi')}
      </div>
      <div class="grid-2">
        <div class="card"><h3>${App.icon('graduation-cap')} Final değerlendirmesi</h3>
          ${fin ? `<p class="big">%${fin.best}</p><p>${fin.best >= 80 ? 'Eğitim içeriğini başarıyla kavradın.' : 'Final sınavını tekrar çözerek puanını yükseltebilirsin.'}</p>` : `<p>Final sınavı henüz çözülmedi.</p><a class="btn primary" href="#/quiz/final">Final sınavına git</a>`}
          <p class="muted tiny">Başarı puanı fiziksel yeteneği değil, eğitim içeriğini anlama ve görevleri tamamlamayı ölçer.</p></div>
        <div class="card"><h3>${App.icon('list-checks')} Sınav sonuçları</h3>
          ${strong.length ? `<ul class="session-list">${strong.map(q => `<li><span>${h(q.t)}</span><strong class="${q.b >= 80 ? 'okc' : ''}">%${q.b}</strong></li>`).join('')}</ul>` : '<p class="empty">Henüz çözülen sınav yok.</p>'}</div>
      </div>
      <div class="card"><h3>${App.icon('sliders-horizontal')} Öz-değerlendirme karşılaştırması</h3>
        <p class="muted tiny">${DISCLAIMER}</p>
        ${first && last && a.length > 1 ? `<table class="table"><thead><tr><th>Alan</th><th>İlk (${App.fmtDate(first.date)})</th><th>Son (${App.fmtDate(last.date)})</th><th>Değişim</th></tr></thead><tbody>
          ${DIMS.map(d => { const diff = last[d.k] - first[d.k]; return `<tr><td>${d.label}</td><td>${first[d.k]}</td><td>${last[d.k]}</td><td class="${diff > 0 ? 'okc' : diff < 0 ? 'badc' : ''}">${diff > 0 ? '+' : ''}${diff}</td></tr>`; }).join('')}
        </tbody></table>` : '<p class="empty">Karşılaştırma için en az iki öz-değerlendirme gerekir. <a href="#/panel/oz">Değerlendirme ekle</a></p>'}
      </div>
      <div class="card"><h3>${App.icon('award')} Kazanılan rozetler</h3>
        <div class="badge-row">${YA.badges.filter(b => st.badges[b.id]).map(b => App.badgeMedal(b, true, true)).join('') || '<p class="empty">Henüz rozet kazanılmadı.</p>'}</div></div>
      <div class="card"><h3>${App.icon('compass')} Bundan sonrası için öneriler</h3>
        <ul>
          <li>Haftada en az 3–4 gün, 10–20 dakikalık pratiği sürdür; “Yoga Programları”ndaki rutinler arasında dönüşümlü seç.</li>
          <li>Kendini hazır hissediyorsan orta seviye duruşları (Üçgen, Sandalye, Genişletilmiş Yan Açı) kolaylaştırılmış biçimleriyle dene.</li>
          <li>Mümkünse nitelikli bir eğitmenle (ör. Yoga Alliance kayıtlı) birkaç ders alarak hizalamanı kontrol ettir.</li>
          <li>Ağrı, baş dönmesi ya da sağlık durumunda değişiklik olursa pratiğe ara verip sağlık profesyoneline danış.</li>
        </ul></div>`;
  }

  return { render, renderReport, destroyCharts };
})();
