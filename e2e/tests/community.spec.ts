import { expect, test } from '@playwright/test'

import {
    mockApiFallback,
    mockAuth,
    mockUnauthenticated,
    setEnglishLocale,
} from '../helpers/mockApi'

test.describe('Community', () => {
    test.beforeEach(async ({ page }) => {
        await setEnglishLocale(page)
        await mockApiFallback(page)
    })

    test('renders community feed', async ({ page }) => {
        await mockUnauthenticated(page)
        await page.goto('/community')
        await page.waitForLoadState('domcontentloaded')
        await expect(page.getByPlaceholder('Search conversations and discussions...')).toBeVisible()
        await expect(page.getByRole('button', { name: 'Create post' })).toBeVisible()
    })

    test('shows empty state when no posts', async ({ page }) => {
        await mockUnauthenticated(page)
        await page.goto('/community')
        await expect(page.getByText(/no posts have been shared yet/i)).toBeVisible({ timeout: 15_000 })
    })

    test('shows post form when authenticated user clicks Create post', async ({ page }) => {
        await mockAuth(page)
        const authReady = page.waitForResponse(
            resp => resp.url().includes('auth/me') && resp.status() === 200
        )
        await page.goto('/community')
        await authReady
        // Allow React to process the auth state and re-render
        await page.waitForTimeout(2_000)
        await page.getByRole('button', { name: 'Create post' }).click()
        await expect(page.getByPlaceholder('Give your post a clear title')).toBeVisible()
    })

    test('shows login toast when unauthenticated user clicks Create post', async ({ page }) => {
        await mockUnauthenticated(page)
        await page.goto('/community')
        await page.waitForLoadState('domcontentloaded')
        await page.getByRole('button', { name: 'Create post' }).click()
        await expect(page.getByText(/log in to share a post/i)).toBeVisible({ timeout: 5_000 })
    })
})
