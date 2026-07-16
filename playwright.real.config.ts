import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
    testDir: './e2e/real',
    globalSetup: './e2e/real/global-setup.ts',
    fullyParallel: false,
    forbidOnly: !!process.env.CI,
    retries: 0,
    workers: 1,
    reporter: process.env.CI ? 'github' : 'html',
    use: {
        baseURL: 'http://localhost:5173',
        trace: 'on-first-retry'
    },
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] }
        }
    ],
    webServer: {
        command: 'npm run dev',
        url: 'http://localhost:5173',
        reuseExistingServer: !process.env.CI,
        timeout: 120_000
    }
})
