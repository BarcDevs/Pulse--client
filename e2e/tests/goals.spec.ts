import { expect, test } from '@playwright/test'

import {
    mockApiFallback,
    mockAuth,
    mockGoals,
    mockInsights,
    mockProfile,
    setEnglishLocale
} from '../helpers/mockApi'

test.describe('Recovery Goals', () => {
    test.beforeEach(async ({ page }) => {
        await setEnglishLocale(page)
        await mockApiFallback(page)
        await mockAuth(page)
        await mockGoals(page)
        await mockProfile(page)
        await mockInsights(page)
        await page.goto('/recovery-goals')
        await page.waitForLoadState('domcontentloaded')
    })

    test('renders goals page', async ({ page }) => {
        await expect(page.getByRole('heading', { name: 'Recovery Goals' })).toBeVisible()
    })

    test('opens create goal modal', async ({ page }) => {
        const createBtn = page.getByRole('button', { name: 'New Goal' })
        await expect(createBtn).toBeVisible()
        await createBtn.click()

        await expect(page.getByRole('dialog')).toBeVisible()
        await expect(page.locator('#goal-title')).toBeVisible()
    })
})
