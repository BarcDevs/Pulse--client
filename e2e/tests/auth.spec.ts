import { expect, test } from '@playwright/test'

import {
    mockApiFallback,
    mockAuth,
    mockUser,
    setEnglishLocale
} from '../helpers/mockApi'

const API = '**/api/v1'

test.describe('Login', () => {
    test.beforeEach(async ({ page }) => {
        await setEnglishLocale(page)
        await mockApiFallback(page)
        await page.goto('/login')
        await page.waitForLoadState('load')
    })

    test('renders login form', async ({ page }) => {
        await expect(page.getByTestId('email')).toBeVisible()
        await expect(page.getByTestId('password')).toBeVisible()
        await expect(page.getByTestId('login-submit')).toBeVisible()
    })

    test('shows validation errors on empty submit', async ({ page }) => {
        await page.getByTestId('login-submit').click()
        await expect(page.getByText(/enter your email/i)).toBeVisible()
    })

    test('shows server error on invalid credentials', async ({ page }) => {
        await page.route(`${API}/auth/login`, (route) =>
            route.fulfill({
                status: 401,
                contentType: 'application/json',
                body: JSON.stringify({
                    success: false,
                    message: 'Invalid credentials'
                })
            })
        )

        await page.getByTestId('email').fill('wrong@example.com')
        await page.getByTestId('password').fill('Wrongpass1')
        await page.getByTestId('login-submit').click()

        await expect(page.getByText(/invalid credentials/i)).toBeVisible()
    })

    test('redirects to dashboard on successful login', async ({ page }) => {
        await page.route(`${API}/auth/login`, async (route) => {
            // Set the accessToken cookie that the middleware checks for protected routes
            await page.context().addCookies([{
                name: 'accessToken',
                value: 'mock-access-token',
                domain: 'localhost',
                path: '/',
                sameSite: 'Lax'
            }])
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({
                    success: true,
                    data: { user: mockUser, _csrf: 'test-csrf' }
                })
            })
        })
        await mockAuth(page)

        await page.getByTestId('email').fill('test@example.com')
        await page.getByTestId('password').fill('Password123!')
        await page.getByTestId('login-submit').click()

        await expect(page).toHaveURL(/\/dashboard/, { timeout: 15_000 })
    })
})
