import { expect, test } from '@playwright/test'

import {
    mockApiFallback,
    mockUnauthenticated,
    setEnglishLocale
} from '../helpers/mockApi'

// Only routes listed in src/constants/proxyRoutes.ts protectedRoutes
const PROTECTED = ['/dashboard', '/check-in', '/profile', '/insights', '/progress']

test.describe('Protected routes', () => {
    test.beforeEach(async ({ page }) => {
        await setEnglishLocale(page)
        await mockApiFallback(page)
        await mockUnauthenticated(page)
    })

    for (const route of PROTECTED) {
        test(`redirects unauthenticated user from ${route} to /login`, async ({ page }) => {
            await page.goto(route)
            await expect(page).toHaveURL(/\/login/, { timeout: 10_000 })
        })
    }
})
