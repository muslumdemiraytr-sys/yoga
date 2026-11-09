# Visual QA raporu – once

| Ölçüt | Değer |
|---|---|
| Kontrol edilen sayfa | 24 × 6 genişlik = 144 tarama |
| Kart / görsel ölçümü | 1716 / 240 |
| Bulgular (yüksek / orta / düşük) | 0 / 8 / 10 |
| JavaScript hatası | 0 |
| Ekran görüntüleri | qa/screenshots/once/ |

## Bulgular

| Önem | Tür | Bileşen | Seçici | Ayrıntı | Genişlik | Sayfalar |
|---|---|---|---|---|---|---|
| düşük | boyut-ozniteligi-yok | course-card | `div.course-grid > article.course-card > a.cc-banner.tone-1 > img` | width/height öznitelikleri yok; yüklenirken düzen kayabilir (CLS) | 375, 390, 768, 1024, 1440, 1920 | #/ #/moduller |
| düşük | boyut-ozniteligi-yok | course-card | `div.course-grid > article.course-card > a.cc-banner.tone-2 > img` | width/height öznitelikleri yok; yüklenirken düzen kayabilir (CLS) | 375, 390, 768, 1024, 1440, 1920 | #/ #/moduller |
| düşük | boyut-ozniteligi-yok | course-card | `div.course-grid > article.course-card > a.cc-banner.tone-3 > img` | width/height öznitelikleri yok; yüklenirken düzen kayabilir (CLS) | 375, 390, 768, 1024, 1440, 1920 | #/moduller |
| düşük | boyut-ozniteligi-yok | course-card | `div.course-grid > article.course-card > a.cc-banner.tone-4 > img` | width/height öznitelikleri yok; yüklenirken düzen kayabilir (CLS) | 375, 390, 768, 1024, 1440, 1920 | #/moduller |
| orta | kart-icerik-tasmasi | card | `#anCmp > table.table.an-cmp-table` | İçerik kartın yanından 11px taşıyor | 375 | #/modul/m8 |
| orta | kart-icerik-tasmasi | card | `#anCmp > table.table.an-cmp-table > thead` | İçerik kartın yanından 11px taşıyor | 375 | #/modul/m8 |
| orta | kart-icerik-tasmasi | card | `#anCmp > table.table.an-cmp-table > thead > tr` | İçerik kartın yanından 11px taşıyor | 375 | #/modul/m8 |
| orta | kart-icerik-tasmasi | card | `table.table.an-cmp-table > thead > tr > th` | İçerik kartın yanından 11px taşıyor | 375 | #/modul/m8 |
| orta | kart-icerik-tasmasi | card | `#anCmp > table.table.an-cmp-table > tbody` | İçerik kartın yanından 11px taşıyor | 375 | #/modul/m8 |
| orta | kart-icerik-tasmasi | card | `#anCmp > table.table.an-cmp-table > tbody > tr` | İçerik kartın yanından 11px taşıyor | 375 | #/modul/m8 |
| orta | kart-icerik-tasmasi | card | `table.table.an-cmp-table > tbody > tr > td` | İçerik kartın yanından 11px taşıyor | 375 | #/modul/m8 |
| düşük | boyut-ozniteligi-yok | video-card | `div.card.video-card > div.video-wrap > button.video-thumb > img` | width/height öznitelikleri yok; yüklenirken düzen kayabilir (CLS) | 375, 390, 768, 1024, 1440, 1920 | #/poz/savasci-2 |
| düşük | boyut-ozniteligi-yok | breath-card | `div.bc-grid > div > figure.infographic > img` | width/height öznitelikleri yok; yüklenirken düzen kayabilir (CLS) | 375, 390, 768, 1024, 1440, 1920 | #/nefes |
| düşük | boyut-ozniteligi-yok | breath-card | `div > div.video-wrap > button.video-thumb > img` | width/height öznitelikleri yok; yüklenirken düzen kayabilir (CLS) | 375, 390, 768, 1024, 1440, 1920 | #/nefes |
| düşük | boyut-ozniteligi-yok | card | `aside.stack > div.card > figure.visual-box > img` | width/height öznitelikleri yok; yüklenirken düzen kayabilir (CLS) | 375, 390, 768, 1024, 1440, 1920 | #/gun/3 |
| düşük | metin-tasmasi | card | `section.card > ul.vz-modules > li > a` | Metin 17px sığmıyor (üç noktayla kısaltılıyor) | 375, 390 | #/panel #/rapor |
| orta | metin-tasmasi | pose-card | `#poseGrid > a.card.pose-card > div.pc-body > p.sa` | Metin 23px sığmıyor | 390 | #/pozlar |
| düşük | dusuk-cozunurluk | video-card | `div.card.video-card > div.video-wrap > button.video-thumb > img` | Görsel çözünürlüğü (480px) gösterim boyutuna göre düşük | 768, 1024, 1440, 1920 | #/poz/savasci-2 |