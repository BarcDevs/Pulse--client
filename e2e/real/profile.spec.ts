import { expect, test } from '@playwright/test'

import { signupAndLogin } from './helpers'

test.describe('real-server profile', () => {
    test('edit and save profile', async ({ page }) => {
        await signupAndLogin(page)

        await page.goto('/profile')
        await page.getByRole('button', { name: 'Edit profile' }).click()
        await page.getByPlaceholder('First name').fill('Updated')
        await page.getByRole('button', { name: 'Save changes' }).click()

        await expect(page.getByRole('button', { name: 'Edit profile' }))
            .toBeVisible({ timeout: 5_000 })
    })
})
