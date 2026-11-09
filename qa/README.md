# Visual QA Agent

Sitedeki kartların, görsellerin ve duyarlı düzenin **boyut, oran, hizalama ve taşma** açısından denetlenmesi için
tekrar kullanılabilir araçlar.

| Dosya | Görevi |
|---|---|
| `visual-qa.js` | Sayfa içi denetim motoru (`VisualQA.audit / scan / summarize`). Hiçbir şeyi değiştirmez, yalnızca ölçer. |
| `routes.json` | Taranacak sayfalar ve ekran genişlikleri (375, 390, 768, 1024, 1440, 1920). Yeni sayfa eklenince buraya ekle. |
| `run-visual-qa.mjs` | Playwright çalıştırıcısı: tüm sayfa × genişlikleri tarar, ekran görüntüsü + JSON/Markdown rapor üretir. |
| `visual.spec.mjs`, `playwright.config.mjs` | Görsel regresyon testleri (referans ekran görüntüleriyle karşılaştırma). |
| `serve.mjs` | Bağımlılıksız yerel statik sunucu. |
| `reports/` | Tarama raporları. |
| `compare.html` | Önce/sonra ekran görüntülerini genişlik ve sayfa seçerek yan yana gösterir. |

## Ne zaman çalıştırılır?
Yeni sayfa ya da kart eklendiğinde, yeni görsel yüklendiğinde, tasarım güncellendiğinde ve **yayına almadan önce**.

## Kurulum (bir kez)
```bash
npm install
```
```bash
npx playwright install chromium-headless-shell
```
`@playwright/test` **1.65.0** kullanılır (Node.js 26 ile uyumlu; 1.49 sürümü Node 26'da test listesini çıkarırken takılıyordu).
Playwright'ın tarayıcısı indirilemiyorsa kurulu bir Chromium/headless shell yolu verilebilir:
`PW_CHROMIUM_PATH=/yol/chrome-headless-shell npm run qa`

## Kullanım
```bash
npm run qa -- --label=once
```
Düzeltmelerden sonra:
```bash
npm run qa -- --label=sonra
```
Ekran görüntüleri `qa/screenshots/once/` ve `qa/screenshots/sonra/` altında genişlik/sayfa adıyla yan yana durur;
raporlar `qa/reports/` altına yazılır. Yüksek önemli bulgu ya da JavaScript hatası varsa komut **1** koduyla biter
(yayın öncesi kontrol olarak kullanılabilir).

Görsel regresyon (referanslar işletim sistemine özgüdür ve `qa/baseline/` altında yerelde tutulur; git'e eklenmez):
```bash
npm run qa:baseline
```
```bash
npm run qa:regression
```

## Kurulumsuz hızlı kontrol
Site açıkken tarayıcı konsoluna `qa/visual-qa.js` içeriğini yapıştır, sonra:
```js
VisualQA.summarize(await VisualQA.scan(['#/', '#/pozlar', '#/panel']))
```

## Denetlenen kurallar
- Yatay kaydırma, ekran dışına taşan öğeler, üst üste binen kartlar
- Görsel oranları (`object-fit: fill` iken doğal orandan sapma), olası kırpma, düşük çözünürlük, eksik `width/height`
- Kart dışına taşan içerik, aynı satırdaki kartların yükseklik farkı, aynı gruptaki kartlarda köşe tutarsızlığı
- Metin taşmaları (ekran okuyucuya özel `.sr` metinleri hariç), mobilde 36 px'ten küçük dokunma hedefleri

## Tasarım standartları (css/visuals.css)
| Öğe | Değer |
|---|---|
| Ana kart köşe / iç boşluk | `--card-radius: 18px` / `--card-pad: 22px` (mobilde 16 px köşe, 18×16 boşluk) |
| İç kart köşe / iç boşluk | `--card-radius-sm: 14px` / `--card-pad-sm: 16px` |
| Kurs kartı görseli | 16/9 · `contain` |
| Başlık illüstrasyonu | 4/3 · `contain` |
| Video küçük resmi | 16/9 · `cover` (YouTube'un siyah bantları kırpılır) |
| Ders şeması | doğal oran · `contain` |
