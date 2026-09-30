import {
    beforeEach,
    describe,
    expect,
    it,
    vi
} from 'vitest'

vi.mock(
    '@/config',
    () => ({
        default: {
            serverUrl: 'http://localhost:3000',
            serverApiVersion: 'v2'
        }
    })
)

vi.mock(
    '@/lib/csrf',
    () => ({
        clearCsrfToken: vi.fn()
    })
)

import { redirectToGoogleAuth } from '@/lib/auth'

const origin = 'https://pulserehab.app'
const googleAuthPath = '/api/v2/auth/google'

const redirectedTo = () => new URL(window.location.href)

beforeEach(() => {
    Object.defineProperty(window, 'location', {
        writable: true,
        value: {
            href: '',
            origin
        }
    })
})

describe('redirectToGoogleAuth', () => {
    it('forwards a same-origin path', async () => {
        await redirectToGoogleAuth('/community/post/123')

        const url = redirectedTo()
        expect(url.pathname).toBe(googleAuthPath)
        expect(url.searchParams.get('redirect'))
            .toBe('/community/post/123')
    })

    it('sends no redirect when none is given', async () => {
        await redirectToGoogleAuth()

        expect(redirectedTo().searchParams.has('redirect'))
            .toBe(false)
        await redirectToGoogleAuth(null)
        expect(redirectedTo().searchParams.has('redirect'))
            .toBe(false)
    })

    it('drops an absolute external url', async () => {
        await redirectToGoogleAuth('https://evil.com')

        expect(redirectedTo().searchParams.has('redirect'))
            .toBe(false)
    })

    it('drops protocol-relative, backslash and encoded off-site forms', async () => {
        const hostile = [
            '//evil.com',
            '/\\evil.com',
            '/\t/evil.com',
            '%2F%2Fevil.com',
            '%2F%5Cevil.com',
            'javascript:alert(1)'
        ]

        for (const redirect of hostile) {
            await redirectToGoogleAuth(redirect)
            expect(redirectedTo().searchParams.has('redirect'))
                .toBe(false)
        }
    })

    it('still lands on the Google auth endpoint when the redirect is dropped', async () => {
        await redirectToGoogleAuth('//evil.com')

        const url = redirectedTo()
        expect(url.origin).toBe(origin)
        expect(url.pathname).toBe(googleAuthPath)
    })
})
