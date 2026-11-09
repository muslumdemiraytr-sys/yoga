// Görsel regresyon testleri: her sayfa × genişlik için referans ekran görüntüsüyle karşılaştırır.
//   İlk referanslar:  npm run qa:baseline
//   Karşılaştırma:    npm run qa:regression
import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
const cfg = JSON.parse(readFileSync(new URL('./routes.json', import.meta.url), 'utf8'));
const SEED = () => localStorage.setItem('yogaAkademisi.v1', JSON.stringify({ version: 1, profile: { name: 'Deneme', dailyGoal: 10, onboarded: true, safetyAck: true, disclaimerAck: true }, days: {}, dayAnswers: {}, sessions: [], read: {}, quizzes: {}, badges: {} }));
for (const width of cfg.widths) for (const route of cfg.routes) {
  test(`${width}px ${route}`, async ({ page }) => {
    await page.setViewportSize({ width, height: width < 768 ? 844 : 900 });
    await page.addInitScript(SEED);
    await page.goto('/' + route); await page.waitForTimeout(400);
    await expect(page).toHaveScreenshot(`${width}-${(route.replace(/^#\/?/, '') || 'ana-sayfa').replace(/[^\w-]+/g, '_')}.png`, { fullPage: true, maxDiffPixelRatio: 0.01, animations: 'disabled' });
  });
}
