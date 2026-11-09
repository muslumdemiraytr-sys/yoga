# Visual QA – Önce / sonra karşılaştırması (Playwright, 9 Kasım 2026)

Her iki tarama da Playwright ile, aynı denetim motoruyla (`qa/visual-qa.js`), 24 sayfa × 6 genişlikte ve örnek
kullanıcı verisiyle yapıldı. **Önce:** düzeltmelerden önceki sürüm (commit `92d9aff`). **Sonra:** güncel sürüm.

| Ölçüt | Önce | Sonra |
|---|---|---|
| Kontrol edilen sayfa / tarama | 24 / 144 | 24 / 144 |
| Kart / görsel ölçümü | 1.716 / 240 | 1.716 / 240 |
| Yüksek önemli bulgu | 0 | 0 |
| Orta önemli bulgu | **8** | **0** |
| Düşük önemli bulgu | **10** | **0** |
| JavaScript hatası | 0 | 0 |
| Ekran görüntüsü | 144 (`qa/screenshots/once/`) | 144 (`qa/screenshots/sonra/`) |

## Düzeltme öncesi bulgular (hepsi giderildi)
| Önem | Tür | Bileşen | Genişlik |
|---|---|---|---|
| orta ×7 | Kart dışına taşan içerik – anatomik karşılaştırma tablosu (11 px) | `#anCmp .an-cmp-table` | 375 |
| orta | Metin taşması – Sanskritçe ad (23 px) | `.pose-card .sa` | 390 |
| düşük ×7 | Eksik `width/height` (yükleme sırasında düzen kayması) | kurs kartı görselleri, video küçük resimleri, nefes infografiği, günlük görev görseli | tümü |
| düşük | Modül adı üç noktayla kısaltılıyor | `.vz-modules a` | 375, 390 |
| düşük | Video küçük resmi düşük çözünürlüklü (480 px) | `.video-thumb img` | 768–1920 |

Kart köşe/iç boşluk standardizasyonu (7 → 2 değer) bulgu sayısına yansımaz; `2026-11-09-duzeltme-sonrasi.md` dosyasında ölçülmüştür.

## Görüntüleri karşılaştırma
`qa/compare.html` sayfası önce/sonra ekran görüntülerini genişlik ve sayfa seçerek yan yana gösterir
(yerel sunucuyla açılmalıdır, ör. `python3 -m http.server` → `http://localhost:8000/qa/compare.html`).

## Görsel regresyon
`npm run qa:baseline` ile güncel sürümün 144 referans görüntüsü `qa/baseline/` altına kaydedildi;
`npm run qa:regression` sonraki değişiklikleri bu referanslarla karşılaştırır (izin verilen fark: piksellerin %1'i).
