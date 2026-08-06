import { expect, Page } from '@playwright/test'

import { setEnglishLocale } from '../helpers/mockApi'

export const signupAndLogin = async (page: Page) => {
    const email = `smoke+${Date.now()}+${Math.random().toString(36).slice(2)}@pulse.test`
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

    await page.goto('/login')
    await page.getByTestId('email').fill(email)
    await page.getByTestId('password').fill(password)
    await page.getByTestId('login-submit').click()
    await page.waitForURL(/\/dashboard/, { timeout: 15_000 })

    return { email, password }
}
