# Yoga Akademisi – Başlangıçtan Orta Seviyeye

Tamamen Türkçe, interaktif ve backend gerektirmeyen bir yoga eğitim platformu. Kullanıcıyı sıfırdan başlatıp
30 günlük programla güvenli bir yoga alışkanlığı kazandırmayı, öğrenme ve pratik gelişimini ölçmeyi hedefler.
GitHub Pages üzerinde ücretsiz yayınlanacak şekilde yapılandırılmıştır.

> **Önemli:** Bu platform eğitim amaçlıdır ve tıbbi tavsiye ya da tedavinin yerine geçmez.

## Özellikler

| Bölüm | İçerik |
|-------|--------|
| Ana Sayfa | Hoş geldin alanı, günlük görev kartı, öğrenme yüzdesi, son tamamlanan görev, devam et butonu, günlük motivasyon |
| Yoga'ya Başlangıç | Profil (ad, günlük hedef), sağlık kontrol listesi, güvenli pratik kuralları |
| Eğitim Modülleri | 7 modül, bölüm bölüm “Okudum” takibi, her modülde kaynakça ve sınav |
| Yoga Pozisyonları | 12 başlangıç + 6 orta seviye pozisyon (çizim, kaslar, adımlar, hizalama, nefes, hatalar, alternatif, uyarılar), 5 ileri seviye bilgi kartı |
| Nefes Teknikleri | 6 teknik + animasyonlu nefes rehberi (zamanlayıcı, isteğe bağlı bekleme süresi) |
| Videolu gösterim | 18 pozun tamamı, 5 nefes tekniği ve masa başı programı için seçilmiş YouTube videoları; her yerde Türkçe video arama bağlantısı |
| Meditasyon | Rehberli, zilli meditasyon zamanlayıcısı (nefes odağı, beden taraması, farkındalık) |
| Yoga Programları | 7 hazır program, adım/dinlenme süreleri, tam ekran zamanlayıcılı oynatıcı |
| 30 Günlük Program | 4 hafta × günlük görev: konu, hedef, okuma, görsel, pratik, süre, tamamlandı butonu, değerlendirme sorusu |
| Gelişim Paneli | 8 metrik, 5 Chart.js grafiği, 1–5 öz-değerlendirme, JSON dışa/içe aktarma, kişisel gelişim raporu |
| Quiz ve Sınavlar | 7 modül sınavı + 15 soruluk final; anında geri bildirim, açıklama, başarı yüzdesi, tekrar çözme |
| Başarı Rozetleri | 10 görsel rozet, otomatik kazanım ve ilerleme çubukları |
| Kaynakça | NCCIH, NHS, Harvard Health, Cleveland Clinic, Yoga Journal, Yoga Alliance, IAYT bağlantıları; görsel lisansları |

## Dosya yapısı

```
yoga-academy/
├── index.html            # Tek sayfa uygulama kabuğu (hash yönlendirme)
├── .nojekyll             # GitHub Pages’in Jekyll işlemesini kapatır
├── css/
│   ├── style.css         # Tasarım sistemi ve bileşenler
│   ├── visuals.css       # İnfografik ve harita bileşenleri
│   └── responsive.css    # Tablet ve mobil düzen
├── js/
│   ├── theme.js          # 10 renk teması, kontrast hesaplı tema motoru
│   ├── visuals.js        # görsel anlatım bileşenleri, öğrenme haritası, görsel rapor
│   ├── storage.js        # localStorage, JSON dışa/içe aktarma
│   ├── yoga-content.js   # Modüller, kaynaklar, nefes, pozlar, programlar, meditasyon
│   ├── progress.js       # Metrikler, seri (streak), rozet kuralları
│   ├── daily-tasks.js    # 30 günlük plan verisi ve sayfaları
│   ├── quiz.js           # Sınav verisi ve sınav motoru
│   ├── dashboard.js      # Gelişim paneli, grafikler, rapor
│   └── app.js            # Yönlendirme, ortak bileşenler, sayfalar, zamanlayıcılar
└── assets/
    ├── icons/            # logo.svg, ya-icons.svg (25 özgün ikonluk sprite)
    ├── illustrations/    # 13 sayfa illüstrasyonu + spine.svg, diaphragm.svg
    └── images/           # CREDITS.md (isteğe bağlı fotoğraflar için)
```

Pozisyon çizimleri `yoga-content.js` içindeki eklem koordinatlarından SVG olarak üretilir; tüm görseller yereldir.

## Görsel anlatım sistemi

Uzun metinleri görerek anlaşılır hâle getiren, SVG ve CSS ile çizilen bileşenler (`js/visuals.js`, `css/visuals.css`).
Hepsi tema renklerini kullanır, animasyon içermez ve metin alternatifiyle birlikte gelir.

| Bileşen | Kullanıldığı yer |
|---------|------------------|
| Akış / süreç | Poz aşamaları, beden taraması, hizalama noktaları, günlük görev akışı |
| Zihin haritası | Modül konu haritaları, yoganın bileşenleri, kalça, core, nefes haritası |
| Döngü halkası | Nefes ritimleri (sürelerle), meditasyonun dikkat döngüsü |
| Basamaklar | Sekiz basamak (geleneksel çerçeve) |
| Venn | Yoga ve meditasyon, dengeyi sağlayan üç sistem |
| Dağılım | Yoga stilleri: tempo × yoğunluk |
| Zaman çizelgesi | Yoganın tarihçesi |
| Karşılaştırma | Fiziksel/zihinsel, statik/dinamik esneme, yanlış/doğru, hata/alternatif |
| Segment çubuğu | Omurga bölümleri, program zaman şeridi |
| Vücut haritası | Pozların çalıştırdığı kas bölgeleri (ön/arka) |
| Isı haritası, halka, sütun | Gelişim paneli ve rapor |

- **Poz sayfaları:** başlangıç pozisyonu, nefes işaretli (al/ver) uygulama aşamaları, hizalama kontrol noktaları,
  vücut haritası, “hata → alternatif” karşılaştırması ve güvenlik uyarıları görsel kartlar olarak sunulur.
- **Öğrenme Haritası (`#/harita`):** öğrenme yolculuğu (ilerlemene göre), yoga türleri, felsefe ve kavramlar,
  etkileşimli anatomi haritası, nefes teknikleri ve pozlar arası geçiş diyagramı. Geçiş diyagramı hazır
  programlardaki gerçek hareket sırasından hesaplanır.
- **Gelişim paneli ve rapor:** 30/60/90 günlük görsel rapor; günlük çalışma ısı haritası, haftalık gelişim,
  hedef/görev/eğitim tamamlama halkaları, seri şeridi, öğrenilen pozlar ve modül ilerlemesi. Tüm değerler
  tarayıcıdaki gerçek kullanıcı verisinden hesaplanır.
- Yeni bir bölüm görseli eklemek için `Viz.SECTION` nesnesine `'modülId/bölümId': () => Viz.flow([...])` gibi bir kayıt eklemek yeterlidir.

## Renk temaları

**Ayarlar → Görünüm ve Tema** bölümünden (üst bardaki palet simgesi ya da Menü → Ayarlar) 10 tema arasında geçiş yapılır:
Sage Serenity (varsayılan), Warm Zen, Lavender Mind, Earth & Soul, Ocean Balance, Botanical Green, Blush Harmony,
Deep Nature, Sunset Energy, Modern Minimal.

- Temalar `js/theme.js` içinde 5 temel renkle (background, primary, secondary, accent, text) tanımlıdır. Motor bunlardan
  `--color-surface`, `--color-border`, `--color-muted`, `--color-success/-warning/-danger`, `--color-button-text`,
  `--color-cta` gibi tüm değişkenleri **kontrast hedeflerini (metin ≥ 4.5:1, gövde metni ≥ 7:1) sağlayarak** üretir.
- Renk rolleri: açık yüzeyler ~%60 · marka rengi (üst bar, menü, başlık bantları) ~%25 · ikincil yüzeyler ~%10 ·
  vurgu (ana butonlar, ilerleme çubukları, seçili öğeler) ~%5.
- `theme.js` `<head>` içinde senkron yüklenir; seçili tema ilk boyamadan önce uygulanır (renk “yanıp sönmesi” olmaz).
- Seçim `localStorage` içinde `yogaAkademisi.theme` anahtarıyla ve JSON yedeğindeki profilde saklanır.
- Gelişim grafikleri renklerini aktif temadan alır; seriler birbirinden ayırt edilebilir olacak şekilde seçilir.
- Yeni tema eklemek için `THEMES` dizisine 5 renkli bir kayıt eklemek yeterlidir.

## Arayüz düzeni (kurs yapısı)

Arayüz, çevrim içi kurs platformlarında yaygın olan sade bir “kurs” düzenini izler (Elements of AI’ın kullanıcı deneyiminden esinlenilmiştir; metin, görsel, renk ve yazı tipi alınmamıştır):

- **Üst bar + tam ekran menü:** Solda logo, sağda “Menü” düğmesi; kalıcı kenar menü yoktur. Menü tüm sayfaların listesini büyük bağlantılarla açar.
- **Konum çubuğu:** Üst barın altında `Ana Sayfa › Eğitim Modülleri › Modül 1 › Bölüm` biçiminde konum gösterilir.
- **Tam genişlik renkli bantlar:** Her sayfa ortalanmış büyük başlık, kısa açıklama ve illüstrasyonla açılır.
- **Kurs özeti → modül → bölüm:** Modül kartlarında illüstrasyonlu üst alan ve “Bölüm / Durum” tablosu; modül sayfasında Roma rakamlı bölüm listesi; her bölüm ayrı bir okuma sayfasıdır (`#/modul/m1/nedir`). Sayfanın sonundaki “Okudum, sonraki bölüm” düğmesi ilerlemeyi kaydedip sonraki bölüme, son bölümde modül sınavına geçirir.
- **Okuma sütunu:** Ders metinleri yaklaşık 760 px genişliğinde, büyük satır aralığıyla gösterilir.

## Görsel dil: özgün ikonlar ve illüstrasyonlar

svgs.app’teki “Minimal Outline Accent” yaklaşımından esinlenen, bu proje için sıfırdan çizilmiş bir set kullanılır:
koyu, yuvarlak uçlu konturlar + tek vurgu rengi (adaçayı yeşili), kesik çizgiler ve küçük süs işaretleri.

- **Sayfa illüstrasyonları** (`assets/illustrations/`): `hero` (ana sayfa), `baslangic`, `moduller`, `pozlar`, `nefes`,
  `meditasyon`, `program` (30 gün), `panel`, `quiz`, `rozetler`, `kaynakca`, `programlar`, `kayip` (404). Her sayfanın
  başlık kartına otomatik eklenir (`app.js` → `HEAD_ILL`).
- **İkon seti** (`assets/icons/ya-icons.svg`): menü (11), modüller (7) ve rozetler (10) için 25 sembol. Sayfa açılırken
  bir kez yüklenip `App` içindeki `yi('ikon-adi')` yardımcısıyla kullanılır. Kontur rengi `color`, vurgu rengi
  `--ic-accent` CSS değişkeniyle değiştirilebilir.
- Oklar, onay işaretleri gibi küçük arayüz ikonları için Lucide kullanılmaya devam eder.
- İkon seti `fetch` ile yüklendiği için siteyi `file://` ile değil, yerel sunucu ya da GitHub Pages üzerinden aç.

## Yerelde çalıştırma

Tarayıcılar `file://` üzerinden bazı özellikleri kısıtlayabileceği için basit bir yerel sunucu önerilir:

```bash
cd yoga-academy
```

```bash
python3 -m http.server 8000
```

Ardından tarayıcıda `http://localhost:8000` adresini aç.

## GitHub Pages ile yayınlama

1. GitHub’da yeni bir depo oluştur (ör. `yoga-academy`).
2. Bu klasörün **içeriğini** deponun köküne yükle:

```bash
git init
```

```bash
git add . && git commit -m "Yoga Akademisi ilk sürüm"
```

```bash
git branch -M main && git remote add origin https://github.com/KULLANICI_ADIN/yoga-academy.git && git push -u origin main
```

3. Depoda **Settings → Pages** bölümüne git.
4. **Source:** “Deploy from a branch”, **Branch:** `main`, **Folder:** `/ (root)` seç ve kaydet.
5. Birkaç dakika sonra site `https://KULLANICI_ADIN.github.io/yoga-academy/` adresinde yayında olur.

Tüm dosya yolları göreli (`css/…`, `js/…`, `assets/…`) olduğundan alt klasör adresinde sorunsuz çalışır.
Yönlendirme `#/` tabanlı olduğu için sayfa yenilemede 404 hatası oluşmaz.

## Veri saklama

- Tüm ilerleme (görevler, pratik süreleri, okunan bölümler, sınav puanları, öz-değerlendirmeler, rozetler)
  tarayıcının **localStorage** alanında `yogaAkademisi.v1` anahtarıyla saklanır.
- **Veriler cihazlar ve tarayıcılar arasında otomatik senkronize olmaz.** Tarayıcı verileri temizlenirse kaybolabilir.
- Gelişim Paneli → “JSON olarak dışa aktar” ile yedek alınır, “JSON yedeğini içe aktar” ile başka bir tarayıcıya taşınır.

## Ölçüm yaklaşımı

- **Öğrenme ilerlemesi** = %50 tamamlanan günlük görevler + %30 okunan modül bölümleri + %20 %80 üzeri geçilen sınavlar.
- **Seri (streak):** pratik kaydı olan ardışık takvim günleri (bugün henüz pratik yoksa dünden geriye sayılır).
- **Günlük hedef oranı:** son 7 günde günlük hedef dakikasına ulaşılan günlerin oranı.
- **Fiziksel gelişim:** yalnızca kullanıcının 1–5 arası öz-değerlendirmesidir; tıbbi/objektif ölçüm iddiası yoktur.
- Başarı puanları fiziksel yeteneği değil, içerik anlama ve görev tamamlamayı ölçer.

## Videolar

- Videolar `js/yoga-content.js` içindeki `YA.videos` listesinde tanımlıdır (anahtar: poz kimliği, `nefes-<teknik>` ya da `program-<id>`).
- Pozların çoğu **Yoga With Adriene – Foundations of Yoga** serisinden; nefes için NewYork-Presbyterian Hospital, Cleveland Clinic ve bir fizyoterapist kanalı kullanıldı.
- Tüm videoların gömülebilirliği Kasım 2026’da YouTube oEmbed ile doğrulandı. Bir video kaldırılırsa yalnızca o kartta YouTube hatası görünür; `id` değerini değiştirmen yeterlidir.
- Videolar İngilizcedir; oynatıcı Türkçe altyazı tercihiyle açılır (YouTube otomatik çevirisi). Ayrıca her kartta “YouTube’da Türkçe video ara” bağlantısı vardır.
- Oynatıcı yalnızca tıklandığında, `youtube-nocookie.com` alanından yüklenir; sayfa açılışında YouTube’a istek gitmez (küçük resim hariç).

## Kullanılan kütüphaneler

| Kütüphane | Sürüm | Lisans | Kaynak |
|-----------|-------|--------|--------|
| Chart.js | 4.4.1 | MIT | cdn.jsdelivr.net |
| Lucide Icons | 0.468.0 | ISC | unpkg.com |
| Fraunces, Nunito Sans | – | SIL OFL | Google Fonts |

CDN’lere erişilemezse uygulama çalışmaya devam eder: ikonlar görünmez, grafik alanında uyarı gösterilir.
Tamamen çevrimdışı kullanım istersen iki kütüphaneyi `js/vendor/` altına indirip `index.html` içindeki adresleri güncelleyebilirsin.

## İçerik ve kaynak ilkeleri

- İçerikler NCCIH, NHS, Harvard Health Publishing, Cleveland Clinic, Yoga Journal, Yoga Alliance ve IAYT
  kaynaklarından yararlanılarak **özgün Türkçe** anlatımla yazılmıştır; doğrudan kopya içermez.
- Geleneksel felsefe (“Geleneksel görüş”) ile bilimsel bulgular (“Bilimsel çerçeve”) ayrı kutularda sunulur.
- Kaynak bağlantıları Kasım 2026’da kontrol edilmiştir. Kurumların sayfaları zamanla değişebilir.
- Nefes tutma ve yoğun nefes teknikleri zorunlu değildir; ileri seviye pozisyonlar yalnızca bilgi amaçlıdır.

## İçerik güncelleme

- Yeni pozisyon: `js/yoga-content.js` → `YA.poses` dizisine aynı şablonla bir nesne ekle (`fig` koordinatları 200×200 alanda).
- Yeni program: `YA.programs` dizisine adımları (`{ pose, s }`, `{ rest: true, s }` veya `{ name, cue, fig, s }`) ekle.
- Yeni soru: `js/quiz.js` → ilgili sınavın `qs` dizisine ekle.
- Gün içeriği: `js/daily-tasks.js` → `YA.days`.

## Test kontrol listesi

- [ ] Mobil (375 px), tablet (768 px) ve masaüstü görünümleri
- [ ] Menü bağlantıları ve hash yönlendirme, tarayıcı geri/ileri
- [ ] Gün tamamlama / geri alma, ilerleme yüzdesi
- [ ] Panel grafikleri ve öz-değerlendirme kaydı
- [ ] Rozet kazanımı (ör. ilk görev → “İlk Adım”)
- [ ] Quiz: geri bildirim, sonuç, tekrar çözme
- [ ] JSON dışa aktar → sıfırla → içe aktar
- [ ] Tarayıcı konsolunda hata olmaması
