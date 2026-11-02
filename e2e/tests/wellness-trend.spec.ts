import type { Page } from '@playwright/test'
import { expect, test } from '@playwright/test'

import {
    mockApiFallback,
    mockAuth,
    mockGoals,
    setEnglishLocale
} from '../helpers/mockApi'

const statsWith = (days: { actual: number | null }[]) => ({
    success: true,
    data: {
        total: days.length,
        totalCheckIns: days.length,
        avgMood: 6,
        averageMoodScore: 6,
        avgPain: 3,
        averagePainLevel: 3,
        topActivities: [],
        currentStreak: 1,
        longestStreak: 1,
        moodTrend: days,
        painTrend: days,
        milestonesAchieved: 0
    }
})

const mockStats = async (page: Page, days: { actual: number | null }[]) => {
    await page.route('**/api/*/check-in/stats*', (route) =>
        route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(statsWith(days))
        }))
}

test.describe('Wellness trend', () => {
    test.beforeEach(async ({ page }) => {
        await setEnglishLocale(page)
        await mockApiFallback(page)
        await mockAuth(page)
        // The list is asked for with ?limit=, which the shared mock misses
        await page.route(/\/api\/[^/]+\/check-in(\?.*)?$/, (route) =>
            route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({ success: true, data: [] })
            }))
        await mockGoals(page)
    })

    test('a first check-in shows no trend text', async ({ page }) => {
        await mockStats(page, [{ actual: 6 }])
        await page.goto('/progress')

        await expect(page.getByText('/ 10').first()).toBeVisible()
        await expect(page.getByText('Stable & Maintaining')).toHaveCount(0)
        await expect(page.getByText('Steady', { exact: true })).toHaveCount(0)
        await expect(page.getByText('Stable', { exact: true })).toHaveCount(0)
    })

    test('several check-ins still show the trend', async ({ page }) => {
        await mockStats(page, [
            { actual: 5 },
            { actual: 5 },
            { actual: 5 },
            { actual: 5 }
        ])
        await page.goto('/progress')

        await expect(page.getByText('Stable & Maintaining')).toBeVisible()
    })
})
