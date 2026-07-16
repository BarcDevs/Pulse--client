import { expect, test } from '@playwright/test'

import { signupAndLogin } from './helpers'

test.describe('real-server goals', () => {
    test('create a recovery goal', async ({ page }) => {
        await signupAndLogin(page)

        const title = `Smoke goal ${Date.now()}`

        await page.goto('/recovery-goals')
        await page.getByRole('button', { name: 'New Goal' }).click()
        await expect(page.getByRole('dialog')).toBeVisible()

        await page.locator('#goal-title').fill(title)
        await page.getByRole('button', { name: 'Physical' }).click()
        await page.getByTestId('goal-form-submit').click()

        await expect(page.getByText(title)).toBeVisible()
    })
})
