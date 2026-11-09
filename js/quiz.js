/* ==========================================================================
   Quiz ve Sınav Sistemi
   t: 'mc' çoktan seçmeli | 'tf' doğru/yanlış ;  a: doğru seçenek indeksi
   ========================================================================== */
const TF = ['Doğru', 'Yanlış'];
YA.quizzes = [
{ id: 'm1', module: 'm1', title: "Modül 1 – Yoga'ya Giriş", qs: [
  { t: 'mc', q: '“Yoga” sözcüğünün kökü olan Sanskritçe “yuj” ne anlama gelir?', o: ['Esnemek', 'Birleştirmek, bağlamak', 'Nefes almak', 'Dinlenmek'], a: 1, e: '“Yuj” birleştirmek, bağlamak anlamı taşır; geleneksel anlatımda beden, nefes ve zihnin birleşimine işaret eder.' },
  { t: 'mc', q: 'Patanjali’nin Yoga Sutraları’nda tarif edilen yol kaç basamaktan oluşur?', o: ['3', '5', '8', '12'], a: 2, e: 'Ashtanga, “sekiz uzuv” demektir: yama, niyama, asana, pranayama, pratyahara, dharana, dhyana, samadhi.' },
  { t: 'mc', q: 'Yeni başlayanlar için en uygun stil hangisidir?', o: ['Ashtanga', 'Hatha', 'Isıtılmış (hot) yoga', 'Hızlı Vinyasa'], a: 1, e: 'Hatha yoga duruşları görece yavaş tempoda, tek tek öğretir.' },
  { t: 'tf', q: 'Yoga yapmak için önceden esnek olmak gerekir.', o: TF, a: 1, e: 'Esneklik bir ön koşul değil, düzenli pratiğin zamanla getirebileceği sonuçlardan biridir.' },
  { t: 'mc', q: 'Desteklerle (blok, battaniye) bedenin tamamen desteklendiği, dinlendirici stil hangisidir?', o: ['Restoratif', 'Ashtanga', 'Vinyasa', 'Kundalini'], a: 0, e: 'Restoratif yoga az sayıda duruşu desteklerle uzun süre tutar.' },
  { t: 'tf', q: 'NCCIH’e göre yoga sağlıklı kişilerde doğru uygulandığında genellikle güvenlidir; ancak yaralanma tamamen imkânsız değildir.', o: TF, a: 0, e: 'Burkulma ve zorlanma gibi yaralanmalar görülebilir; bu yüzden zorlamadan çalışmak önemlidir.' }
]},
{ id: 'm2', module: 'm2', title: "Modül 2 – Yoga'ya Hazırlık", qs: [
  { t: 'mc', q: 'Başlangıç için önerilen mat kalınlığı yaklaşık kaçtır?', o: ['1–2 mm', '4–6 mm', '10–15 mm', 'Fark etmez'], a: 1, e: '4–6 mm, dizleri koruyup dengeyi bozmayan iyi bir dengedir.' },
  { t: 'tf', q: 'Blok ve kayış kullanmak “hile” sayılır ve deneyimli kişiler kullanmaz.', o: TF, a: 1, e: 'Destekler doğru hizalanmanın aracıdır; deneyimli eğitmenler de sıklıkla kullanır.' },
  { t: 'mc', q: 'Ağır bir yemekten sonra pratiğe başlamadan önce ne kadar beklemek önerilir?', o: ['Beklemeye gerek yok', '10 dakika', '2–3 saat', '6 saat'], a: 2, e: 'Dolu mideyle öne eğilme ve burgular rahatsızlık verebilir.' },
  { t: 'mc', q: 'Aşağıdakilerden hangisi pratiği hemen durdurmayı gerektirir?', o: ['Hafif germe hissi', 'Isınma hissi', 'Göğüs ağrısı veya baş dönmesi', 'Hafif terleme'], a: 2, e: 'Göğüs ağrısı, baş dönmesi, nefes darlığı, keskin ağrı veya uyuşmada pratik durdurulmalıdır.' },
  { t: 'tf', q: 'Hamilelik ya da kronik bir rahatsızlık varsa yogaya başlamadan önce sağlık profesyoneline danışmak önerilir.', o: TF, a: 0, e: 'NCCIH ve NHS bu durumlarda uzman görüşü alınmasını önerir.' },
  { t: 'mc', q: 'Ayakta duruşlarda pelvis nasıl konumlanmalı?', o: ['Kuyruk sokumu tamamen içeri', 'Bel aşırı çukur', 'Nötr', 'Bir yana kaymış'], a: 2, e: 'Nötr pelvis omurganın doğal eğrilerini korur.' }
]},
{ id: 'm3', module: 'm3', title: 'Modül 3 – Nefes Teknikleri', qs: [
  { t: 'mc', q: 'Diyafram nefes alırken hangi yönde hareket eder?', o: ['Yukarı', 'Aşağı (düzleşir)', 'Hareket etmez', 'Öne'], a: 1, e: 'Kubbe şeklindeki diyafram nefes alırken aşağı iner ve düzleşir; akciğerler genişler.' },
  { t: 'mc', q: 'Okyanus dalgasına benzer yumuşak bir ses çıkaran nefes tekniği hangisidir?', o: ['Nadi Shodhana', 'Ujjayi', 'Kutu nefesi', 'Karın nefesi'], a: 1, e: 'Ujjayi’de gırtlak hafifçe daraltılır ve yumuşak bir ses oluşur.' },
  { t: 'mc', q: 'Nadi Shodhana’da nefes nasıl alınır?', o: ['Ağızdan', 'Burun deliklerinden dönüşümlü', 'Sadece sağ burun deliğinden', 'Hızlı ve kesik'], a: 1, e: 'Burun delikleri parmaklarla dönüşümlü kapatılarak nefes alınıp verilir.' },
  { t: 'tf', q: 'Bu akademide yeni başlayanlar için nefes tutma zorunludur.', o: TF, a: 1, e: 'Nefes tutma ve yoğun nefes teknikleri başlangıç seviyesinde zorunlu değildir.' },
  { t: 'mc', q: 'Genel kural olarak hangi hareketler nefes verirken yapılır?', o: ['Kolları kaldırma', 'Göğsü açma', 'Öne eğilme ve kapanma', 'Arkaya eğilme'], a: 2, e: 'Kapanan, öne eğilen hareketler nefes verişle; açılan, yükselen hareketler nefes alışla yapılır.' },
  { t: 'mc', q: 'Kutu nefesinin dört evresi hangisidir?', o: ['Al – bekle – ver – bekle', 'Al – al – ver – ver', 'Ver – ver – al – al', 'Al – ver – al – ver'], a: 0, e: 'Kare gibi dört eşit kenar: al, bekle, ver, bekle. Burada beklemeler isteğe bağlıdır.' }
]},
{ id: 'm4', module: 'm4', title: 'Modül 4 – Temel Yoga Pozisyonları', qs: [
  { t: 'mc', q: '“Balasana” hangi duruşun Sanskritçe adıdır?', o: ['Dağ', 'Çocuk', 'Köprü', 'Kobra'], a: 1, e: 'Balasana = Çocuk Duruşu; pratik sırasındaki dinlenme duruşudur.' },
  { t: 'mc', q: 'Savaşçı duruşlarında ön diz nerede olmalıdır?', o: ['Ayak parmaklarının çok önünde', 'Ayak bileğinin üzerinde', 'İçe doğru çökmüş', 'Tamamen düz'], a: 1, e: 'Diz ayak bileğinin üzerinde, ikinci parmak yönünde olmalıdır.' },
  { t: 'tf', q: 'Aşağı Bakan Köpek’te topukların mutlaka yere değmesi gerekir.', o: TF, a: 1, e: 'Topukların değmesi gerekmez; öncelik omurganın uzun kalmasıdır.' },
  { t: 'mc', q: 'Oturarak Öne Eğilme’de eğilme nereden başlamalıdır?', o: ['Boyundan', 'Belden', 'Kalça ekleminden', 'Omuzlardan'], a: 2, e: '“Kalçadan menteşe” beli korur ve hamstringleri doğru şekilde esnetir.' },
  { t: 'mc', q: 'Hangisi orta seviye bir duruştur?', o: ['Tadasana', 'Balasana', 'Bakasana (Karga)', 'Savasana'], a: 2, e: 'Karga bir kol dengesidir ve ilk 30 günde uygulanması önerilmez.' },
  { t: 'tf', q: 'İleri seviye duruşlar (ör. baş üstü duruşu) bu programda yalnızca bilgi amaçlı gösterilir.', o: TF, a: 0, e: 'Yeni başlayanlar ileri seviye duruşlara yönlendirilmez.' },
  { t: 'mc', q: 'Kobra Duruşu’nda dirsekler nasıl olmalı?', o: ['Tamamen kilitli', 'Bedene yakın ve hafif bükülü', 'Yana açık', 'Yerde'], a: 1, e: 'Bükülü ve bedene yakın dirsekler omuzları geride tutar, sırt kaslarının çalışmasını sağlar.' }
]},
{ id: 'm5', module: 'm5', title: 'Modül 5 – Meditasyon ve Farkındalık', qs: [
  { t: 'tf', q: 'Meditasyonun amacı düşünceleri tamamen durdurmaktır.', o: TF, a: 1, e: 'Amaç düşünceleri durdurmak değil; dikkatin dağıldığını fark edip nazikçe geri dönmektir.' },
  { t: 'mc', q: 'Beden taramasında dikkat nasıl yönlendirilir?', o: ['Rastgele', 'Bölge bölge, sırayla', 'Sadece nefese', 'Sadece seslere'], a: 1, e: 'Dikkat genellikle ayaklardan başa doğru bölge bölge gezdirilir.' },
  { t: 'mc', q: 'Mindfulness’ın temel tutumlarından biri hangisidir?', o: ['Yargılamak', 'Yargısızlık', 'Rekabet', 'Acele'], a: 1, e: 'Deneyimi iyi/kötü diye etiketlemeden gözlemlemek mindfulness’ın özüdür.' },
  { t: 'mc', q: 'Yoga Nidra genellikle hangi pozisyonda yapılır?', o: ['Ayakta', 'Sırt üstü uzanarak', 'Baş aşağı', 'Yürürken'], a: 1, e: 'Yoga Nidra sırt üstü uzanarak yapılan rehberli bir gevşeme uygulamasıdır.' },
  { t: 'tf', q: 'NCCIH’e göre meditasyon tıbbi tedavinin yerine kullanılmamalıdır.', o: TF, a: 0, e: 'Meditasyon tamamlayıcı bir uygulamadır, tedavinin yerini almaz.' },
  { t: 'mc', q: '“5-4-3-2-1” egzersizi neyi çalıştırır?', o: ['Kas gücünü', 'Duyular yoluyla şimdiki ana dikkat vermeyi', 'Nefes tutmayı', 'Esnekliği'], a: 1, e: 'Beş duyuyu sırayla kullanarak dikkati şimdiki ana getirir.' }
]},
{ id: 'm6', module: 'm6', title: 'Modül 6 – Yoga ve Anatomi', qs: [
  { t: 'mc', q: 'Boyun (servikal) bölgesinde kaç omur vardır?', o: ['5', '7', '12', '33'], a: 1, e: 'Servikal 7, torakal 12, lomber 5 omurdan oluşur.' },
  { t: 'tf', q: 'Sağlıklı bir omurga yandan bakıldığında dümdüzdür.', o: TF, a: 1, e: 'Omurganın boyun ve belde içe, sırtta dışa doğal eğrileri vardır.' },
  { t: 'mc', q: 'Hamstring kas grubunda hangisi yoktur?', o: ['Biceps femoris', 'Semitendinosus', 'Semimembranosus', 'Rectus abdominis'], a: 3, e: 'Rectus abdominis düz karın kasıdır; core’un parçasıdır.' },
  { t: 'mc', q: 'Vücudun en hareketli eklemi hangisidir?', o: ['Diz', 'Omuz', 'Dirsek', 'Ayak bileği'], a: 1, e: 'Omuz (glenohumeral eklem) en hareketli eklemdir; stabilitesini kaslar sağlar.' },
  { t: 'mc', q: 'Core’un üst sınırını oluşturan kas hangisidir?', o: ['Diyafram', 'Biceps', 'Trapez', 'Baldır'], a: 0, e: 'Core bir silindir gibi düşünülür: üstte diyafram, altta pelvik taban.' },
  { t: 'mc', q: 'Kalça açılımı yaparken dönme hareketi nereden gelmelidir?', o: ['Dizden', 'Kalça ekleminden', 'Ayak bileğinden', 'Belden'], a: 1, e: 'Diz menteşe eklemidir; dönme kalçadan gelmelidir, aksi hâlde diz zorlanır.' }
]},
{ id: 'm7', module: 'm7', title: 'Modül 7 – Yoga Programları', qs: [
  { t: 'mc', q: 'Önerilen rutin iskeletinin doğru sırası hangisidir?', o: ['Gevşeme → ayakta → ısınma', 'Nefes → ısınma → ayakta → denge → yerde → gevşeme', 'Denge → gevşeme → ısınma', 'Rastgele'], a: 1, e: 'Rutinler nefesle başlar, ısınma ile devam eder ve gevşemeyle biter.' },
  { t: 'tf', q: 'Masa başı hareketleri için mat gerekmez; sandalyede yapılabilir.', o: TF, a: 0, e: 'Masa başı programı oturarak yapılabilen nazik hareketlerden oluşur.' },
  { t: 'mc', q: 'Akşam gevşeme rutininde hangi tür duruşlar ağırlıktadır?', o: ['Yoğun ayakta duruşlar', 'Yerde yapılan sakin duruşlar', 'Kol dengeleri', 'Ters duruşlar'], a: 1, e: 'Akşam rutinleri yere yakın, sakinleştirici duruşlara odaklanır.' },
  { t: 'mc', q: 'Programın ortasında nefes darlığı hissedersen ne yapmalısın?', o: ['Devam etmek', 'Duraklatıp Çocuk Duruşu’na ya da uzanmaya geçmek', 'Daha hızlı yapmak', 'Nefesi tutmak'], a: 1, e: 'Nefes darlığı, baş dönmesi ve ağrı durma sinyalleridir.' },
  { t: 'tf', q: 'Kısa ama düzenli pratik, seyrek ve uzun pratikten daha sürdürülebilirdir.', o: TF, a: 0, e: 'Alışkanlık oluşturmada düzenlilik yoğunluktan önce gelir.' }
]},
{ id: 'final', title: 'Final Değerlendirmesi (30. Gün)', final: true, qs: [
  { t: 'mc', q: 'Modern yoga pratiğinin üç temel bileşeni nedir?', o: ['Diyet, uyku, koşu', 'Duruşlar, nefes, meditasyon', 'Ağırlık, esneme, masaj', 'Dans, müzik, nefes'], a: 1, e: 'Asana, pranayama ve meditasyon/gevşeme.' },
  { t: 'mc', q: 'Ahimsa ilkesinin bir yeni başlayan için pratikteki anlamı nedir?', o: ['Her gün 1 saat çalışmak', 'Kendine de zarar vermemek, zorlamamak', 'Sadece vejetaryen beslenmek', 'Nefesi tutmak'], a: 1, e: 'Ahimsa “zarar vermemek”tir; bedeni zorlamadan çalışmak bu ilkeyle uyumludur.' },
  { t: 'tf', q: 'Keskin ve batıcı bir ağrı, duruşa devam etmen gerektiğini gösterir.', o: TF, a: 1, e: 'Keskin ağrı bir uyarıdır; duruştan çıkılmalıdır.' },
  { t: 'mc', q: 'Diyafram nefesinde nefes alırken ne olur?', o: ['Omuzlar yükselir', 'Karın hafifçe öne çıkar', 'Göğüs içe çöker', 'Nefes tutulur'], a: 1, e: 'Diyafram aşağı inerken karın öne çıkar.' },
  { t: 'mc', q: 'Ağaç Duruşu’nda ayak tabanı nereye konmamalıdır?', o: ['Bilek', 'Baldır', 'Diz eklemi', 'İç uyluk'], a: 2, e: 'Diz eklemine yandan baskı yapılmamalıdır.' },
  { t: 'mc', q: 'Kedi-İnek’te nefes verirken hangi faz yapılır?', o: ['İnek (göğüs açılır)', 'Kedi (sırt yuvarlanır)', 'Hiçbiri', 'Nefes tutulur'], a: 1, e: 'Kapanma hareketi nefes verişle yapılır.' },
  { t: 'mc', q: 'Pratik sırasında her an sığınabileceğin dinlenme duruşu hangisidir?', o: ['Savaşçı II', 'Çocuk Duruşu', 'Karga', 'Sandalye'], a: 1, e: 'Balasana, pratik sırasında dinlenme duruşudur.' },
  { t: 'tf', q: 'Aşağı Bakan Köpek’te dizleri bükmek hatalıdır.', o: TF, a: 1, e: 'Dizleri bükmek omurganın uzun kalmasına yardım eder ve tamamen kabul edilebilir.' },
  { t: 'mc', q: 'Dengeyi sağlayan üç sistem hangileridir?', o: ['Görme, iç kulak, propriosepsiyon', 'Kalp, akciğer, mide', 'Kas, kemik, deri', 'Koku, tat, işitme'], a: 0, e: 'Denge bu üç sistemin birlikte çalışmasıyla sağlanır.' },
  { t: 'mc', q: 'Hangisi Nadi Shodhana’yı yapmamak için bir nedendir?', o: ['Sabah olması', 'Burun tıkanıklığı', 'Oturuyor olmak', 'Yeni başlayan olmak'], a: 1, e: 'Burun tıkanıklığında dönüşümlü burun nefesi yapılmamalıdır.' },
  { t: 'tf', q: 'Bu platformdaki esneklik ve denge puanları tıbbi bir ölçüm değil, senin kendi algındır.', o: TF, a: 0, e: 'Öz-değerlendirmeler objektif fiziksel ölçüm iddiası taşımaz.' },
  { t: 'mc', q: 'Kalça eklemi ne tür bir eklemdir?', o: ['Top-yuva', 'Menteşe', 'Kaynaşmış', 'Kayan'], a: 0, e: 'Top-yuva yapısı çok yönlü harekete izin verir.' },
  { t: 'mc', q: 'Meditasyonda dikkatin dağıldığını fark ettiğinde ne yapmalısın?', o: ['Kendine kızmak', 'Nazikçe seçtiğin odağa dönmek', 'Meditasyonu bitirmek', 'Daha sıkı konsantre olmak için nefesi tutmak'], a: 1, e: 'Fark edip geri dönmek meditasyonun çalıştırdığı asıl beceridir.' },
  { t: 'mc', q: 'Hamilelikte Savasana için hangi uyarlama önerilir?', o: ['Yüzüstü yatmak', 'Sol yanına uzanmak', 'Baş aşağı durmak', 'Değişiklik gerekmez'], a: 1, e: 'İlk trimesterden sonra uzun süre sırt üstü yatmak yerine yan yatış önerilir.' },
  { t: 'tf', q: 'Bu platformdaki verilerin farklı cihaz ya da tarayıcılar arasında otomatik senkronize olur.', o: TF, a: 1, e: 'Veriler yalnızca bu tarayıcıda (localStorage) saklanır; taşımak için JSON dışa/içe aktarma kullanılır.' }
]}
];

/* ==========================================================================
   Arayüz
   ========================================================================== */
const Quiz = (() => {
  const h = (s) => App.h(s);
  const PASS = 80;

  function renderList(el) {
    const st = Store.state;
    el.innerHTML = `
      <section class="page-head">
        <p class="eyebrow">Quiz ve Sınavlar</p>
        <h1>Bilgini test et</h1>
        <p class="lead">Her modülün sonunda kısa bir sınav var. Her sorudan sonra anında geri bildirim ve açıklama alırsın; istediğin kadar tekrar çözebilirsin. Puanın fiziksel yeteneğini değil, eğitim içeriğini ne kadar anladığını gösterir. <strong>%${PASS}</strong> ve üzeri “başarılı” sayılır.</p>
      </section>
      <div class="card-grid">
        ${YA.quizzes.map(q => {
          const r = st.quizzes[q.id];
          const best = r ? r.best : null;
          return `<article class="card quiz-card ${q.final ? 'final' : ''}">
            <div class="qc-top"><span class="icon-badge">${App.icon(q.final ? 'graduation-cap' : 'list-checks')}</span>
            ${best != null ? `<span class="chip ${best >= PASS ? 'ok' : 'warn'}">En iyi: %${best}</span>` : '<span class="chip">Çözülmedi</span>'}</div>
            <h3>${h(q.title)}</h3>
            <p class="muted">${q.qs.length} soru · ${r ? r.attempts + ' deneme' : 'henüz deneme yok'}</p>
            ${App.bar(best || 0)}
            <a class="btn ${best == null ? 'primary' : ''}" href="#/quiz/${q.id}">${App.icon(best == null ? 'play' : 'rotate-ccw')} ${best == null ? 'Başla' : 'Tekrar çöz'}</a>
          </article>`;
        }).join('')}
      </div>`;
  }

  function renderQuiz(el, id) {
    const quiz = YA.quizzes.find(q => q.id === id);
    if (!quiz) { App.notFound(el); return; }
    let i = 0, correct = 0, answered = false;
    const answers = [];

    function view() {
      if (i >= quiz.qs.length) return result();
      const q = quiz.qs[i];
      answered = false;
      el.innerHTML = `
        <nav class="crumbs"><a href="#/quiz">Quiz ve Sınavlar</a> › ${h(quiz.title)}</nav>
        <div class="quiz-wrap card">
          <div class="quiz-top"><span class="chip">Soru ${i + 1}/${quiz.qs.length}</span><span class="chip">${q.t === 'tf' ? 'Doğru / Yanlış' : 'Çoktan seçmeli'}</span><span class="muted">Doğru: ${correct}</span></div>
          ${App.bar(i / quiz.qs.length * 100)}
          <h2 class="q">${h(q.q)}</h2>
          <div class="opts ${q.t === 'tf' ? 'tf' : ''}">${q.o.map((o, k) => `<button class="opt" data-k="${k}">${q.t === 'mc' ? `<b>${'ABCD'[k]}</b>` : ''}${h(o)}</button>`).join('')}</div>
          <div class="feedback" aria-live="polite"></div>
          <div class="quiz-actions"><button class="btn primary" id="nextQ" disabled>${i === quiz.qs.length - 1 ? 'Sonucu gör' : 'Sonraki soru'} ${App.icon('arrow-right')}</button></div>
        </div>`;
      App.refreshIcons();
      el.querySelectorAll('.opt').forEach(b => b.addEventListener('click', () => {
        if (answered) return;
        answered = true;
        const k = Number(b.dataset.k);
        const ok = k === q.a;
        if (ok) correct++;
        answers.push(ok);
        el.querySelectorAll('.opt').forEach(x => {
          x.disabled = true;
          const kk = Number(x.dataset.k);
          if (kk === q.a) x.classList.add('correct');
          else if (kk === k) x.classList.add('wrong');
        });
        el.querySelector('.feedback').innerHTML = `<p class="${ok ? 'ok' : 'bad'}"><strong>${ok ? 'Doğru!' : 'Yanlış.'}</strong> ${h(q.e)}</p>`;
        const nb = el.querySelector('#nextQ'); nb.disabled = false; nb.focus();
      }));
      el.querySelector('#nextQ').addEventListener('click', () => { i++; view(); });
    }

    function result() {
      const pct = Math.round(correct / quiz.qs.length * 100);
      Store.update(s => {
        const r = s.quizzes[quiz.id] || { best: 0, attempts: 0, history: [] };
        r.attempts++; r.best = Math.max(r.best, pct); r.last = pct;
        r.history = (r.history || []).concat([{ date: App.today(), pct }]).slice(-20);
        s.quizzes[quiz.id] = r;
      });
      Progress.checkBadges();
      const pass = pct >= PASS;
      const mod = quiz.module ? YA.modules.find(m => m.id === quiz.module) : null;
      el.innerHTML = `
        <nav class="crumbs"><a href="#/quiz">Quiz ve Sınavlar</a> › ${h(quiz.title)}</nav>
        <div class="quiz-wrap card result">
          <div class="score-ring" style="--p:${pct}"><span>%${pct}</span></div>
          <h2>${pass ? 'Tebrikler, başarılı!' : 'İyi bir başlangıç!'}</h2>
          <p>${quiz.qs.length} sorudan <strong>${correct}</strong> tanesini doğru yanıtladın. ${pass ? '' : `Başarı eşiği %${PASS}. İlgili bölümleri tekrar okuyup yeniden deneyebilirsin.`}</p>
          <div class="dots">${answers.map((a, k) => `<span class="${a ? 'ok' : 'bad'}" title="Soru ${k + 1}">${k + 1}</span>`).join('')}</div>
          <div class="btn-row">
            <button class="btn primary" id="retry">${App.icon('rotate-ccw')} Tekrar çöz</button>
            ${mod ? `<a class="btn" href="#/modul/${mod.id}">${App.icon('book-open')} Modülü tekrar oku</a>` : ''}
            ${quiz.final ? `<a class="btn" href="#/rapor">${App.icon('file-text')} Gelişim raporu</a>` : ''}
            <a class="btn ghost" href="#/quiz">Tüm sınavlar</a>
          </div>
        </div>`;
      App.refreshIcons();
      el.querySelector('#retry').addEventListener('click', () => { i = 0; correct = 0; answers.length = 0; view(); });
      App.updateChrome();
    }
    view();
  }

  return { renderList, renderQuiz, PASS };
})();
