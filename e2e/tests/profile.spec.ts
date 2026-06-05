import { expect, test } from '@playwright/test'

import {
    mockApiFallback,
    mockAuth,
    mockProfile,
    setEnglishLocale
} from '../helpers/mockApi'

const API = '**/api/v1'

test.describe('Profile Edit', () => {
    test.beforeEach(async ({ page }) => {
        await setEnglishLocale(page)
        await page.context().addCookies([{
            name: 'accessToken',
            value: 'mock-access-token',
            domain: 'localhost',
            path: '/',
            sameSite: 'Lax'
        }])
        await mockApiFallback(page)
        await mockAuth(page)
        await mockProfile(page)
        const authReady = page.waitForResponse(
            resp => resp.url().includes('auth/me') && resp.status() === 200
        )
        await page.goto('/profile')
        await authReady
        await page.evaluate(() =>
            new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve())))
        )
    })

    test('renders edit profile button', async ({ page }) => {
        await expect(page.getByRole('button', { name: 'Edit profile' })).toBeVisible()
    })

    test('enters edit mode on click', async ({ page }) => {
        await page.getByRole('button', { name: 'Edit profile' }).click()
        await expect(page.getByRole('button', { name: 'Save changes' })).toBeVisible()
        await expect(page.getByRole('button', { name: 'Cancel' })).toBeVisible()
    })

    test('cancel returns to view mode', async ({ page }) => {
        await page.getByRole('button', { name: 'Edit profile' }).click()
        await page.getByRole('button', { name: 'Cancel' }).click()
        await expect(page.getByRole('button', { name: 'Edit profile' })).toBeVisible()
    })

    test('save disabled when username cleared', async ({ page }) => {
        await page.getByRole('button', { name: 'Edit profile' }).click()
        await page.getByPlaceholder('Username').clear()
        await expect(page.getByRole('button', { name: 'Save changes' })).toBeDisabled()
    })

    test('saves profile changes successfully', async ({ page }) => {
        await page.route(`${API}/users/me`, (route) =>
            route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({ success: true, data: {} })
            })
        )
        await page.getByRole('button', { name: 'Edit profile' }).click()
        await page.getByPlaceholder('First name').fill('Updated')
        await page.getByRole('button', { name: 'Save changes' }).click()
        await expect(page.getByRole('button', { name: 'Edit profile' })).toBeVisible({ timeout: 5_000 })
    })
})
