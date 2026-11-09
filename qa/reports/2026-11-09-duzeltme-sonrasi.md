# Visual QA – Düzeltme sonrası tarama (9 Kasım 2026)

Uygulanan öneriler: 1, 1a, 2, 3, 5a, 5b, 6, E (bkz. `2026-11-09-ilk-tarama.md`). Yeniden tarama 375 ve 1440 px'te
24 sayfa üzerinde yapıldı (tarayıcı paneli, örnek veriyle).

| Ölçüt | Önce | Sonra |
|---|---|---|
| Yatay kaydırma / örtüşme / bozuk oranlı görsel | 0 | 0 |
| Kart dışına taşan içerik (anatomik karşılaştırma tablosu) | 7 öğe | **0** |
| Metin taşması (Sanskritçe adlar, panel modül adları) | 2 | **0** |
| Eksik `width/height` öznitelikli görsel türü | 6 | **0** |
| Kart köşe yuvarlaklığı değerleri | 7 farklı (6–18 px) | **2 standart** (18 / 14 px; mobilde 16 px) |
| Kart iç boşluk değerleri | 6 farklı | **2 standart** (22 / 16 px) |
| Video küçük resmi çözünürlüğü | 480 px | 640 px (yoksa 480 px'e düşer) |

## Kalan, kabul edilen notlar
- **Video küçük resmi kırpması (16:9 · cover):** YouTube küçük resimleri 4:3 ve üst-alt siyah bantlıdır; kırpılan kısım bu bantlardır. Denetim aracında “kabul edilmiş kırpma” olarak işaretlendi.
- **Video küçük resmi çözünürlüğü (düşük önem):** Yüksek yoğunluklu (retina) ekranlarda 640 px küçük resim kart genişliğinin biraz altında kalır. YouTube'un 1280 px sürümü her videoda bulunmadığı için bu sınır kabul edildi.

## Değiştirilen dosyalar
`css/visuals.css` (kart standartları, oran kuralları, taşma düzeltmeleri) · `js/app.js` (görsel boyut öznitelikleri,
640 px video küçük resmi) · `js/daily-tasks.js` (görsel boyut öznitelikleri) · `js/anatomy.js` (tablo sarmalayıcısı)
· `qa/visual-qa.js` (yanlış alarm ve kabul edilmiş kırpma kuralı).
