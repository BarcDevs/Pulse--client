import { expect, test } from '@playwright/test'

import { mockApiFallback } from '../helpers/mockApi'

test.describe('RTL locale', () => {
    test.beforeEach(async ({ page }) => {
        await mockApiFallback(page)
        await page.goto('/login')
        await page.waitForLoadState('load')
    })

    test('renders the login page right-to-left by default', async ({ page }) => {
        await expect(page.locator('html')).toHaveAttribute('dir', 'rtl')
    })

    test('login form is still usable under RTL', async ({ page }) => {
        await expect(page.getByTestId('email')).toBeVisible()
        await expect(page.getByTestId('password')).toBeVisible()
        await expect(page.getByTestId('login-submit')).toBeVisible()
    })
})
