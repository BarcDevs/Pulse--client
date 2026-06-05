import { chromium } from '@playwright/test'

const mockUser = {
    id: 'test-user-1',
    firstName: 'Test',
    lastName: 'User',
    username: 'testuser',
    email: 'test@example.com',
    role: 'USER',
    createdAt: '2024-01-01T00:00:00.000Z'
}
const ok = (data: unknown) => JSON.stringify({ success: true, data })

// Pre-loads all pages so Turbopack compiles their chunks before tests run.
//
// Problem: react-quill-new is a dynamic import inside PostFormBody. It only compiles
// when the post form opens. That first compilation causes Turbopack to rechunk the
// module graph. Any route whose RSC payload was cached before the rechunk references
// stale chunk hashes → ChunkLoadError in tests.
//
// Strategy:
//   Phase 1  – compile all static modules (all pages + modal interactions)
//   Phase 2a – open community post form to trigger react-quill-new compilation + rechunk
//   Phase 2b – wait 8 s for WebSocket HMR rechunk to propagate to all route RSC caches
//              (networkidle only tracks HTTP; Turbopack HMR uses WebSocket)
//   Phase 2c – re-visit community, then every authenticated page after rechunk settles
//   Phase 2.5 – unauthenticated /login re-visit for RSC cache refresh
export default async function globalSetup() {
    const browser = await chromium.launch()
    const context = await browser.newContext()
    const page = await context.newPage()

    try {
        const base = 'http://localhost:5173'

        await context.addCookies([
            {
                name: 'NEXT_LOCALE',
                value: 'en-US',
                domain: 'localhost',
                path: '/',
                sameSite: 'Lax'
            },
            {
                name: 'accessToken',
                value: 'warmup-token',
                domain: 'localhost',
                path: '/',
                sameSite: 'Lax'
            }
        ])

        // All API calls are mocked so no auth redirect fires
        await page.route('**/api/**', (route) =>
            route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: ok(null)
            })
        )
        await page.route('**/api/v1/auth/me', (route) =>
            route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: ok({ user: mockUser, _csrf: 'warmup-csrf' })
            })
        )
        await page.route('**/api/v1/auth/refresh', (route) =>
            route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: ok({ _csrf: 'warmup-csrf' })
            })
        )
        await page.route('**/api/v1/check-in**', (route) =>
            route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: ok([])
            })
        )
        await page.route('**/api/v1/recovery-goals**', (route) =>
            route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: ok([])
            })
        )
        await page.route('**/api/v1/profile**', (route) =>
            route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: ok(null)
            })
        )
        await page.route('**/api/v1/insight**', (route) =>
            route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: ok([])
            })
        )

        // Phase 1a: compile all pages except community (avoid triggering react-quill-new early)
        for (const path of [
            '/dashboard',
            '/daily-checkin',
            '/recovery-goals',
            '/check-in',
            '/profile',
            '/insights',
            '/progress'
        ]) {
            await page.goto(`${base}${path}`, { waitUntil: 'load', timeout: 30_000 })
        }

        // Trigger goal modal to compile form components
        await page.goto(`${base}/recovery-goals`, { waitUntil: 'load', timeout: 30_000 })
        const newGoalBtn = page.getByRole('button', { name: 'New Goal' })
        if (await newGoalBtn.isVisible({ timeout: 5_000 }).catch(() => false)) {
            await newGoalBtn.click()
            await page.waitForTimeout(1_000)
        }

        // Trigger profile edit mode to compile BasicInfoForm + DatePickerInput chunks
        await page.goto(`${base}/profile`, { waitUntil: 'load', timeout: 30_000 })
        const editProfileBtn = page.getByRole('button', { name: 'Edit profile' })
        if (await editProfileBtn.isVisible({ timeout: 5_000 }).catch(() => false)) {
            await editProfileBtn.click()
            await page.waitForTimeout(1_000)
        }

        // Phase 1b: visit community to compile its static chunks (react-quill-new NOT yet
        // compiled — it's a dynamic import only triggered when the post form is open).
        await page.goto(`${base}/community`, { waitUntil: 'load', timeout: 30_000 })
        await page.waitForLoadState('networkidle', { timeout: 15_000 }).catch(() => {})
        await page.waitForTimeout(2_000)

        // Phase 1.5: compile login form validation chunks (needs no accessToken)
        await context.clearCookies()
        await context.addCookies([
            {
                name: 'NEXT_LOCALE',
                value: 'en-US',
                domain: 'localhost',
                path: '/',
                sameSite: 'Lax'
            }
        ])
        await page.goto(`${base}/login`, { waitUntil: 'load', timeout: 30_000 })
        await page.getByRole('button', { name: 'Log in' }).click()
        await page.waitForTimeout(1_000)

        await context.clearCookies()
        await context.addCookies([
            {
                name: 'NEXT_LOCALE',
                value: 'en-US',
                domain: 'localhost',
                path: '/',
                sameSite: 'Lax'
            },
            {
                name: 'accessToken',
                value: 'warmup-token',
                domain: 'localhost',
                path: '/',
                sameSite: 'Lax'
            }
        ])

        // Phase 2a: open the post form on community to compile react-quill-new.
        // This triggers Turbopack rechunking of the module graph.
        const phase2AuthReady = page.waitForResponse(
            resp => resp.url().includes('auth/me') && resp.status() === 200,
            { timeout: 10_000 }
        ).catch(() => null)
        await page.goto(`${base}/community`, { waitUntil: 'networkidle', timeout: 30_000 })
        await phase2AuthReady
        await page.waitForTimeout(1_000)
        const p2CreatePostBtn = page.getByRole('button', { name: 'Create post' })
        if (await p2CreatePostBtn.isVisible({ timeout: 3_000 }).catch(() => false)) {
            await p2CreatePostBtn.click()
            await page.waitForSelector('.ql-editor', { timeout: 15_000 }).catch(() => {})
            // Phase 2b: wait for WebSocket HMR rechunk to propagate to all route RSC caches.
            // networkidle only tracks HTTP; Turbopack rechunk HMR uses WebSocket, so we
            // need an explicit delay here before re-visiting other pages.
            await page.waitForTimeout(8_000)
        }

        // Re-visit community to refresh its own RSC payload after rechunking.
        await page.goto(`${base}/community`, { waitUntil: 'networkidle', timeout: 30_000 })
        await page.waitForTimeout(1_000)

        // Phase 2c: visit all other authenticated pages to refresh their RSC payloads
        // with the post-rechunk Turbopack manifest.
        for (const path of [
            '/dashboard',
            '/daily-checkin',
            '/recovery-goals',
            '/check-in',
            '/profile',
            '/insights',
            '/progress'
        ]) {
            await page.goto(`${base}${path}`, { waitUntil: 'networkidle', timeout: 30_000 })
        }

        // Phase 2.5: unauthenticated re-visit for /login RSC cache refresh
        await context.clearCookies()
        await context.addCookies([
            {
                name: 'NEXT_LOCALE',
                value: 'en-US',
                domain: 'localhost',
                path: '/',
                sameSite: 'Lax'
            }
        ])
        await page.goto(`${base}/login`, { waitUntil: 'networkidle', timeout: 30_000 })

        // Let Turbopack finish any in-flight compilations before tests start
        await page.waitForTimeout(2_000)
    } finally {
        await browser.close()
    }
}
