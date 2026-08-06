import { expect, test } from '@playwright/test'

import { signupAndLogin } from './helpers'

test.describe('real-server smoke', () => {
    test('signup, login, check-in, dashboard', async ({ page }) => {
        await signupAndLogin(page)

        await expect(page.getByTestId('check-in-prompt')).toBeVisible()

        await page.goto('/check-in')
        await page.getByTestId('check-in-submit').click()

        await page.goto('/dashboard')
        await expect(page.getByTestId('check-in-prompt')).not.toBeVisible()
    })
})
