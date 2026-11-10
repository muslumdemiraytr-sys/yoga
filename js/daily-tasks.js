/* ==========================================================================
   30 Günlük Yoga Eğitim Planı – veri ve arayüz
   ========================================================================== */
YA.weeks = [
  { no: 1, title: 'Yoga ile Tanışma', desc: 'Temel bilgiler, ekipman, nefes ve ilk duruşlar.' },
  { no: 2, title: 'Temel Pozisyonlar', desc: 'Ayakta ve yerde yapılan temel asanalar.' },
  { no: 3, title: 'Hareket ve Nefes', desc: 'Nefesle akış, hareketlilik, denge ve esneklik.' },
  { no: 4, title: 'Bağımsız Pratik', desc: 'Rutinler, meditasyon ve kendi pratiğini kurmak.' }
];

YA.days = [
/* ---------------- HAFTA 1 */
{ n: 1, w: 1, title: 'Yoga nedir?', min: 10,
  goal: 'Yoganın tanımını ve üç temel bileşenini (asana, pranayama, meditasyon) açıklayabilmek.',
  read: [['Modül 1 › Yoga nedir?', '#/modul/m1/nedir'], ['Modül 1 › Yoga türleri', '#/modul/m1/turler']],
  visual: { type: 'breath', id: 'karin' },
  practice: '5 dakika okuma, ardından 5 dakika karın nefesi: rahatça otur, ellerini karnına koy ve nefesin karnını nasıl hareket ettirdiğini izle.',
  action: ['Nefes rehberini aç (Karın Nefesi)', '#/nefes/karin'],
  q: { q: 'Modern yoga pratiği hangi üç bileşeni birleştirir?', o: ['Koşu, esneme, diyet', 'Duruşlar, nefes, meditasyon', 'Ağırlık, kardiyo, uyku'], a: 1, e: 'NCCIH modern yogayı fiziksel duruşlar, nefes teknikleri ve meditasyonun birleşimi olarak tanımlar.' } },
{ n: 2, w: 1, title: 'Yoga ekipmanlarını tanıma', min: 10,
  goal: 'Mat, blok, kayış ve battaniyenin ne işe yaradığını bilmek ve evdeki alternatiflerini hazırlamak.',
  read: [['Modül 2 › Gerekli ekipmanlar', '#/modul/m2/ekipman'], ['Modül 2 › Mat seçimi', '#/modul/m2/mat'], ['Modül 2 › Ortamın hazırlanması', '#/modul/m2/ortam']],
  visual: { type: 'pose', id: 'balasana' },
  practice: 'Pratik alanını hazırla: matını ser, blok yerine iki kalın kitap, kayış yerine bir kemer ya da havlu ayarla. Ardından 3 dakika Çocuk Duruşu’nda dinlen (alın bir kitap ya da yastık üzerinde).',
  q: { q: 'Ayaklarına uzanamadığında hangi ekipman işini kolaylaştırır?', o: ['Kayış', 'Kalın mat', 'Ağırlık'], a: 0, e: 'Kayış kollarını “uzatır”; sırtı yuvarlamadan öne eğilmeni sağlar.' } },
{ n: 3, w: 1, title: 'Diyafram nefesi', min: 10,
  goal: 'Diyaframın nefesteki görevini anlamak ve diyafram nefesini 5 dakika uygulamak.',
  read: [['Modül 3 › Diyafram Nefesi', '#/nefes/diyafram'], ['Modül 6 › Core bölgesi', '#/modul/m6/core']],
  visual: { type: 'ill', src: 'assets/illustrations/diaphragm.svg', cap: 'Nefes alırken diyafram aşağı iner, karın öne çıkar.' },
  practice: 'Sırt üstü, dizler bükülü uzan. Bir el göğüste, bir el karında. 4 saniye al, 6 saniye ver; 5 dakika.',
  action: ['Nefes rehberini başlat', '#/nefes/diyafram'],
  q: { q: 'Diyafram nefesinde nefes alırken hangi el daha çok hareket etmeli?', o: ['Göğüsteki el', 'Karındaki el', 'İkisi de hareketsiz'], a: 1, e: 'Diyafram aşağı inerken karın öne çıkar; göğüs görece sabit kalır.' } },
{ n: 4, w: 1, title: 'Dağ Duruşu ve Çocuk Duruşu', min: 12,
  goal: 'İki temel duruşun adımlarını, hizalanmasını ve amacını öğrenmek.',
  read: [['Dağ Duruşu (Tadasana)', '#/poz/tadasana'], ['Çocuk Duruşu (Balasana)', '#/poz/balasana']],
  visual: { type: 'pose', id: 'tadasana' },
  practice: 'Dağ Duruşu’nda 1 dakika kal, ağırlığını ayakların ön-arka ve sağ-sol bölgeleri arasında hafifçe gezdirerek merkezi bul. Ardından 1 dakika Çocuk Duruşu. 3 tur tekrarla.',
  q: { q: 'Dağ Duruşu’nda dizler nasıl olmalı?', o: ['Geriye kilitli', 'Yumuşak, kilitli değil', 'Belirgin bükülü'], a: 1, e: 'Dizleri kilitlemek eklemlere yük bindirir; hafif “yumuşak” diz önerilir.' } },
{ n: 5, w: 1, title: 'Kedi-İnek uygulaması', min: 10,
  goal: 'Nefes alırken açılma, nefes verirken kapanma prensibini Kedi-İnek ile uygulamak.',
  read: [['Kedi-İnek', '#/poz/kedi-inek'], ['Nefes ve hareket koordinasyonu', '#/nefes/koordinasyon']],
  visual: { type: 'pose', id: 'kedi-inek' },
  practice: 'Dört ayak pozisyonunda 10 yavaş Kedi-İnek döngüsü. Ardından 1 dakika Çocuk Duruşu. 2 tur.',
  q: { q: 'Kedi-İnek’te “İnek” fazı hangi nefes evresinde yapılır?', o: ['Nefes alırken', 'Nefes verirken', 'Nefes tutarken'], a: 0, e: 'Göğsün açıldığı İnek fazı nefes alışla, sırtın yuvarlandığı Kedi fazı verişle eşleşir.' } },
{ n: 6, w: 1, title: 'Temel duruş çalışması', min: 10,
  goal: 'Hizalama kontrol listesini kendi bedeninde uygulamak; yaygın hataları tanımak.',
  read: [['Modül 2 › Doğru duruş ve beden farkındalığı', '#/modul/m2/durus'], ['Modül 2 › Yeni başlayanların hataları', '#/modul/m2/hatalar']],
  visual: { type: 'pose', id: 'tadasana' },
  practice: 'Bir aynanın karşısında (ya da duvara yakın) Dağ Duruşu’nda dur ve 6 maddelik hizalama listesini sırayla kontrol et. Gözlerini kapatıp 5 nefes boyunca aynı hizayı hissetmeye çalış.',
  q: { q: 'Aşağıdakilerden hangisi yeni başlayanların sık yaptığı bir hatadır?', o: ['Destek kullanmak', 'Zorlanınca nefesi tutmak', 'Savasana yapmak'], a: 1, e: 'Zorlandığımızda nefes farkında olmadan durabilir; nefes akmıyorsa duruşu hafifletmek gerekir.' } },
{ n: 7, w: 1, title: 'Haftalık tekrar ve değerlendirme', min: 15, review: true,
  goal: 'İlk haftayı gözden geçirmek, Modül 1 ve 2 quizlerini çözmek ve güvenli pratik kurallarını tekrar etmek.',
  read: [['Modül 2 › Güvenli pratik kuralları', '#/modul/m2/guvenlik'], ['Modül 1 quiz', '#/quiz/m1'], ['Modül 2 quiz', '#/quiz/m2']],
  visual: { type: 'program', id: 'p5' },
  practice: '5 Dakikalık Başlangıç Rutini’ni zamanlayıcıyla yap. Zorlanırsan hareketi bırak ya da Çocuk Duruşu’nda dinlen.',
  action: ['5 dakikalık rutini başlat', '#/programlar/p5'],
  q: { q: 'Pratik sırasında baş dönmesi hissedersen ne yapmalısın?', o: ['Duruşu tamamlamaya çalışmak', 'Pozisyondan çıkıp oturmak ya da uzanmak', 'Nefesi tutmak'], a: 1, e: 'Baş dönmesi, nefes darlığı ve ağrı pratiği durdurma sinyalleridir.' } },
/* ---------------- HAFTA 2 */
{ n: 8, w: 2, title: 'Aşağı Bakan Köpek', min: 12,
  goal: 'Aşağı Bakan Köpek’e güvenle girip çıkmak; dizleri bükerek omurga uzunluğunu korumak.',
  read: [['Aşağı Bakan Köpek', '#/poz/asagi-kopek'], ['Modül 6 › Hamstring kasları', '#/modul/m6/hamstring']],
  visual: { type: 'pose', id: 'asagi-kopek' },
  practice: 'Kedi-İnek ile ısın (1 dk). Dört ayaktan Aşağı Bakan Köpek’e geç, dizler bükülü 3–5 nefes kal, dizleri yere indir ve Çocuk Duruşu’nda dinlen. 4 tur.',
  q: { q: 'Aşağı Bakan Köpek’te önceliğin ne olmalı?', o: ['Topukları yere değdirmek', 'Omurgayı uzun tutmak, gerekirse dizleri bükmek', 'Bacakları kilitlemek'], a: 1, e: 'Uzun omurga öncelikli; topukların yere değmesi gerekmez.' } },
{ n: 9, w: 2, title: 'Kobra Duruşu', min: 10,
  goal: 'Sırt kaslarıyla kontrol edilen, yumuşak bir arka eğilmeyi öğrenmek.',
  read: [['Kobra Duruşu', '#/poz/kobra'], ['Modül 6 › Omurga anatomisi', '#/modul/m6/omurga']],
  visual: { type: 'pose', id: 'kobra' },
  practice: '“Bebek kobra” ile başla: 5 kez nefes alırken yüksel, verirken in. Ardından 3 kez 3 nefeslik tutuş. Aralarda Çocuk Duruşu.',
  q: { q: 'Kobra’da yükselme gücü nereden gelmeli?', o: ['Tamamen kollardan', 'Ağırlıklı olarak sırt kaslarından', 'Boyundan'], a: 1, e: 'Eller destek verir; ama kaldırma sırt kaslarıyla yapılır, bel sıkışmasın diye yükseklik sınırlı tutulur.' } },
{ n: 10, w: 2, title: 'Savaşçı I', min: 12,
  goal: 'Ön diz-ayak bileği hizasını ve ayakların “ray üstünde” konumunu öğrenmek.',
  read: [['Savaşçı I', '#/poz/savasci-1'], ['Modül 6 › Kalça hareketliliği', '#/modul/m6/kalca']],
  visual: { type: 'pose', id: 'savasci-1' },
  practice: 'Her taraf için 3 kez Savaşçı I’e gir, 3 nefes kal. İlk turda elleri kalçada tut, sonra kolları kaldır.',
  q: { q: 'Savaşçı I’de ayaklar neden “ip üzerinde” değil “ray üstünde” konumlanır?', o: ['Daha geniş bir taban ve denge için', 'Daha çok esnemek için', 'Fark etmez'], a: 0, e: 'Kalça genişliğinde aralık dengeyi artırır ve kalçanın öne dönmesini kolaylaştırır.' } },
{ n: 11, w: 2, title: 'Savaşçı II', min: 12,
  goal: 'Savaşçı II’de gövdeyi ortada tutmayı ve ön dizi dışa doğru hizalamayı öğrenmek.',
  read: [['Savaşçı II', '#/poz/savasci-2']],
  visual: { type: 'pose', id: 'savasci-2' },
  practice: 'Savaşçı I → Savaşçı II geçişini her taraf için 3 kez yap; her duruşta 3 nefes.',
  q: { q: 'Savaşçı II’de ön diz hangi yöne bakmalı?', o: ['İçe, başparmağa', 'Ayağın ikinci parmağı yönünde, dışa', 'Geriye'], a: 1, e: 'Dizin içe çökmesi diz eklemini zorlar; diz, ayak bileğinin üzerinde ve ikinci parmak yönünde olmalıdır.' } },
{ n: 12, w: 2, title: 'Ağaç Duruşu', min: 10, tags: ['balance'],
  goal: 'Tek ayak üzerinde güvenli denge kurmak, ayağı dize koymama kuralını uygulamak.',
  read: [['Ağaç Duruşu', '#/poz/agac'], ['Modül 6 › Denge ve koordinasyon', '#/modul/m6/denge']],
  visual: { type: 'pose', id: 'agac' },
  practice: 'Duvarın yanında çalış. Her taraf 3 tur, 5 nefes. Ayak önce bilekte, sonra baldırda, hazırsan iç uylukta.',
  q: { q: 'Ağaç Duruşu’nda kaldırılan ayak nereye konmamalıdır?', o: ['Bileğe', 'Dizin iç yüzüne', 'İç uyluğa'], a: 1, e: 'Diz eklemine yandan baskı yapmamak için ayak dizin üstüne ya da altına konur, dizin kendisine konmaz.' } },
{ n: 13, w: 2, title: 'Köprü Duruşu', min: 10,
  goal: 'Kalça kaslarını kullanarak kalçayı kaldırmak, boynu korumak.',
  read: [['Köprü Duruşu', '#/poz/kopru']],
  visual: { type: 'pose', id: 'kopru' },
  practice: 'Nefes alırken kaldır, verirken indir: 6 dinamik tekrar. Ardından 3 kez 3–5 nefeslik tutuş.',
  q: { q: 'Köprü Duruşu’ndayken neden başı sağa sola çevirmemelisin?', o: ['Boyna yük bindiği için', 'Denge bozulacağı için', 'Nefes duracağı için'], a: 0, e: 'Bu pozisyonda boyun omurgaları yük altındadır; baş çevirmek yaralanma riskini artırır.' } },
{ n: 14, w: 2, title: 'Haftalık tekrar ve değerlendirme', min: 15, review: true,
  goal: 'İkinci haftanın duruşlarını bir seans hâlinde birleştirmek ve Modül 4 quizini çözmek.',
  read: [['Modül 4 › Pozisyonlar', '#/modul/m4'], ['Modül 4 quiz', '#/quiz/m4']],
  visual: { type: 'program', id: 'p10-sabah' },
  practice: '10 Dakikalık Sabah Yogası’nı zamanlayıcıyla yap. Zorlanırsan hareketi kısalt ya da atla.',
  action: ['Sabah yogasını başlat', '#/programlar/p10-sabah'],
  q: { q: 'Bir duruşta keskin ağrı hissedersen ne yapmalısın?', o: ['Nefes alıp devam etmek', 'Duruştan çıkmak', 'Daha derine gitmek'], a: 1, e: 'Hafif germe hissi normaldir; keskin ya da batıcı ağrı durma sinyalidir.' } },
/* ---------------- HAFTA 3 */
{ n: 15, w: 3, title: 'Nefes ve hareket koordinasyonu', min: 10,
  goal: 'Açılma = nefes alma, kapanma = nefes verme kuralını akıcı hareketlerde uygulamak.',
  read: [['Nefes ve Hareket Koordinasyonu', '#/nefes/koordinasyon'], ['Ujjayi Nefesi', '#/nefes/ujjayi']],
  visual: { type: 'breath', id: 'koordinasyon' },
  practice: '10 tur nefesle kol kaldırma, 10 tur Kedi-İnek. İstersen nefese hafif Ujjayi sesi ekle.',
  action: ['Nefes rehberini başlat', '#/nefes/koordinasyon'],
  q: { q: 'Nefes hızlanıyorsa ne yapmalısın?', o: ['Hareketi hızlandırmak', 'Hareketi yavaşlatmak', 'Nefesi tutmak'], a: 1, e: 'Tempoyu nefes belirler; nefes hızlanıyorsa hareket yavaşlatılır.' } },
{ n: 16, w: 3, title: 'Basit yoga akışı', min: 12,
  goal: 'Öğrendiğin duruşları nefesle birbirine bağlayan kısa bir akış oluşturmak.',
  read: [['Modül 1 › Yoga türleri (Vinyasa)', '#/modul/m1/turler']],
  visual: { type: 'pose', id: 'asagi-kopek' },
  practice: 'Akış (3 tur): Dört ayak → Kedi-İnek (3 nefes) → Aşağı Bakan Köpek (3 nefes) → Dizleri indir → Kobra (2 nefes) → Çocuk Duruşu (3 nefes). Zorlanırsan turu yarıda bırak ve dinlen.',
  q: { q: 'Vinyasa stilinin temel özelliği nedir?', o: ['Duruşların nefesle akıcı biçimde bağlanması', 'Sadece meditasyon', 'Duruşları 5 dakika tutmak'], a: 0, e: 'Vinyasa, duruşların nefesle senkronize bir akış hâlinde yapılmasıdır.' } },
{ n: 17, w: 3, title: 'Kalça hareketliliği', min: 12,
  goal: 'Kalça ekleminin yapısını anlamak ve kalçayı farklı yönlerde nazikçe hareket ettirmek.',
  read: [['Modül 6 › Kalça hareketliliği', '#/modul/m6/kalca'], ['Modül 6 › Eklem hareket açıklığı', '#/modul/m6/rom']],
  visual: { type: 'pose', id: 'savasci-2' },
  practice: 'Kedi-İnek (1 dk) → dört ayakta kalça çevirme (her yön 5) → Savaşçı I ve II (her taraf 3 nefes) → Köprü (3 tur) → Sırtüstü Burgu.',
  q: { q: 'Kalça eklemi ne tür bir eklemdir?', o: ['Menteşe eklem', 'Top-yuva eklem', 'Sabit eklem'], a: 1, e: 'Kalça top-yuva eklemidir; bu nedenle pek çok yönde hareket edebilir. Diz ise menteşe eklemdir.' } },
{ n: 18, w: 3, title: 'Omuz hareketliliği', min: 10,
  goal: 'Omuzun stabilite-hareketlilik dengesini anlamak; omuzları kulaklardan uzak tutmayı alışkanlık hâline getirmek.',
  read: [['Modül 6 › Omuz hareketliliği', '#/modul/m6/omuz']],
  visual: { type: 'program', id: 'p-masa' },
  practice: 'Masa Başı Hafif Hareketler programını yap; ardından Aşağı Bakan Köpek’te 3 kez 3 nefes, kürek kemiklerini aşağı-dışa yaymaya odaklan.',
  action: ['Masa başı programını başlat', '#/programlar/p-masa'],
  q: { q: 'Omuz ekleminin stabilitesini büyük ölçüde ne sağlar?', o: ['Rotator manşet ve kürek kemiği çevresi kasları', 'Sadece kemik yapısı', 'Diyafram'], a: 0, e: 'Omuz çok hareketli bir eklemdir; stabiliteyi esas olarak çevresindeki kaslar sağlar.' } },
{ n: 19, w: 3, title: 'Denge egzersizleri', min: 10, tags: ['balance'],
  goal: 'Dengeyi sağlayan üç sistemi tanımak ve bakış noktası (drishti) kullanmak.',
  read: [['Modül 6 › Denge ve koordinasyon', '#/modul/m6/denge']],
  visual: { type: 'program', id: 'p-denge' },
  practice: 'Esneklik ve Denge Odaklı Pratik programını zamanlayıcıyla yap. Ağaç’ta önce gözler bir noktada, sonra bakışı hafifçe yukarı kaydırmayı dene (duvar yanında).',
  action: ['Denge programını başlat', '#/programlar/p-denge'],
  q: { q: 'Aşağıdakilerden hangisi dengeyi sağlayan sistemlerden biri değildir?', o: ['Görme', 'İç kulak', 'Sindirim sistemi'], a: 2, e: 'Denge; görme, iç kulak (vestibüler sistem) ve propriosepsiyonun birlikte çalışmasıyla sağlanır.' } },
{ n: 20, w: 3, title: 'Esneklik çalışması', min: 12,
  goal: 'Statik ve dinamik esneme farkını öğrenmek; zorlamadan esnemeyi uygulamak.',
  read: [['Modül 6 › Kas esnekliği', '#/modul/m6/esneklik'], ['Oturarak Öne Eğilme', '#/poz/oturarak-one-egilme']],
  visual: { type: 'pose', id: 'oturarak-one-egilme' },
  practice: 'Dinamik: Kedi-İnek (1 dk). Statik: Aşağı Bakan Köpek (45 sn), Oturarak Öne Eğilme (1 dk, kayışla), Sırtüstü Burgu (her taraf 45 sn).',
  q: { q: 'Güvenli esneme için hangisi doğrudur?', o: ['Sıçrayarak esnemek', 'Isınmış kaslarla, ağrısız esnemek', 'Ağrı noktasında kalmak'], a: 1, e: 'Esneme ısınmış kaslarla, yaylanmadan ve ağrı hissetmeden yapılmalıdır.' } },
{ n: 21, w: 3, title: 'Haftalık tekrar ve değerlendirme', min: 15, review: true,
  goal: 'Nefes ve anatomi bilgilerini pekiştirmek; Modül 3 ve 6 quizlerini çözmek.',
  read: [['Modül 3 quiz', '#/quiz/m3'], ['Modül 6 quiz', '#/quiz/m6']],
  visual: { type: 'program', id: 'p15-temel' },
  practice: '15 Dakikalık Temel Yoga’yı kendi hızında yap; istediğin an duraklatıp dinlenebilirsin.',
  action: ['15 dakikalık seansı başlat', '#/programlar/p15-temel'],
  q: { q: 'Bu programda nefes tutma teknikleri için hangisi doğrudur?', o: ['Zorunludur', 'İsteğe bağlıdır ve kısaltılabilir', 'Her gün 1 dakika yapılmalıdır'], a: 1, e: 'Başlangıç seviyesinde nefes tutma zorunlu değildir; kutu nefesindeki beklemeler isteğe bağlıdır.' } },
/* ---------------- HAFTA 4 */
{ n: 22, w: 4, title: '10 dakikalık yoga rutini', min: 10,
  goal: 'Hazır bir rutini baştan sona kesintisiz uygulamak.',
  read: [['Modül 7 › Programlar', '#/modul/m7']],
  visual: { type: 'program', id: 'p10-aksam' },
  practice: '10 Dakikalık Akşam Gevşeme Rutini’ni ya da Sabah Yogası’nı seç ve zamanlayıcıyla yap.',
  action: ['Akşam rutinini başlat', '#/programlar/p10-aksam'],
  q: { q: 'Akşam rutininde neden nefes verişi alıştan uzun tutulur?', o: ['Daha çok enerji için', 'Rahatlamayı desteklemek için', 'Nefes tutmayı öğrenmek için'], a: 1, e: 'Uzun ve yavaş verişler pek çok kişide rahatlamaya yardımcı olabilir; akşam rutinleri bu yüzden uzun verişler içerir.' } },
{ n: 23, w: 4, title: '15 dakikalık yoga rutini', min: 15,
  goal: '12 başlangıç duruşunu tek bir seansta uygulamak.',
  read: [['15 Dakikalık Temel Yoga', '#/programlar/p15-temel']],
  visual: { type: 'program', id: 'p15-temel' },
  practice: '15 Dakikalık Temel Yoga programını yap. Hangi duruşun sana en iyi geldiğini not et.',
  action: ['Programı başlat', '#/programlar/p15-temel'],
  q: { q: 'Bir yoga seansı genellikle hangi duruşla biter?', o: ['Savaşçı II', 'Savasana', 'Aşağı Bakan Köpek'], a: 1, e: 'Savasana (gevşeme) pratiğin kapanışıdır ve atlanmamalıdır.' } },
{ n: 24, w: 4, title: 'Meditasyon uygulaması', min: 10,
  goal: 'Rehberli bir meditasyonu baştan sona tamamlamak; dikkat dağılmasını fark edip geri dönmek.',
  read: [['Modül 5 › Meditasyona giriş', '#/modul/m5/giris'], ['Modül 5 › Beden taraması', '#/modul/m5/beden-taramasi']],
  visual: { type: 'ill', src: 'assets/illustrations/hero.svg', cap: 'Rahat bir oturuş, sakin bir ortam.' },
  practice: 'Meditasyon zamanlayıcısıyla 5 dakika “Beden Taraması” ya da “Nefes Odağı” yap. Ardından 2 dakika ne fark ettiğini düşün.',
  action: ['Meditasyonu başlat', '#/meditasyon'],
  q: { q: 'Meditasyonda dikkatin dağıldığını fark etmek…', o: ['Başarısızlıktır', 'Uygulamanın doğal bir parçasıdır', 'Meditasyonu bitirmek gerektiğini gösterir'], a: 1, e: 'Dikkatin dağıldığını fark edip nazikçe geri dönmek, meditasyonun çalıştırdığı asıl beceridir.' } },
{ n: 25, w: 4, title: 'Temel yoga akışı', min: 12,
  goal: 'Ayakta duruşları nefesle birbirine bağlayan bir akışı ezberden yapmak.',
  read: [['Savaşçı I', '#/poz/savasci-1'], ['Savaşçı II', '#/poz/savasci-2']],
  visual: { type: 'pose', id: 'savasci-1' },
  practice: 'Akış (her taraf 2 tur): Dağ → kollar yukarı → Aşağı Bakan Köpek → Savaşçı I → Savaşçı II → Aşağı Bakan Köpek → Çocuk. Bitirişte 2 dk Savasana. Bir duruş zorlarsa onu atla ya da kolaylaştırılmış alternatifini kullan.',
  q: { q: 'Akış sırasında nefes ve hareket arasında hangisi önde gelir?', o: ['Hareket', 'Nefes', 'Hız'], a: 1, e: 'Hareket nefese uydurulur; nefes yarışa çevrilmez.' } },
{ n: 26, w: 4, title: 'Denge ve beden farkındalığı', min: 10, tags: ['balance'],
  goal: 'Denge duruşlarında propriosepsiyona odaklanmak; beden taramasını pratiğe katmak.',
  read: [['Modül 2 › Doğru duruş ve beden farkındalığı', '#/modul/m2/durus'], ['Ağaç Duruşu', '#/poz/agac']],
  visual: { type: 'pose', id: 'agac' },
  practice: 'Dağ Duruşu’nda gözler kapalı 5 nefes (duvar yanında). Ağaç, her taraf 2 tur. Savaşçı II, her taraf 5 nefes. Sonunda 3 dakika beden taraması.',
  q: { q: 'Propriosepsiyon nedir?', o: ['Bedenin konumunu gözle bakmadan hissedebilme yetisi', 'Bir nefes tekniği', 'Bir yoga stili'], a: 0, e: 'Propriosepsiyon kas ve eklemlerden gelen konum bilgisidir; beden farkındalığının temelidir.' } },
{ n: 27, w: 4, title: 'Kendi yoga rutinini oluşturma', min: 15,
  goal: 'Isınma → ayakta → denge → yerde → gevşeme iskeletine göre kendi 10–15 dakikalık rutinini tasarlamak.',
  read: [['Modül 7 › Kendi rutinini kurmak', '#/modul/m7']],
  visual: { type: 'pose', id: 'savasana' },
  practice: 'Bir kâğıda kendi rutinini yaz: 1 nefes, 1 ısınma, 2 ayakta, 1 denge, 2 yerde duruş, Savasana. Her biri için süre belirle ve uygula.',
  q: { q: 'Önerilen rutin iskeletinde gevşeme (Savasana) nerede yer alır?', o: ['En başta', 'Ortada', 'En sonda'], a: 2, e: 'Rutinler nefesle başlar, gevşemeyle biter.' } },
{ n: 28, w: 4, title: '20 dakikalık yoga pratiği', min: 20,
  goal: 'Şimdiye kadarki en uzun seansı, nefesi koruyarak tamamlamak.',
  read: [['20 Dakikalık Tüm Vücut Yogası', '#/programlar/p20-tum']],
  visual: { type: 'program', id: 'p20-tum' },
  practice: '20 Dakikalık Tüm Vücut Yogası’nı yap. Yorulduğunda Çocuk Duruşu’na geçmekte özgürsün.',
  action: ['20 dakikalık seansı başlat', '#/programlar/p20-tum'],
  q: { q: 'Uzun bir seansta yorulduğunda en uygun seçenek hangisidir?', o: ['Çocuk Duruşu’nda dinlenmek', 'Nefesi tutup devam etmek', 'Daha zor bir duruşa geçmek'], a: 0, e: 'Çocuk Duruşu her an sığınabileceğin dinlenme duruşudur.' } },
{ n: 29, w: 4, title: 'Genel tekrar', min: 15, review: true,
  goal: 'Tüm modülleri gözden geçirmek, eksik bölümleri tamamlamak ve modül quizlerini tekrar çözmek.',
  read: [['Eğitim modülleri', '#/moduller'], ['Quiz ve Sınavlar', '#/quiz']],
  visual: { type: 'pose', id: 'kedi-inek' },
  practice: 'Okunmamış bölümlerini tamamla; %80 altında kalan quizleri tekrar çöz. Ardından en sevdiğin 10 dakikalık programı yap.',
  q: { q: 'Yoga tıbbi tedavinin yerine geçer mi?', o: ['Evet', 'Hayır', 'Sadece nefes teknikleri geçer'], a: 1, e: 'Yoga destekleyici bir uygulama olabilir; ancak tıbbi tanı ve tedavinin yerini tutmaz.' } },
{ n: 30, w: 4, title: 'Final değerlendirmesi ve kişisel gelişim raporu', min: 20, review: true, final: true,
  goal: '30 günlük yolculuğu final sınavıyla değerlendirmek ve kişisel gelişim raporunu oluşturmak.',
  read: [['Final sınavı', '#/quiz/final'], ['Kişisel gelişim raporu', '#/rapor']],
  visual: { type: 'pose', id: 'savasana' },
  practice: 'Final sınavını çöz ve kişisel gelişim raporunu incele. Kapanış olarak 5 dakika Savasana ya da meditasyon.',
  action: ['Final sınavına git', '#/quiz/final'],
  q: { q: '30 gün sonunda yoga pratiğini sürdürmenin en sürdürülebilir yolu hangisidir?', o: ['Haftada bir kez 2 saat', 'Kısa ama düzenli pratik', 'Sadece canın istediğinde, zorlayarak'], a: 1, e: 'Kısa ama düzenli pratik alışkanlığı korumanın en etkili yoludur.' } }
];

/* ==========================================================================
   Arayüz
   ========================================================================== */
const Daily = (() => {
  const h = (s) => App.h(s);

  function nextDay() {
    const st = Store.state;
    const d = YA.days.find(d => !st.days[d.n]);
    return d || null;
  }
  function lastCompleted() {
    const st = Store.state;
    const done = Object.entries(st.days).filter(([, v]) => v && v.done)
      .sort((a, b) => (b[1].ts || 0) - (a[1].ts || 0));
    if (!done.length) return null;
    return YA.days.find(d => d.n === Number(done[0][0]));
  }

  function dayCard(d) {
    const st = Store.state;
    const done = !!st.days[d.n];
    const next = nextDay();
    const isNext = next && next.n === d.n;
    return `<a class="day-tile ${done ? 'done' : ''} ${isNext ? 'next' : ''}" href="#/gun/${d.n}" aria-label="Gün ${d.n}: ${h(d.title)}${done ? ' – tamamlandı' : ''}">
      <span class="day-no">${done ? App.icon('check') : d.n}</span>
      <span class="day-title">${h(d.title)}</span>
      <span class="day-min">${App.icon('clock')} ${d.min} dk</span>
    </a>`;
  }

  function renderList(el) {
    const s = Progress.summary();
    const next = nextDay();
    el.innerHTML = `
      <section class="page-head">
        <p class="eyebrow">30 Günlük Program</p>
        <h1>30 günde sıfırdan güvenli yoga pratiğine</h1>
        <p class="lead">Her gün bir konu, bir öğrenme hedefi, kısa bir okuma, bir pratik ve bir değerlendirme sorusu. Günleri sırayla yapman önerilir; ancak istediğin güne geri dönebilirsin.</p>
      </section>
      <div class="card progress-card">
        <div class="pc-row">
          <div><strong>${s.daysDone}/30</strong> gün tamamlandı</div>
          <div class="muted">${s.daysDone === 30 ? 'Tebrikler! Programı tamamladın.' : next ? `Sıradaki: Gün ${next.n} – ${h(next.title)}` : ''}</div>
        </div>
        ${App.bar(s.daysDone / 30 * 100)}
        ${next ? `<a class="btn primary" href="#/gun/${next.n}">${App.icon('play')} Gün ${next.n}’e devam et</a>` : `<a class="btn primary" href="#/rapor">${App.icon('file-text')} Gelişim raporunu gör</a>`}
      </div>
      ${YA.weeks.map(w => {
        const days = YA.days.filter(d => d.w === w.no);
        const c = days.filter(d => Store.state.days[d.n]).length;
        return `<section class="week">
          <div class="week-head"><h2>Hafta ${w.no} – ${h(w.title)}</h2><span class="chip">${c}/${days.length}</span></div>
          <p class="muted">${h(w.desc)}</p>
          <div class="day-grid">${days.map(dayCard).join('')}</div>
        </section>`;
      }).join('')}`;
  }

  function visualHtml(v) {
    if (!v) return '';
    if (v.type === 'pose') {
      const p = App.poseById(v.id);
      return `<a class="visual-box" href="#/poz/${p.id}">${App.figure(p.fig)}<span>${h(p.tr)} <em>(${h(p.sa)})</em> – detaylı anlatım ${App.icon('arrow-right')}</span></a>`;
    }
    if (v.type === 'breath') {
      const b = YA.breaths.find(x => x.id === v.id);
      return `<a class="visual-box" href="#/nefes/${b.id}"><div class="breath-mini"><span></span></div><span>${h(b.title)} – adımlar ve rehber ${App.icon('arrow-right')}</span></a>`;
    }
    if (v.type === 'program') {
      const p = YA.programs.find(x => x.id === v.id);
      const poses = p.steps.filter(s => s.pose).slice(0, 5).map(s => App.poseById(s.pose));
      return `<a class="visual-box" href="#/programlar/${p.id}"><div class="fig-strip">${poses.map(x => App.figure(x.fig, { small: true })).join('')}</div><span>${h(p.title)} – hareket sırası ${App.icon('arrow-right')}</span></a>`;
    }
    if (v.type === 'ill') return `<figure class="visual-box"><img src="${v.src}" alt="${h(v.cap)}" loading="lazy" width="${/diaphragm/.test(v.src) ? 420 : 400}" height="${/diaphragm/.test(v.src) ? 240 : 300}"><figcaption>${h(v.cap)}</figcaption></figure>`;
    return '';
  }

  function renderDay(el, n) {
    const d = YA.days.find(x => x.n === n);
    if (!d) { App.notFound(el); return; }
    const st = Store.state;
    const rec = st.days[d.n];
    const w = YA.weeks[d.w - 1];
    const prev = YA.days.find(x => x.n === n - 1), nxt = YA.days.find(x => x.n === n + 1);
    const ans = rec && rec.answer != null ? rec.answer : (st.dayAnswers && st.dayAnswers[d.n]);
    el.innerHTML = `
      <nav class="crumbs"><a href="#/program">30 Günlük Program</a> › Hafta ${w.no} › Gün ${d.n}</nav>
      <section class="page-head">
        <p class="eyebrow">Gün ${d.n} · Hafta ${w.no}: ${h(w.title)}</p>
        <h1>${h(d.title)}</h1>
        <div class="meta-row"><span class="chip">${App.icon('clock')} Tahmini süre: ${d.min} dk</span>${rec ? `<span class="chip ok">${App.icon('check')} Tamamlandı · ${App.fmtDate(rec.date)}</span>` : ''}</div>
      </section>
      ${Viz.flow([
        { icon: 'book-open', title: 'Öğren', text: 'Eğitim içeriğini oku', state: rec ? 'done' : 'current' },
        { icon: 'image', title: 'İncele', text: 'Görseli ve adımları gözden geçir', state: rec ? 'done' : '' },
        { icon: 'activity', title: 'Uygula', text: d.min + ' dk pratik', state: rec ? 'done' : '' },
        { icon: 'circle-help', title: 'Değerlendir', text: 'Kısa soruyu yanıtla', state: ans != null ? 'done' : '' }
      ], { title: 'Bugünün akışı', label: 'Günlük görev aşamaları' })}
      <div class="day-layout">
        <div class="stack">
          <div class="card"><h3>${App.icon('target')} Öğrenme hedefi</h3><p>${h(d.goal)}</p></div>
          <div class="card"><h3>${App.icon('book-open')} Okunacak eğitim içeriği</h3>
            <ul class="link-list">${d.read.map(([l, r]) => `<li><a href="${r}">${App.icon('chevron-right')} ${h(l)}</a></li>`).join('')}</ul></div>
          <div class="card"><h3>${App.icon('activity')} Yapılacak pratik</h3><p>${h(d.practice)}</p>
            ${d.action ? `<a class="btn" href="${d.action[1]}">${App.icon('play')} ${h(d.action[0])}</a>` : ''}
          </div>
          <div class="card quiz-mini" id="dayq"><h3>${App.icon('circle-help')} Kısa değerlendirme sorusu</h3>
            <p class="q">${h(d.q.q)}</p>
            <div class="opts">${d.q.o.map((o, i) => `<button class="opt ${ans != null ? (i === d.q.a ? 'correct' : (i === ans ? 'wrong' : '')) : ''}" data-i="${i}" ${ans != null ? 'disabled' : ''}>${h(o)}</button>`).join('')}</div>
            <div class="feedback" aria-live="polite">${ans != null ? `<p class="${ans === d.q.a ? 'ok' : 'bad'}">${ans === d.q.a ? 'Doğru!' : 'Doğru cevap işaretlendi.'} ${h(d.q.e)}</p>` : ''}</div>
          </div>
        </div>
        <aside class="stack">
          <div class="card"><h3>${App.icon('image')} İncelenecek görsel</h3>${visualHtml(d.visual)}</div>
          <div class="card complete-card">
            ${rec ? `<p class="ok-big">${App.icon('circle-check')} Bu günü tamamladın.</p>
              <p class="muted">Kaydedilen pratik süresi: ${rec.minutes} dk</p>
              <button class="btn ghost small" id="undoDay">${App.icon('rotate-ccw')} İşareti kaldır</button>`
            : `<label class="field"><span>Bugünkü pratik süren (dk)</span><input type="number" id="dayMin" min="0" max="180" value="${d.min}" inputmode="numeric"></label>
              <p class="tiny muted">Zamanlayıcılı araçlarla (program, nefes, meditasyon) yaptığın pratikler ayrıca kaydedilir. Onları kullandıysan çift saymamak için burada 0 girebilirsin.</p>
              <button class="btn primary block" id="doneDay">${App.icon('check')} Tamamlandı</button>`}
          </div>
          <div class="callout warn small">${App.icon('triangle-alert')} Baş dönmesi, nefes darlığı veya ağrı hissedersen pratiği durdur.</div>
          <div class="pager">
            ${prev ? `<a class="btn ghost" href="#/gun/${prev.n}">${App.icon('arrow-left')} Gün ${prev.n}</a>` : '<span></span>'}
            ${nxt ? `<a class="btn ghost" href="#/gun/${nxt.n}">Gün ${nxt.n} ${App.icon('arrow-right')}</a>` : ''}
          </div>
        </aside>
      </div>`;

    el.querySelectorAll('#dayq .opt').forEach(b => b.addEventListener('click', () => {
      const i = Number(b.dataset.i);
      Store.update(s => { s.dayAnswers = s.dayAnswers || {}; s.dayAnswers[d.n] = i; if (s.days[d.n]) s.days[d.n].answer = i; });
      renderDay(el, n); App.refreshIcons();
    }));
    const doneBtn = el.querySelector('#doneDay');
    if (doneBtn) doneBtn.addEventListener('click', () => {
      const v = Math.max(0, Math.min(180, parseInt(el.querySelector('#dayMin').value, 10) || 0));
      Progress.completeDay(d.n, v);
      if (typeof Motion !== 'undefined') Motion.celebrate({ title: `Gün ${d.n} tamamlandı`, text: `${App.h(d.title)}${v ? ` · ${v} dk pratik kaydedildi.` : ''}`, fig: 'ayakta' });
      else App.toast(`Gün ${d.n} tamamlandı! ${v ? v + ' dk pratik kaydedildi.' : ''}`, 'ok');
      Progress.checkBadges();
      renderDay(el, n); App.refreshIcons(); App.updateChrome();
    });
    const undo = el.querySelector('#undoDay');
    if (undo) undo.addEventListener('click', () => {
      if (!confirm(`Gün ${d.n} için tamamlandı işaretini ve bu günle kaydedilen pratik süresini kaldırmak istiyor musun?`)) return;
      Progress.undoDay(d.n);
      renderDay(el, n); App.refreshIcons(); App.updateChrome();
    });
  }

  return { renderList, renderDay, nextDay, lastCompleted };
})();
