/* ==========================================================================
   Yoga Akademisi – Eğitim içeriği (özgün Türkçe anlatım)
   Tüm içerikler kaynakçadaki kurumların yayınlarından yararlanılarak
   özgün biçimde yazılmıştır; doğrudan alıntı içermez.
   ========================================================================== */
window.YA = window.YA || {};

/* -------------------------------------------------- KAYNAKLAR */
YA.sources = {
  nccihYoga: { org: 'NCCIH (ABD Ulusal Sağlık Enstitüleri)', title: 'Yoga: What You Need To Know', url: 'https://www.nccih.nih.gov/health/yoga-what-you-need-to-know' },
  nccihYogaSafety: { org: 'NCCIH', title: 'Yoga: Effectiveness and Safety', url: 'https://www.nccih.nih.gov/health/yoga-effectiveness-and-safety' },
  nccihMeditation: { org: 'NCCIH', title: 'Meditation and Mindfulness: What You Need To Know', url: 'https://www.nccih.nih.gov/health/meditation-and-mindfulness-what-you-need-to-know' },
  nccihRelax: { org: 'NCCIH', title: 'Relaxation Techniques: What You Need To Know', url: 'https://www.nccih.nih.gov/health/relaxation-techniques-what-you-need-to-know' },
  nhsYoga: { org: 'NHS (Birleşik Krallık Ulusal Sağlık Hizmeti)', title: 'A guide to yoga', url: 'https://www.nhs.uk/live-well/exercise/guide-to-yoga/' },
  nhsBreathing: { org: 'NHS', title: 'Breathing exercises for stress', url: 'https://www.nhs.uk/mental-health/self-help/guides-tools-and-activities/breathing-exercises-for-stress/' },
  nhsMindfulness: { org: 'NHS', title: 'Mindfulness', url: 'https://www.nhs.uk/mental-health/self-help/tips-and-support/mindfulness/' },
  nhsBalance: { org: 'NHS', title: 'Balance exercises', url: 'https://www.nhs.uk/live-well/exercise/balance-exercises/' },
  nhsFlex: { org: 'NHS', title: 'Flexibility exercises', url: 'https://www.nhs.uk/live-well/exercise/flexibility-exercises/' },
  nhsPregnancy: { org: 'NHS', title: 'Exercise in pregnancy', url: 'https://www.nhs.uk/pregnancy/keeping-well/exercise/' },
  harvardYoga: { org: 'Harvard Health Publishing', title: 'Yoga – Benefits Beyond the Mat', url: 'https://www.health.harvard.edu/staying-healthy/yoga-benefits-beyond-the-mat' },
  harvardBreath: { org: 'Harvard Health Publishing', title: 'Relaxation techniques: Breath control helps quell errant stress response', url: 'https://www.health.harvard.edu/mind-and-mood/relaxation-techniques-breath-control-helps-quell-errant-stress-response' },
  harvardCore: { org: 'Harvard Health Publishing', title: 'The real-world benefits of strengthening your core', url: 'https://www.health.harvard.edu/staying-healthy/the-real-world-benefits-of-strengthening-your-core' },
  ccDiaphragm: { org: 'Cleveland Clinic', title: 'Diaphragmatic Breathing', url: 'https://my.clevelandclinic.org/health/articles/9445-diaphragmatic-breathing' },
  ccBox: { org: 'Cleveland Clinic', title: 'Box Breathing Benefits and Techniques', url: 'https://health.clevelandclinic.org/box-breathing-benefits' },
  ccNadi: { org: 'Cleveland Clinic', title: 'Alternate Nostril Breathing', url: 'https://health.clevelandclinic.org/alternate-nostril-breathing' },
  ccBodyScan: { org: 'Cleveland Clinic', title: 'Body Scan Meditation', url: 'https://health.clevelandclinic.org/body-scan-meditation' },
  ccSpine: { org: 'Cleveland Clinic', title: 'Spine: Structure and Function', url: 'https://my.clevelandclinic.org/health/articles/10040-spine-structure-and-function' },
  ccHamstring: { org: 'Cleveland Clinic', title: 'Hamstring Muscles', url: 'https://my.clevelandclinic.org/health/body/21904-hamstring-muscles' },
  ccHip: { org: 'Cleveland Clinic', title: 'Hip Joint', url: 'https://my.clevelandclinic.org/health/body/24675-hip-joint' },
  yogaJournalPoses: { org: 'Yoga Journal', title: 'Yoga Poses (pozisyon kütüphanesi)', url: 'https://www.yogajournal.com/poses/' },
  yogaAlliance: { org: 'Yoga Alliance', title: 'Yoga Alliance – eğitmen ve okul standartları', url: 'https://www.yogaalliance.org/' },
  iayt: { org: 'International Association of Yoga Therapists', title: 'IAYT – yoga terapisi meslek kuruluşu', url: 'https://www.iayt.org/' }
};
YA.sourcesAccessed = 'Kasım 2026';

/* -------------------------------------------------- MODÜLLER
   kind: 'text'  -> sections içindeki metinler
   kind: 'breath'-> YA.breaths öğeleri bölüm sayılır
   kind: 'poses' -> YA.poses (başlangıç + orta) öğeleri bölüm sayılır
   kind: 'programs' -> YA.programs öğeleri bölüm sayılır                */
YA.modules = [
{
  id: 'm1', no: 1, icon: 'sprout', kind: 'text',
  title: "Yoga'ya Giriş",
  summary: 'Yoganın ne olduğunu, kökenini, temel felsefesini ve bugün en çok uygulanan stilleri öğren.',
  sources: ['nccihYoga', 'nccihYogaSafety', 'nhsYoga', 'harvardYoga', 'yogaAlliance'],
  sections: [
    { id: 'nedir', title: 'Yoga nedir?', html: `
<p>“Yoga” sözcüğü Sanskritçe <em>yuj</em> kökünden gelir; bu kök “birleştirmek, bağlamak, boyunduruğa koşmak” gibi anlamlar taşır. Geleneksel anlatımda yoga; beden, nefes ve zihnin bir arada, dikkatle çalıştırıldığı bir uygulama bütünüdür.</p>
<p>Bugün Türkiye’de ve dünyada “yoga” denildiğinde çoğunlukla üç bileşenin birleşimi kastedilir:</p>
<ul>
<li><strong>Asana</strong> – fiziksel duruşlar ve hareketler,</li>
<li><strong>Pranayama</strong> – nefesle çalışma teknikleri,</li>
<li><strong>Meditasyon / gevşeme</strong> – dikkati toplama ve dinlenme uygulamaları.</li>
</ul>
<p>ABD Ulusal Sağlık Enstitüleri’ne bağlı NCCIH, modern yogayı tam olarak bu şekilde, yani fiziksel duruşları, nefes tekniklerini ve meditasyonu birleştiren bir “zihin-beden uygulaması” olarak tanımlar.</p>
<div class="callout info"><strong>Akılda kalsın:</strong> Yoga bir yarış ya da esneklik gösterisi değildir. Başlangıç seviyesinde amaç; hareketleri güvenle öğrenmek, nefesi fark etmek ve düzenli pratik alışkanlığı kurmaktır.</div>` },
    { id: 'tarihce', title: "Yoga'nın tarihçesi", html: `
<p>Yoganın kökleri binlerce yıl öncesine, Hindistan alt kıtasına uzanır. Tarihçiler kesin bir başlangıç tarihi üzerinde uzlaşmaz; ancak bazı önemli dönüm noktaları genel kabul görür:</p>
<ol class="timeline">
<li><strong>Vedalar ve Upanişadlar:</strong> Meditasyon, nefes ve iç gözleme dair ilk felsefi metinler.</li>
<li><strong>Patanjali’nin Yoga Sutraları:</strong> Tarihi yaklaşık MÖ 2. yüzyıl ile MS 5. yüzyıl arasında tartışılan bu eser, yogayı “zihnin dalgalanmalarının durulması” olarak tanımlar ve sekiz basamaklı bir yol sunar.</li>
<li><strong>Hatha Yoga metinleri (yaklaşık 11.–15. yüzyıllar):</strong> <em>Hatha Yoga Pradipika</em> gibi metinlerde beden duruşları ve nefes teknikleri ön plana çıkar.</li>
<li><strong>Batı’ya açılış (19. yüzyıl sonu):</strong> Swami Vivekananda’nın 1893 Chicago Dünya Dinler Parlamentosu’ndaki konuşmaları yogaya Batı’da ilgi uyandırır.</li>
<li><strong>Modern duruş yogası (20. yüzyıl):</strong> T. Krishnamacharya ve öğrencileri (B.K.S. Iyengar, K. Pattabhi Jois, T.K.V. Desikachar) bugün stüdyolarda gördüğümüz akışların ve hizalama yaklaşımlarının temelini atar.</li>
</ol>
<p>Kısacası bugünkü stüdyo yogası, kadim bir felsefi geleneğin yüzyıllar içinde dönüşmüş, beden odaklı modern bir yorumudur.</p>` },
    { id: 'felsefe', title: "Yoga'nın temel felsefesi", html: `
<div class="callout tradition"><strong>Geleneksel görüş</strong> – Bu bölüm yoga felsefesini tarihsel ve kültürel bir bilgi olarak aktarır; bilimsel bir iddia içermez.</div>
<p>Patanjali’nin Yoga Sutraları’nda tarif edilen <strong>sekiz basamak (Ashtanga – “sekiz uzuv”)</strong> yoga felsefesinin en bilinen çerçevesidir:</p>
<ol>
<li><strong>Yama</strong> – topluma karşı etik ilkeler (ör. <em>ahimsa</em>: zarar vermemek, <em>satya</em>: doğruluk).</li>
<li><strong>Niyama</strong> – kişisel disiplinler (ör. temizlik, yetinme, öz-çalışma).</li>
<li><strong>Asana</strong> – sabit ve rahat oturuş/duruş.</li>
<li><strong>Pranayama</strong> – nefesin düzenlenmesi.</li>
<li><strong>Pratyahara</strong> – duyuları dış uyaranlardan içe çekmek.</li>
<li><strong>Dharana</strong> – konsantrasyon.</li>
<li><strong>Dhyana</strong> – meditasyon.</li>
<li><strong>Samadhi</strong> – derin bütünleşme hâli.</li>
</ol>
<p>Pratikte bu felsefenin bir yeni başlayana en yararlı dersi <strong>ahimsa</strong>dır: kendine de zarar vermemek. Bedenini zorlamadan, ağrı sınırına gitmeden çalışmak yoga felsefesiyle de uyumludur.</p>` },
    { id: 'boyutlar', title: 'Fiziksel ve zihinsel boyutlar', html: `
<p>Yoga pratiği iki düzlemde birlikte çalışır:</p>
<div class="grid-2">
<div class="mini-card"><h4>Fiziksel boyut</h4><p>Duruşlar; kas kuvveti, eklem hareketliliği, esneklik ve denge üzerinde çalışmayı sağlar. Hareketler yavaş ve kontrollü olduğundan beden farkındalığı da gelişir.</p></div>
<div class="mini-card"><h4>Zihinsel boyut</h4><p>Nefese ve bedensel duyumlara dikkat vermek, dikkati “şimdi”ye getirmeye yardım eder. Pratiğin sonundaki gevşeme bölümü dinlenmeyi destekler.</p></div>
</div>
<div class="callout science"><strong>Bilimsel bulgular ne diyor?</strong> Araştırmalar yoga uygulamasının bazı kişilerde yardımcı olabileceğini düşündürmektedir; NCCIH bu alanlar arasında bel ve boyun ağrısını, stres yönetimini, genel iyi oluşu ve uyku kalitesini sayar. Kanıtın gücü çalışmaya, yoga türüne, süreye ve katılımcı grubuna göre değişir. Pek çok konuda kanıt hâlâ sınırlıdır ve çalışmaların bir kısmı küçük ölçeklidir. Yoga, tıbbi değerlendirme veya tedavinin yerine geçmez.</div>` },
    { id: 'turler', title: 'Yoga türleri', html: `
<p>Farklı ekoller aynı temel duruşları farklı tempo, yoğunluk ve vurguyla uygular. En yaygın beş stil:</p>
<div class="style-grid">
<div class="mini-card"><h4>Hatha Yoga</h4><p>Duruşların tek tek, görece yavaş tempoda öğretildiği genel çatı adı. Duruşlar arasında dinlenme verilir. <strong>Yeni başlayanlar için çok uygundur.</strong></p></div>
<div class="mini-card"><h4>Vinyasa Yoga</h4><p>Duruşların nefesle senkronize, akıcı bir dizi hâlinde birbirine bağlandığı stil. Temposu daha yüksektir; temel duruşları öğrendikten sonra denenmesi önerilir.</p></div>
<div class="mini-card"><h4>Yin Yoga</h4><p>Çoğunlukla yerde, pasif duruşların birkaç dakika boyunca tutulduğu sakin bir stil. Burada da amaç zorlamak değil, yumuşak bir esneme hissinde kalmaktır.</p></div>
<div class="mini-card"><h4>Ashtanga Yoga</h4><p>K. Pattabhi Jois’in yaygınlaştırdığı, sabit bir duruş serisinin her seferinde aynı sırayla yapıldığı yoğun ve fiziksel olarak zorlu bir stil.</p></div>
<div class="mini-card"><h4>Restoratif Yoga</h4><p>Blok, battaniye, minder gibi desteklerle bedenin tamamen desteklendiği, az sayıda duruşun uzun süre tutulduğu dinlendirici stil.</p></div>
</div>
<p>Bu akademideki pratikler Hatha yaklaşımını temel alır: tek tek öğren, nefesle birleştir, sonra basit akışlara geç.</p>` },
    { id: 'meditasyon-farki', title: 'Yoga ve meditasyon arasındaki fark', html: `
<p>Meditasyon, dikkati belirli bir nesneye (nefes, ses, beden duyumları) yönelterek ya da gelen deneyimi yargısızca izleyerek yapılan zihinsel bir uygulamadır. Yoga ise meditasyonu da içine alabilen daha geniş bir uygulama bütünüdür.</p>
<table class="table">
<thead><tr><th></th><th>Yoga (modern pratik)</th><th>Meditasyon</th></tr></thead>
<tbody>
<tr><td>Odak</td><td>Hareket + nefes + dikkat</td><td>Dikkat ve farkındalık</td></tr>
<tr><td>Beden</td><td>Aktif; duruşlar ve akışlar</td><td>Genellikle hareketsiz oturuş/uzanış</td></tr>
<tr><td>İlişki</td><td>Meditasyonu bir bileşen olarak içerir</td><td>Tek başına uygulanabilir</td></tr>
</tbody></table>
<p>Kısacası her yoga dersi meditasyon değildir; ama yoga pratiği meditasyona hazırlayıcı bir zemin oluşturabilir.</p>` },
    { id: 'yanlislar', title: 'Yoga hakkında doğru bilinen yanlışlar', html: `
<div class="myth"><strong>Yanlış:</strong> “Yoga yapmak için esnek olmak gerekir.”<br><strong>Doğrusu:</strong> Esneklik yoganın ön koşulu değil, düzenli pratiğin zamanla getirebileceği sonuçlardan biridir. Blok ve kayış gibi destekler bu yüzden vardır.</div>
<div class="myth"><strong>Yanlış:</strong> “Ne kadar acıtırsa o kadar etkili.”<br><strong>Doğrusu:</strong> Keskin, batıcı ya da eklem içinde hissedilen ağrı bir uyarıdır. Hafif bir germe hissi normaldir; ağrı varsa pozisyondan çık.</div>
<div class="myth"><strong>Yanlış:</strong> “Yoga sadece kadınlar / gençler içindir.”<br><strong>Doğrusu:</strong> Yoga her yaştan ve cinsiyetten kişi için uyarlanabilir; sandalye yogası gibi biçimler hareket kısıtlılığı olanlar için bile seçenek sunar.</div>
<div class="myth"><strong>Yanlış:</strong> “Yoga tıbbi tedavinin yerini alabilir.”<br><strong>Doğrusu:</strong> Araştırmalar yoga uygulamasının bazı kişilerde yardımcı olabileceğini düşündürmektedir; ancak yoga, tıbbi değerlendirme veya tedavinin yerine geçmez.</div>
<div class="myth"><strong>Yanlış:</strong> “Yoga hiç yaralanma riski taşımaz.”<br><strong>Doğrusu:</strong> NCCIH’e göre yoga sağlıklı kişilerde, doğru uygulandığında genellikle güvenlidir; yine de burkulma ve zorlanma gibi yaralanmalar görülebilir. Bu yüzden zorlamadan çalışmak önemlidir.</div>` }
  ]
},
{
  id: 'm2', no: 2, icon: 'mat', kind: 'text',
  title: "Yoga'ya Hazırlık",
  summary: 'Ekipman, kıyafet, ortam, doğru duruş ve güvenli pratik kuralları.',
  sources: ['nhsYoga', 'nccihYogaSafety', 'nccihYoga', 'nhsPregnancy'],
  sections: [
    { id: 'ekipman', title: 'Yoga için gerekli ekipmanlar', html: `
<p>Başlamak için pahalı ekipmana ihtiyacın yok. İlk hafta için bir mat (ya da halı üzerinde katlanmış bir battaniye) yeterlidir.</p>
<ul class="check">
<li><strong>Mat:</strong> Kaymayı önler, dizleri ve elleri korur.</li>
<li><strong>Blok (2 adet):</strong> Yere ulaşamadığın duruşlarda zemini “yükseltir”. Yerine kalın kitaplar kullanılabilir.</li>
<li><strong>Kayış:</strong> Ayaklarına uzanamadığında kollarını uzatır. Yerine bir kemer ya da havlu olur.</li>
<li><strong>Battaniye / minder:</strong> Oturuşlarda kalçayı yükseltmek, dizlerin altını desteklemek ve gevşeme sırasında üşümemek için.</li>
<li><strong>Su:</strong> Pratik öncesi ve sonrası için.</li>
</ul>` },
    { id: 'mat', title: 'Yoga matı seçimi', html: `
<p>Mat seçerken şu dört ölçüte bak:</p>
<ol>
<li><strong>Kalınlık:</strong> 4–6 mm başlangıç için iyi bir dengedir. Çok kalın matlar (8 mm+) dengeyi zorlaştırabilir; çok ince matlar (2 mm) dizleri rahatsız edebilir.</li>
<li><strong>Kaymazlık:</strong> Avuç içi terlediğinde bile kaymaması önemlidir. Doğal kauçuk ve PU yüzeyler genelde daha iyi tutuş sağlar.</li>
<li><strong>Malzeme:</strong> Kauçuk (lateks alerjisi varsa dikkat), TPE (hafif, uygun fiyatlı), PVC (dayanıklı ama çevre dostu değil), mantar.</li>
<li><strong>Boyut:</strong> Standart 61×173 cm’dir; boyun 1,80 m’den uzunsa daha uzun mat tercih edebilirsin.</li>
</ol>` },
    { id: 'blok-kayis', title: 'Yoga blokları ve kayışlar', html: `
<p>Destek ekipmanları “hile” değil, doğru hizalanmanın aracıdır. Deneyimli eğitmenler de sıklıkla kullanır.</p>
<div class="grid-2">
<div class="mini-card"><h4>Blok nasıl kullanılır?</h4><p>Üç farklı yüksekliğe çevrilebilir (alçak, orta, yüksek). Örneğin Üçgen Duruşu’nda eli yere değil bloğa koymak, göğsün açık ve omurganın uzun kalmasını sağlar.</p></div>
<div class="mini-card"><h4>Kayış nasıl kullanılır?</h4><p>Oturarak öne eğilmede kayışı ayak tabanlarından geçirip uçlarını tut; sırtını yuvarlamadan, göğüs önde kalacak şekilde çalış.</p></div>
</div>` },
    { id: 'kiyafet', title: 'Uygun kıyafet seçimi', html: `
<ul>
<li>Hareketi kısıtlamayan, esneyen ama çok bol olmayan kıyafetler seç (bol üstler öne eğilmede yüzüne düşebilir).</li>
<li>Terletmeyen, nefes alan kumaşlar tercih et.</li>
<li>Yoga çıplak ayakla yapılır; kaymayı önler ve ayak tabanını hissetmeni sağlar.</li>
<li>Takı, saat ve kemer gibi aksesuarları çıkar.</li>
<li>Gevşeme bölümü için yanında hırka veya ince bir örtü bulundur; dinlenirken vücut ısısı düşer.</li>
</ul>` },
    { id: 'ortam', title: 'Yoga ortamının hazırlanması', html: `
<ul class="check">
<li>Kolların iki yana açıkken hiçbir eşyaya çarpmayacağın kadar boş alan (yaklaşık 2×2,5 m).</li>
<li>Kaymayan, düz bir zemin.</li>
<li>Havalandırılmış, çok sıcak olmayan oda.</li>
<li>Telefon bildirimleri sessizde.</li>
<li>Ağır bir yemekten sonra 2–3 saat, hafif bir atıştırmalıktan sonra yaklaşık 1 saat bekle.</li>
<li>Her gün aynı saat ve aynı köşe alışkanlık oluşturmayı kolaylaştırır.</li>
</ul>` },
    { id: 'durus', title: 'Doğru duruş ve beden farkındalığı', html: `
<p>Beden farkındalığı (propriosepsiyon), bedenin nerede ve nasıl durduğunu gözle bakmadan hissedebilme yetisidir. Yoga her duruşta dikkatini bu iç duyumlara yöneltir.</p>
<p><strong>Temel hizalama kontrol listesi</strong> (ayakta duruşlarda):</p>
<ol>
<li>Ağırlık iki ayağa ve her ayağın ön-arka kısmına eşit dağılsın.</li>
<li>Dizler kilitli değil, “yumuşak”.</li>
<li>Pelvis nötr: kuyruk sokumunu ne fazla içeri ne de dışarı it.</li>
<li>Omurga uzun; tepe noktası tavana doğru uzanıyor.</li>
<li>Omuzlar kulaklardan uzak, kürek kemikleri hafifçe geriye-aşağı.</li>
<li>Çene yere paralel, yüz ve çene gevşek.</li>
</ol>` },
    { id: 'hatalar', title: 'Yeni başlayanların yaptığı hatalar', html: `
<ol>
<li><strong>Nefesi tutmak:</strong> Zorlanınca nefes farkında olmadan durur. Nefes akmıyorsa duruşu hafiflet.</li>
<li><strong>Başkalarıyla kıyaslamak:</strong> Videodaki eğitmenin beden yapısı ve geçmişi senden farklıdır.</li>
<li><strong>Dizleri ve dirsekleri kilitlemek:</strong> Eklemlere yük bindirir; hafif bir bükülme bırak.</li>
<li><strong>Isınmadan derin esnemeye girmek.</strong></li>
<li><strong>Gevşemeyi (Savasana) atlamak:</strong> Pratiğin önemli bir parçasıdır.</li>
<li><strong>Çok sık ve çok uzun başlamak:</strong> Günde 5–15 dakika ile başlamak sürdürülebilirdir.</li>
<li><strong>Destek kullanmaktan çekinmek.</strong></li>
</ol>` },
    { id: 'guvenlik', title: 'Güvenli pratik kuralları', html: `
<div class="callout warn"><strong>Pratiği hemen durdur:</strong> baş dönmesi, göğüs ağrısı, nefes darlığı, keskin ya da batıcı ağrı, uyuşma/karıncalanma, bulantı veya bulanık görme hissedersen pozisyondan çık, otur ya da uzan, dinlen. Belirtiler geçmezse sağlık profesyoneline başvur.</div>
<ul>
<li><strong>Uzman görüşü al:</strong> Hamilelik, yakın zamanda geçirilmiş ameliyat ya da yaralanma, kalp-damar hastalığı, kontrolsüz tansiyon, glokom, osteoporoz, bel/boyun fıtığı, denge problemi veya başka bir kronik rahatsızlık varsa başlamadan önce doktoruna danış. NCCIH ve NHS de bu kişilerin pratiklerini sağlık profesyoneli ve nitelikli eğitmenle planlamasını önerir.</li>
<li><strong>Ağrı sınırına gitme:</strong> “Hafif germe” iyi, “ağrı” değil. Ağrıya rağmen pozisyonda kalma.</li>
<li><strong>Yavaş ve kontrollü hareket et;</strong> sıçrayarak ya da yaylanarak esneme.</li>
<li><strong>Nefes rahat kalsın:</strong> Bu programda nefes tutma zorunlu değildir.</li>
<li><strong>İleri duruşları zorlama:</strong> Baş üstü duruşu gibi ters duruşlar ve derin arka eğilmeler bu programın kapsamında değildir.</li>
<li><strong>Sıcak yoga uyarısı:</strong> Isıtılmış ortamda yapılan yoga aşırı ısınma ve sıvı kaybı riskini artırabilir; başlangıçta önerilmez.</li>
</ul>` }
  ]
},
{
  id: 'm3', no: 3, icon: 'lungs', kind: 'breath',
  title: 'Nefes Teknikleri (Pranayama)',
  summary: 'Diyafram, karın, Ujjayi, Nadi Shodhana, kutu nefesi ve nefes-hareket uyumu.',
  sources: ['ccDiaphragm', 'ccBox', 'ccNadi', 'nhsBreathing', 'harvardBreath', 'nccihRelax'],
  intro: `
<p><strong>Pranayama</strong>, Sanskritçe <em>prana</em> (yaşam enerjisi, nefes) ve <em>ayama</em> (uzatma, düzenleme) sözcüklerinden oluşur. Modern dilde nefesin hızını, derinliğini ve ritmini bilinçli olarak düzenleme çalışmalarıdır.</p>
<div class="callout science"><strong>Bilimsel çerçeve:</strong> Harvard Health Publishing ve NHS, yavaş ve derin nefes egzersizlerinin bazı kişilerde stres tepkisini yatıştırmaya ve rahatlamaya yardımcı olabileceğini belirtir. Bu teknikler tedavi değil, kendine bakım araçlarıdır. Kanıtın gücü çalışmaya, yoga türüne, süreye ve katılımcı grubuna göre değişir.</div>
<div class="callout warn"><strong>Bu programda:</strong> Nefes tutma ve hızlı/yoğun nefes teknikleri (ör. Kapalabhati, Bhastrika) <em>zorunlu değildir ve önerilmez</em>. Kutu nefesindeki bekleme süreleri isteğe bağlıdır ve kısaltılabilir. Baş dönmesi veya nefes darlığı hissedersen normal nefesine dön.</div>`
},
{
  id: 'm4', no: 4, icon: 'pose', kind: 'poses',
  title: 'Temel Yoga Pozisyonları (Asanalar)',
  summary: '12 başlangıç ve 6 orta seviye duruş: adım adım uygulama, hizalanma, hatalar ve alternatifler.',
  sources: ['yogaJournalPoses', 'nhsYoga', 'nccihYogaSafety', 'nhsFlex', 'nhsBalance'],
  intro: `
<p>Asana, Sanskritçede “oturuş, duruş” anlamına gelir. Bu modülde her duruşu aynı şablonla öğreneceksin: amaç, çalışan kaslar, adımlar, hizalanma, nefes, yaygın hatalar, kolaylaştırılmış alternatif ve dikkat edilmesi gereken durumlar.</p>
<p><strong>Seviyeler:</strong> <span class="lvl lvl-b">Başlangıç</span> duruşları ilk 30 günün temelidir. <span class="lvl lvl-i">Orta</span> seviye duruşlar ilk 30 günü tamamladıktan sonra, hazır hissettiğinde denenebilir. <span class="lvl lvl-a">İleri</span> duruşlar yalnızca bilgi amaçlıdır; bu programda uygulanmaz.</p>
<p>Bir duruşu dikkatle inceleyip temel adımlarını kavradığında <strong>“Öğrendim”</strong> olarak işaretle; ilerlemen ve rozetlerin buna göre hesaplanır.</p>`
},
{
  id: 'm5', no: 5, icon: 'lotus', kind: 'text',
  title: 'Meditasyon ve Zihinsel Farkındalık',
  summary: 'Mindfulness, beden taraması, odaklanma, rehberli meditasyon ve Yoga Nidra.',
  sources: ['nccihMeditation', 'nhsMindfulness', 'ccBodyScan', 'nccihRelax'],
  sections: [
    { id: 'giris', title: 'Meditasyona giriş', html: `
<p>Meditasyon, dikkati eğitmeye yönelik zihinsel uygulamaların genel adıdır. Amaç “düşünceleri durdurmak” değildir; zihin doğal olarak dağılır. Meditasyon, dikkatin dağıldığını <em>fark edip</em> nazikçe seçtiğin odağa geri getirme becerisini çalıştırır.</p>
<div class="callout science"><strong>Bilimsel çerçeve:</strong> NCCIH, meditasyon ve farkındalık uygulamalarının bazı kişilerde kaygı, stres ve uyku sorunları üzerinde olumlu etkileri olabileceğini; ancak araştırmaların sonuçlarının değişken olduğunu ve meditasyonun tıbbi tedavinin yerine kullanılmaması gerektiğini vurgular. Kanıtın gücü çalışmaya, yoga türüne, süreye ve katılımcı grubuna göre değişir. Nadiren de olsa meditasyon sırasında rahatsız edici duygular yükselebilir; bu durumda uygulamaya ara ver.</div>
<p><strong>Başlangıç önerisi:</strong> Günde 3–5 dakika, rahat bir oturuşla (sandalye de olur), gözler kapalı ya da yere bakarak.</p>` },
    { id: 'mindfulness', title: 'Mindfulness (bilinçli farkındalık)', html: `
<p>Mindfulness; dikkati şu ana, olup biteni değiştirmeye çalışmadan ve yargılamadan yöneltmektir. NHS bunu, kendi düşüncelerine, duygularına ve çevrene daha fazla dikkat etmek olarak özetler.</p>
<p><strong>Üç temel tutum:</strong></p>
<ul>
<li><strong>Merak:</strong> “Şu an ne hissediyorum?” sorusunu ilk kez soruyormuş gibi sor.</li>
<li><strong>Yargısızlık:</strong> Deneyimi “iyi/kötü” diye etiketlemeden gözle.</li>
<li><strong>Nezaket:</strong> Dikkatin dağıldığında kendine kızmadan geri dön.</li>
</ul>` },
    { id: 'beden-taramasi', title: 'Beden taraması', html: `
<p>Beden taraması, dikkati ayak parmaklarından başın tepesine (ya da tersine) bölge bölge gezdirerek duyumları fark etme uygulamasıdır.</p>
<ol>
<li>Sırt üstü uzan ya da rahatça otur. Birkaç sakin nefes al.</li>
<li>Dikkatini sol ayak parmaklarına getir. Sıcaklık, temas, karıncalanma ya da hiçbir şey… ne varsa fark et.</li>
<li>Yavaşça ayak tabanı, bilek, baldır, diz, uyluk… şeklinde yukarı çık. Sonra sağ bacağa geç.</li>
<li>Kalça, karın, sırt, göğüs, eller, kollar, omuzlar, boyun, yüz ve başın tepesi.</li>
<li>Gerginlik fark ettiğin bölgeye nefes veriyormuş gibi hayal et; değiştirmeye zorlamadan bırak.</li>
</ol>
<p>Süre: 5–15 dakika. Uykuya dalarsan sorun değil; bu da bedenin dinlenme ihtiyacını gösterir.</p>` },
    { id: 'odaklanma', title: 'Odaklanma meditasyonu', html: `
<p>Tek bir “çapa” seçilir ve dikkat ona sabitlenir. En sık kullanılan çapa nefestir.</p>
<ol>
<li>Rahat otur, omurga uzun, omuzlar yumuşak.</li>
<li>Nefesin en belirgin hissedildiği yeri bul: burun delikleri, göğüs ya da karın.</li>
<li>İstersen nefesleri say: nefes al–ver “bir”, al–ver “iki”… on’a kadar, sonra başa dön.</li>
<li>Saymayı kaçırdığını fark ettiğinde bu bir başarısızlık değil, farkındalık anıdır. “Bir”den yeniden başla.</li>
</ol>` },
    { id: 'rehberli', title: 'Rehberli meditasyon', html: `
<p>Rehberli meditasyonda bir ses (eğitmen, kayıt ya da bu platformdaki yazılı yönergeler) seni adım adım yönlendirir. Yeni başlayanlar için en kolay giriş yoludur çünkü “şimdi ne yapmalıyım?” sorusunu ortadan kaldırır.</p>
<p><strong>Meditasyon</strong> sayfasındaki zamanlayıcı; nefes odağı, beden taraması ve farkındalık seçenekleriyle süre boyunca ekranda yönergeler gösterir. Başlangıçta ve bitişte yumuşak bir zil sesi çalar.</p>` },
    { id: 'nidra', title: 'Yoga Nidra hakkında temel bilgi', html: `
<p><strong>Yoga Nidra</strong> (“yogik uyku”), sırt üstü uzanarak yapılan, rehberli bir derin gevşeme uygulamasıdır. Tipik bir seans; niyet belirleme, beden bölgelerinde dikkat gezdirme, nefes farkındalığı ve imgeleme aşamalarından oluşur. Uyku ile uyanıklık arasında, dinlenmiş ama farkında bir hâl hedeflenir.</p>
<div class="callout science">Yoga Nidra üzerine araştırmalar artmakla birlikte çoğu küçük ölçeklidir; bu nedenle burada yalnızca bir gevşeme uygulaması olarak tanıtılmaktadır, sağlık iddiası taşımaz.</div>` },
    { id: 'gunluk', title: 'Günlük farkındalık egzersizleri', html: `
<ul class="check">
<li><strong>Tek nefes molası:</strong> Telefonu açmadan önce bir yavaş nefes al.</li>
<li><strong>Farkındalıkla yemek:</strong> İlk üç lokmanın tadına, dokusuna, kokusuna dikkat et.</li>
<li><strong>5-4-3-2-1:</strong> Gördüğün 5, duyduğun 4, dokunduğun 3, kokladığın 2, tattığın 1 şeyi fark et.</li>
<li><strong>Yürüyüş farkındalığı:</strong> Birkaç adım boyunca ayak tabanlarının yere değişini hisset.</li>
<li><strong>Gün sonu taraması:</strong> Yatmadan önce 1 dakika bedenini baştan ayağa tara.</li>
</ul>` }
  ]
},
{
  id: 'm6', no: 6, icon: 'spine', kind: 'text',
  title: 'Yoga ve Anatomi',
  summary: 'Omurga, kalça, omuz, hamstringler, core, denge, esneklik ve eklem hareket açıklığı.',
  sources: ['ccSpine', 'ccHip', 'ccHamstring', 'harvardCore', 'nhsBalance', 'nhsFlex'],
  sections: [
    { id: 'omurga', title: 'Omurga anatomisi', ill: 'assets/illustrations/spine.svg', html: `
<p>Omurga, üst üste dizilmiş omurlardan (vertebra) oluşur ve aralarındaki diskler amortisör görevi görür. Omurilik bu kemik kanalın içinde korunur.</p>
<ul>
<li><strong>Boyun (servikal):</strong> 7 omur – en hareketli bölge.</li>
<li><strong>Sırt (torakal):</strong> 12 omur – kaburgalara bağlanır.</li>
<li><strong>Bel (lomber):</strong> 5 omur – en büyük yükü taşır.</li>
<li><strong>Sakrum ve kuyruk sokumu:</strong> Kaynaşmış omurlar.</li>
</ul>
<p>Yandan bakıldığında sağlıklı bir omurga dümdüz değil, doğal eğrilere sahiptir: boyun ve belde içe (lordoz), sırtta dışa (kifoz) eğri. Yogada “omurgayı uzat” yönergesi bu eğrileri düzleştirmek değil, korumak anlamına gelir.</p>
<p><strong>Omurganın altı hareket yönü:</strong> öne eğilme (fleksiyon), arkaya eğilme (ekstansiyon), sağa ve sola yan eğilme, sağa ve sola dönme (rotasyon). Kedi-İnek öne/arkaya, Sırtüstü Burgu rotasyona örnektir.</p>` },
    { id: 'kalca', title: 'Kalça hareketliliği', html: `
<p>Kalça eklemi, uyluk kemiğinin yuvarlak başının leğen kemiğindeki çukura oturduğu bir <strong>top-yuva</strong> eklemidir. Bu yapı öne-arkaya, yana ve içe-dışa dönme hareketlerine izin verir.</p>
<ul>
<li><strong>Kalça bükücüler</strong> (ör. iliopsoas): Uzun süre oturmak bu kasları kısalmış hissettirebilir. Savaşçı I’de arka bacağın kalça önü esner.</li>
<li><strong>Kalça açıcılar / dış rotatorlar:</strong> Ağaç Duruşu’nda kaldırılan bacağın dizi yana açılırken çalışır.</li>
<li><strong>Kalça ekstansörleri</strong> (ör. büyük kalça kası): Köprü Duruşu’nda kalçayı yerden kaldırır.</li>
</ul>
<div class="callout info">Kalça açılımını hiçbir zaman dizden zorlama. Diz bir menteşe eklemidir; dönme hareketi kalçadan gelmelidir.</div>` },
    { id: 'omuz', title: 'Omuz hareketliliği', html: `
<p>Omuz (glenohumeral eklem), vücudun en hareketli eklemidir; ancak bu hareketlilik bedeli olarak daha az kemik stabilitesi demektir. Stabiliteyi büyük ölçüde <strong>rotator manşet</strong> kasları ve kürek kemiğini (skapula) çevreleyen kaslar sağlar.</p>
<ul>
<li>Kollar yukarıdayken omuzları kulaklara doğru sıkıştırma; kürek kemiklerini hafifçe aşağı ve dışa yay.</li>
<li>Aşağı Bakan Köpek’te kollar ve sırt bir çizgi oluştururken omuzlar aktif kalmalı.</li>
<li>Masa başı çalışanlarda omuzların öne yuvarlanması sıktır; göğüs açıcı hareketler (Kobra, Kedi-İnek’in “inek” fazı) bu duruşa karşı denge sağlar.</li>
</ul>` },
    { id: 'hamstring', title: 'Hamstring kasları', html: `
<p>Hamstringler uyluğun arka yüzündeki üç kastır: <strong>biceps femoris, semitendinosus ve semimembranosus</strong>. Kalça ekleminin arkasından dizin arkasına uzanırlar; dizi büker ve kalçayı geriye uzatırlar.</p>
<p>Öne eğilmelerde (Oturarak Öne Eğilme, Aşağı Bakan Köpek) en çok esneyen kaslardır. İpuçları:</p>
<ul>
<li>Dizleri bükmek tamamen kabul edilebilir; hamstringleri gevşetir ve beli korur.</li>
<li>Eğilmeyi belden değil, kalça ekleminden başlat (“kalçadan menteşe”).</li>
<li>Esneme hissi uyluğun ortasında olmalı; dizin arkasında ya da oturma kemiğine yakın keskin bir his varsa geri çekil.</li>
</ul>` },
    { id: 'core', title: 'Core bölgesi', html: `
<p>“Core” yalnızca karın kasları değildir; gövdeyi saran bir kas silindiri gibi düşünülebilir:</p>
<ul>
<li>Önde: <strong>rectus abdominis</strong> (düz karın kası) ve derin <strong>transversus abdominis</strong>,</li>
<li>Yanlarda: iç ve dış <strong>oblikler</strong>,</li>
<li>Arkada: <strong>multifidus</strong> ve omurga boyunca uzanan kaslar,</li>
<li>Üstte: <strong>diyafram</strong>, altta: <strong>pelvik taban</strong>.</li>
</ul>
<p>Harvard Health Publishing, güçlü bir core’un eğilme, uzanma, dönme gibi günlük hareketleri kolaylaştırdığını ve denge ile duruşu desteklediğini belirtir. Kayık, Sandalye ve Köprü duruşları core’u çalıştırır.</p>` },
    { id: 'denge', title: 'Denge ve koordinasyon', html: `
<p>Denge üç sistemin birlikte çalışmasıyla sağlanır:</p>
<ol>
<li><strong>Görme:</strong> Sabit bir noktaya bakmak (drishti) dengeyi kolaylaştırır.</li>
<li><strong>İç kulak (vestibüler sistem):</strong> Başın konumunu ve hareketini algılar.</li>
<li><strong>Propriosepsiyon:</strong> Kas ve eklemlerden gelen konum bilgisi.</li>
</ol>
<p>NHS denge egzersizlerinin düşme riskini azaltmaya yardımcı olabileceğini belirtir. Ağaç ve Dağ duruşu gibi tek veya çift ayak üzerinde yapılan duruşlar bu sistemleri çalıştırır.</p>
<div class="callout warn">Denge problemi, baş dönmesi geçmişi ya da iç kulak rahatsızlığı varsa denge duruşlarını bir duvar ya da sandalye yanında yap ve önce doktoruna danış.</div>` },
    { id: 'esneklik', title: 'Kas esnekliği', html: `
<p>Esneklik, kasın ve çevresindeki bağ dokusunun uzayabilme kapasitesidir. Genetik, yaş, cinsiyet, aktivite düzeyi ve hatta günün saati esnekliği etkiler; sabahları çoğu kişi daha “sert” hisseder.</p>
<ul>
<li><strong>Statik esneme:</strong> Bir pozisyonda belirli süre kalmak (ör. Çocuk Duruşu).</li>
<li><strong>Dinamik esneme:</strong> Kontrollü, tekrarlı hareket (ör. Kedi-İnek).</li>
</ul>
<p>NHS esneklik egzersizlerinin düzenli yapılmasını önerir. Isınmış kaslarla, sıçramadan ve ağrı hissetmeden esne. Esneklikteki ilerleme yavaştır ve kişiden kişiye büyük farklılık gösterir; bu platformda esneklik yalnızca senin kendi algına göre (1-5) takip edilir.</p>` },
    { id: 'rom', title: 'Eklem hareket açıklığı', html: `
<p><strong>Eklem hareket açıklığı (ROM)</strong>, bir eklemin bir yönde yapabildiği hareketin genişliğidir ve derece ile ölçülür. Aktif ROM kendi kas gücünle ulaşabildiğin açıklık, pasif ROM ise dış bir yardımla (yerçekimi, destek) ulaşılan açıklıktır.</p>
<p>Yoga her iki türü de kullanır: Savaşçı duruşlarında aktif, Yin tarzı yerdeki duruşlarda pasif hareket açıklığı ön plandadır.</p>
<div class="callout info">Hareket açıklığını artırmak hızlı olmaz; ağrı veren son noktaya yüklenmek yerine rahat aralıkta düzenli çalışmak daha güvenlidir.</div>` }
  ]
},
{
  id: 'm7', no: 7, icon: 'sequence', kind: 'programs',
  title: 'Yoga Programları',
  summary: '5–20 dakikalık hazır rutinler, masa başı hareketleri ve denge-esneklik akışları.',
  sources: ['nhsYoga', 'nhsFlex', 'nhsBalance', 'nccihYogaSafety'],
  intro: `
<p>Her program; hareket sırası, her adımın süresi ve dinlenme aralıklarıyla birlikte hazırlanmıştır. <strong>“Başlat”</strong> dediğinde ekrandaki zamanlayıcı seni adım adım yönlendirir; program bitince süren pratik kayıtlarına eklenir.</p>
<p><strong>Kendi rutinini kurarken</strong> şu iskeleti kullanabilirsin: <em>1) Nefesle varış → 2) Isınma (Kedi-İnek) → 3) Ayakta duruşlar → 4) Denge → 5) Yerde esneme ve burgu → 6) Gevşeme (Savasana).</em></p>
<div class="callout warn">Programın herhangi bir anında baş dönmesi, nefes darlığı veya ağrı hissedersen duraklat, Çocuk Duruşu’na ya da sırt üstü uzanmaya geç.</div>`
}
];

/* -------------------------------------------------- MOTİVASYON */
YA.motivation = [
  'Bugün matın üzerine çıkman, mükemmel bir duruştan daha değerli.',
  'Esneklik bir hedef değil, sabrın yan ürünüdür.',
  'Beş dakika da pratiktir. Küçük adımlar alışkanlık kurar.',
  'Nefesin akıyorsa doğru yoldasın.',
  'Bedenini dinle; o senin en iyi öğretmenin.',
  'Kendini dünkü hâlinle kıyasla, başkalarıyla değil.',
  'Zorlanmak değil, fark etmek gelişim getirir.',
  'Bugün nazik ol: hem bedenine hem zihnine.',
  'Düzenlilik yoğunluktan önce gelir.',
  'Her nefes yeni bir başlangıç.',
  'Dengeyi kaybetmek de pratiğin bir parçası; gülümse ve yeniden dene.',
  'Savasana’yı atlama: dinlenmek de çalışmaktır.',
  'Bir duruşu “yapmak” yerine onu keşfetmeye çalış.',
  'Sabır bir kas gibidir; her gün biraz çalış.'
];

/* -------------------------------------------------- NEFES TEKNİKLERİ
   pattern: [nefes al, bekle, nefes ver, bekle] saniye               */
YA.breaths = [
{
  id: 'diyafram', title: 'Diyafram Nefesi', alt: 'Diaphragmatic breathing', level: 'Başlangıç',
  pattern: [4, 0, 6, 0], duration: '3–5 dakika', ill: 'assets/illustrations/diaphragm.svg',
  desc: `Diyafram, akciğerlerin altında kubbe biçiminde uzanan ana solunum kasıdır. Nefes alırken aşağı doğru düzleşir; akciğerler genişler ve karın hafifçe öne çıkar. Cleveland Clinic, diyafram nefesinin bu kasın verimli kullanımını öğrettiğini ve gevşemeye yardımcı olabileceğini belirtir. Pek çok yetişkin stres altında göğüsten, sığ nefes alır; bu teknik o alışkanlığı fark ettirir.`,
  steps: [
    'Sırt üstü uzan, dizlerini bük, ayak tabanların yerde olsun. (Oturarak da yapabilirsin.)',
    'Bir elini göğsüne, diğerini kaburgaların hemen altına, karnına koy.',
    'Burundan yavaşça yaklaşık 4 saniyede nefes al; karnındaki elin yükselsin, göğüsteki el olabildiğince sabit kalsın.',
    'Dudaklarını hafifçe büzerek ya da burundan yaklaşık 6 saniyede nefes ver; karın içe doğru insin.',
    'Rahat bir ritim bulana kadar devam et. Sayılar bir rehberdir, zorlama.'
  ],
  cautions: ['Nefesi zorla “doldurmaya” çalışma; %70 dolu hissi yeterli.', 'Baş dönmesi olursa normal nefesine dön.', 'Karın bölgesinde yakın zamanda ameliyat geçirdiysen doktoruna danış.']
},
{
  id: 'karin', title: 'Karın Nefesi', alt: 'Belly breathing', level: 'Başlangıç',
  pattern: [4, 0, 4, 0], duration: '2–5 dakika', ill: 'assets/illustrations/diaphragm.svg',
  desc: `Karın nefesi, diyafram nefesinin en sade, “sadece gözlem” hâlidir. Burada nefesi uzatmaya çalışmazsın; karnın nefesle birlikte yükselip alçalmasını fark edersin. Yeni başlayanlar için nefese dikkat vermenin en kolay yoludur ve günün herhangi bir anında yapılabilir.`,
  steps: [
    'Rahatça otur ya da uzan, ellerini göbeğinin üzerine koy.',
    'Burundan nefes al ve karnının ellerini nazikçe öne ittiğini hisset.',
    'Nefes verirken karnın kendiliğinden geri insin.',
    'Alış ve verişleri eşit, yumuşak ve sessiz tut (ör. 4’e 4).',
    'Her nefeste omuzların gevşek kaldığını kontrol et.'
  ],
  cautions: ['Karnı bilinçli olarak şişirmek için kas zorlaması yapma.', 'Rahatsızlık hissedersen ritmi serbest bırak.']
},
{
  id: 'ujjayi', title: 'Ujjayi Nefesi', alt: '“Okyanus nefesi”', level: 'Başlangıç-Orta',
  pattern: [4, 0, 6, 0], duration: '2–5 dakika',
  desc: `Ujjayi, boğazın arka kısmı (gırtlak) hafifçe daraltılarak yapılan, nefesin okyanus dalgasına benzer yumuşak bir ses çıkardığı burun nefesidir. Vinyasa ve Ashtanga derslerinde hareket boyunca kullanılır. Sesi, dikkati nefeste tutmayı ve nefesi yavaşlatmayı kolaylaştırır. Ses kendini zorlayacak kadar yüksek olmamalı; sadece sen duyabilmelisin.`,
  steps: [
    'Rahat otur. Önce ağzını açarak, bir aynayı buğulandırıyormuş gibi “haaa” sesiyle nefes ver.',
    'Aynı boğaz hissini koruyarak ağzını kapat ve nefesi burundan ver; hafif bir hışırtı duyacaksın.',
    'Şimdi nefes alırken de aynı hafif daralmayı koru.',
    'Alışı yaklaşık 4, verişi yaklaşık 6 saniye tutmaya çalış.',
    'Ses yumuşak ve eşit kalsın; boğaz ya da yüz kaslarını sıkma.'
  ],
  cautions: ['Boğazda kuruluk, öksürük ya da gerginlik olursa sesi bırak, normal burun nefesine dön.', 'Nefesi hiçbir aşamada tutma.']
},
{
  id: 'nadi', title: 'Nadi Shodhana', alt: 'Dönüşümlü burun deliği nefesi', level: 'Başlangıç-Orta',
  pattern: [4, 0, 4, 0], duration: '3–5 dakika', alternate: true,
  desc: `Nadi Shodhana’da nefes, burun deliklerinden dönüşümlü olarak alınıp verilir. Geleneksel anlatımda “enerji kanallarını arındırma” anlamına gelir; bu ifade geleneksel bir yorumdur. Cleveland Clinic bu tekniğin gevşemeye ve odaklanmaya yardımcı olabileceğini belirtir. Klasik biçimlerinde nefes tutma bulunur; bu programda <strong>tutmasız</strong>, başlangıç sürümü öğretilir.`,
  steps: [
    'Dik ve rahat otur. Sol elin dizinde, sağ elinin işaret ve orta parmağını avucuna kıvır (ya da kaşlarının arasına koy).',
    'Sağ başparmakla sağ burun deliğini kapat, sol burun deliğinden nefes al.',
    'Yüzük parmağınla sol burun deliğini kapat, başparmağı kaldır; sağdan nefes ver.',
    'Sağdan nefes al; sağı kapat, soldan nefes ver. Bu bir turdur.',
    '5–10 tur boyunca nefesi yumuşak ve eşit tut; sonra elini indirip birkaç normal nefes al.'
  ],
  cautions: ['Burun tıkanıklığı, soğuk algınlığı ya da sinüzit varsa yapma.', 'Nefes tutma bu programda yoktur.', 'Kol yorulursa dirseği diğer elinle destekle.']
},
{
  id: 'kutu', title: 'Kutu Nefesi', alt: 'Box breathing', level: 'Başlangıç (bekleme isteğe bağlı)',
  pattern: [4, 0, 4, 0], duration: '1–4 dakika', box: true,
  desc: `Kutu nefesi, nefes al – bekle – nefes ver – bekle aşamalarının eşit sürelerde yapıldığı ve bir karenin dört kenarı gibi düşünüldüğü bir tekniktir. Cleveland Clinic, bu tekniğin stresli anlarda sakinleşmeye yardımcı olarak kullanıldığını belirtir. Klasik oran 4-4-4-4’tür; bu akademide ise yeni başlayanlar için <strong>varsayılan olarak beklemesizdir</strong>. Rahat hissedersen en fazla 3 saniyelik kısa beklemeler ekleyebilirsin; uzun süreli nefes tutma bu programda yer almaz.`,
  steps: [
    'Dik ve rahat otur, omuzlarını gevşet. Bir kez tamamen nefes ver.',
    'Burundan 4’e kadar sayarak nefes al (karenin 1. kenarı).',
    'İstersen 1–3 saniye kısa bir bekleme ekle; zorlanıyorsan beklemeden devam et.',
    '4’e kadar sayarak nefes ver.',
    'Yine isteğe bağlı kısa bir bekleme yap ve döngüyü tekrarla.'
  ],
  cautions: ['Beklemeler sırasında göğüs ya da boğazda baskı hissetmemelisin.', 'Hamilelik, kalp-damar veya solunum rahatsızlığı varsa bekleme sürelerini kullanma.', 'Baş dönmesi olursa hemen normal nefese dön.']
},
{
  id: 'koordinasyon', title: 'Nefes ve Hareket Koordinasyonu', alt: 'Vinyasa prensibi', level: 'Başlangıç',
  pattern: [3, 0, 3, 0], duration: '3–5 dakika',
  desc: `Yogada genel kural basittir: <strong>Genişleten, açan, yükselten hareketler nefes alırken; kapanan, öne eğilen, büken hareketler nefes verirken</strong> yapılır. Kedi-İnek bunun en iyi örneğidir: nefes alırken göğüs öne açılır (inek), nefes verirken sırt yuvarlanır (kedi). Bu uyum hareketi akıcı hâle getirir ve tempoyu nefes belirlediği için zorlanmayı fark etmeyi kolaylaştırır.`,
  steps: [
    'Dağ Duruşu’nda dur. Nefes alırken kollarını yanlardan yukarı kaldır.',
    'Nefes verirken kollarını yanlardan indir.',
    'Bunu 5 kez tekrar et: hareket nefesten önce bitmesin, nefes hareketten önce bitmesin.',
    'Ardından dört ayak pozisyonuna geç; nefes alırken İnek, verirken Kedi.',
    'Nefes hızlanıyorsa hareketi yavaşlat; nefes her zaman önde gelir.'
  ],
  cautions: ['Nefesi hareketin hızına uydurmaya çalışma; hareketi nefese uydur.', 'Bel ağrısı varsa omurga hareketlerini küçük tut.']
}
];

/* -------------------------------------------------- POZLAR
   fig: basit çizgi figürü koordinatları (200×200 görünüm alanı)
   h=baş, n=boyun/omuz, p=kalça, c=gövde eğri kontrol noktası (isteğe bağlı)
   le/lh=ön dirsek/el, re/rh=arka dirsek/el, lk/lf=ön diz/ayak, rk/rf=arka diz/ayak */
YA.poses = [
{
  id: 'tadasana', level: 'b', tr: 'Dağ Duruşu', sa: 'Tadasana', en: 'Mountain Pose',
  purpose: 'Tüm ayakta duruşların temelidir. Dik duruşu, ağırlık dağılımını ve beden farkındalığını öğretir.',
  muscles: ['Ayak ve bilek kasları', 'Uyluk ön kasları (quadriceps)', 'Core', 'Sırt kasları'],
  steps: ['Ayaklarını kalça genişliğinde ya da birleşik koy, parmak uçları öne baksın.', 'Ağırlığı iki ayağın tabanına eşit dağıt; ayak parmaklarını yayıp yere bırak.', 'Uyluklarını hafifçe aktif et, dizlerini kilitleme.', 'Göğüs kemiğini yumuşakça kaldır, omuzlarını geriye-aşağı bırak.', 'Kollar yanlarda, avuç içleri öne ya da bedene dönük. Başın tepesini tavana doğru uzat.', '5–10 nefes boyunca kal.'],
  align: ['Kulak, omuz, kalça ve ayak bileği aynı dikey çizgide.', 'Pelvis nötr; bel çukuru abartılı değil.', 'Çene yere paralel.'],
  breath: 'Burundan sakin ve eşit nefes. Her nefes alışta omurganın uzadığını, her verişte omuzların gevşediğini hayal et.',
  mistakes: ['Dizleri geriye kilitlemek', 'Ağırlığı topuklara yığmak', 'Omuzları kulaklara kaldırmak', 'Göğsü aşırı öne itip beli çukurlaştırmak'],
  easier: 'Ayaklarını kalça genişliğinden biraz daha geniş aç; dengede zorlanıyorsan sırtını duvara yakın tut.',
  caution: 'Düşük tansiyon veya baş dönmesi eğilimi varsa uzun süre hareketsiz kalma, gözlerini açık tut.',
  hold: '30–60 sn',
  fig: { h: [100, 34], n: [100, 50], p: [100, 105], le: [86, 78], lh: [82, 106], re: [114, 78], rh: [118, 106], lk: [95, 142], lf: [94, 180], rk: [105, 142], rf: [106, 180] }
},
{
  id: 'balasana', level: 'b', tr: 'Çocuk Duruşu', sa: 'Balasana', en: "Child's Pose",
  purpose: 'Dinlenme ve toparlanma duruşudur. Sırtı, kalçaları ve omuzları nazikçe esnetir; pratik sırasında her zaman sığınabileceğin yerdir.',
  muscles: ['Sırt uzatıcı kaslar (pasif esneme)', 'Kalça kasları', 'Ön bacak ve ayak sırtı'],
  steps: ['Dizlerinin üzerine otur, ayak başparmakların birbirine değsin.', 'Dizlerini kalça genişliğinde ya da biraz daha geniş aç.', 'Nefes verirken gövdeni uyluklarının arasına doğru indir.', 'Alnını yere, bir bloğa ya da yumruklarının üzerine koy.', 'Kollarını öne uzat ya da avuç içleri yukarı bakacak şekilde bedeninin yanına bırak.', '5–20 nefes boyunca kal.'],
  align: ['Kalça topuklara doğru iner (değmesi gerekmez).', 'Boyun gevşek, alın destekli.', 'Omuzlar yumuşak.'],
  breath: 'Nefesin sırtının arka kısmını genişlettiğini hissetmeye çalış.',
  mistakes: ['Kalça topuklara değmiyor diye zorlamak', 'Alnı desteksiz bırakıp boynu gergin tutmak'],
  easier: 'Kalçanla topuklarının arasına katlanmış bir battaniye koy, alnının altına blok ya da yastık yerleştir.',
  caution: 'Diz sakatlığı, hamilelik (dizleri geniş açarak yapılabilir) veya yakın zamanlı diz ameliyatında dikkatli ol ya da bu duruşu atla.',
  hold: '30 sn – 2 dk',
  fig: { h: [64, 168], n: [80, 163], p: [148, 158], c: [116, 146], le: [45, 175], lh: [20, 178], re: [47, 174], rh: [22, 177], lk: [108, 176], lf: [152, 180], rk: [110, 175], rf: [154, 179] }
},
{
  id: 'kedi-inek', level: 'b', tr: 'Kedi-İnek', sa: 'Marjaryasana-Bitilasana', en: 'Cat-Cow',
  purpose: 'Omurgayı öne ve arkaya hareket ettirerek ısıtır; nefes-hareket uyumunu öğretmenin en iyi yoludur.',
  muscles: ['Omurga boyunca uzanan kaslar', 'Karın kasları', 'Boyun ve omuz çevresi'],
  steps: ['Dört ayak pozisyonuna gel: bilekler omuzların, dizler kalçaların altında.', 'Nefes alırken (İnek): karnı yere doğru bırak, göğsü öne aç, bakışı hafifçe yukarı kaldır.', 'Nefes verirken (Kedi): göbeği omurgaya çek, sırtı tavana doğru yuvarla, çeneyi göğse yaklaştır.', 'Hareketi nefesle akıcı şekilde 5–10 kez tekrarla.'],
  align: ['Bilekler omuzların, dizler kalçaların altında.', 'Hareket kuyruk sokumundan başlayıp omurga boyunca başa doğru dalga gibi ilerler.', 'Kollar düz ama dirsekler kilitli değil.'],
  breath: 'Al → İnek (açılma), Ver → Kedi (kapanma).',
  mistakes: ['Boynu İnek’te geriye atmak', 'Hareketi sadece belden yapmak', 'Nefesi hareketten koparmak'],
  easier: 'Dizlerin altına katlanmış battaniye koy; bilek rahatsızlığında yumruklar ya da önkollar üzerinde yap. Sandalyede oturarak da uygulanabilir.',
  caution: 'Bel veya boyun fıtığında hareket açıklığını küçük tut; ağrı olursa dur.',
  hold: '5–10 tekrar',
  fig: { h: [46, 108], n: [65, 120], p: [140, 120], c: [102, 134], le: [65, 150], lh: [65, 180], re: [67, 150], rh: [67, 180], lk: [140, 178], lf: [180, 180], rk: [142, 178], rf: [182, 180] }
},
{
  id: 'asagi-kopek', level: 'b', tr: 'Aşağı Bakan Köpek', sa: 'Adho Mukha Svanasana', en: 'Downward Facing Dog',
  purpose: 'Tüm bedenin arka zincirini (baldır, hamstring, sırt) esnetir; kolları ve omuzları güçlendirir.',
  muscles: ['Hamstringler ve baldırlar (esneme)', 'Omuz ve kol kasları', 'Sırt kasları', 'Core'],
  steps: ['Dört ayak pozisyonundan ellerini omuzlarının bir avuç önüne yerleştir, parmaklarını aç.', 'Ayak parmaklarını yere bas.', 'Nefes verirken dizlerini yerden kaldır, kalçanı yukarı ve geriye it.', 'Önce dizlerin bükülü kalsın; önceliğin omurgayı uzatmak olsun.', 'Topukları yere doğru bırak (değmesi gerekmez). Başını kolların arasında gevşet.', '5 nefes kal, dizleri yere indirerek çık.'],
  align: ['Eller omuz genişliğinde, ayaklar kalça genişliğinde.', 'Kollar, omuzlar ve sırt tek bir uzun çizgi.', 'Ağırlık eller ile ayaklar arasında paylaşılır.'],
  breath: 'Her nefes alışta omurgayı uzat, her verişte kalçayı biraz daha geri gönder.',
  mistakes: ['Dizleri düz tutmak için sırtı yuvarlamak', 'Ağırlığı bileklere yığmak', 'Omuzları kulaklara sıkıştırmak'],
  easier: 'Dizleri belirgin şekilde bük; ya da elleri bir sandalyeye veya duvara koyarak “yarım köpek” yap.',
  caution: 'Kontrolsüz yüksek tansiyon, glokom, bilek-omuz sakatlığı ve ileri hamilelikte uygulama; baş aşağıdayken baş dönmesi olursa dizlerini yere indir.',
  hold: '15–45 sn',
  fig: { h: [62, 136], n: [74, 120], p: [112, 70], le: [58, 150], lh: [42, 178], re: [60, 150], rh: [44, 178], lk: [142, 124], lf: [170, 180], rk: [144, 124], rf: [172, 180] }
},
{
  id: 'kobra', level: 'b', tr: 'Kobra Duruşu', sa: 'Bhujangasana', en: 'Cobra Pose',
  purpose: 'Yumuşak bir arka eğilmedir. Göğsü ve karın önünü açar, sırt kaslarını güçlendirir; uzun süre öne eğik oturmanın etkisini dengeler.',
  muscles: ['Sırt uzatıcı kaslar', 'Kalça kasları', 'Göğüs ve karın önü (esneme)'],
  steps: ['Yüzüstü uzan, alnın yerde, bacaklar kalça genişliğinde, ayak sırtları yerde.', 'Ellerini omuzlarının altına, dirseklerini bedenine yakın yerleştir.', 'Ayak sırtlarını ve leğen kemiğini yere bastır.', 'Nefes alırken göğsünü yerden yalnızca rahat olduğu kadar kaldır; ellerine yüklenme, gücü sırt kaslarından al.', 'Dirsekler bükülü, omuzlar geride. 3–5 nefes kal, nefes verirken in.'],
  align: ['Leğen kemiği yerde kalır.', 'Dirsekler bedene yakın, geriye bakıyor.', 'Boyun omurganın devamı; başı geriye atma.'],
  breath: 'Yükselirken al, inerken ver.',
  mistakes: ['Kollarla kendini fazla yukarı itmek', 'Omuzları kulaklara kaldırmak', 'Başı geriye atmak'],
  easier: '“Bebek kobra”: göğsü sadece birkaç santim kaldır, ya da önkolları yere koyarak Sfenks Duruşu yap.',
  caution: 'Hamilelik, yakın zamanlı karın ameliyatı ve bel ağrısında dikkat; belde sıkışma hissi olursa yüksekliği azalt veya bırak.',
  hold: '3–5 nefes',
  fig: { h: [44, 124], n: [60, 140], p: [112, 177], c: [86, 166], le: [76, 162], lh: [60, 180], re: [78, 163], rh: [62, 180], lk: [146, 179], lf: [182, 179], rk: [148, 180], rf: [184, 180] }
},
{
  id: 'savasci-1', level: 'b', tr: 'Savaşçı I', sa: 'Virabhadrasana I', en: 'Warrior I',
  purpose: 'Bacakları güçlendirir, arka bacağın kalça önünü açar ve dengeyi geliştirir.',
  muscles: ['Quadriceps ve kalça kasları', 'Kalça bükücüleri (arka bacakta esneme)', 'Omuzlar', 'Core'],
  steps: ['Dağ Duruşu’ndan sol ayağını yaklaşık bir bacak boyu geriye at.', 'Arka ayağını 30–45° dışa çevir, topuğu yere bas.', 'Ayakları “ray üstünde” gibi kalça genişliğinde tut (ip üzerinde değil).', 'Ön dizini bük; diz ayak bileğinin üzerinde olsun.', 'Kalçanı öne doğru çevir, nefes alırken kollarını yukarı kaldır.', '3–5 nefes kal, diğer tarafa geç.'],
  align: ['Ön diz ayak bileğinin üzerinde, ayak parmaklarını geçmiyor.', 'Gövde dik, bel aşırı çukur değil.', 'Omuzlar kulaklardan uzak.'],
  breath: 'Kolları kaldırırken al, kalırken sakin ve eşit nefes.',
  mistakes: ['Ön dizin içe çökmesi', 'Ayakların tek çizgide olması (denge kaybı)', 'Beli aşırı çukurlaştırmak'],
  easier: 'Duruşu kısalt, ön dizi daha az bük; elleri kalçada tut ya da arka topuğu kaldırarak “yüksek hamle” yap.',
  caution: 'Diz, kalça veya omuz sakatlığında dikkat; omuz problemi varsa kolları omuz hizasında veya kalçada tut.',
  hold: '3–5 nefes / taraf',
  fig: { h: [100, 56], n: [100, 72], p: [100, 124], le: [95, 46], lh: [93, 20], re: [105, 46], rh: [107, 20], lk: [60, 130], lf: [58, 180], rk: [134, 152], rf: [166, 180] }
},
{
  id: 'savasci-2', level: 'b', tr: 'Savaşçı II', sa: 'Virabhadrasana II', en: 'Warrior II',
  purpose: 'Bacak gücü, kalça açıklığı ve dayanıklılık kazandırır; dikkati ve kararlılığı çalıştırır.',
  muscles: ['Quadriceps', 'Kalça dış rotatorları ve kalça kasları', 'Omuz kasları', 'İç uyluk (esneme)'],
  steps: ['Ayaklarını yaklaşık 1–1,2 m aç.', 'Sağ ayağı 90° dışa, sol ayağı hafifçe içe çevir. Sağ topuk sol ayağın ortasıyla hizalı.', 'Kollarını omuz hizasında iki yana aç.', 'Nefes verirken sağ dizini bük; diz ayak bileğinin üzerinde, ikinci parmağa doğru.', 'Gövde iki bacağın tam ortasında dik. Bakışın sağ elinin üzerinden.', '3–5 nefes kal, diğer tarafa geç.'],
  align: ['Ön diz ayak bileği üzerinde ve dışa doğru.', 'Gövde öne eğilmiyor.', 'Kollar yere paralel, omuzlar gevşek.'],
  breath: 'Kollarını uzatırken al, dizi bükerken ver.',
  mistakes: ['Gövdenin ön bacağa doğru kayması', 'Ön dizin içe düşmesi', 'Omuzları kaldırmak'],
  easier: 'Duruşu kısalt, dizi daha az bük; kollar yorulursa elleri kalçaya koy.',
  caution: 'Diz veya kalça sakatlığında ve boyun probleminde (bakışı öne çevirmeden) dikkatli ol.',
  hold: '3–5 nefes / taraf',
  fig: { h: [100, 50], n: [100, 68], p: [100, 120], le: [70, 70], lh: [38, 70], re: [130, 70], rh: [162, 70], lk: [62, 128], lf: [54, 180], rk: [138, 150], rf: [164, 180] }
},
{
  id: 'agac', level: 'b', tr: 'Ağaç Duruşu', sa: 'Vrksasana', en: 'Tree Pose',
  purpose: 'Denge, odak ve ayak bileği stabilitesi geliştirir; kalçayı nazikçe açar.',
  muscles: ['Destek bacağının ayak, bilek ve kalça kasları', 'Core', 'İç uyluk (kaldırılan bacakta esneme)'],
  steps: ['Dağ Duruşu’nda başla, ağırlığını sol ayağına al.', 'Sağ ayağını kaldır, tabanını sol bileğine, baldırına ya da iç uyluğuna koy — <strong>dizin üzerine asla değil</strong>.', 'Sağ dizini yana aç; kalça kemikleri öne baksın.', 'Ellerini göğüs önünde birleştir. Önündeki sabit bir noktaya bak.', '5 nefes kal, diğer tarafa geç.'],
  align: ['Destek bacağı dik, diz kilitli değil.', 'Kalça yana kaymıyor, iki kalça kemiği aynı seviyede.', 'Ayak tabanı ve uyluk birbirine eşit baskı yapar.'],
  breath: 'Yavaş ve eşit nefes dengeyi kolaylaştırır.',
  mistakes: ['Ayağı dizin iç yüzüne koymak', 'Destek kalçasını yana itmek', 'Nefesi tutmak'],
  easier: 'Ayak parmaklarını yerde bırakıp topuğu bileğine yasla (“koltuk değneği”); bir elinle duvara ya da sandalyeye tutun.',
  caution: 'Denge sorunu, baş dönmesi ya da hamilelikte duvar yanında yap. Düşme riski varsa sandalye desteği şart.',
  hold: '5 nefes / taraf',
  fig: { h: [100, 34], n: [100, 50], p: [100, 104], le: [84, 74], lh: [100, 66], re: [116, 74], rh: [100, 66], lk: [100, 142], lf: [100, 180], rk: [132, 126], rf: [103, 134] }
},
{
  id: 'kopru', level: 'b', tr: 'Köprü Duruşu', sa: 'Setu Bandhasana', en: 'Bridge Pose',
  purpose: 'Kalça ve sırt kaslarını güçlendirir, göğsü ve kalça önünü açar.',
  muscles: ['Büyük kalça kası (gluteus)', 'Hamstringler', 'Sırt kasları', 'Kalça bükücüleri ve göğüs (esneme)'],
  steps: ['Sırt üstü uzan, dizlerini bük, ayakları kalça genişliğinde ve topuklar kalçaya yakın yere bas.', 'Kollar yanlarda, avuçlar aşağı.', 'Nefes alırken ayak tabanlarına basarak kalçanı yerden kaldır.', 'Dizler ayak bileklerinin üzerinde, birbirine paralel.', '3–5 nefes kal, nefes verirken omurgayı omur omur indir.'],
  align: ['Dizler içe ya da dışa açılmıyor.', 'Ağırlık omuzlar ve ayaklar üzerinde; boyuna yük binmiyor.', 'Kalça yüksekliği rahat olduğu kadar.'],
  breath: 'Kaldırırken al, indirirken ver.',
  mistakes: ['Başı sağa sola çevirmek (boyun riski)', 'Dizlerin açılması', 'Kalçayı aşırı kaldırıp beli sıkıştırmak'],
  easier: 'Sakrumun altına blok koyarak “destekli köprü” yap; ya da kalçayı sadece birkaç santim kaldır.',
  caution: 'Boyun sakatlığında dikkat. Duruştayken başını çevirme.',
  hold: '3–5 nefes',
  fig: { h: [28, 170], n: [48, 172], p: [100, 130], c: [70, 140], le: [74, 178], lh: [100, 180], re: [76, 178], rh: [102, 180], lk: [140, 118], lf: [148, 180], rk: [142, 118], rf: [150, 180] }
},
{
  id: 'oturarak-one-egilme', level: 'b', tr: 'Oturarak Öne Eğilme', sa: 'Paschimottanasana', en: 'Seated Forward Bend',
  purpose: 'Bacakların arka yüzünü ve sırtı nazikçe esnetir; sakinleştirici bir kapanış duruşudur.',
  muscles: ['Hamstringler ve baldırlar (esneme)', 'Sırt kasları (esneme)'],
  steps: ['Bacaklar önde uzun oturuş. Gerekirse kalçanın altına katlanmış battaniye koy.', 'Dizlerini rahat olduğu kadar bük; ayak parmakları tavana baksın.', 'Nefes alırken omurganı uzat.', 'Nefes verirken kalçadan menteşe gibi öne eğil; göğüs önde, sırt yuvarlanmadan.', 'Ellerini bacaklarına, ayak bileklerine ya da ayaklarına ulaşabildiğin yere koy.', '5–10 nefes kal.'],
  align: ['Eğilme belden değil, kalçadan başlar.', 'Göğüs ayaklara doğru uzar; burnu dizlere değdirme hedefi yok.', 'Boyun gevşek.'],
  breath: 'Her nefes alışta uzat, her verişte belki biraz daha bırak — zorlama yok.',
  mistakes: ['Ayaklara ulaşmak için sırtı yuvarlamak', 'Elleri çekiştirerek kendini zorlamak', 'Dizleri kilitlemek'],
  easier: 'Dizleri bük, ayak tabanlarından kayış geçirerek tut; ya da uyluklarının üzerine yastık koyup göğsünü ona bırak.',
  caution: 'Bel fıtığı ve siyatik ağrısında dikkat; bacakta uyuşma/yayılan ağrı olursa hemen çık.',
  hold: '30 sn – 1 dk',
  fig: { h: [128, 150], n: [110, 148], p: [58, 172], c: [78, 140], le: [130, 162], lh: [152, 170], re: [132, 163], rh: [154, 171], lk: [110, 174], lf: [160, 176], rk: [112, 175], rf: [162, 177] }
},
{
  id: 'sirtustu-burgu', level: 'b', tr: 'Sırtüstü Burgu', sa: 'Supta Matsyendrasana', en: 'Supine Twist',
  purpose: 'Omurgayı nazikçe döndürür; sırt, kalça ve göğüs çevresini rahatlatır.',
  muscles: ['Sırt ve bel kasları', 'Oblikler', 'Kalça dış yüzü', 'Göğüs (esneme)'],
  steps: ['Sırt üstü uzan, dizlerini bük, ayak tabanları yerde.', 'Kollarını omuz hizasında iki yana aç, avuçlar aşağı veya yukarı.', 'Nefes verirken iki dizini birlikte sağa doğru yere bırak.', 'İstersen başını yavaşça sola çevir.', '5–10 nefes kal, nefes alırken dizleri ortaya getir ve diğer tarafa geç.'],
  align: ['İki omuz da mümkün olduğunca yerde.', 'Dizler üst üste.', 'Dönüş zorlanmadan, yerçekimiyle olur.'],
  breath: 'Nefes verişlerde gövdenin gevşediğini hisset.',
  mistakes: ['Dizleri yere değdirmek için omzu kaldırmak', 'Dönüşü elle zorlamak'],
  easier: 'Dizlerin altına yastık ya da blok koy.',
  caution: 'Bel fıtığı, sakroiliak sorun veya hamilelikte (ileri dönemde) dikkatli ol; dönüş açısını küçük tut.',
  hold: '5–10 nefes / taraf',
  fig: { top: true, h: [36, 100], n: [52, 100], p: [112, 100], le: [56, 70], lh: [58, 42], re: [56, 130], rh: [58, 158], lk: [138, 132], lf: [168, 128], rk: [136, 128], rf: [166, 124] }
},
{
  id: 'savasana', level: 'b', tr: 'Ceset Duruşu (Gevşeme)', sa: 'Savasana', en: 'Corpse Pose',
  purpose: 'Pratiğin sonunda bedenin ve nefesin tamamen dinlendiği gevşeme duruşudur.',
  muscles: ['Tüm beden – aktif kas çalışması yok'],
  steps: ['Sırt üstü uzan, bacaklarını kalça genişliğinden biraz aç, ayaklar yanlara düşsün.', 'Kollarını bedeninden biraz uzaklaştır, avuçlar yukarı.', 'Gözlerini kapat, nefesi kontrol etmeyi bırak.', 'Yüz, çene, omuzlar ve karın bölgesini sırayla gevşet.', '3–10 dakika kal. Çıkarken parmaklarını oynat, sağ tarafa dön ve yavaşça otur.'],
  align: ['Beden simetrik ve rahat.', 'Boyun uzun; gerekirse başın altına ince bir havlu.'],
  breath: 'Doğal nefes. Sadece izle.',
  mistakes: ['Atlamak', 'Hemen telefona bakmak', 'Ani kalkmak (baş dönmesi yapabilir)'],
  easier: 'Dizlerin altına rulo battaniye koy (bel rahatlar); üşümemek için üstünü ört.',
  caution: 'Hamilelikte (özellikle ilk trimesterden sonra) uzun süre sırt üstü yatmak yerine sol yanına uzan. Reflü veya nefes darlığında başı yükselt.',
  hold: '3–10 dk',
  fig: { h: [28, 170], n: [46, 172], p: [110, 174], le: [76, 177], lh: [102, 179], re: [78, 177], rh: [104, 179], lk: [146, 175], lf: [182, 172], rk: [148, 176], rf: [184, 174] }
},
/* ------- ORTA SEVİYE ------- */
{
  id: 'ucgen', level: 'i', tr: 'Üçgen Duruşu', sa: 'Trikonasana', en: 'Triangle Pose',
  purpose: 'Bacakların iç ve arka yüzünü, gövde yanlarını esnetir; dengeyi ve gövde stabilitesini çalıştırır.',
  muscles: ['Hamstringler ve iç uyluk (esneme)', 'Oblikler', 'Quadriceps', 'Omuzlar'],
  steps: ['Savaşçı II’deki gibi ayaklarını aç; ön dizi bükmeden düz tut (kilitlemeden).', 'Kollarını iki yana aç.', 'Gövdeni ön bacağın üzerinden uzatarak yana doğru eğil.', 'Alttaki elini incik kemiğine, bloğa ya da ayak bileğine koy; üstteki kolu tavana uzat.', 'Göğüs yana açık kalsın. 3–5 nefes kal, nefes alarak çık.'],
  align: ['Gövde öne çökmüyor, iki kalça ve omuzlar aynı düzlemde.', 'Ön diz kilitli değil.', 'Boyun rahat; bakış yere, öne ya da yukarı.'],
  breath: 'Uzanırken al, eğilirken ver.',
  mistakes: ['Yere ulaşmak için gövdeyi öne kapatmak', 'Diz eklemini kilitlemek'],
  easier: 'Alttaki eli yüksek bir bloğa ya da uyluğa koy; duruşu kısalt.',
  caution: 'Düşük tansiyon, baş dönmesi ve boyun probleminde yukarı bakma.',
  hold: '3–5 nefes / taraf',
  fig: { h: [48, 78], n: [62, 86], p: [100, 115], le: [58, 116], lh: [55, 146], re: [66, 56], rh: [70, 26], lk: [70, 148], lf: [40, 180], rk: [130, 148], rf: [160, 180] }
},
{
  id: 'sandalye', level: 'i', tr: 'Sandalye Duruşu', sa: 'Utkatasana', en: 'Chair Pose',
  purpose: 'Bacakları, kalçayı ve core’u güçlendirir; dayanıklılık kazandırır.',
  muscles: ['Quadriceps', 'Kalça kasları', 'Core', 'Sırt kasları', 'Omuzlar'],
  steps: ['Dağ Duruşu’nda ayaklar kalça genişliğinde başla.', 'Nefes alırken kollarını yukarı kaldır.', 'Nefes verirken dizlerini bük, kalçanı görünmez bir sandalyeye oturur gibi geriye gönder.', 'Ağırlık topuklarda, dizler ayak parmaklarının hizasında.', '3–5 nefes kal, nefes alarak doğrul.'],
  align: ['Dizler birbirine paralel, içe kapanmıyor.', 'Gövde uyluklara doğru hafif öne eğik ama sırt uzun.', 'Bel aşırı çukur değil.'],
  breath: 'Sabit, eşit nefes; nefes kesiliyorsa dizleri biraz düzleştir.',
  mistakes: ['Dizleri ayak parmaklarının çok önüne taşımak', 'Beli çukurlaştırmak', 'Omuzları kulaklara kaldırmak'],
  easier: 'Dizleri daha az bük, elleri kalçaya ya da göğüs önüne al; sırtını duvara yaslayarak yap.',
  caution: 'Diz problemi, düşük tansiyon veya baş dönmesinde dikkat.',
  hold: '3–5 nefes',
  fig: { h: [78, 54], n: [86, 72], p: [110, 124], le: [76, 46], lh: [68, 22], re: [80, 46], rh: [72, 22], lk: [70, 140], lf: [92, 180], rk: [72, 141], rf: [94, 180] }
},
{
  id: 'yan-aci', level: 'i', tr: 'Genişletilmiş Yan Açı', sa: 'Utthita Parsvakonasana', en: 'Extended Side Angle',
  purpose: 'Bacakları güçlendirir; gövde yanını, arka bacağın iç yüzünü ve omuzları esnetir.',
  muscles: ['Quadriceps ve kalça kasları', 'Oblikler ve gövde yanı (esneme)', 'İç uyluk (esneme)', 'Omuzlar'],
  steps: ['Savaşçı II duruşuna gel.', 'Ön önkolunu ön uyluğunun üzerine koy.', 'Üstteki kolu kulağının yanından çapraz uzat; arka ayağın dış kenarından parmak uçlarına uzun bir çizgi oluşsun.', 'Göğsü yukarı doğru aç. 3–5 nefes kal, nefes alarak çık.'],
  align: ['Ön diz ayak bileği üzerinde.', 'Gövde öne kapanmıyor.', 'Arka bacak düz ve aktif.'],
  breath: 'Her nefes alışta gövde yanını uzat.',
  mistakes: ['Önkola ağırlıkla yüklenip omzu çökertmek', 'Ön dizi içe düşürmek'],
  easier: 'Önkolu uyluk üzerinde tut (eli yere indirme); üst kolu kalçaya koy.',
  caution: 'Omuz ve boyun sakatlığında üst kolu kaldırma, bakışı yere yönelt.',
  hold: '3–5 nefes / taraf',
  fig: { h: [44, 92], n: [60, 99], p: [100, 120], le: [58, 124], lh: [76, 126], re: [40, 72], rh: [20, 46], lk: [50, 128], lf: [40, 180], rk: [136, 150], rf: [170, 180] }
},
{
  id: 'yarim-ay', level: 'i', tr: 'Yarım Ay Duruşu', sa: 'Ardha Chandrasana', en: 'Half Moon Pose',
  purpose: 'Tek ayak üzerinde denge, kalça ve core gücü geliştirir; gövde yanlarını açar.',
  muscles: ['Destek bacağı kalça ve uyluk kasları', 'Core ve oblikler', 'Kaldırılan bacağın kalça kasları'],
  steps: ['Üçgen Duruşu’ndan ön dizini hafifçe bük, alt elini ayağının yaklaşık 30 cm önüne, bir bloğa koy.', 'Arka ayağını yerden kaldırarak kalça hizasına yükselt; destek bacağını yavaşça düzleştir.', 'Üst elini kalçana koy ya da tavana uzat.', 'Kalçaları üst üste açmaya çalış. 3 nefes kal, kontrolle inip diğer tarafa geç.'],
  align: ['Destek dizi kilitli değil.', 'Kaldırılan bacak aktif, ayak tabanı geriye doğru itiyor.', 'Alt el omzun altında.'],
  breath: 'Dengede kalırken nefesi yavaşlat.',
  mistakes: ['Alt ele aşırı yüklenmek', 'Kaldırılan bacağın yere doğru düşmesi', 'Nefesi tutmak'],
  easier: 'Sırtını duvara yaslayarak yap; alt eli yüksek bir bloğa koy; bacağı daha alçak kaldır.',
  caution: 'Denge problemi, baş dönmesi, düşük tansiyonda yapma veya duvar desteği kullan.',
  hold: '3 nefes / taraf',
  fig: { h: [22, 104], n: [38, 108], p: [84, 110], le: [40, 140], lh: [42, 176], re: [40, 80], rh: [42, 50], lk: [82, 145], lf: [82, 180], rk: [122, 108], rf: [160, 106] }
},
{
  id: 'karga', level: 'i', tr: 'Karga Duruşu', sa: 'Bakasana', en: 'Crow Pose',
  purpose: 'Kol ve core gücü ile denge geliştiren bir kol dengesi duruşudur. İlk 30 gün içinde uygulanması önerilmez.',
  muscles: ['Kol, bilek ve omuz kasları', 'Core', 'Kalça bükücüleri'],
  steps: ['Ayakların birbirine yakın, çömel; ellerini omuz genişliğinde, önünde yere koy.', 'Dirseklerini hafifçe bük, dizlerini üst kollarının arka yüzüne yerleştir.', 'Bakışını ellerinin önüne, yere yönelt.', 'Ağırlığını yavaşça ellerine aktar; önce tek ayak parmağını, sonra diğerini kaldırmayı dene.', 'Başının önüne bir yastık koy. 2–3 nefes, sonra ayakları yere indir.'],
  align: ['Dirsekler bileklerin üzerinde, dışa açılmıyor.', 'Core aktif, sırt hafif yuvarlak.'],
  breath: 'Nefesi tutmadan, kısa ve sakin nefeslerle.',
  mistakes: ['Hızla öne atılmak', 'Bakışı ayaklara çevirmek', 'Dirseklerin dışa açılması'],
  easier: 'Ayak altına blok koyarak başla ya da yalnızca ağırlığı öne aktarma çalışması yap, ayaklar yerde kalsın.',
  caution: 'Bilek, omuz sakatlığı, hamilelik, yüksek tansiyon veya glokomda uygulama.',
  hold: '2–3 nefes',
  fig: { h: [44, 132], n: [60, 128], p: [112, 108], c: [92, 104], le: [72, 150], lh: [70, 180], re: [74, 150], rh: [72, 180], lk: [78, 140], lf: [124, 146], rk: [80, 141], rf: [126, 147] }
},
{
  id: 'kayik', level: 'i', tr: 'Kayık Duruşu', sa: 'Navasana', en: 'Boat Pose',
  purpose: 'Core ve kalça bükücülerini güçlendirir; oturma kemikleri üzerinde dengeyi çalıştırır.',
  muscles: ['Karın kasları', 'Kalça bükücüler', 'Sırt kasları'],
  steps: ['Dizler bükülü oturuşta, ellerini uylukların arkasına koy.', 'Göğsünü kaldırarak hafifçe geriye yaslan; oturma kemiklerinin üzerinde dengede ol.', 'Ayaklarını yerden kaldır, incikler yere paralel olsun.', 'Hazırsan ellerini bırakıp kollarını öne uzat.', '3–5 nefes kal, ayakları yere indir.'],
  align: ['Sırt uzun; bel yuvarlanmıyor.', 'Göğüs açık, omuzlar gevşek.'],
  breath: 'Nefes verirken göbeği hafifçe içe çek; nefesi tutma.',
  mistakes: ['Sırtı yuvarlayıp kuyruk sokumuna çökmek', 'Bacakları düzleştirmek için sırtı bozmak', 'Nefesi tutmak'],
  easier: 'Ellerini uyluklarının arkasında tut; ayak parmaklarını yerde bırak.',
  caution: 'Hamilelik, bel fıtığı, yakın zamanlı karın ameliyatı ve kuyruk sokumu ağrısında uygulama.',
  hold: '3–5 nefes',
  fig: { h: [140, 94], n: [130, 110], p: [102, 168], le: [108, 128], lh: [82, 130], re: [110, 129], rh: [84, 131], lk: [72, 126], lf: [40, 130], rk: [74, 127], rf: [42, 131] }
}
];

/* İleri seviye – yalnızca bilgi amaçlı (uygulama talimatı verilmez) */
YA.advancedPoses = [
  { tr: 'Baş Üstü Duruşu', sa: 'Sirsasana', en: 'Headstand', why: 'Boyun ve omuzlara ciddi yük bindiren bir ters duruştur. Yanlış uygulamada boyun yaralanması riski taşır; yalnızca nitelikli bir eğitmen gözetiminde, yıllar süren hazırlıkla öğrenilir.' },
  { tr: 'Tekerlek Duruşu', sa: 'Urdhva Dhanurasana', en: 'Wheel Pose', why: 'Derin bir arka eğilmedir; bel, omuz ve bileklerde yüksek hareket açıklığı ve kuvvet gerektirir.' },
  { tr: 'Lotus Duruşu', sa: 'Padmasana', en: 'Lotus Pose', why: 'Kalçada çok yüksek dış rotasyon gerektirir. Kalça yeterince açık değilse yük dize biner ve diz bağlarını zorlayabilir.' },
  { tr: 'Omuz Duruşu', sa: 'Salamba Sarvangasana', en: 'Shoulder Stand', why: 'Vücut ağırlığının bir kısmı boyun ve omuzlara biner; boyun omurlarına aşırı bükülme yükü riski taşır.' },
  { tr: 'Tek Ayaklı Güvercin (tam)', sa: 'Eka Pada Rajakapotasana', en: 'King Pigeon', why: 'Derin kalça açılımı ile derin arka eğilmeyi birleştirir; ileri düzey esneklik ve kontrol gerektirir.' }
];

/* -------------------------------------------------- PROGRAMLAR (Modül 7)
   step: { pose: id } | { name, cue, fig } | { rest: true }; s = saniye   */
YA.extraFigs = {
  oturus: { h: [92, 46], n: [92, 62], p: [96, 120], le: [84, 92], lh: [110, 116], re: [100, 92], rh: [120, 116], lk: [140, 122], lf: [142, 180], rk: [142, 123], rf: [144, 180], chair: true },
  ayakta: { h: [100, 34], n: [100, 50], p: [100, 105], le: [80, 64], lh: [70, 40], re: [120, 64], rh: [130, 40], lk: [96, 142], lf: [94, 180], rk: [104, 142], rf: [106, 180] },
  nefes: { h: [100, 70], n: [100, 86], p: [100, 150], le: [78, 120], lh: [86, 150], re: [122, 120], rh: [114, 150], lk: [64, 168], lf: [122, 176], rk: [136, 168], rf: [78, 176] }
};

YA.programs = [
{
  id: 'p5', title: '5 Dakikalık Başlangıç Rutini', icon: 'sparkles', level: 'Başlangıç', focus: 'İlk adım',
  desc: 'Hiç yoga yapmamış biri için en kısa ve en nazik giriş. Her gün tekrarlanabilir.',
  steps: [
    { name: 'Nefese varış', cue: 'Rahat otur, gözlerini kapat, karın nefesini izle.', fig: 'nefes', s: 45 },
    { pose: 'kedi-inek', s: 60, cue: 'Al: İnek. Ver: Kedi. Yavaş ve akıcı.' },
    { pose: 'balasana', s: 45 },
    { pose: 'asagi-kopek', s: 30, cue: 'Dizlerin bükülü kalabilir.' },
    { rest: true, s: 15 },
    { pose: 'sirtustu-burgu', s: 30, side: 'Sağ' },
    { pose: 'sirtustu-burgu', s: 30, side: 'Sol' },
    { pose: 'savasana', s: 60 }
  ]
},
{
  id: 'p10-sabah', title: '10 Dakikalık Sabah Yogası', icon: 'sunrise', level: 'Başlangıç', focus: 'Enerji ve uyanış',
  desc: 'Bedeni nazikçe uyandıran, ayakta duruşlarla güne dinç başlamanı destekleyen akış.',
  steps: [
    { pose: 'tadasana', s: 30, cue: 'Ayak tabanlarını hisset, 3 derin nefes.' },
    { name: 'Kol kaldırma (nefesle)', cue: 'Al: kollar yukarı. Ver: kollar aşağı.', fig: 'ayakta', s: 45 },
    { pose: 'kedi-inek', s: 60 },
    { pose: 'asagi-kopek', s: 45 },
    { pose: 'kobra', s: 30 },
    { rest: true, s: 15 },
    { pose: 'savasci-1', s: 30, side: 'Sağ' },
    { pose: 'savasci-1', s: 30, side: 'Sol' },
    { pose: 'savasci-2', s: 30, side: 'Sağ' },
    { pose: 'savasci-2', s: 30, side: 'Sol' },
    { rest: true, s: 15 },
    { pose: 'agac', s: 30, side: 'Sağ' },
    { pose: 'agac', s: 30, side: 'Sol' },
    { pose: 'kopru', s: 45 },
    { pose: 'balasana', s: 45 },
    { pose: 'savasana', s: 90 }
  ]
},
{
  id: 'p15-temel', title: '15 Dakikalık Temel Yoga', icon: 'layers', level: 'Başlangıç', focus: 'Temel duruşlar',
  desc: '12 başlangıç duruşunun tamamını içeren, öğrendiklerini birleştiren temel seans.',
  steps: [
    { name: 'Diyafram nefesi', cue: '4 saniye al, 6 saniye ver.', fig: 'nefes', s: 60 },
    { pose: 'kedi-inek', s: 60 },
    { pose: 'balasana', s: 30 },
    { pose: 'asagi-kopek', s: 45 },
    { pose: 'kobra', s: 30 },
    { pose: 'balasana', s: 30 },
    { pose: 'tadasana', s: 30 },
    { pose: 'savasci-1', s: 40, side: 'Sağ' },
    { pose: 'savasci-1', s: 40, side: 'Sol' },
    { rest: true, s: 20 },
    { pose: 'savasci-2', s: 40, side: 'Sağ' },
    { pose: 'savasci-2', s: 40, side: 'Sol' },
    { rest: true, s: 20 },
    { pose: 'agac', s: 40, side: 'Sağ' },
    { pose: 'agac', s: 40, side: 'Sol' },
    { pose: 'kopru', s: 45 },
    { rest: true, s: 20 },
    { pose: 'kopru', s: 45 },
    { pose: 'oturarak-one-egilme', s: 60 },
    { pose: 'sirtustu-burgu', s: 45, side: 'Sağ' },
    { pose: 'sirtustu-burgu', s: 45, side: 'Sol' },
    { pose: 'savasana', s: 120 }
  ]
},
{
  id: 'p20-tum', title: '20 Dakikalık Tüm Vücut Yogası', icon: 'person-standing', level: 'Başlangıç+', focus: 'Kuvvet, esneklik, denge',
  desc: 'Haftanın sonunda öğrendiklerini bir araya getiren, daha uzun tutuşlar içeren kapsamlı seans.',
  steps: [
    { name: 'Nefese varış', cue: 'Karın nefesiyle zihnini matın üzerine getir.', fig: 'nefes', s: 60 },
    { pose: 'kedi-inek', s: 75 },
    { pose: 'asagi-kopek', s: 45 },
    { pose: 'balasana', s: 30 },
    { pose: 'asagi-kopek', s: 45 },
    { pose: 'kobra', s: 30 },
    { rest: true, s: 20 },
    { pose: 'tadasana', s: 30 },
    { name: 'Kol kaldırma (nefesle)', cue: 'Al: kollar yukarı. Ver: kollar aşağı.', fig: 'ayakta', s: 45 },
    { pose: 'savasci-1', s: 45, side: 'Sağ' },
    { pose: 'savasci-2', s: 45, side: 'Sağ' },
    { rest: true, s: 20 },
    { pose: 'savasci-1', s: 45, side: 'Sol' },
    { pose: 'savasci-2', s: 45, side: 'Sol' },
    { rest: true, s: 20 },
    { pose: 'agac', s: 45, side: 'Sağ' },
    { pose: 'agac', s: 45, side: 'Sol' },
    { pose: 'balasana', s: 45 },
    { pose: 'kopru', s: 45 },
    { rest: true, s: 20 },
    { pose: 'kopru', s: 45 },
    { pose: 'oturarak-one-egilme', s: 75 },
    { pose: 'sirtustu-burgu', s: 60, side: 'Sağ' },
    { pose: 'sirtustu-burgu', s: 60, side: 'Sol' },
    { pose: 'savasana', s: 180 }
  ]
},
{
  id: 'p10-aksam', title: '10 Dakikalık Akşam Gevşeme Rutini', icon: 'moon', level: 'Başlangıç', focus: 'Rahatlama',
  desc: 'Yerde yapılan sakin duruşlar ve uzun nefes verişleriyle günü kapatma rutini.',
  steps: [
    { name: 'Uzun veriş nefesi', cue: '4 saniye al, 6 saniye ver. Omuzlarını bırak.', fig: 'nefes', s: 90 },
    { pose: 'kedi-inek', s: 60, cue: 'Yavaş, küçük hareketler.' },
    { pose: 'balasana', s: 90 },
    { pose: 'oturarak-one-egilme', s: 75, cue: 'Dizler bükülü, destekli.' },
    { pose: 'sirtustu-burgu', s: 60, side: 'Sağ' },
    { pose: 'sirtustu-burgu', s: 60, side: 'Sol' },
    { pose: 'kopru', s: 30, cue: 'Hafif ve kısa.' },
    { pose: 'savasana', s: 150, cue: 'Beden taraması: ayaklardan başa doğru gevşe.' }
  ]
},
{
  id: 'p-masa', title: 'Masa Başı Hafif Hareketler', icon: 'monitor', level: 'Herkes', focus: 'Boyun, omuz, sırt',
  desc: 'Sandalyede, iş arasında yapılabilen 6 dakikalık nazik hareketler. Mat gerekmez.',
  steps: [
    { name: 'Oturarak nefes', cue: 'Ayak tabanları yerde, sırt dik. 4 al, 6 ver.', fig: 'oturus', s: 45 },
    { name: 'Boyun yan esnetme', cue: 'Kulağını omzuna doğru yavaşça indir; 3 nefes her tarafa. Zorlama.', fig: 'oturus', s: 60 },
    { name: 'Omuz çevirme', cue: 'Omuzları yukarı, geri ve aşağı doğru yavaşça çevir.', fig: 'oturus', s: 45 },
    { name: 'Oturarak kedi-inek', cue: 'Ellerin dizlerde. Al: göğsü aç. Ver: sırtı yuvarla.', fig: 'oturus', s: 60 },
    { name: 'Oturarak yan esneme', cue: 'Sağ kolu yukarı uzat, sola hafif eğil; sonra diğer taraf.', fig: 'oturus', s: 60 },
    { name: 'Oturarak burgu', cue: 'Al: uzan. Ver: sağa dön, sandalye sırtını tut. Sonra sol.', fig: 'oturus', s: 60 },
    { name: 'Bilek ve parmaklar', cue: 'Bilekleri iki yöne çevir, parmakları açıp kapa.', fig: 'oturus', s: 30 },
    { name: 'Ayakta uzanma', cue: 'Ayağa kalk, kollarını yukarı uzat, 3 derin nefes.', fig: 'ayakta', s: 30 }
  ]
},
{
  id: 'p-denge', title: 'Esneklik ve Denge Odaklı Pratik', icon: 'scale', level: 'Başlangıç+', focus: 'Denge + esneme',
  desc: 'Ağaç ve Savaşçı duruşlarıyla denge; köpek ve öne eğilmeyle esneklik çalışması.',
  steps: [
    { pose: 'tadasana', s: 45, cue: 'Gözlerini sabit bir noktaya sabitle.' },
    { pose: 'agac', s: 40, side: 'Sağ' },
    { pose: 'agac', s: 40, side: 'Sol' },
    { rest: true, s: 15 },
    { pose: 'savasci-2', s: 40, side: 'Sağ' },
    { pose: 'savasci-2', s: 40, side: 'Sol' },
    { rest: true, s: 15 },
    { pose: 'agac', s: 40, side: 'Sağ', cue: 'İkinci tur: kolları yukarı uzatmayı dene.' },
    { pose: 'agac', s: 40, side: 'Sol' },
    { pose: 'kedi-inek', s: 45 },
    { pose: 'asagi-kopek', s: 45 },
    { pose: 'balasana', s: 30 },
    { pose: 'oturarak-one-egilme', s: 60 },
    { pose: 'sirtustu-burgu', s: 45, side: 'Sağ' },
    { pose: 'sirtustu-burgu', s: 45, side: 'Sol' },
    { pose: 'savasana', s: 90 }
  ]
}
];

/* -------------------------------------------------- MEDİTASYON REHBERLERİ */
YA.meditations = [
  { id: 'nefes-odak', title: 'Nefes Odağı', cues: ['Rahat bir oturuş bul, omurganı uzat.', 'Gözlerini kapat ya da bakışını yere indir.', 'Nefesin en belirgin hissedildiği yeri bul.', 'Nefesi değiştirmeden izle.', 'Dikkatin dağıldığında bunu fark et ve nazikçe nefese dön.', 'İstersen nefesleri 1’den 10’a kadar say.', 'Her veriş bir bırakma anı olsun.', 'Sadece bu nefes. Sonra bir sonraki.'] },
  { id: 'beden-taramasi', title: 'Beden Taraması', cues: ['Rahatça uzan ya da otur. Birkaç sakin nefes al.', 'Dikkatini ayak parmaklarına getir.', 'Ayak tabanları, bilekler, baldırlar…', 'Dizler ve uyluklar. Ağırlıklarını hisset.', 'Kalça ve bel bölgesi.', 'Karın: nefesle yükselip alçalıyor.', 'Göğüs, sırt ve omuzlar.', 'Kollar, eller ve parmak uçları.', 'Boyun, çene, yanaklar, alın.', 'Bütün bedenini tek seferde hisset.'] },
  { id: 'farkindalik', title: 'Bilinçli Farkındalık', cues: ['Rahat otur ve birkaç nefesle yerleş.', 'Etrafındaki sesleri fark et; adlandırmadan dinle.', 'Bedeninin zemine temas ettiği yerleri hisset.', 'Bir düşünce geldiğinde “düşünce” diye not et ve bırak.', 'Bir duygu fark edersen bedende nerede hissettiğine bak.', 'Yargılamadan, merakla izle.', 'Şu an, burada olduğunu hatırla.'] }
];

/* -------------------------------------------------- VİDEOLU GÖSTERİMLER
   Seçilmiş YouTube videoları (gömülebilirliği oEmbed ile doğrulandı – Kasım 2026).
   Videolar YouTube’un gizlilik odaklı youtube-nocookie.com alanından, kullanıcı
   tıkladığında yüklenir.                                                  */
YA.videos = {
  /* Pozlar – çoğu Yoga With Adriene “Foundations of Yoga” serisi */
  'tadasana': { id: 'NYhH8Gr35cI', title: 'Mountain Pose (Tadasana)', ch: 'Yoga With Adriene', len: '12:30' },
  'balasana': { id: 'eqVMAPM00DM', title: "Extended Child's Pose", ch: 'Yoga With Adriene', len: '6:14' },
  'kedi-inek': { id: 'y39PrKY_4JM', title: 'Cat-Cow Yoga Pose', ch: 'Yoga With Adriene', len: '8:50' },
  'asagi-kopek': { id: 'j97SSGsnCAQ', title: 'Downward Facing Dog Yoga Pose', ch: 'Yoga With Adriene', len: '7:58' },
  'kobra': { id: 'n6jrC6WeF84', title: 'Cobra Pose', ch: 'Yoga With Adriene', len: '4:52' },
  'savasci-1': { id: '5rT--p_cLOc', title: 'Warrior One Yoga Pose', ch: 'Yoga With Adriene', len: '6:57' },
  'savasci-2': { id: '4Ejz7IgODlU', title: 'Warrior 2 Yoga Pose', ch: 'Yoga With Adriene', len: '5:16' },
  'agac': { id: 'yVE4XXFFO70', title: 'Tree Pose – Vrksasana', ch: 'Yoga With Adriene', len: '12:09' },
  'kopru': { id: 'NnbvPeAIhmA', title: 'Bridge Pose', ch: 'Yoga With Adriene', len: '9:45' },
  'oturarak-one-egilme': { id: 'g7Uhp5tphAs', title: 'Forward Fold Yoga Pose', ch: 'Yoga With Adriene', len: '7:59' },
  'sirtustu-burgu': { id: 'mKC3IeldPOc', title: 'Reclined Twist Yoga Pose', ch: 'Yoga With Adriene', len: '8:40' },
  'savasana': { id: 'eSeRjoolN2A', title: 'Corpse Pose', ch: 'Yoga With Adriene', len: '9:27' },
  'ucgen': { id: 'upFYlxZHif0', title: 'Triangle Pose | Foundations of Yoga', ch: 'Yoga With Adriene', len: '8:25' },
  'sandalye': { id: 'ySafTekJ3Ls', title: 'Chair Pose | Utkatasana', ch: 'Yoga With Adriene', len: '8:04' },
  'yan-aci': { id: '0lfzG9jH6cM', title: 'Extended Side Angle Pose | Foundations of Yoga', ch: 'Yoga With Adriene', len: '9:10' },
  'yarim-ay': { id: 'EriPRTk1ly0', title: 'Half Moon Pose – Foundations of Yoga', ch: 'Yoga With Adriene', len: '14:28' },
  'karga': { id: 'DgvjvwPGLPY', title: 'Crow Pose | How To Do Crow Pose', ch: 'Yoga With Adriene', len: '10:52' },
  'kayik': { id: '8KsyQvwi85Q', title: 'How to do Navasana – Boat Pose for Beginners', ch: 'Yoga & You', len: '2:23' },
  /* Nefes teknikleri */
  'nefes-diyafram': { id: 'Mg2ar-7_HfA', title: 'Diaphragmatic breathing', ch: 'NewYork-Presbyterian Hospital', len: '1:19' },
  'nefes-karin': { id: '9jpchJcKivk', title: 'How to do Diaphragmatic Breathing Exercises for Beginners', ch: 'Michelle Kenway (fizyoterapist)', len: '3:53' },
  'nefes-ujjayi': { id: 'IQrsJ-yZWV8', title: 'Ujjayi Breathing', ch: 'Yoga With Adriene', len: '6:53' },
  'nefes-nadi': { id: '8VwufJrUhic', title: 'Yoga Breathing | Alternate Nostril Breathing', ch: 'Yoga With Adriene', len: '10:58', note: 'Videoda nefes tutma gösterilirse bu bölümü atlayıp tutmasız sürümle devam edebilirsin.' },
  'nefes-kutu': { id: 'g6l63eQRbOg', title: 'How to do box breathing.', ch: 'Cleveland Clinic', len: '0:30', note: 'Bekleme sürelerini kısaltabilir ya da hiç kullanmayabilirsin.' },
  /* Programlar */
  'program-p-masa': { id: 'tAUf7aajBWE', title: 'Yoga at Your Desk', ch: 'Yoga With Adriene', len: '6:24' }
};
