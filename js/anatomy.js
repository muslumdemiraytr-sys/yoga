/* ==========================================================================
   Yoga Anatomisi ve Vücut Etkileri
   - Veri: kaslar, kategoriler ve poz bazlı anatomik kayıtlar (ayrı, yönetilebilir)
   - Bileşenler: ön/arka kas haritası, iskelet, omurga, solunum, denge ve poz
     (yan) görünümü; karşılaştırma ve mini test. Tamamı SVG + CSS.
   Bilgiler genel kinesiyoloji bilgisine dayanır; kasların rolü kişiden kişiye,
   uygulama biçimine ve poz varyasyonuna göre değişebilir.
   ========================================================================== */
const Anatomy = (() => {
  /* ------------------------------------------------ KAS SÖZLÜĞÜ */
  const MUSCLES = {
    quadriceps: { tr: 'Ön uyluk kasları', la: 'Quadriceps femoris', region: 'Uyluk ön yüzü', func: 'Dizi düzleştirir (ekstansiyon); rectus femoris başı kalçanın bükülmesine de katılır.' },
    hamstrings: { tr: 'Arka uyluk kasları', la: 'Biceps femoris, semitendinosus, semimembranosus', region: 'Uyluk arka yüzü', func: 'Dizi büker ve kalçayı geriye uzatır.' },
    gluteusMax: { tr: 'Büyük kalça kası', la: 'Gluteus maximus', region: 'Kalça', func: 'Kalçayı geriye uzatır ve dışa döndürmeye katılır.' },
    gluteusMed: { tr: 'Orta kalça kası', la: 'Gluteus medius', region: 'Kalça yan yüzü', func: 'Bacağı yana açar; tek ayak üzerinde dururken pelvisin dengede kalmasına yardım eder.' },
    hipFlexors: { tr: 'Kalça bükücüler', la: 'Iliopsoas (iliacus, psoas major)', region: 'Kasık ve kalça önü', func: 'Kalçayı büker, uyluğu öne kaldırır.' },
    adductors: { tr: 'İç uyluk kasları', la: 'Musculi adductores', region: 'Uyluk iç yüzü', func: 'Bacağı orta hatta yaklaştırır; pelvisin dengesine katkı verir.' },
    gastrocnemius: { tr: 'Baldır kasları', la: 'Gastrocnemius ve soleus (triceps surae)', region: 'Bacak arka yüzü', func: 'Ayak bileğini aşağı doğru büker (plantar fleksiyon).' },
    tibialis: { tr: 'Ön kaval kası', la: 'Tibialis anterior', region: 'Bacak ön yüzü', func: 'Ayak bileğini yukarı büker (dorsifleksiyon); ayakta dengeye katkı verir.' },
    rectusAbd: { tr: 'Düz karın kası', la: 'Rectus abdominis', region: 'Karın ön yüzü', func: 'Gövdeyi öne büker.' },
    obliques: { tr: 'Yan karın kasları', la: 'Obliquus externus et internus abdominis', region: 'Karın yan yüzü', func: 'Gövdeyi döndürür ve yana büker.' },
    transversus: { tr: 'Enine karın kası', la: 'Transversus abdominis', region: 'Derin karın (çizimde gösterilmez)', func: 'Gövdeyi bir kemer gibi sarar; gövde stabilitesine katkı verir.', deep: true },
    erector: { tr: 'Omurga dikleştiricileri', la: 'Erector spinae', region: 'Omurga boyunca', func: 'Omurgayı uzatır ve dik tutar.' },
    latissimus: { tr: 'Geniş sırt kası', la: 'Latissimus dorsi', region: 'Sırt yanları', func: 'Kolu aşağı ve geriye çeker; kollar yukarıdayken esner.' },
    trapezius: { tr: 'Trapez kası', la: 'Trapezius', region: 'Boyun ve üst sırt', func: 'Kürek kemiklerini hareket ettirir ve sabitler.' },
    deltoid: { tr: 'Omuz kası', la: 'Deltoideus', region: 'Omuz', func: 'Kolu öne, yana ve arkaya kaldırır.' },
    pectoralis: { tr: 'Büyük göğüs kası', la: 'Pectoralis major', region: 'Göğüs', func: 'Kolu gövdeye yaklaştırır ve içe döndürür.' },
    serratus: { tr: 'Ön dişli kas', la: 'Serratus anterior', region: 'Göğüs yan yüzü', func: 'Kürek kemiğini göğüs kafesine yaslar ve öne kaydırır.' },
    triceps: { tr: 'Kolun arka kası', la: 'Triceps brachii', region: 'Üst kol arka yüzü', func: 'Dirseği düzleştirir.' },
    biceps: { tr: 'Pazı kası', la: 'Biceps brachii', region: 'Üst kol ön yüzü', func: 'Dirseği büker.' },
    forearm: { tr: 'Önkol kasları', la: 'Musculi antebrachii', region: 'Önkol', func: 'Bilek ve parmakları hareket ettirir; elde ağırlık taşırken bileği destekler.' },
    neck: { tr: 'Boyun kasları', la: 'Sternocleidomastoideus ve boyun ekstansörleri', region: 'Boyun', func: 'Başı döndürür, büker ve dik tutar.' },
    diaphragm: { tr: 'Diyafram', la: 'Diaphragma', region: 'Göğüs ve karın arası (çizimde gösterilmez)', func: 'Ana solunum kası; nefes alırken aşağı iner, verirken gevşeyerek yukarı döner.', deep: true },
    intercostals: { tr: 'Kaburgalar arası kaslar', la: 'Musculi intercostales', region: 'Kaburgalar arası (çizimde gösterilmez)', func: 'Kaburgaları hareket ettirerek solunuma yardım eder.', deep: true }
  };

  /* ------------------------------------------------ KATEGORİLER */
  const CATS = [
    { id: 'omurga', title: 'Omurga ve sırt', icon: 'spine' }, { id: 'boyun-omuz', title: 'Boyun ve omuzlar', icon: 'pose' },
    { id: 'kalca', title: 'Kalça ve pelvis', icon: 'balance' }, { id: 'bacak', title: 'Bacak ve baldır', icon: 'footprints' },
    { id: 'core', title: 'Karın ve merkez bölge (Core)', icon: 'compass' }, { id: 'denge', title: 'Denge ve koordinasyon', icon: 'balance' },
    { id: 'solunum', title: 'Solunum ve göğüs kafesi', icon: 'lungs' }
  ];
  const ROLE = { a: 'Aktif çalışan', s: 'Esneyen', t: 'Stabilizasyon sağlayan', n: 'Daha az etkilenen' };
  const JOINT = { neck: 'Boyun', shoulder: 'Omuz', elbow: 'Dirsek', wrist: 'El bileği', spine: 'Omurga', hip: 'Kalça', knee: 'Diz', ankle: 'Ayak bileği' };
  const BAL_LEVEL = ['Çok düşük', 'Düşük', 'Orta', 'Yüksek'];

  /* ------------------------------------------------ POZ VERİLERİ
     m: [kas, rol (a: aktif · s: esneyen · t: stabilizasyon), poz sırasındaki hareket]
     j: [eklem, hareket] · spine: omurga hareketi + bölge etkisi (0 az · 1 orta · 2 belirgin) */
  const POSES = {
    tadasana: {
      cats: ['omurga', 'bacak', 'core', 'denge', 'solunum'],
      m: [['quadriceps', 'a', 'Dizleri kilitlemeden uzun tutmak için hafif aktiftir.'], ['tibialis', 't', 'Ağırlık ayak tabanında kaydıkça ayak bileğini dengeler.'],
        ['gastrocnemius', 't', 'Öne-arkaya küçük salınımları düzeltir.'], ['gluteusMed', 't', 'Pelvisin iki yanının aynı seviyede kalmasına yardım eder.'],
        ['transversus', 't', 'Gövdeyi hafifçe toparlar.'], ['erector', 't', 'Omurgayı doğal eğrileriyle dik tutar.'], ['trapezius', 't', 'Omuzları kulaklardan uzak, geriye-aşağı tutar.'], ['diaphragm', 'a', 'Rahat ve düzenli nefes.']],
      j: [['spine', 'Nötr; doğal boyun, sırt ve bel eğrileri korunur'], ['hip', 'Nötr'], ['knee', 'Ekstansiyon (kilitlemeden)'], ['ankle', 'Nötr; ağırlık ayak tabanına dağılır']],
      spine: { move: 'Nötr – doğal eğriler korunur', c: 1, t: 1, l: 1 },
      breath: 'Dik gövde göğüs kafesine ve karına hareket alanı bırakır; nefesi gözlemlemek için uygun bir başlangıç duruşudur.',
      bal: { base: 'İki ayak, orta genişlik', level: 1, text: 'Ayak tabanından gelen duyusal bilgi ve baldır–ayak bileği kaslarının küçük ayarlamaları dengeyi korur.' },
      benefit: 'Postür farkındalığına ve ayakta duruşlarda kullanılan temel hizalama alışkanlığına katkıda bulunabilir.',
      technique: 'Ağırlığı iki ayağa eşit ver, dizleri kilitleme, pelvisi nötr bırak, başın tepesini yukarı uzat.',
      strain: 'Dizleri geriye kilitlemek diz arkasına; beli çukurlaştırmak bel bölgesine fazladan yük bindirebilir.',
      alts: ['Sırtı duvara yakın durmak', 'Ayakları kalça genişliğinde açmak']
    },
    'asagi-kopek': {
      cats: ['bacak', 'boyun-omuz', 'omurga', 'core'],
      m: [['hamstrings', 's', 'Kalça büküldüğü için uyluk arkası esner.'], ['gastrocnemius', 's', 'Topuklar yere doğru indikçe esner.'], ['deltoid', 'a', 'Kolları baş üstü konumda tutar.'],
        ['triceps', 'a', 'Dirsekleri uzun tutar.'], ['serratus', 'a', 'Kürek kemiklerini göğüs kafesine yaslar ve dışa yayar.'], ['latissimus', 's', 'Kollar baş üstündeyken esner.'],
        ['quadriceps', 'a', 'Dizleri uzatmaya yardım eder (dizler bükülüyse daha az).'], ['transversus', 't', 'Gövdeyi toparlar.'], ['forearm', 't', 'El tabanından gelen ağırlıkta bileği destekler.']],
      j: [['shoulder', 'Fleksiyon (kollar baş üstünde)'], ['elbow', 'Ekstansiyon'], ['wrist', 'Ekstansiyon; ağırlık taşır'], ['hip', 'Fleksiyon'], ['knee', 'Ekstansiyon ya da hafif bükülü'], ['ankle', 'Dorsifleksiyon']],
      spine: { move: 'Uzun, nötre yakın; yuvarlanma önlenir', c: 1, t: 1, l: 1 },
      breath: 'Baş kalbin altında kalır; bazı kişiler bunu baskı ya da baş dönmesi olarak hissedebilir. Bu durumda dizleri yere indir.',
      bal: { base: 'İki el ve iki ayak, geniş', level: 1, text: 'Dört destek noktası olduğu için denge talebi düşüktür; ağırlığın eller ve ayaklar arasında paylaşılması önemlidir.' },
      benefit: 'Bacakların arka yüzünde esneklik ve üst bedenin ağırlık taşıma kapasitesi üzerinde çalışmaya katkıda bulunabilir.',
      technique: 'Önce omurgayı uzat; gerekirse dizleri bük. Topukların yere değmesi gerekmez.',
      strain: 'Ağırlığı bileklere yığmak bileklerde, sırtı yuvarlayarak bacakları düzleştirmeye çalışmak bel bölgesinde zorlanmaya yol açabilir.',
      alts: ['Dizleri belirgin bükmek', 'Elleri sandalyeye koyarak yarım köpek']
    },
    'savasci-2': {
      cats: ['bacak', 'kalca', 'boyun-omuz', 'denge'],
      m: [['quadriceps', 'a', 'Ön dizdeki bükülmeyi kontrollü taşır.'], ['gluteusMax', 'a', 'Ön kalçayı destekler.'], ['gluteusMed', 'a', 'Ön dizin dışa, ikinci parmak yönünde kalmasına yardım eder.'],
        ['adductors', 's', 'Bacaklar açıkken iç uyluk esner.'], ['deltoid', 'a', 'Kolları omuz hizasında tutar.'], ['trapezius', 't', 'Omuzları aşağıda tutar.'], ['transversus', 't', 'Gövdeyi iki bacağın ortasında dik tutar.']],
      j: [['knee', 'Ön diz: fleksiyon · arka diz: ekstansiyon'], ['hip', 'Ön kalça: fleksiyon ve dış rotasyon · arka kalça: abdüksiyon'], ['shoulder', 'Abdüksiyon (yaklaşık 90°)'], ['spine', 'Nötr, dik']],
      spine: { move: 'Nötr, dik', c: 0, t: 1, l: 1 },
      breath: 'Kollar yana açıkken göğüs kafesi genişleyebilir; duruşta kalırken nefesi tutma.',
      bal: { base: 'İki ayak, yana geniş', level: 1, text: 'Geniş taban dengeyi kolaylaştırır; ön dizin hizası ve gövdenin ortada kalması dikkat ister.' },
      benefit: 'Bacak dayanıklılığı ve kalça hareketliliği üzerinde çalışmaya katkıda bulunabilir.',
      technique: 'Gövdeyi iki bacağın ortasında tut; ön diz ayak bileği üzerinde ve ikinci parmak yönünde olsun.',
      strain: 'Ön dizin içe düşmesi dizin iç yüzüne, gövdenin öne kayması bele yük bindirebilir.',
      alts: ['Duruşu kısaltmak ve dizi daha az bükmek', 'Elleri kalçaya koymak']
    },
    agac: {
      cats: ['denge', 'bacak', 'kalca', 'core'],
      m: [['gluteusMed', 'a', 'Destek bacağında pelvisin yana düşmesini önler.'], ['tibialis', 'a', 'Ayak bileğinde sürekli küçük düzeltmeler yapar.'], ['gastrocnemius', 'a', 'Öne-arkaya salınımı dengeler.'],
        ['quadriceps', 't', 'Destek dizini kilitlemeden uzun tutar.'], ['adductors', 's', 'Kaldırılan bacakta diz yana açılırken esner.'], ['transversus', 't', 'Gövdeyi toparlar.'], ['erector', 't', 'Omurgayı dik tutar.']],
      j: [['ankle', 'Destek: sürekli mikro ayarlamalar'], ['knee', 'Destek: ekstansiyon (kilitlemeden) · kaldırılan: fleksiyon'], ['hip', 'Kaldırılan: fleksiyon, dış rotasyon ve abdüksiyon'], ['spine', 'Nötr, dik']],
      spine: { move: 'Nötr, dik', c: 1, t: 1, l: 1 },
      breath: 'Yavaş ve eşit nefes, dikkati toplamayı ve dengeyi korumayı kolaylaştırabilir.',
      bal: { base: 'Tek ayak, dar', level: 3, text: 'Görme, iç kulak ve propriosepsiyon birlikte çalışır; sabit bir noktaya bakmak çoğu kişide dengeyi kolaylaştırır.' },
      benefit: 'Tek ayak üzerinde denge ve ayak bileği stabilitesi üzerinde çalışmaya katkıda bulunabilir.',
      technique: 'Ayak tabanını dizin altına ya da üstüne koy; destek kalçasını yana itme.',
      strain: 'Ayağı diz eklemine bastırmak dizin yan yüzüne baskı yapabilir; denge kaybında düşme riski vardır.',
      alts: ['Ayak parmaklarını yerde bırakıp topuğu bileğe yaslamak', 'Duvara ya da sandalyeye tutunmak']
    },
    kopru: {
      cats: ['kalca', 'omurga', 'bacak', 'solunum'],
      m: [['gluteusMax', 'a', 'Kalçayı yerden kaldırır.'], ['hamstrings', 'a', 'Kalçanın kalkmasına yardım eder.'], ['erector', 'a', 'Sırtın uzamasına katılır.'],
        ['hipFlexors', 's', 'Kalça önü açıldıkça esner.'], ['quadriceps', 't', 'Dizlerin ayak bilekleri üzerinde kalmasına yardım eder.'], ['adductors', 't', 'Dizlerin dışa açılmasını sınırlar.'], ['pectoralis', 's', 'Omuzlar geride, göğüs açılırken esner.']],
      j: [['hip', 'Ekstansiyon'], ['knee', 'Fleksiyon (yaklaşık 90°)'], ['spine', 'Sırt ve belde ekstansiyon'], ['neck', 'Fleksiyon; ağırlık omuzlarda, boyun yerde serbest'], ['shoulder', 'Ekstansiyon (kollar yerde)']],
      spine: { move: 'Ekstansiyon (arkaya açılma)', c: 1, t: 2, l: 1 },
      breath: 'Göğüs ön yüzü açılır; boynu sıkıştırmadan rahat nefes almaya devam et.',
      bal: { base: 'Ayaklar ve omuzlar, geniş', level: 1, text: 'Destek noktaları geniştir; dizlerin paralel kalması hizayı korur.' },
      benefit: 'Kalça ve sırt kaslarının çalışmasına ve kalça önünde esneme hissine katkıda bulunabilir.',
      technique: 'Ağırlığı ayaklara ve omuzlara ver; poz sırasında başı çevirme.',
      strain: 'Başı sağa-sola çevirmek boyunda, kalçayı aşırı kaldırmak bel bölgesinde zorlanmaya yol açabilir.',
      alts: ['Sakrum altına blok koyarak destekli köprü', 'Kalçayı yalnızca birkaç santim kaldırmak']
    },
    balasana: {
      cats: ['omurga', 'kalca', 'solunum'],
      m: [['erector', 's', 'Sırt öne yuvarlandıkça pasif olarak uzar.'], ['gluteusMax', 's', 'Kalça derin bükülürken esner.'], ['latissimus', 's', 'Kollar öne uzatıldığında esner.'],
        ['tibialis', 's', 'Ayak sırtı yerdeyken bacak ön yüzü esner.'], ['quadriceps', 's', 'Diz tam bükülüyken hafif esneme hissedilebilir.'], ['diaphragm', 'a', 'Karın uyluklara yaslandığı için nefes sırta ve yan kaburgalara yönelir.']],
      j: [['hip', 'Derin fleksiyon'], ['knee', 'Derin fleksiyon'], ['ankle', 'Plantar fleksiyon'], ['spine', 'Fleksiyon (öne yuvarlanma)'], ['shoulder', 'Fleksiyon (kollar önde)']],
      spine: { move: 'Fleksiyon (öne yuvarlanma)', c: 1, t: 2, l: 2 },
      breath: 'Karın uyluklara yaslandığından nefes daha çok sırtın arka bölümünde ve yan kaburgalarda hissedilebilir.',
      bal: { base: 'Dizler, ayaklar ve alın; yerde', level: 0, text: 'Beden zemine yakın ve geniş destekli olduğu için denge talebi çok düşüktür.' },
      benefit: 'Dinlenmeye ve sırtın arka yüzünde hafif bir esneme hissine alan açabilir.',
      technique: 'Alnını destekle; kalça topuklara değmiyorsa arasına battaniye koy.',
      strain: 'Diz veya ayak bileği hassasiyetinde derin diz bükümü rahatsızlık verebilir.',
      alts: ['Kalça ile topuk arasına battaniye', 'Alnın altına blok ya da yastık', 'Dizleri geniş açmak']
    },
    'kedi-inek': {
      cats: ['omurga', 'core', 'boyun-omuz', 'solunum'],
      m: [['erector', 'a', 'İnek fazında omurgayı kontrollü biçimde uzatır.'], ['rectusAbd', 'a', 'Kedi fazında omurgayı yuvarlar.'], ['transversus', 't', 'Hareketi kontrollü tutar.'],
        ['serratus', 't', 'Kürek kemiklerini göğüs kafesine yaslar.'], ['deltoid', 't', 'Kollar ağırlık taşırken omzu destekler.'], ['neck', 't', 'Başın hareketi omurganın hareketini izler.'], ['forearm', 't', 'El tabanında ağırlık taşır.']],
      j: [['spine', 'Fleksiyon ve ekstansiyon arasında dinamik hareket'], ['shoulder', 'Fleksiyon (yaklaşık 90°), ağırlık taşır'], ['wrist', 'Ekstansiyon; ağırlık taşır'], ['hip', 'Fleksiyon (yaklaşık 90°)'], ['knee', 'Fleksiyon (yaklaşık 90°)']],
      spine: { move: 'Fleksiyon ↔ ekstansiyon (dinamik)', c: 2, t: 2, l: 2 },
      breath: 'Nefes alırken ekstansiyon (inek), verirken fleksiyon (kedi): hareket nefesin ritmine eşlenir.',
      bal: { base: 'İki el ve iki diz, geniş', level: 0, text: 'Dört destek noktası olduğu için denge talebi çok düşüktür.' },
      benefit: 'Omurganın öne ve arkaya hareketini nazik bir aralıkta çalıştırmaya ve ısınmaya katkıda bulunabilir.',
      technique: 'Hareketi kuyruk sokumundan başlat; rahat olduğun aralıkta kal.',
      strain: 'Boynu ani biçimde geriye atmak ya da hareketi yalnızca belden yapmak bölgesel yük oluşturabilir.',
      alts: ['Sandalyede oturarak', 'Önkollar üzerinde', 'Dizlerin altına battaniye']
    },
    kobra: {
      cats: ['omurga', 'solunum', 'boyun-omuz'],
      m: [['erector', 'a', 'Göğsü yerden kaldırır.'], ['gluteusMax', 't', 'Pelvisin yerde kalmasına yardım eder.'], ['rectusAbd', 's', 'Karın ön yüzü uzar.'],
        ['hipFlexors', 's', 'Kalça önü uzar.'], ['pectoralis', 's', 'Göğüs öne açılırken esner.'], ['trapezius', 'a', 'Omuzları geriye-aşağı çeker.'], ['triceps', 't', 'Kolları destek için hazır tutar.']],
      j: [['spine', 'Ekstansiyon'], ['shoulder', 'Ekstansiyona yakın; kürek kemikleri geride'], ['elbow', 'Fleksiyon (bükülü)'], ['hip', 'Ekstansiyon (pelvis yerde)']],
      spine: { move: 'Ekstansiyon (arkaya açılma)', c: 1, t: 2, l: 2 },
      breath: 'Göğsün ön yüzü açıldıkça nefes göğüste daha belirgin hissedilebilir.',
      bal: { base: 'Yüzüstü, geniş', level: 0, text: 'Beden yerde olduğu için denge talebi çok düşüktür.' },
      benefit: 'Sırt kaslarının çalışmasına ve uzun süre öne eğik oturmanın ardından göğüs bölgesinin açılmasına katkıda bulunabilir.',
      technique: 'Yüksekliği sırt kaslarınla sınırla; ellere yüklenme, dirsekleri bükülü tut.',
      strain: 'Kollarla fazla itmek bel bölgesinde sıkışma hissine, başı geriye atmak boyunda zorlanmaya yol açabilir.',
      alts: ['Bebek kobra (birkaç santim yükselmek)', 'Sfenks (önkollar yerde)']
    },
    'savasci-1': {
      cats: ['bacak', 'kalca', 'boyun-omuz', 'denge', 'core'],
      m: [['quadriceps', 'a', 'Ön dizdeki bükülmeyi kontrollü taşır.'], ['gluteusMax', 'a', 'Ön kalçayı destekler.'], ['hipFlexors', 's', 'Arka bacakta kalça önü esner.'],
        ['gastrocnemius', 's', 'Arka topuk yerdeyken baldır esner.'], ['deltoid', 'a', 'Kolları baş üstünde tutar.'], ['transversus', 't', 'Belin aşırı çukurlaşmasını sınırlar.'], ['gluteusMed', 't', 'Pelvisi dengeler.']],
      j: [['knee', 'Ön diz: fleksiyon · arka diz: ekstansiyon'], ['hip', 'Ön kalça: fleksiyon · arka kalça: ekstansiyon'], ['ankle', 'Arka ayak bileği: dorsifleksiyon'], ['shoulder', 'Fleksiyon (kollar yukarı)'], ['spine', 'Dik; hafif ekstansiyon olabilir']],
      spine: { move: 'Dik; belde aşırı çukur önlenir', c: 0, t: 1, l: 2 },
      breath: 'Kollar yukarıdayken göğüs kafesi yukarı doğru açılır; duruşta kalırken nefesi tutma.',
      bal: { base: 'Uzun ve dar (ön-arka)', level: 2, text: 'Ayaklar aynı çizgiye gelirse denge zorlaşır; kalça genişliğinde “ray üstünde” durmak tabanı genişletir.' },
      benefit: 'Bacak kuvveti ve arka bacakta kalça önü esnekliği üzerinde çalışmaya katkıda bulunabilir.',
      technique: 'Ayakları kalça genişliğinde tut, ön diz ayak bileğinin üzerinde olsun.',
      strain: 'Ön dizin içe çökmesi dizin iç yüzüne, belin aşırı çukurlaşması bel bölgesine yük bindirebilir.',
      alts: ['Elleri kalçada tutmak', 'Daha kısa duruş', 'Arka topuğu kaldırarak yüksek hamle']
    },
    'oturarak-one-egilme': {
      cats: ['bacak', 'omurga', 'kalca'],
      m: [['hamstrings', 's', 'Kalça büküldükçe uyluk arkası esner.'], ['gastrocnemius', 's', 'Ayak bilekleri bükülüyken baldır esner.'], ['erector', 's', 'Sırt öne doğru uzar.'],
        ['gluteusMax', 's', 'Kalça fleksiyonunda esner.'], ['hipFlexors', 'a', 'Gövdeyi kalçadan öne getirmeye yardım eder.']],
      j: [['hip', 'Fleksiyon'], ['spine', 'Fleksiyon (mümkün olduğunca kalçadan)'], ['knee', 'Ekstansiyon ya da bükülü'], ['ankle', 'Dorsifleksiyon']],
      spine: { move: 'Fleksiyon (öne eğilme)', c: 1, t: 2, l: 2 },
      breath: 'Gövde öne katlandıkça karın sıkışır; nefes sırta ve yanlara yönelebilir.',
      bal: { base: 'Oturarak, geniş', level: 0, text: 'Oturma kemikleri ve bacaklar geniş bir taban oluşturur.' },
      benefit: 'Bacakların arka yüzünde esneme hissine ve sakinleşmeye alan açabilir.',
      technique: 'Kalçadan öne eğil; dizleri gerektiği kadar bük, kayış kullan.',
      strain: 'Elleri çekiştirmek ve sırtı yuvarlayarak zorlamak bel bölgesinde ve uyluk arkasının başlangıcında zorlanmaya yol açabilir.',
      alts: ['Dizleri bükmek', 'Ayak tabanlarından kayış geçirmek', 'Kalça altına katlanmış battaniye']
    },
    'sirtustu-burgu': {
      cats: ['omurga', 'core', 'kalca', 'solunum'],
      m: [['obliques', 's', 'Gövde dönerken yan karın esner.'], ['erector', 's', 'Sırt dönüş yönünde uzar.'], ['gluteusMed', 's', 'Üstteki kalçanın dış yüzü esner.'],
        ['pectoralis', 's', 'Kol yana açıkken göğüs esner.'], ['latissimus', 's', 'Sırt yanı uzar.'], ['diaphragm', 'a', 'Veriş sırasında gövde daha kolay gevşer.']],
      j: [['spine', 'Rotasyon (dönme)'], ['hip', 'Fleksiyon ve addüksiyon'], ['shoulder', 'Abdüksiyon (kollar yana açık)']],
      spine: { move: 'Rotasyon (dönme)', c: 1, t: 2, l: 1 },
      breath: 'Veriş sırasında gövdenin gevşemesi daha kolay hissedilebilir.',
      bal: { base: 'Sırt üstü, geniş', level: 0, text: 'Beden yerde olduğu için denge talebi çok düşüktür.' },
      benefit: 'Omurganın dönme hareketini nazik bir aralıkta çalıştırmaya katkıda bulunabilir.',
      technique: 'Omuzları mümkün olduğunca yerde tut; dönüşü yerçekimi yapsın.',
      strain: 'Dizleri yere değdirmek için zorlamak bel ve sakroiliak bölgede rahatsızlık oluşturabilir.',
      alts: ['Dizlerin altına yastık ya da blok', 'Dönüş açısını küçük tutmak']
    },
    savasana: {
      cats: ['solunum'],
      m: [['diaphragm', 'a', 'Nefes kontrol edilmeden kendi ritminde akar.']],
      j: [['spine', 'Nötr; zemin destekli']],
      spine: { move: 'Nötr, zemin destekli', c: 0, t: 0, l: 0 },
      breath: 'Nefesi değiştirmeden gözlemlemek için kullanılır; nefes çoğu kişide kendiliğinden yavaşlar.',
      bal: { base: 'Sırt üstü, tamamen destekli', level: 0, text: 'Denge talebi yoktur; bedenin tamamı zemin tarafından desteklenir.' },
      benefit: 'Pratiğin sonunda dinlenmeye ve gevşemeye alan açar.',
      technique: 'Dizlerin altına rulo battaniye koyabilirsin; üşümemek için üstünü ört.',
      strain: 'Ani kalkmak baş dönmesine yol açabilir; yana dönerek yavaşça kalk.',
      alts: ['Dizler bükülü, ayaklar yerde', 'Hamilelikte sol yana uzanmak']
    },
    ucgen: {
      cats: ['bacak', 'kalca', 'core', 'denge', 'boyun-omuz'],
      m: [['hamstrings', 's', 'Ön bacakta uyluk arkası esner.'], ['adductors', 's', 'İç uyluk esner.'], ['obliques', 'a', 'Gövdeyi yanda, öne kapanmadan tutar.'],
        ['quadriceps', 'a', 'Dizleri uzun tutar.'], ['gluteusMed', 't', 'Pelvisi dengeler.'], ['deltoid', 'a', 'Üst kolu yukarıda tutar.'], ['transversus', 't', 'Gövdeyi sabitler.']],
      j: [['hip', 'Ön kalça: fleksiyon; gövde yana eğilir'], ['knee', 'Ekstansiyon (kilitlemeden)'], ['spine', 'Lateral fleksiyon (yana eğilme)'], ['shoulder', 'Abdüksiyon']],
      spine: { move: 'Yana eğilme (lateral fleksiyon)', c: 1, t: 2, l: 1 },
      breath: 'Üstteki yan kaburgalar açılır; yan göğüste nefes hissedilebilir.',
      bal: { base: 'İki ayak, geniş', level: 2, text: 'Taban geniştir ancak gövde yana uzandığı için ağırlık merkezi kayar.' },
      benefit: 'Bacakların iç ve arka yüzünde esneme ve gövde stabilitesi üzerinde çalışmaya katkıda bulunabilir.',
      technique: 'Gövdeyi öne kapatma; alt eli bloğa ya da uyluğa koy.',
      strain: 'Dizi kilitlemek diz arkasına yük bindirebilir; yere uzanmaya zorlamak gövdenin çökmesine yol açabilir.',
      alts: ['Alt eli yüksek bloğa ya da uyluğa koymak', 'Duruşu kısaltmak']
    },
    sandalye: {
      cats: ['bacak', 'kalca', 'core', 'omurga'],
      m: [['quadriceps', 'a', 'Diz bükülüyken ağırlığı taşır.'], ['gluteusMax', 'a', 'Kalça geriye giderken destek verir.'], ['erector', 'a', 'Gövdeyi uzun tutar.'],
        ['deltoid', 'a', 'Kolları yukarıda tutar.'], ['transversus', 't', 'Belin aşırı çukurlaşmasını sınırlar.'], ['gastrocnemius', 't', 'Ayak bileğini dengeler.'], ['tibialis', 't', 'Ağırlık topuklara kaydıkça dengeye katkı verir.']],
      j: [['knee', 'Fleksiyon'], ['hip', 'Fleksiyon'], ['ankle', 'Dorsifleksiyon'], ['shoulder', 'Fleksiyon (kollar yukarı)']],
      spine: { move: 'Nötr; gövde hafif öne eğik', c: 0, t: 1, l: 2 },
      breath: 'Kuvvet gerektiren bir duruştur; nefes kesiliyorsa dizleri biraz düzleştir.',
      bal: { base: 'İki ayak, orta', level: 2, text: 'Ağırlık merkezinin geriye taşınması ayak bileği kaslarının dengeye daha çok katılmasını gerektirir.' },
      benefit: 'Bacak ve kalça kaslarında dayanıklılık üzerinde çalışmaya katkıda bulunabilir.',
      technique: 'Ağırlığı topuklara ver, dizleri paralel tut.',
      strain: 'Dizleri ayak parmaklarının çok önüne taşımak diz önüne, beli çukurlaştırmak bel bölgesine yük bindirebilir.',
      alts: ['Dizleri daha az bükmek', 'Sırtı duvara yaslamak', 'Elleri göğüs önünde tutmak']
    },
    'yan-aci': {
      cats: ['bacak', 'kalca', 'core', 'boyun-omuz'],
      m: [['quadriceps', 'a', 'Ön dizdeki bükülmeyi taşır.'], ['gluteusMax', 'a', 'Ön kalçayı destekler.'], ['obliques', 's', 'Üstteki gövde yanı uzar.'],
        ['adductors', 's', 'Arka bacakta iç uyluk esner.'], ['latissimus', 's', 'Üst kol uzandıkça sırt yanı esner.'], ['deltoid', 'a', 'Üst kolu uzatır.'], ['gluteusMed', 't', 'Pelvisi dengeler.']],
      j: [['knee', 'Ön diz: fleksiyon'], ['hip', 'Ön kalça: fleksiyon ve dış rotasyon'], ['spine', 'Yana uzanma'], ['shoulder', 'Üst kol: fleksiyon']],
      spine: { move: 'Yana uzanma', c: 1, t: 2, l: 1 },
      breath: 'Üst gövde yanı uzarken yan kaburgalarda nefes hissedilebilir.',
      bal: { base: 'İki ayak, geniş', level: 2, text: 'Gövdenin öne doğru eğilmesi ağırlık merkezini ön bacağa kaydırır.' },
      benefit: 'Bacak kuvveti ve gövde yanında esneme üzerinde çalışmaya katkıda bulunabilir.',
      technique: 'Önkolu uyluğa koy, omzu çökertme; ön diz ayak bileği üzerinde kalsın.',
      strain: 'Önkola yüklenmek omuzda, ön dizin içe düşmesi dizde zorlanmaya yol açabilir.',
      alts: ['Önkolu uyluk üzerinde tutmak', 'Üst kolu kalçaya koymak']
    },
    'yarim-ay': {
      cats: ['denge', 'kalca', 'core', 'bacak'],
      m: [['gluteusMed', 'a', 'Destek bacağında pelvisi dengeler ve kaldırılan bacağı yukarıda tutar.'], ['gluteusMax', 'a', 'Kaldırılan bacağı geride tutar.'], ['quadriceps', 'a', 'Destek dizini uzun tutar.'],
        ['hamstrings', 's', 'Destek bacağında uyluk arkası esner.'], ['obliques', 't', 'Gövdeyi yanda tutar.'], ['transversus', 't', 'Gövdeyi sabitler.'], ['tibialis', 'a', 'Ayak bileğinde sürekli küçük düzeltmeler yapar.']],
      j: [['hip', 'Destek: fleksiyon · kaldırılan: abdüksiyon ve ekstansiyon'], ['knee', 'Ekstansiyon (kilitlemeden)'], ['ankle', 'Destek: mikro ayarlamalar'], ['spine', 'Nötr; gövde yana açık']],
      spine: { move: 'Nötr, gövde yana açık', c: 1, t: 1, l: 1 },
      breath: 'Dengede kalırken nefesi yavaşlatmak dikkati korumaya yardım edebilir.',
      bal: { base: 'Tek ayak ve bir el, dar', level: 3, text: 'Destek tabanı küçüktür; duvar ya da blok desteği düşme riskini azaltır.' },
      benefit: 'Tek ayak üzerinde denge ve kalça kuvveti üzerinde çalışmaya katkıda bulunabilir.',
      technique: 'Alt eli bloğa koy; istersen sırtını duvara yasla.',
      strain: 'Alt ele yüklenmek bilek ve omuzda zorlanmaya yol açabilir; denge kaybında düşme riski vardır.',
      alts: ['Sırtı duvara yaslamak', 'Alt eli yüksek bloğa koymak', 'Bacağı daha alçak kaldırmak']
    },
    karga: {
      cats: ['boyun-omuz', 'core', 'denge'],
      m: [['forearm', 'a', 'Ağırlığın tamamını taşırken bileği destekler.'], ['deltoid', 'a', 'Omzu öne doğru taşır.'], ['serratus', 'a', 'Kürek kemiklerini göğüs kafesine yaslar.'],
        ['pectoralis', 'a', 'Kolları gövdeye doğru sabitler.'], ['rectusAbd', 'a', 'Gövdeyi yuvarlak tutar.'], ['hipFlexors', 'a', 'Dizleri yukarıda tutar.'], ['adductors', 'a', 'Dizleri kollara bastırır.']],
      j: [['wrist', 'Ekstansiyon; tüm ağırlığı taşır'], ['elbow', 'Fleksiyon'], ['shoulder', 'Fleksiyon'], ['hip', 'Derin fleksiyon'], ['spine', 'Fleksiyon (yuvarlak sırt)']],
      spine: { move: 'Fleksiyon (yuvarlak sırt)', c: 1, t: 2, l: 2 },
      breath: 'Kısa ve sakin nefeslerle kal; nefesi tutma.',
      bal: { base: 'Yalnızca eller, dar', level: 3, text: 'Ağırlığın tamamı ellerdedir; öne düşme riski için başın önüne yastık koymak önerilir.' },
      benefit: 'Üst beden ve gövde kuvveti ile denge üzerinde çalışmaya katkıda bulunabilir; ilk 30 günde önerilmez.',
      technique: 'Önce ayaklar yerdeyken ağırlığı ellere aktarma çalışması yap.',
      strain: 'Bileklere ve omuzlara yüksek yük biner; öne düşme riski vardır.',
      alts: ['Ayaklar yerde ağırlık aktarma', 'Ayakların altına blok koymak']
    },
    kayik: {
      cats: ['core', 'kalca', 'omurga', 'denge'],
      m: [['rectusAbd', 'a', 'Gövdeyi geriye yaslı konumda tutar.'], ['hipFlexors', 'a', 'Bacakları yerden kaldırır.'], ['transversus', 'a', 'Gövdeyi sabitler.'],
        ['erector', 't', 'Sırtın yuvarlanmasını sınırlar.'], ['quadriceps', 't', 'Bacaklar uzatılırsa dizleri düz tutar.'], ['obliques', 't', 'Gövdeyi dengeler.']],
      j: [['hip', 'Fleksiyon'], ['knee', 'Fleksiyon (başlangıç) ya da ekstansiyon'], ['spine', 'Nötr, uzun']],
      spine: { move: 'Nötr; yuvarlanma önlenir', c: 0, t: 1, l: 2 },
      breath: 'Karın aktifken nefes kısalabilir; nefesi tutma.',
      bal: { base: 'Oturma kemikleri, dar', level: 2, text: 'Ağırlık oturma kemiklerinin hemen arkasında dengelenir.' },
      benefit: 'Gövde ve kalça bükücü kaslarında dayanıklılık üzerinde çalışmaya katkıda bulunabilir.',
      technique: 'Ellerini uylukların arkasında tut; ayak parmakları yerde kalabilir.',
      strain: 'Sırtı yuvarlayıp kuyruk sokumuna çökmek bel bölgesinde rahatsızlık oluşturabilir.',
      alts: ['Elleri uylukların arkasında tutmak', 'Ayak parmaklarını yerde bırakmak']
    }
  };

  /* ------------------------------------------------ ÇİZİM VERİLERİ (160 × 340) */
  const mir = (pts) => pts.map(([x, y]) => [160 - x, y]);
  const P = (pts) => pts.map(p => p.join(',')).join(' ');
  const FRONT = [
    ['neck', [[74, 44], [78, 44], [79, 56], [75, 56]], 1], ['deltoid', [[50, 58], [62, 56], [60, 72], [46, 82], [44, 70]], 1],
    ['pectoralis', [[62, 60], [79, 62], [79, 84], [64, 86], [58, 76]], 1], ['biceps', [[44, 84], [54, 80], [52, 118], [42, 120]], 1],
    ['forearm', [[40, 124], [52, 122], [50, 176], [40, 176]], 1], ['serratus', [[57, 88], [63, 88], [61, 104], [55, 100]], 1],
    ['rectusAbd', [[71, 88], [89, 88], [88, 150], [72, 150]], 0], ['obliques', [[58, 104], [69, 92], [70, 148], [60, 140]], 1],
    ['hipFlexors', [[63, 152], [76, 154], [76, 170], [65, 168]], 1], ['adductors', [[71, 176], [79, 178], [78, 228], [72, 214]], 1],
    ['quadriceps', [[54, 170], [69, 172], [71, 214], [72, 250], [58, 252], [52, 210]], 1], ['tibialis', [[58, 266], [66, 266], [65, 320], [59, 320]], 1]
  ];
  const BACK = [
    ['trapezius', [[80, 44], [70, 50], [56, 58], [64, 68], [80, 104]], 1], ['deltoid', [[50, 58], [62, 56], [60, 72], [46, 82], [44, 70]], 1],
    ['triceps', [[42, 84], [52, 82], [52, 120], [42, 120]], 1], ['forearm', [[40, 124], [52, 122], [50, 176], [40, 176]], 1],
    ['latissimus', [[57, 84], [66, 82], [77, 128], [63, 134], [56, 106]], 1], ['erector', [[74, 104], [79, 104], [79, 150], [73, 150]], 1],
    ['gluteusMed', [[55, 150], [70, 146], [70, 160], [55, 164]], 1], ['gluteusMax', [[54, 162], [79, 158], [79, 186], [58, 188]], 1],
    ['hamstrings', [[56, 192], [78, 190], [76, 250], [60, 252]], 1], ['gastrocnemius', [[57, 262], [69, 262], [68, 302], [59, 302]], 1]
  ];
  const SIL = [[80, 42], [71, 44], [68, 52], [52, 56], [43, 64], [38, 92], [36, 130], [34, 180], [37, 190], [45, 188], [47, 180], [49, 132], [53, 98], [56, 112], [54, 150], [50, 172], [51, 214], [54, 256], [55, 300], [52, 328], [68, 332], [69, 300], [71, 258], [77, 200], [80, 186]];
  const silhouette = `<path class="an-sil" d="M${P(SIL)} ${P(mir(SIL).reverse())}Z"/><circle class="an-sil" cx="80" cy="26" r="16"/>`;
  const SKEL_J = { neck: [[80, 47]], shoulder: [[56, 62], [104, 62]], elbow: [[45, 124], [115, 124]], wrist: [[40, 178], [120, 178]], spine: [[80, 112]], hip: [[67, 176], [93, 176]], knee: [[63, 258], [97, 258]], ankle: [[61, 322], [99, 322]] };

  /* ------------------------------------------------ Yardımcılar */
  const h = (s) => App.h(s), ic = (n) => App.icon(n);
  const roleOf = (d, id) => { const r = d.m.find(x => x[0] === id); return r ? r[1] : 'n'; };
  const has = (id) => !!POSES[id];
  const mid = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];

  /** Atlas tarzı kas haritası (js/anatomy-art.js); her kas tıklanabilir ve klavyeyle seçilebilir */
  function musclesSvg(d, view, sel) {
    const seen = new Set();
    return AnatomyArt.svg(view, {
      role: (id) => roleOf(d, id), sel, interactive: true, cls: 'an-svg',
      label: `${view === 'back' ? 'Arka' : 'Ön'} görünüm kas haritası`,
      attrs: (id, r, mirror) => {
        const mu = MUSCLES[id]; if (!mu) return '';
        const first = !mirror && !seen.has(id); if (first) seen.add(id);
        return first ? `tabindex="0" role="button" aria-label="${h(mu.tr)} (${h(mu.la)}): ${ROLE[r]}"` : 'aria-hidden="true"';
      }
    });
  }
  /* ---- Çizim yardımcıları: kemik kapsülü (uçları eklem başı gibi genişleyen) */
  const f1 = (n) => Math.round(n * 10) / 10;
  function boneCap(a, b, w, knob = 1.35) {
    const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1, ux = dx / L, uy = dy / L, nx = -uy, ny = ux;
    const P = (p, k, t) => `${f1(p[0] + nx * k + ux * t)} ${f1(p[1] + ny * k + uy * t)}`;
    const kw = w * knob, sh = w * 0.62;
    return `M${P(a, kw, 0)}C${P(a, kw, L * .12)} ${P(a, sh, L * .2)} ${P(a, sh, L * .3)}L${P(b, sh, -L * .3)}C${P(b, sh, -L * .2)} ${P(b, kw, -L * .12)} ${P(b, kw, 0)}`
      + `A${f1(kw)} ${f1(kw)} 0 0 1 ${P(b, -kw, 0)}C${P(b, -kw, -L * .12)} ${P(b, -sh, -L * .2)} ${P(b, -sh, -L * .3)}L${P(a, -sh, L * .3)}C${P(a, -sh, L * .2)} ${P(a, -kw, L * .12)} ${P(a, -kw, 0)}A${f1(kw)} ${f1(kw)} 0 0 1 ${P(a, kw, 0)}Z`;
  }
  const MIR = 'transform="translate(160 0) scale(-1 1)"';
  /** Önden iskelet (160 × 340) – eklem işaretleri SKEL_J ile aynı koordinatlarda */
  function skeletonSvg(d) {
    const on = new Set(d.j.map(x => x[0]));
    const ribs = Array.from({ length: 10 }, (_, i) => { const y = 64 + i * 6.2, out = 54 + Math.min(i, 5) * -0.4 + (i > 6 ? (i - 6) * 1.6 : 0);
      return `<path d="M79 ${f1(y)}C${f1(out + 6)} ${f1(y - 5)} ${f1(out - 2)} ${f1(y + 4)} ${f1(out + 1)} ${f1(y + 13)}C${f1(out + 4)} ${f1(y + 18)} ${f1(out + 14)} ${f1(y + 17)} ${i < 7 ? `76 ${f1(y + 10)}` : `${f1(out + 16)} ${f1(y + 16)}`}" class="ak-rib"/>`; }).join('');
    const half = `${ribs}
      <path d="${boneCap([79, 58], [57, 61], 2.4, 1.2)}" class="ak-bone"/>
      <path d="M57 60C52 64 52 74 58 82C62 76 62 68 60 61Z" class="ak-bone dim"/>
      <path d="${boneCap([56, 65], [46, 121], 3.6)}" class="ak-bone"/>
      <path d="${boneCap([44, 127], [38, 175], 2.2)}" class="ak-bone"/><path d="${boneCap([48, 127], [43, 175], 2)}" class="ak-bone"/>
      <path d="M36 178C32 186 32 196 36 202C40 200 44 194 46 184C44 178 40 176 36 178Z" class="ak-bone"/>
      <path d="M79 156C70 148 58 146 54 156C52 168 58 178 66 182C70 186 76 186 79 184Z" class="ak-bone"/><path d="M79 172C74 176 72 182 74 186" class="ak-line"/>
      <path d="${boneCap([67, 180], [63, 252], 4.2)}" class="ak-bone"/><ellipse cx="63" cy="259" rx="4.6" ry="5.4" class="ak-bone"/>
      <path d="${boneCap([62, 264], [61, 318], 3.4)}" class="ak-bone"/><path d="${boneCap([68, 266], [66, 318], 1.5, 1.6)}" class="ak-bone dim"/>
      <path d="M57 322C54 328 54 334 58 336L72 336C72 330 68 324 64 322Z" class="ak-bone"/>`;
    const spine = Array.from({ length: 19 }, (_, i) => { const y = 46 + i * 6.6, w = 5 + Math.min(i, 18) * 0.22; return `<rect x="${f1(80 - w / 2)}" y="${f1(y)}" width="${f1(w)}" height="4.8" rx="1.6" class="ak-vert"/>`; }).join('');
    const bones = `<g class="ak-skel">${half}<g ${MIR}>${half}</g>
      <rect x="77" y="62" width="6" height="44" rx="3" class="ak-bone"/>${spine}
      <path d="M72 168C76 186 84 186 88 168C86 178 82 182 80 182S74 178 72 168Z" class="ak-bone"/>
      <ellipse cx="80" cy="25" rx="14.5" ry="17" class="ak-bone"/><path d="M68 32C68 44 74 48 80 48S92 44 92 32C88 38 84 40 80 40S72 38 68 32Z" class="ak-bone"/>
      <ellipse cx="74" cy="24" rx="3.6" ry="3" class="ak-hole"/><ellipse cx="86" cy="24" rx="3.6" ry="3" class="ak-hole"/><path d="M80 28L78 33H82Z" class="ak-hole"/></g>`;
    const joints = Object.entries(SKEL_J).map(([k, pts]) => pts.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="${on.has(k) ? 6 : 3}" class="an-j ${on.has(k) ? 'on' : ''}" data-j="${k}" ${on.has(k) ? `tabindex="0" role="button" aria-label="${JOINT[k]}"` : ''}><title>${JOINT[k]}${on.has(k) ? ': ' + h(d.j.find(x => x[0] === k)[1]) : ''}</title></circle>`).join('')).join('');
    return `<svg viewBox="0 0 160 340" class="an-svg ak-svg" role="img" aria-label="İskelet ve eklemler">${bones}${joints}</svg>`;
  }
  /** Omurga – yandan görünüm, doğal eğrilerle; bölgeler pozdaki etkilenmeye göre renklenir */
  function spineSvg(d) {
    const LV = ['az', 'orta', 'belirgin'];
    const regions = [['Boyun (servikal)', 'C1–C7', 7, 8.5, 17, d.spine.c], ['Sırt (torakal)', 'T1–T12', 12, 10.5, 21, d.spine.t], ['Bel (lomber)', 'L1–L5', 5, 14.5, 27, d.spine.l]];
    const ctrl = [[118, 12], [108, 52], [114, 92], [128, 150], [126, 204], [110, 252], [106, 284]];
    const cx = (y) => { for (let i = 1; i < ctrl.length; i++) { const [x0, y0] = ctrl[i - 1], [x1, y1] = ctrl[i]; if (y <= y1) { const k = (y - y0) / (y1 - y0), e = 0.5 - Math.cos(k * Math.PI) / 2; return x0 + (x1 - x0) * e; } } return ctrl[ctrl.length - 1][0]; };
    let y = 14, out = '', labels = '';
    regions.forEach(([name, code, n, hgt, w, lv]) => {
      const y0 = y;
      for (let i = 0; i < n; i++) {
        const yc = y + hgt / 2, x = cx(yc), a = Math.atan2(cx(yc + 4) - cx(yc - 4), 8) * -180 / Math.PI;
        const sp = name.startsWith('Sırt') ? `M${f1(w / 2 - 2)} -2L${f1(w / 2 + 16)} ${f1(hgt * 0.9)}L${f1(w / 2 + 12)} ${f1(hgt * 1.15)}L${f1(w / 2 - 2)} ${f1(hgt / 2)}Z`
          : `M${f1(w / 2 - 2)} ${f1(-hgt * .3)}L${f1(w / 2 + 12)} ${f1(-hgt * .1)}L${f1(w / 2 + 12)} ${f1(hgt * .35)}L${f1(w / 2 - 2)} ${f1(hgt * .35)}Z`;
        out += `<g transform="translate(${f1(x)} ${f1(yc)}) rotate(${f1(a)})"><path d="${sp}" class="ak-vert-p lv${lv}"/><rect x="${f1(-w / 2)}" y="${f1(-hgt / 2)}" width="${w}" height="${hgt}" rx="${f1(hgt * .28)}" class="ak-vert-b lv${lv}"/></g>`;
        y += hgt;
        if (i < n - 1 || name.startsWith('Boyun') || name.startsWith('Sırt')) { const xd = cx(y + 1.6); out += `<rect x="${f1(xd - w / 2 + 1)}" y="${f1(y + .3)}" width="${w - 2}" height="2.6" rx="1.3" class="ak-disc"/>`; }
        y += 3.2;
      }
      const ym = (y0 + y) / 2;
      labels += `<path d="M168 ${f1(y0 + 2)}H172V${f1(y - 5)}H168" class="ak-brace"/><text x="180" y="${f1(ym - 4)}" class="an-t">${name}</text><text x="180" y="${f1(ym + 10)}" class="ak-sub">${code} · etki: ${LV[lv] || 'az'}</text>`;
    });
    const sx = cx(y + 18);
    out += `<path d="M${f1(sx - 15)} ${f1(y)}C${f1(sx - 12)} ${f1(y + 20)} ${f1(sx - 2)} ${f1(y + 38)} ${f1(sx + 10)} ${f1(y + 48)}L${f1(sx + 18)} ${f1(y + 44)}C${f1(sx + 12)} ${f1(y + 30)} ${f1(sx + 12)} ${f1(y + 14)} ${f1(sx + 16)} ${f1(y)}Z" class="ak-bone"/>
      <path d="M${f1(sx + 10)} ${f1(y + 50)}l3 7 4-2-2-6z" class="ak-bone"/>`;
    labels += `<path d="M168 ${f1(y + 2)}H172V${f1(y + 50)}H168" class="ak-brace"/><text x="180" y="${f1(y + 24)}" class="an-t">Sakrum ve kuyruk sokumu</text>`;
    return `<svg viewBox="0 0 330 ${f1(y + 70)}" class="an-svg spine ak-svg" role="img" aria-label="Omurga bölgelerinin pozdaki etkisi: ${h(d.spine.move)}">
      <text x="62" y="${f1(y + 66)}" class="ak-sub">← ön</text><text x="140" y="${f1(y + 66)}" class="ak-sub">arka →</text>${out}${labels}</svg>`;
  }
  /** Göğüs kafesi, akciğerler ve diyafram – önden */
  function breathSvg(d) {
    const dia = d.m.some(x => x[0] === 'diaphragm'), ic2 = d.m.some(x => x[0] === 'intercostals');
    const lungL = 'M76 44C62 46 46 70 44 104C42 128 46 146 52 152C60 150 70 146 78 148C80 128 78 92 79 62C79 52 78 46 76 44Z';
    const ribs = Array.from({ length: 8 }, (_, i) => { const y = 50 + i * 13; return `<path d="M80 ${y}C60 ${y - 8} 36 ${y + 2} 34 ${y + 18}C34 ${y + 26} 44 ${y + 30} 58 ${y + 26}" class="ak-rib2 ${ic2 ? 'on' : ''}"/>`; }).join('');
    const half = `<path d="${lungL}" class="ak-lung"/><path d="M50 98C58 92 68 96 76 92M47 122C58 116 66 120 74 114" class="ak-fiss"/>${ribs}`;
    return `<svg viewBox="0 0 160 200" class="an-svg ak-svg" role="img" aria-label="Göğüs kafesi, akciğerler ve diyafram">
      ${half}<g ${MIR}>${half}</g>
      <path d="M80 14V44M80 44L69 58M80 44L91 58" class="ak-trachea"/>
      <rect x="76" y="46" width="8" height="70" rx="4" class="ak-bone"/>
      <path d="M28 172C36 150 56 150 80 157C104 150 124 150 132 172" class="ak-dia ${dia ? 'on' : ''}"/>
      <text x="80" y="186" class="an-t mid">Diyafram${dia ? ' · aktif' : ''}</text><text x="80" y="198" class="ak-sub mid">${ic2 ? 'Kaburgalar arası kaslar da çalışır' : ''}</text></svg>`;
  }
  function figureWithJoints(pose, d) {
    const f = pose.fig; const pos = { neck: mid(f.h, f.n), shoulder: f.n, elbow: f.le, wrist: f.lh, spine: f.c || mid(f.n, f.p), hip: f.p, knee: f.lk, ankle: f.lf };
    const marks = d.j.map(([k, mv], i) => pos[k] ? `<g class="an-fj" data-j="${k}" tabindex="0" role="button" aria-label="${JOINT[k]}: ${h(mv)}"><circle cx="${pos[k][0]}" cy="${pos[k][1]}" r="8"/><text x="${pos[k][0]}" y="${pos[k][1] + 3.5}">${i + 1}</text><title>${JOINT[k]}: ${h(mv)}</title></g>` : '').join('');
    return App.figure(f, { label: pose.tr + ' – eklem işaretleri' }).replace(/<\/svg>\s*$/, `<g class="an-fjs">${marks}</g></svg>`);
  }
  function balanceSvg(pose, d) {
    const f = pose.fig; const ground = ['lf', 'rf', 'lh', 'rh', 'p', 'lk', 'rk'].map(k => f[k]).filter(p => p && p[1] >= 168);
    const xs = ground.map(p => p[0]); const x0 = Math.min(...xs), x1 = Math.max(...xs);
    const svg = App.figure(f, { label: pose.tr + ' – destek tabanı' }).replace(/<\/svg>\s*$/, `<g class="an-bal"><path d="M${f.h[0]} ${f.h[1]}V182" class="an-cl"/><rect x="${x0 - 4}" y="183" width="${Math.max(8, x1 - x0 + 8)}" height="5" rx="2.5" class="an-base"/></g></svg>`);
    return `${svg}<div class="an-meter" aria-label="Denge talebi: ${BAL_LEVEL[d.bal.level]}">${[1, 2, 3].map(i => `<span class="${i <= d.bal.level ? 'on' : ''}"></span>`).join('')}<b>Denge talebi: ${BAL_LEVEL[d.bal.level]}</b></div>`;
  }
  const legend = () => `<ul class="an-legend">${['a', 's', 't', 'n'].map(r => `<li><span class="an-sw r-${r}"></span>${ROLE[r]}</li>`).join('')}</ul>`;

  function muscleCard(d, id) {
    const mu = MUSCLES[id]; const row = d.m.find(x => x[0] === id); const r = row ? row[1] : 'n';
    return `<div class="an-card"><span class="an-badge r-${r}">${ROLE[r]}</span><h4>${h(mu.tr)}</h4><p class="an-la"><em>${h(mu.la)}</em> · ${h(mu.region)}</p>
      ${row ? `<p><strong>Poz sırasında:</strong> ${h(row[2])}</p>` : '<p>Bu pozda belirgin bir rolü yok.</p>'}<p class="tiny muted"><strong>Genel görevi:</strong> ${h(mu.func)}</p></div>`;
  }

  /* ------------------------------------------------ Poz sayfası bileşeni */
  function mount(host, poseId) {
    const d = POSES[poseId], pose = App.poseById(poseId);
    if (!d) { host.innerHTML = ''; return; }
    const st = { view: 'front', sys: 'kas', hide: new Set(), sel: (d.m.find(x => !MUSCLES[x[0]].deep) || d.m[0])[0], joint: d.j[0] && d.j[0][0] };
    const SYS = [['kas', 'Kas sistemi'], ['iskelet', 'İskelet'], ['omurga', 'Omurga ve eklemler'], ['solunum', 'Solunum'], ['denge', 'Denge ve postür']];
    const stage = () => {
      if (st.sys === 'kas') {
        if (st.view === 'side') return `<div class="an-fig">${figureWithJoints(pose, d)}</div><p class="tiny muted">Yan görünüm pozun kendi çizimidir; numaralar hareket eden eklemleri gösterir.</p>`;
        return `<div class="an-fig ${[...st.hide].map(r => 'hide-' + r).join(' ')}">${musclesSvg(d, st.view, st.sel)}</div>${legend()}`;
      }
      if (st.sys === 'iskelet') return `<div class="an-fig">${skeletonSvg(d)}</div><p class="tiny muted">Büyük daireler bu pozda belirgin hareket eden eklemlerdir.</p>`;
      if (st.sys === 'omurga') return `<div class="an-fig wide">${spineSvg(d)}</div><ul class="an-legend"><li><span class="an-sw lv2"></span>Belirgin</li><li><span class="an-sw lv1"></span>Orta</li><li><span class="an-sw lv0"></span>Az</li></ul>`;
      if (st.sys === 'solunum') return `<div class="an-fig">${breathSvg(d)}</div>`;
      return `<div class="an-fig">${balanceSvg(pose, d)}</div>`;
    };
    const side = () => {
      if (st.sys === 'kas') return st.view === 'side'
        ? `<div class="an-card"><h4>${ic('git-commit-vertical')} Eklem hareketleri</h4><ol class="an-jlist">${d.j.map(([k, mv]) => `<li><strong>${JOINT[k]}:</strong> ${h(mv)}</li>`).join('')}</ol></div>`
        : muscleCard(d, st.sel);
      if (st.sys === 'iskelet' || st.sys === 'omurga') return `<div class="an-card">${st.sys === 'omurga' ? `<h4>${ic('align-center-vertical')} Omurga: ${h(d.spine.move)}</h4>` : `<h4>${ic('bone')} Eklemler</h4>`}
        <ul class="an-jlist">${d.j.map(([k, mv]) => `<li class="${st.joint === k ? 'sel' : ''}"><strong>${JOINT[k]}:</strong> ${h(mv)}</li>`).join('')}</ul></div>`;
      if (st.sys === 'solunum') return `<div class="an-card"><h4>${ic('wind')} Solunum ve göğüs kafesi</h4><p>${h(d.breath)}</p><p class="tiny muted">${h(MUSCLES.diaphragm.func)}</p></div>`;
      return `<div class="an-card"><h4>${ic('scale')} Denge ve postür</h4><p><strong>Destek tabanı:</strong> ${h(d.bal.base)}</p><p>${h(d.bal.text)}</p></div>`;
    };
    const render = () => {
      host.innerHTML = `
        <div class="an-cats">${d.cats.map(c => `<a class="chip" href="#/modul/m8/${c}">${h(CATS.find(x => x.id === c).title)}</a>`).join('')}</div>
        <div class="an-tabs" role="tablist" aria-label="Sistemler">${SYS.map(([k, l]) => `<button role="tab" aria-selected="${st.sys === k}" data-sys="${k}">${l}</button>`).join('')}</div>
        <div class="an-grid">
          <div class="an-stage">
            ${st.sys === 'kas' ? `<div class="an-views" role="group" aria-label="Görünüm">${[['front', 'Ön'], ['back', 'Arka'], ['side', 'Yan (poz)']].map(([k, l]) => `<button aria-pressed="${st.view === k}" data-view="${k}">${l}</button>`).join('')}</div>
            ${st.view !== 'side' ? `<div class="an-toggles" role="group" aria-label="Kas grupları">${['a', 's', 't', 'n'].map(r => `<label><input type="checkbox" data-role="${r}" ${st.hide.has(r) ? '' : 'checked'}><span class="an-sw r-${r}"></span>${ROLE[r]}</label>`).join('')}</div>` : ''}` : ''}
            ${stage()}
          </div>
          <div class="an-side">${side()}</div>
        </div>`;
      App.refreshIcons();
    };
    host.addEventListener('click', (e) => {
      const t = e.target.closest('[data-sys],[data-view],[data-m],[data-j]'); if (!t) return;
      if (t.dataset.sys) st.sys = t.dataset.sys; else if (t.dataset.view) st.view = t.dataset.view;
      else if (t.dataset.m) st.sel = t.dataset.m; else if (t.dataset.j) st.joint = t.dataset.j;
      render();
      const again = host.querySelector(t.dataset.m ? `[data-m="${t.dataset.m}"]` : t.dataset.sys ? `[data-sys="${t.dataset.sys}"]` : t.dataset.view ? `[data-view="${t.dataset.view}"]` : null); if (again) again.focus();
    });
    host.addEventListener('keydown', (e) => { if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('[data-m],[data-j]')) { e.preventDefault(); e.target.dispatchEvent(new MouseEvent('click', { bubbles: true })); } });
    host.addEventListener('change', (e) => { const r = e.target.dataset.role; if (!r) return; e.target.checked ? st.hide.delete(r) : st.hide.add(r); render(); host.querySelector(`[data-role="${r}"]`).focus(); });
    render();
  }

  /** Poz sayfasında gösterilen statik bilgi kartları */
  function infoCards(poseId) {
    const d = POSES[poseId]; if (!d) return '';
    const alts = d.alts.map(a => `<li>${h(a)}</li>`).join('');
    return `<div class="an-cards">${d.m.map(([id]) => muscleCard(d, id)).join('')}</div>
      <div class="grid-2 an-extra">
        <div class="card"><h3>${ic('sparkles')} Vücuda sağlayabileceği fonksiyonel katkı</h3><p>${h(d.benefit)}</p></div>
        <div class="card"><h3>${ic('circle-check')} Doğru uygulama tekniği</h3><p>${h(d.technique)}</p></div>
        <div class="card warn-card"><h3>${ic('triangle-alert')} Yanlış uygulamada oluşabilecek zorlanmalar</h3><p>${h(d.strain)}</p></div>
        <div class="card"><h3>${ic('hand-heart')} Alternatif ve kolaylaştırılmış biçimler</h3><ul>${alts}</ul></div>
      </div>
      <p class="tiny muted an-note">${ic('info')} Kasların rolü kişiden kişiye, bedenin yapısına, hareket kısıtlılıklarına ve pozun nasıl uygulandığına göre değişebilir. Bu bilgiler genel anatomi ve hareket bilimi bilgisine dayanır; tıbbi değerlendirme yerine geçmez.</p>`;
  }

  /* ------------------------------------------------ Karşılaştırma ve mini test */
  function compareHtml(a, b) {
    const da = POSES[a], db = POSES[b], pa = App.poseById(a), pb = App.poseById(b);
    const ids = [...new Set([...da.m, ...db.m].map(x => x[0]))];
    const cell = (d, id) => { const r = roleOf(d, id); return `<td><span class="an-badge r-${r}">${ROLE[r]}</span></td>`; };
    return `<div class="an-cmp-maps">${[[pa, da], [pb, db]].map(([p, d]) => `<figure><figcaption>${h(p.tr)}</figcaption><div class="an-pair">${musclesSvg(d, 'front')}${musclesSvg(d, 'back')}</div></figure>`).join('')}</div>${legend()}
      <div class="table-scroll" tabindex="0" role="region" aria-label="Anatomik karşılaştırma tablosu"><table class="table an-cmp-table"><thead><tr><th>Kas</th><th>${h(pa.tr)}</th><th>${h(pb.tr)}</th></tr></thead><tbody>
      ${ids.map(id => `<tr><td>${h(MUSCLES[id].tr)}<br><small><em>${h(MUSCLES[id].la)}</em></small></td>${cell(da, id)}${cell(db, id)}</tr>`).join('')}</tbody></table></div>`;
  }
  function quizQuestions(n) {
    const pool = [];
    Object.entries(POSES).forEach(([pid, d]) => {
      const pose = App.poseById(pid);
      d.m.filter(x => x[1] !== 'n').forEach(([id, r, mv]) => pool.push({ q: `${pose.tr} pozunda ${MUSCLES[id].tr.toLocaleLowerCase('tr')} genellikle hangi roldedir?`, o: ['Aktif çalışan', 'Esneyen', 'Stabilizasyon sağlayan'], a: { a: 0, s: 1, t: 2 }[r], e: mv }));
      pool.push({ q: `${pose.tr} pozunda omurganın genel hareketi hangisidir?`, o: [d.spine.move, ...['Rotasyon (dönme)', 'Derin fleksiyon', 'Yana eğilme'].filter(x => x !== d.spine.move).slice(0, 2)], a: 0, e: `Omurga: ${d.spine.move}.`, shuffle: true });
    });
    Object.entries(MUSCLES).forEach(([id, mu]) => { const others = Object.values(MUSCLES).filter(x => x !== mu).sort(() => Math.random() - .5).slice(0, 2).map(x => x.la); pool.push({ q: `“${mu.tr}” kasının Latince adı hangisidir?`, o: [mu.la, ...others], a: 0, e: mu.func, shuffle: true }); });
    const picked = pool.sort(() => Math.random() - .5).slice(0, n);
    return picked.map(q => { if (!q.shuffle) return q; const right = q.o[q.a]; const o = q.o.slice().sort(() => Math.random() - .5); return { ...q, o, a: o.indexOf(right) }; });
  }
  function mountQuiz(host) {
    let qs = quizQuestions(5), i = 0, ok = 0;
    const view = () => {
      if (i >= qs.length) { host.innerHTML = `<div class="an-quiz-res"><b>${ok}/${qs.length}</b> doğru · %${Math.round(ok / qs.length * 100)}<button class="btn" data-again>${ic('rotate-ccw')} Yeni sorular</button></div>`; App.refreshIcons(); return; }
      const q = qs[i];
      host.innerHTML = `<p class="muted tiny">Soru ${i + 1}/${qs.length}</p><p class="q"><strong>${h(q.q)}</strong></p><div class="opts">${q.o.map((o, k) => `<button class="opt" data-k="${k}">${h(o)}</button>`).join('')}</div><div class="feedback" aria-live="polite"></div>`;
    };
    host.addEventListener('click', (e) => {
      if (e.target.closest('[data-again]')) { qs = quizQuestions(5); i = 0; ok = 0; view(); return; }
      const b = e.target.closest('.opt'); if (!b || b.disabled) return;
      const q = qs[i], k = Number(b.dataset.k), right = k === q.a; if (right) ok++;
      host.querySelectorAll('.opt').forEach(x => { x.disabled = true; const kk = Number(x.dataset.k); if (kk === q.a) x.classList.add('correct'); else if (kk === k) x.classList.add('wrong'); });
      host.querySelector('.feedback').innerHTML = `<p class="${right ? 'ok' : 'bad'}"><strong>${right ? 'Doğru!' : 'Yanlış.'}</strong> ${h(q.e)}</p><button class="btn small" data-next>${i === qs.length - 1 ? 'Sonucu gör' : 'Sonraki'} ${ic('arrow-right')}</button>`;
      App.refreshIcons();
    });
    host.addEventListener('click', (e) => { if (e.target.closest('[data-next]')) { i++; view(); } });
    view();
  }

  /* ------------------------------------------------ Modül sayfası */
  function renderHub(el, m, cat) {
    const ids = Object.keys(POSES);
    const done = (c) => Progress.isRead(m.id, c);
    el.innerHTML = `
      <section class="band band-center chapter-band tone-3"><p class="band-label">Modül ${m.no}/${YA.modules.length}</p><h1 class="display">${h(m.title)}</h1>
        <p class="lead">${h(m.summary)}</p>${App.ill('pozlar', '')}</section>
      <div class="reading an-hub">
        <div class="prose">${m.intro}</div>
        <h2 class="list-title" id="kategoriler">Anatomik etki kategorileri</h2>
        <div class="an-catgrid">${CATS.map(c => { const ps = ids.filter(id => POSES[id].cats.includes(c.id)); return `<section class="card an-catcard ${cat === c.id ? 'flash' : ''}" id="cat-${c.id}">
          <h3>${App.yi(c.icon)} ${h(c.title)} <span class="chip">${ps.length} poz</span></h3>
          <ul class="an-catposes">${ps.map(id => { const p = App.poseById(id); return `<li><a href="#/poz/${id}">${App.figure(p.fig, { small: true, label: p.tr })}<span>${h(p.tr)}</span></a></li>`; }).join('')}</ul>
          <button class="btn small ${done(c.id) ? 'is-read' : ''}" data-cat="${c.id}">${ic(done(c.id) ? 'circle-check' : 'circle')} ${done(c.id) ? 'İncelendi' : 'İnceledim'}</button></section>`; }).join('')}</div>
        <h2 class="list-title" id="karsilastir">Pozları anatomik olarak karşılaştır</h2>
        <div class="card"><div class="an-cmp-sel">${['A', 'B'].map((k, i) => `<label class="field"><span>Poz ${k}</span><select data-cmp="${i}">${ids.map((id, j) => `<option value="${id}" ${j === i ? 'selected' : ''}>${h(App.poseById(id).tr)}</option>`).join('')}</select></label>`).join('')}</div>
          <div id="anCmp">${compareHtml(ids[0], ids[1])}</div></div>
        <h2 class="list-title" id="mini-test">Mini test: anatomik kavramlar</h2>
        <div class="card an-quiz" id="anQuiz"></div>
        <div class="card quiz-cta"><div><h3>${ic('list-checks')} Modül ${m.no} sınavı</h3><p class="muted">Kalıcı puanın için modül sınavını çöz.</p></div><a class="btn primary" href="#/quiz/${m.id}">Sınava başla</a></div>
        ${App.sourceList(m.sources)}
      </div>`;
    el.querySelectorAll('[data-cat]').forEach(b => b.addEventListener('click', () => {
      const v = !Progress.isRead(m.id, b.dataset.cat); Progress.setRead(m.id, b.dataset.cat, v);
      b.classList.toggle('is-read', v); b.innerHTML = `${ic(v ? 'circle-check' : 'circle')} ${v ? 'İncelendi' : 'İnceledim'}`; Progress.checkBadges(); App.refreshIcons(); App.updateChrome();
    }));
    const sels = el.querySelectorAll('[data-cmp]');
    sels.forEach(s => s.addEventListener('change', () => { el.querySelector('#anCmp').innerHTML = compareHtml(sels[0].value, sels[1].value); }));
    mountQuiz(el.querySelector('#anQuiz'));
    if (cat) setTimeout(() => { const t = document.getElementById('cat-' + cat) || document.getElementById(cat); if (t) t.scrollIntoView({ behavior: 'smooth' }); }, 60);
  }

  return { MUSCLES, CATS, POSES, ROLE, has, mount, infoCards, renderHub, musclesSvg, skeletonSvg, spineSvg, breathSvg, quizQuestions };
})();
