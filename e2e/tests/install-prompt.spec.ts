import { expect, type Page,test } from '@playwright/test'

import {
    mockApiFallback,
    mockAuth,
    setEnglishLocale
} from '../helpers/mockApi'

const IOS_USER_AGENT = 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1'
const ANDROID_USER_AGENT = 'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Mobile Safari/537.36'
const SNOOZE_KEY = 'pulse:installPromptSnoozedUntil'
const PHONE = { width: 390, height: 844 }
const DESKTOP = { width: 1280, height: 800 }

const openDashboard = async (page: Page) => {
    await setEnglishLocale(page)
    await mockApiFallback(page)
    await mockAuth(page)
    await page.goto('/dashboard')
}

const fireInstallPrompt = (page: Page, outcome: 'accepted' | 'dismissed') =>
    page.evaluate((choice) => {
        const event = new Event('beforeinstallprompt') as Event & {
            prompt: () => Promise<void>
            userChoice: Promise<{ outcome: string, platform: string }>
        }

        ;(window as unknown as { installPrompted: boolean }).installPrompted = false
        event.prompt = async () => {
            ;(window as unknown as { installPrompted: boolean }).installPrompted = true
        }
        event.userChoice = Promise.resolve({ outcome: choice, platform: 'web' })
        window.dispatchEvent(event)
    }, outcome)

// The hook only listens once React has hydrated, so keep firing until it reacts
const showNativePrompt = (page: Page, outcome: 'accepted' | 'dismissed') =>
    expect(async () => {
        await fireInstallPrompt(page, outcome)
        await expect(page.getByRole('dialog')).toBeVisible({ timeout: 500 })
    }).toPass()

test.describe('Install prompt on iOS', () => {
    test.use({
        viewport: PHONE,
        userAgent: IOS_USER_AGENT,
        hasTouch: true
    })

    test('shows the Add to Home Screen steps and snoozes on dismiss', async ({ page }) => {
        await openDashboard(page)

        const dialog = page.getByRole('dialog')

        await expect(dialog.getByText('Pulse can be installed')).toBeVisible()
        await expect(dialog.getByText('Choose Add to Home Screen')).toBeVisible()
        await expect(dialog.getByRole('button', { name: 'Install' })).toHaveCount(0)

        await dialog.getByRole('button', { name: 'Got it' }).click()

        await expect(dialog).toHaveCount(0)
        expect(await page.evaluate((key) => localStorage.getItem(key), SNOOZE_KEY)).not.toBeNull()
    })

    test('stays hidden while snoozed', async ({ page }) => {
        await page.addInitScript((key) => {
            localStorage.setItem(key, String(Date.now() + 60_000))
        }, SNOOZE_KEY)
        await openDashboard(page)

        await expect(page.locator('main')).toBeVisible()
        await expect(page.getByRole('dialog')).toHaveCount(0)
    })
})

test.describe('Install prompt on Android', () => {
    test.use({
        viewport: PHONE,
        userAgent: ANDROID_USER_AGENT,
        hasTouch: true
    })

    test('Install button triggers the native prompt', async ({ page }) => {
        await openDashboard(page)
        await expect(page.getByRole('dialog')).toHaveCount(0)

        const dialog = page.getByRole('dialog')

        await showNativePrompt(page, 'accepted')

        await expect(dialog.getByText('Pulse can be installed')).toBeVisible()
        await dialog.getByRole('button', { name: 'Install' }).click()

        await expect.poll(() => page.evaluate(() => (window as unknown as { installPrompted: boolean }).installPrompted)).toBe(true)
        await expect(dialog).toHaveCount(0)
    })

    test('Not now snoozes the prompt', async ({ page }) => {
        await openDashboard(page)
        const dialog = page.getByRole('dialog')

        await showNativePrompt(page, 'dismissed')

        await dialog.getByRole('button', { name: 'Not now' }).click()

        await expect(dialog).toHaveCount(0)
        expect(await page.evaluate((key) => localStorage.getItem(key), SNOOZE_KEY)).not.toBeNull()
    })
})

test.describe('Install prompt on desktop', () => {
    test.use({ viewport: DESKTOP })

    test('is never shown', async ({ page }) => {
        await openDashboard(page)
        await fireInstallPrompt(page, 'accepted')

        await expect(page.getByRole('dialog')).toHaveCount(0)
    })
})
