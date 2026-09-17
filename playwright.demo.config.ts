import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests', testMatch: 'demo-login.browser.ts',
  use: { baseURL: 'http://localhost:3101' },
  webServer: { command: 'npm run dev -- --port 3101', url: 'http://localhost:3101', reuseExistingServer: false, timeout: 60000, env: { NEXT_PUBLIC_API_URL: 'http://localhost:4001', NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: '' } },
});
