import { defineConfig, devices } from "@playwright/test";

const PORT = Number(process.env.E2E_PORT ?? 3100);
const baseURL = process.env.E2E_BASE_URL || `http://localhost:${PORT}`;

/**
 * End-to-end tests run against a production build. Lead delivery runs in log-only mode
 * (ALLOW_LOG_ONLY_LEADS=true), so form submissions exercise the real server action without sending email.
 */
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: [["list"], ["html", { open: "never" }]],
  use: { baseURL, trace: "retain-on-failure" },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
    { name: "firefox", use: { ...devices["Desktop Firefox"] }, grep: /@cross-browser/ },
    { name: "webkit", use: { ...devices["Desktop Safari"] }, grep: /@cross-browser/ },
  ],
  webServer: process.env.E2E_BASE_URL
    ? undefined
    : {
        command: `npm run build && npx next start -p ${PORT}`,
        url: baseURL,
        reuseExistingServer: !process.env.CI,
        timeout: 240_000,
        env: { ALLOW_LOG_ONLY_LEADS: "true", LEADS_RATE_LIMIT_MAX: "1000" },
      },
});
