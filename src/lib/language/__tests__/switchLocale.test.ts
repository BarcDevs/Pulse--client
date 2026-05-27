import { beforeEach, describe, expect, it, vi } from 'vitest'

const { mockUpdateProfile } = vi.hoisted(() => ({
    mockUpdateProfile: vi.fn()
}))

vi.mock('@/api/profile', () => ({
    updateProfile: mockUpdateProfile
}))

const { mockCookieSet, mockCookieStore } = vi.hoisted(() => {
    const mockCookieSet = vi.fn()
    const mockCookieStore = { set: mockCookieSet }
    return { mockCookieSet, mockCookieStore }
})

vi.mock('next/headers', () => ({
    cookies: vi.fn(() => Promise.resolve(mockCookieStore))
}))

import { switchLocale } from '@/lib/language/switchLocale'

beforeEach(() => {
    vi.clearAllMocks()
})

describe('switchLocale', () => {
    it('sets NEXT_LOCALE cookie with the given locale', async () => {
        await switchLocale('en-US')

        expect(mockCookieSet).toHaveBeenCalledWith('NEXT_LOCALE', 'en-US')
    })

    it('sets cookie for any locale string', async () => {
        await switchLocale('he-IL')

        expect(mockCookieSet).toHaveBeenCalledWith('NEXT_LOCALE', 'he-IL')
    })

    it('does not call updateProfile when window is defined (client side)', async () => {
        // jsdom environment has window defined — this is the client path
        await switchLocale('en-US')

        expect(mockUpdateProfile).not.toHaveBeenCalled()
    })

    it('calls updateProfile with language when on server side', async () => {
        vi.stubGlobal('window', undefined)

        mockUpdateProfile.mockResolvedValueOnce({})

        await switchLocale('en-US')

        expect(mockUpdateProfile).toHaveBeenCalledWith({ language: 'en-US' })

        vi.unstubAllGlobals()
    })

    it('does not throw when updateProfile fails on server side', async () => {
        vi.stubGlobal('window', undefined)

        mockUpdateProfile.mockRejectedValueOnce(new Error('Network error'))

        await expect(switchLocale('en-US')).resolves.toBeUndefined()

        vi.unstubAllGlobals()
    })
})
