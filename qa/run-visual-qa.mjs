// ==========================================================================
// Visual QA Agent – Playwright çalıştırıcısı
//   npm run qa                      → tüm sayfa × genişlikleri tarar, rapor + ekran görüntüsü üretir
//   npm run qa -- --label=once      → ekran görüntülerini qa/screenshots/once/ altına koyar (önce/sonra için)
//   npm run qa -- --widths=375,1440 --routes="#/,#/pozlar"
// Yüksek önemli bulgu varsa çıkış kodu 1 olur (yayın öncesi kontrol için).
// ==========================================================================
import { chromium } from 'playwright';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { serve } from './serve.mjs';

const args = Object.fromEntries(process.argv.slice(2).map(a => a.replace(/^--/, '').split('=')));
const cfg = JSON.parse(await readFile(new URL('./routes.json', import.meta.url), 'utf8'));
const widths = args.widths ? args.widths.split(',').map(Number) : cfg.widths;
const routes = args.routes ? args.routes.split(',') : cfg.routes;
const label = args.label || new Date().toISOString().slice(0, 16).replace(/[:T]/g, '-');
const port = Number(args.port || 4173);
const qaDir = fileURLToPath(new URL('.', import.meta.url));
const shotDir = `${qaDir}screenshots/${label}`;
const engine = await readFile(new URL('./visual-qa.js', import.meta.url), 'utf8');
const slug = (r) => (r.replace(/^#\/?/, '') || 'ana-sayfa').replace(/[^\w-]+/g, '_');

// Karşılama penceresini atla ve grafiklerin dolu görünmesi için örnek veri ekle
const SEED = `(() => { try {
  const today = new Date(); const d = (n) => { const x = new Date(today); x.setDate(x.getDate() - n); return x.toISOString().slice(0, 10); };
  const sessions = [0, 1, 2, 4, 6, 9, 12].map((n, i) => ({ id: 's' + i, date: d(n), ts: Date.now() - n * 864e5, minutes: 10 + i, type: 'program', label: 'Örnek' }));
  const days = {}; [1, 2, 3, 4, 5].forEach((n, i) => { days[n] = { done: true, date: d(i), ts: Date.now() - i * 864e5, minutes: 10 }; });
  localStorage.setItem('yogaAkademisi.v1', JSON.stringify({ version: 1, profile: { name: 'Deneme', dailyGoal: 10, onboarded: true, safetyAck: true, disclaimerAck: true, createdAt: d(12) },
    days, dayAnswers: {}, sessions, read: { m4: ['tadasana', 'balasana', 'agac'] }, quizzes: {}, badges: {} }));
} catch (e) {} })();`;

const server = await serve(port);
// PW_CHROMIUM_PATH: Playwright'ın kendi tarayıcısı indirilemezse kurulu bir Chromium/headless shell yolu
const browser = await chromium.launch(process.env.PW_CHROMIUM_PATH ? { executablePath: process.env.PW_CHROMIUM_PATH } : {});
const results = [];
try {
  for (const width of widths) {
    const ctx = await browser.newContext({ viewport: { width, height: width < 768 ? 844 : 900 }, deviceScaleFactor: 1 });
    await ctx.addInitScript(SEED);
    const page = await ctx.newPage();
    const errors = []; page.on('pageerror', e => errors.push(e.message));
    await page.goto(`http://localhost:${port}/`, { waitUntil: 'networkidle' });
    await page.addScriptTag({ content: engine });
    for (const route of routes) {
      await page.evaluate(r => { location.hash = r; }, route);
      await page.waitForTimeout(350);
      const res = await page.evaluate(({ r, w }) => window.VisualQA.audit({ route: r, width: w }), { r: route, w: width });
      res.errors = errors.splice(0);
      await mkdir(`${shotDir}/${width}`, { recursive: true });
      await page.screenshot({ path: `${shotDir}/${width}/${slug(route)}.png`, fullPage: true });
      results.push(res);
      process.stdout.write(`${width}px ${route.padEnd(24)} kart:${res.stats.cards} görsel:${res.stats.images} bulgu:${res.issues.length}\n`);
    }
    await ctx.close();
  }
} finally { await browser.close(); server.close(); }

// Özet (aynı bileşenin tekrarları birleştirilir)
const key = i => [i.type, i.component, i.selector].join('|'); const uniq = new Map();
results.flatMap(r => r.issues).forEach(i => { const u = uniq.get(key(i)) || { ...i, routes: new Set(), widths: new Set() }; u.routes.add(i.route); u.widths.add(i.width); uniq.set(key(i), u); });
const issues = [...uniq.values()].map(u => ({ ...u, routes: [...u.routes], widths: [...u.widths] }));
const jsErrors = results.flatMap(r => r.errors.map(e => `${r.stats.route} @${r.stats.width}: ${e}`));
const summary = { label, date: new Date().toISOString(), pages: routes.length, widths, runs: results.length,
  cards: results.reduce((a, r) => a + r.stats.cards, 0), images: results.reduce((a, r) => a + r.stats.images, 0),
  high: issues.filter(i => i.severity === 'yüksek').length, medium: issues.filter(i => i.severity === 'orta').length, low: issues.filter(i => i.severity === 'düşük').length, jsErrors };
await mkdir(`${qaDir}reports`, { recursive: true });
await writeFile(`${qaDir}reports/${label}.json`, JSON.stringify({ summary, issues, results }, null, 1));
const md = [`# Visual QA raporu – ${label}`, '', `| Ölçüt | Değer |`, `|---|---|`,
  `| Kontrol edilen sayfa | ${summary.pages} × ${widths.length} genişlik = ${summary.runs} tarama |`, `| Kart / görsel ölçümü | ${summary.cards} / ${summary.images} |`,
  `| Bulgular (yüksek / orta / düşük) | ${summary.high} / ${summary.medium} / ${summary.low} |`, `| JavaScript hatası | ${jsErrors.length} |`, `| Ekran görüntüleri | qa/screenshots/${label}/ |`, '',
  '## Bulgular', '', '| Önem | Tür | Bileşen | Seçici | Ayrıntı | Genişlik | Sayfalar |', '|---|---|---|---|---|---|---|',
  ...issues.map(i => `| ${i.severity} | ${i.type} | ${i.component} | \`${i.selector}\` | ${i.detail} | ${i.widths.join(', ')} | ${i.routes.join(' ')} |`),
  ...(jsErrors.length ? ['', '## JavaScript hataları', ...jsErrors.map(e => `- ${e}`)] : [])].join('\n');
await writeFile(`${qaDir}reports/${label}.md`, md);
console.log(`\nRapor: qa/reports/${label}.md · yüksek ${summary.high}, orta ${summary.medium}, düşük ${summary.low}, JS hatası ${jsErrors.length}`);
process.exit(summary.high || jsErrors.length ? 1 : 0);
