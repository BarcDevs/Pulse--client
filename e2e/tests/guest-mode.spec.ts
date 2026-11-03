import type { Page } from '@playwright/test'
import { expect, test } from '@playwright/test'

import {
    mockApiFallback,
    mockUser,
    setEnglishLocale
} from '../helpers/mockApi'

const guestUser = {
    ...mockUser,
    id: 'guest-1',
    firstName: 'Guest',
    lastName: 'Guest',
    username: 'guest_abc',
    isGuest: true
}

const checkIn = {
    id: 'ci-1',
    userId: 'guest-1',
    checkInDate: '2026-11-02T00:00:00.000Z',
    moodScore: 6,
    painLevel: 3,
    activities: [],
    insightsStatus: 'ready',
    insights: [{
        id: 'in-1',
        checkInId: 'ci-1',
        type: 'MOTIVATIONAL',
        title: 'Steady start',
        content: 'Showing up today is the hard part.',
        userId: 'guest-1',
        classification: 'x',
        priority: 'normal',
        createdAt: '2026-11-02T10:00:00.000Z'
    }],
    createdAt: '2026-11-02T10:00:00.000Z',
    updatedAt: '2026-11-02T10:00:00.000Z'
}

const json = (status: number, data: unknown) => ({
    status,
    contentType: 'application/json',
    body: JSON.stringify({ success: status < 400, data })
})

type Options = {
    guestStatus?: number
    checkInPostStatus?: number
    upgradeStatus?: number
    checkIns?: unknown[]
}

const mockGuestApi = async (
    page: Page,
    {
        guestStatus = 201,
        checkInPostStatus = 201,
        upgradeStatus = 200,
        checkIns = [checkIn]
    }: Options = {}
) => {
    let isUpgraded = false

    await setEnglishLocale(page)
    await mockApiFallback(page)
    await page.route('**/api/*/auth/guest', (route) =>
        route.fulfill(json(guestStatus, {
            user: guestUser,
            _csrf: 'guest-csrf'
        })))
    await page.route('**/api/*/auth/me', (route) =>
        route.fulfill(json(200, {
            user: { ...guestUser, isGuest: !isUpgraded }
        })))
    await page.route(/\/api\/[^/]+\/check-in(\?.*)?$/, (route) =>
        route.fulfill(
            route.request().method() === 'POST'
                ? json(checkInPostStatus, checkIn)
                : json(200, checkIns)
        ))
    await page.route('**/api/*/auth/guest/upgrade', (route) => {
        isUpgraded = upgradeStatus < 400
        return route.fulfill(json(upgradeStatus, {
            user: { ...guestUser, isGuest: false },
            _csrf: 'new-csrf'
        }))
    })
}

const fillAndSubmitCheckIn = async (page: Page) => {
    await page.getByRole('slider').first().focus()
    await page.keyboard.press('ArrowRight')
    await page.getByTestId('guest-check-in-submit').click()
}

test.describe('Guest mode', () => {
    test('/start shows the check-in without any login', async ({ page }) => {
        await mockGuestApi(page)
        await page.goto('/start')

        await expect(page.getByTestId('guest-check-in-submit')).toBeVisible()
        await expect(page.getByRole('slider').first()).toBeVisible()
    })

    test('both guest screens say guest mode and link to login', async ({ page }) => {
        await mockGuestApi(page)
        await page.goto('/start')

        await expect(page.getByText('Guest mode')).toBeVisible()
        await expect(page.getByTestId('guest-mode-notice').getByRole('link', { name: 'Log in' })).toHaveAttribute('href', '/login')

        await fillAndSubmitCheckIn(page)

        await expect(page).toHaveURL(/\/start\/result/)
        await expect(page.getByText('Guest mode')).toBeVisible()
        await expect(page.getByTestId('guest-mode-notice')).toBeVisible()
    })

    test('a failed start shows a retry that opens the check-in', async ({ page }) => {
        let attempts = 0
        await mockGuestApi(page)
        await page.route('**/api/*/auth/guest', (route) => {
            attempts++
            return route.fulfill(
                attempts === 1
                    ? json(500, null)
                    : json(201, { user: guestUser, _csrf: 'guest-csrf' })
            )
        })
        await page.goto('/start')

        const retryButton = page.getByRole('button', { name: 'Try again' })
        await expect(retryButton).toBeVisible()
        await retryButton.click()

        await expect(page.getByTestId('guest-check-in-submit')).toBeVisible()
    })

    test('submitting shows the result with the AI insight', async ({ page }) => {
        await mockGuestApi(page)
        await page.goto('/start')
        await fillAndSubmitCheckIn(page)

        await expect(page).toHaveURL(/\/start\/result/)
        await expect(page.getByText('Showing up today is the hard part.')).toBeVisible()
    })

    test('saving with email and password upgrades and opens the dashboard', async ({ page }) => {
        await mockGuestApi(page)
        await page.goto('/start')
        await fillAndSubmitCheckIn(page)
        await page.getByTestId('guest-save-open').click()

        await page.locator('input[type="email"]').fill('me@example.com')
        await page.locator('input[type="password"]').fill('Sm0keTest!x')
        await page.getByTestId('upgradeGuest-submit').click()

        await expect(page).toHaveURL(/\/dashboard/)
    })

    test('an email that already has an account shows a message', async ({ page }) => {
        await mockGuestApi(page, { upgradeStatus: 409 })
        await page.goto('/start')
        await fillAndSubmitCheckIn(page)
        await page.getByTestId('guest-save-open').click()

        await page.locator('input[type="email"]').fill('me@example.com')
        await page.locator('input[type="password"]').fill('Sm0keTest!x')
        await page.getByTestId('upgradeGuest-submit').click()

        await expect(page.getByText('This email already has an account')).toBeVisible()
        await expect(page).toHaveURL(/\/start\/result/)
    })

    test('the email-taken message links to the login page, which a guest can use', async ({ page }) => {
        await mockGuestApi(page, { upgradeStatus: 409 })
        await page.goto('/start')
        await fillAndSubmitCheckIn(page)
        await page.getByTestId('guest-save-open').click()

        await page.locator('input[type="email"]').fill('me@example.com')
        await page.locator('input[type="password"]').fill('Sm0keTest!x')
        await page.getByTestId('upgradeGuest-submit').click()
        await page.getByRole('link', { name: 'Log in' }).click()

        await expect(page).toHaveURL(/\/login/)
        await expect(page.getByTestId('login-submit')).toBeVisible()
    })

    test('the Google button in the save prompt opens the signup page for a guest', async ({ page }) => {
        await mockGuestApi(page)
        await page.goto('/start')
        await fillAndSubmitCheckIn(page)
        await page.getByTestId('guest-save-open').click()
        await page.getByRole('link', { name: 'Continue with Google' }).click()

        await expect(page).toHaveURL(/\/signup/, { timeout: 20000 })
        await expect(page.getByTestId('signup-submit')).toBeVisible()
    })

    test('hitting the guest limit opens the save prompt', async ({ page }) => {
        await mockGuestApi(page, { checkInPostStatus: 403 })
        await page.goto('/start')
        await fillAndSubmitCheckIn(page)

        await expect(page.getByText('You have used the free check-ins')).toBeVisible()
    })

    test('a signed-in visitor on /start goes to the dashboard', async ({ page }) => {
        await mockGuestApi(page, { guestStatus: 409 })
        await page.goto('/start')

        await expect(page).toHaveURL(/\/dashboard/)
    })

    test('a guest on a protected page is sent back to the result', async ({ page }) => {
        await mockGuestApi(page)
        await page.goto('/dashboard')

        await expect(page).toHaveURL(/\/start\/result/)
    })

    test('a guest with no check-in is sent back to /start', async ({ page }) => {
        await mockGuestApi(page, { checkIns: [] })
        await page.goto('/start/result')

        await expect(page).toHaveURL(/\/start$/)
        await expect(page.getByTestId('guest-check-in-submit')).toBeVisible()
    })

    test('the converted user stays on the dashboard', async ({ page }) => {
        await mockGuestApi(page)
        await page.goto('/start')
        await fillAndSubmitCheckIn(page)
        await page.getByTestId('guest-save-open').click()

        await page.locator('input[type="email"]').fill('me@example.com')
        await page.locator('input[type="password"]').fill('Sm0keTest!x')
        await page.getByTestId('upgradeGuest-submit').click()

        await expect(page).toHaveURL(/\/dashboard/)
        await page.waitForTimeout(1500)
        await expect(page).toHaveURL(/\/dashboard/)
    })
})
