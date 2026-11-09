# Visual QA – İlk tarama raporu (9 Kasım 2026)

**Durum:** Yalnızca rapor. Siteye hiçbir düzeltme uygulanmadı; aşağıdaki öneriler onay bekliyor.
**Araç:** `qa/visual-qa.js` v1.0 (sayfa içi DOM ölçümü) · tarayıcı paneli · örnek kullanıcı verisiyle (tarama sonunda silindi).

## Özet

| Ölçüt | Değer |
|---|---|
| Kontrol edilen sayfa | 24 sayfa × 6 genişlik = **144 tarama** |
| Ekran genişlikleri | 375 · 390 · 768 · 1024 · 1440 · 1920 px |
| Kontrol edilen kart (toplam ölçüm) | 1.716 |
| Kontrol edilen görsel (toplam ölçüm) | 231 `<img>` + tüm satır içi SVG'ler |
| Yatay kaydırma | **0** |
| Kart örtüşmesi / ekran dışına taşma | **0** |
| Orantısız esneyen (bozuk oranlı) görsel | **0** |
| Aynı satırda yükseklik tutarsızlığı | **0** |
| Benzersiz bulgu | 13 (+ 1 yanlış alarm, denetim aracında düzeltildi) |

Tarama yapılan sayfalar: Ana sayfa, Başlangıç, Modüller, Modül 1 / 4 / 8, bir bölüm sayfası, Öğrenme Haritası, Pozlar,
bir poz sayfası, Nefes, Meditasyon, Programlar, bir program, 30 Gün, bir gün, Panel, Rapor, Quiz, bir quiz,
Rozetler, Kaynakça, Ayarlar, 404.

## Bulgular ve önerilen düzeltmeler (öncelik sırasıyla)

### 1. Görsel oranları — bozuk oran yok
| Bileşen | Beklenen | Mevcut | Durum |
|---|---|---|---|
| Kurs kartı illüstrasyonu `.cc-banner img` | 16/9 · contain | 16/9 kutu · contain | ✅ |
| Başlık illüstrasyonu `.band-ill` | 4/3 · contain | 400×300 öznitelik · fill (oran korunuyor) | ✅ — **öneri:** `aspect-ratio: 4/3; object-fit: contain` açıkça yazılsın |
| Video küçük resmi `.video-thumb img` | 16/9 · cover | 16/9 · cover | ⚠️ %33 kırpma: YouTube `hqdefault` 4:3 ve üst-alt siyah bant içerir; kırpılan kısım bu bantlar → **kabul edilebilir** |
| Ders şemaları `.lesson-ill/.visual-box/.infographic img` | doğal · contain | doğal · fill | ✅ — **öneri:** `object-fit: contain` açıkça yazılsın |
| 404 illüstrasyonu | 4/3 · contain | 300×225 · fill | ✅ |

**Öneri 1a** – Büyük ekranlarda (1440+ px) küçük resim 480 px ile düşük çözünürlüklü kalıyor → `sddefault.jpg` (640 px) kullan, yoksa `hqdefault`'a düş. *(js/app.js → videoBlock)*

### 2. Tutarsız kart ölçüleri — 7 farklı köşe yuvarlaklığı, 6 farklı iç boşluk
| Kart türü | Köşe | İç boşluk |
|---|---|---|
| `.card`, `.feature`, `.metric`, `.step-card`, `.pose-hero`, `.quiz-wrap` | 18 | 22 / 20 / 16 / 18 |
| `.an-card`, `.theme-card`, `.vz-kpi`, `.jn` | 16 | 16–18 / 0 / 14 / 16 |
| `.vz-node`, `.vz-branch` | 14 | 16 / 12×14 |
| `.day-tile`, `.mini-card` | 12 | 14 / 16 |
| `.course-card` | **6** | 0 (+ gövde 24×28) |

**Öneri 2** – Ortak kart standartları (yeni CSS değişkenleri, `css/style.css`):
`--card-radius: 18px` (ana kartlar) · `--card-radius-sm: 14px` (iç/küçük kartlar) · `--card-pad: 22px` · `--card-pad-sm: 16px`.
- Ana kartlar (18 / 22): `.card`, `.feature` (20→22), `.step-card` (18→22), `.course-card` (6→18), `.pose-hero`, `.quiz-wrap`
- İç kartlar (14 / 16): `.metric`, `.vz-kpi` (14→16), `.an-card` (16→14, 16×18→16), `.theme-card` (16→14), `.jn` (16→14), `.vz-node`, `.vz-branch` (12×14→16), `.day-tile` (12→14, 14→16), `.mini-card` (12→14)
- Mobilde mevcut 18/16 px kuralı korunur. Renk, yazı tipi ve düzen değişmez.

### 3. Görsel/içerik taşmaları — 1 gerçek sorun
- **Modül 8 › Anatomik karşılaştırma tablosu** (`#anCmp .an-cmp-table`, `js/anatomy.js` + `css/visuals.css`): 375 px'te kartın yanından **11 px taşıyor**.
  **Öneri 3:** tabloyu yatay kaydırılabilir bir sarmalayıcıya al (`.table-scroll { overflow-x: auto }`) ve hücrelerde `overflow-wrap: anywhere` kullan.

### 4. Grid ve kolon düzenleri — sorun yok
Hiçbir genişlikte kart örtüşmesi, kolon kırılması ya da yatay kaydırma tespit edilmedi.

### 5. Metin taşmaları — 2 sorun
- **Poz kartlarında Sanskritçe ad** (`.pose-card .sa`, ör. *Marjaryasana-Bitilasana*, *Utthita Parsvakonasana*): 390 px'te **23 px taşıyor**.
  **Öneri 5a:** `.sa { overflow-wrap: anywhere; hyphens: auto; }`
- **Panel › Tamamlanan eğitimler** (`.vz-modules a`): 375–390 px'te modül adları üç noktayla kısaltılıyor (ör. "M4 · Temel Yoga Pozisyonları (As…").
  **Öneri 5b:** tek satır yerine en fazla 2 satır (`-webkit-line-clamp: 2`).

### 6. Boşluk ve hizalama
Öneri 2'deki iç boşluk standardı bu maddeyi de kapsar. Kart başlık/açıklama hizasında sapma ölçülmedi.

### 7. Mobil uyumluluk
Yatay kaydırma yok; 36 px'ten küçük dokunma hedefi bulunmadı.

### Ek – Yükleme sırasında düzen kayması (CLS), düşük öncelik
6 görsel türünde `width/height` öznitelikleri yok: kurs kartı illüstrasyonları, video küçük resimleri, ders şemaları,
günlük görev görseli, nefes infografiği. **Öneri E:** doğal ölçüleri öznitelik olarak ekle (`js/app.js`, `js/daily-tasks.js`).

## Otomatik düzeltilebilir / manuel
| Öneri | Tür | Otomatik? |
|---|---|---|
| 1 (oran kurallarını açık yazmak), 1a (video küçük resmi) | CSS + 1 satır JS | ✅ |
| 2 (kart standartları) | CSS değişkenleri | ✅ (görsel fark küçük; önce/sonra görüntüsüyle onay önerilir) |
| 3 (tablo taşması) | CSS + 1 sarmalayıcı | ✅ |
| 5a, 5b (metin taşmaları) | CSS | ✅ |
| E (width/height) | JS şablonları | ✅ |
| Manuel karar gerektiren | Kurs kartının 6 px köşesi bilinçli bir tasarım tercihiyse korunabilir | ❓ |

## Yanlış alarm (denetim aracında düzeltildi)
`td.st > span.sr` — ekran okuyucular için bilerek 1 px'e sıkıştırılmış metin "taşma" sayılmıştı. `qa/visual-qa.js`
artık `.sr`, `.sr-only`, `.visually-hidden` öğelerini atlıyor.
