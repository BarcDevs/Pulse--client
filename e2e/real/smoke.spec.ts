import { expect, test } from '@playwright/test'

import { setEnglishLocale } from '../helpers/mockApi'

test.describe('real-server smoke', () => {
    test('signup, login, check-in, dashboard', async ({ page }) => {
        const email = `smoke+${Date.now()}@pulse.test`
        const password = 'Password123!'

        await setEnglishLocale(page)

        await page.goto('/signup')
        await page.getByTestId('firstName').fill('Smoke')
        await page.getByTestId('lastName').fill('Test')
        await page.getByTestId('email').fill(email)
        await page.getByTestId('password').fill(password)
        await page.getByTestId('confirmPassword').fill(password)
        await page.getByTestId('signup-submit').click()
        await expect(page.getByTestId('signup-submit')).toBeEnabled()

        // No dedicated success state on this page — the login step below is
        // the real proof the signup call worked (it fails clearly otherwise).
        await page.goto('/login')
        await page.getByTestId('email').fill(email)
        await page.getByTestId('password').fill(password)
        await page.getByTestId('login-submit').click()
        await expect(page).toHaveURL(/\/dashboard/, { timeout: 15_000 })

        await expect(page.getByTestId('check-in-prompt')).toBeVisible()

        await page.goto('/check-in')
        await page.getByTestId('check-in-submit').click()

        await page.goto('/dashboard')
        await expect(page.getByTestId('check-in-prompt')).not.toBeVisible()
    })
})
