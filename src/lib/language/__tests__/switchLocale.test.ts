import {
    beforeEach,
    describe,
    expect,
    it,
    vi
} from 'vitest'

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
})
