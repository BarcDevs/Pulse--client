import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const { mockCookieGet, mockCookieStore } = vi.hoisted(() => {
    const mockCookieGet = vi.fn()
    const mockCookieStore = { get: mockCookieGet }
    return { mockCookieGet, mockCookieStore }
})

let capturedHandler: (args: {
    requestLocale: Promise<string | undefined>
}) => Promise<{
    locale: string
    messages: object
}>

vi.mock('next-intl/server', () => ({
    getRequestConfig: vi.fn((handler: typeof capturedHandler) => {
        capturedHandler = handler
        return handler
    })
}))

vi.mock('next/headers', () => ({
    cookies: vi.fn(() => Promise.resolve(mockCookieStore))
}))

beforeEach(() => {
    mockCookieGet.mockReset()
})

afterEach(() => {
    vi.clearAllMocks()
})

// Import triggers getRequestConfig, capturing the handler
await import('@/lib/language/request')

describe('request locale resolution', () => {
    it('uses cookie locale when valid', async () => {
        mockCookieGet.mockReturnValue({ value: 'en-US' })

        const result = await capturedHandler({
            requestLocale: Promise.resolve(undefined)
        })

        expect(result.locale).toBe('en-US')
    })

    it('uses requestLocale when no cookie is set', async () => {
        mockCookieGet.mockReturnValue(undefined)

        const result = await capturedHandler({
            requestLocale: Promise.resolve('en-US')
        })

        expect(result.locale).toBe('en-US')
    })

    it('falls back to default locale (he-IL) when no cookie and no requestLocale', async () => {
        mockCookieGet.mockReturnValue(undefined)

        const result = await capturedHandler({
            requestLocale: Promise.resolve(undefined)
        })

        expect(result.locale).toBe('he-IL')
    })

    it('falls back to default when cookie locale is unsupported', async () => {
        mockCookieGet.mockReturnValue({ value: 'fr-FR' })

        const result = await capturedHandler({
            requestLocale: Promise.resolve(undefined)
        })

        expect(result.locale).toBe('he-IL')
    })

    it('falls back to default when requestLocale is unsupported', async () => {
        mockCookieGet.mockReturnValue(undefined)

        const result = await capturedHandler({
            requestLocale: Promise.resolve('ja-JP')
        })

        expect(result.locale).toBe('he-IL')
    })

    it('cookie takes priority over requestLocale', async () => {
        mockCookieGet.mockReturnValue({ value: 'he-IL' })

        const result = await capturedHandler({
            requestLocale: Promise.resolve('en-US')
        })

        expect(result.locale).toBe('he-IL')
    })

    it('returns messages object for resolved locale', async () => {
        mockCookieGet.mockReturnValue({ value: 'en-US' })

        const result = await capturedHandler({
            requestLocale: Promise.resolve(undefined)
        })

        expect(typeof result.messages).toBe('object')
        expect(result.messages).not.toBeNull()
    })
})
