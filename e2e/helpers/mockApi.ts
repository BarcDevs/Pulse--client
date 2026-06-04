import type { Page } from '@playwright/test'

export const mockUser = {
    id: 'test-user-1',
    firstName: 'Test',
    lastName: 'User',
    username: 'testuser',
    email: 'test@example.com',
    role: 'USER' as const,
    createdAt: '2024-01-01T00:00:00.000Z',
}

const ok = (data: unknown) =>
    JSON.stringify({ success: true, data })

const fail = (status: number, message = 'Unauthorized') =>
    ({ status, body: JSON.stringify({ success: false, message }) })

// Locale is determined by NEXT_LOCALE cookie; default is he-IL. Set en-US before navigating.
export const setEnglishLocale = async (page: Page) => {
    await page.context().addCookies([{
        name: 'NEXT_LOCALE',
        value: 'en-US',
        domain: 'localhost',
        path: '/',
        sameSite: 'Lax',
    }])
}

// Catch-all: any unmocked API call returns empty success.
// Register this BEFORE specific mocks — Playwright uses last-registered-wins,
// so specific mocks registered after will take precedence.
export const mockApiFallback = async (page: Page) => {
    await page.route('**/api/**', (route) =>
        route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: ok(null),
        })
    )
}

export const mockAuth = async (page: Page) => {
    await page.route('**/api/v1/auth/me', (route) =>
        route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: ok({ user: mockUser, _csrf: 'test-csrf' }),
        })
    )
    await page.route('**/api/v1/auth/refresh', (route) =>
        route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: ok({ _csrf: 'test-csrf' }),
        })
    )
}

export const mockUnauthenticated = async (page: Page) => {
    await page.route('**/api/v1/auth/me', (route) =>
        route.fulfill(fail(401))
    )
    await page.route('**/api/v1/auth/refresh', (route) =>
        route.fulfill(fail(401))
    )
    await page.route('**/api/v1/auth/logout', (route) =>
        route.fulfill({ status: 200, body: ok(null) })
    )
}

export const mockCheckIn = async (page: Page) => {
    await page.route('**/api/v1/check-in', (route) =>
        route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: ok([]),
        })
    )
    await page.route('**/api/v1/check-in/stats', (route) =>
        route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: ok(null),
        })
    )
}

export const mockGoals = async (page: Page) => {
    await page.route('**/api/v1/recovery-goals', (route) =>
        route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: ok([]),
        })
    )
    await page.route('**/api/v1/recovery-goals/stats', (route) =>
        route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: ok({ total: 0, completed: 0, active: 0 }),
        })
    )
}

export const mockProfile = async (page: Page) => {
    await page.route('**/api/v1/profile', (route) =>
        route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: ok(null),
        })
    )
    await page.route('**/api/v1/profile/list/activities', (route) =>
        route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: ok([]),
        })
    )
}

export const mockInsights = async (page: Page) => {
    await page.route('**/api/v1/insight/observation', (route) =>
        route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: ok([]),
        })
    )
}
