import { chromium } from '@playwright/test'

const mockUser = {
    id: 'test-user-1', firstName: 'Test', lastName: 'User',
    username: 'testuser', email: 'test@example.com',
    role: 'USER', createdAt: '2024-01-01T00:00:00.000Z',
}
const ok = (data: unknown) => JSON.stringify({ success: true, data })

// Pre-loads key pages so Turbopack compiles their chunks before tests run.
// Ordering matters: compile interactive components first, then re-visit test pages
// last to refresh Turbopack's HTML cache with the final stable chunk hashes.
export default async function globalSetup() {
    const browser = await chromium.launch()
    const context = await browser.newContext()
    const page = await context.newPage()

    try {
        const base = 'http://localhost:5173'

        await context.addCookies([
            { name: 'NEXT_LOCALE', value: 'en-US', domain: 'localhost', path: '/', sameSite: 'Lax' },
            { name: 'accessToken', value: 'warmup-token', domain: 'localhost', path: '/', sameSite: 'Lax' },
        ])

        // All API calls are mocked so no auth redirect fires
        await page.route('**/api/**', (route) =>
            route.fulfill({ status: 200, contentType: 'application/json', body: ok(null) })
        )
        await page.route('**/api/v1/auth/me', (route) =>
            route.fulfill({ status: 200, contentType: 'application/json', body: ok({ user: mockUser, _csrf: 'warmup-csrf' }) })
        )
        await page.route('**/api/v1/auth/refresh', (route) =>
            route.fulfill({ status: 200, contentType: 'application/json', body: ok({ _csrf: 'warmup-csrf' }) })
        )
        await page.route('**/api/v1/check-in**', (route) =>
            route.fulfill({ status: 200, contentType: 'application/json', body: ok([]) })
        )
        await page.route('**/api/v1/recovery-goals**', (route) =>
            route.fulfill({ status: 200, contentType: 'application/json', body: ok([]) })
        )
        await page.route('**/api/v1/profile**', (route) =>
            route.fulfill({ status: 200, contentType: 'application/json', body: ok(null) })
        )
        await page.route('**/api/v1/insight**', (route) =>
            route.fulfill({ status: 200, contentType: 'application/json', body: ok([]) })
        )

        // Phase 1: compile ALL pages tests will visit (order: most deps first)
        for (const path of ['/dashboard', '/daily-checkin', '/recovery-goals', '/check-in', '/profile', '/insights', '/progress']) {
            await page.goto(`${base}${path}`, { waitUntil: 'load', timeout: 30_000 })
        }

        // Trigger goal modal to compile form components
        await page.goto(`${base}/recovery-goals`, { waitUntil: 'load', timeout: 30_000 })
        const newGoalBtn = page.getByRole('button', { name: 'New Goal' })
        if (await newGoalBtn.isVisible({ timeout: 5_000 }).catch(() => false)) {
            await newGoalBtn.click()
            await page.waitForTimeout(1_000)
        }

        // Phase 1.5: compile login form validation chunks (needs no accessToken)
        await context.clearCookies()
        await context.addCookies([
            { name: 'NEXT_LOCALE', value: 'en-US', domain: 'localhost', path: '/', sameSite: 'Lax' },
        ])
        await page.goto(`${base}/login`, { waitUntil: 'load', timeout: 30_000 })
        await page.getByRole('button', { name: 'Log in' }).click()
        await page.waitForTimeout(1_000)

        // Phase 2: re-visit ALL test pages to refresh Turbopack's HTML cache with
        // the final stable chunk hashes. Protected routes redirect → /login, updating it too.
        for (const path of ['/login', '/daily-checkin', '/recovery-goals', '/check-in', '/profile', '/insights', '/progress']) {
            await page.goto(`${base}${path}`, { waitUntil: 'networkidle', timeout: 30_000 })
        }

        // Let Turbopack finish any in-flight compilations before tests start
        await page.waitForTimeout(2_000)
    } finally {
        await browser.close()
    }
}
