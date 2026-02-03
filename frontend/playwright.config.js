/** @type {import('@playwright/test').PlaywrightTestConfig} */
module.exports = {
  testDir: './tests/e2e',
  timeout: 30 * 1000,
  use: {
    headless: true,
    baseURL: process.env.E2E_BASE_URL || 'http://127.0.0.1:5173',
    viewport: { width: 1280, height: 720 },
    actionTimeout: 10 * 1000
  },
  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } }
  ]
}
