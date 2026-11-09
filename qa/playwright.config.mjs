import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: '.', testMatch: 'visual.spec.mjs', snapshotDir: './baseline', outputDir: './test-results', workers: 2,
  use: { baseURL: 'http://localhost:4174', deviceScaleFactor: 1, ...(process.env.PW_CHROMIUM_PATH ? { launchOptions: { executablePath: process.env.PW_CHROMIUM_PATH } } : {}) },
  webServer: { command: 'node -e "import(\'./serve.mjs\').then(m=>m.serve(4174))"', port: 4174, reuseExistingServer: true, cwd: '.' }
});
