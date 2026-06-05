import { expect, test } from '@playwright/test'

import {
    mockApiFallback,
    mockAuth,
    mockCheckIn,
    mockProfile,
    setEnglishLocale
} from '../helpers/mockApi'

test.describe('Daily Check-In', () => {
    test.beforeEach(async ({ page }) => {
        await setEnglishLocale(page)
        await mockApiFallback(page)
        await mockAuth(page)
        await mockCheckIn(page)
        await mockProfile(page)
        await page.goto('/daily-checkin')
        await page.waitForLoadState('domcontentloaded')
    })

    test('renders check-in form', async ({ page }) => {
        await expect(page.locator('form').first()).toBeVisible()
        await expect(page.getByRole('button', { name: 'Save check-in' })).toBeVisible()
    })

    test('form has sliders', async ({ page }) => {
        const sliders = page.getByRole('slider')
        await expect(sliders.first()).toBeVisible()
    })
})
