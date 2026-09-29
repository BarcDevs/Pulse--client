import {
    describe,
    expect,
    it
} from 'vitest'

import {
    getSafeRedirectUrl,
    isValidRedirectUrl
} from '@/utils/redirect'

import { ROUTES } from '@/constants/routes'

// ==================== isValidRedirectUrl ====================
describe(
    'isValidRedirectUrl',
    () => {
        it(
            'returns true for relative path',
            () => {
                expect(isValidRedirectUrl(ROUTES.DASHBOARD)).toBe(true)
            })

        it(
            'returns true for path with query string',
            () => {
                expect(isValidRedirectUrl(`${ROUTES.PROFILE}?tab=settings`)).toBe(true)
            })

        it(
            'returns false for empty string',
            () => {
                expect(isValidRedirectUrl('')).toBe(false)
            })

        it(
            'returns false for protocol-relative URL',
            () => {
                expect(isValidRedirectUrl('//evil.com')).toBe(false)
            })

        it(
            'returns false for https URL',
            () => {
                expect(isValidRedirectUrl('https://evil.com')).toBe(false)
            })

        it(
            'returns false for http URL',
            () => {
                expect(isValidRedirectUrl('http://evil.com/path')).toBe(false)
            })
    })

// ==================== getSafeRedirectUrl ====================
describe(
    'getSafeRedirectUrl',
    () => {
        it(
            'returns relative URL as-is',
            () => {
                expect(getSafeRedirectUrl(ROUTES.DASHBOARD)).toBe(ROUTES.DASHBOARD)
            })

        it(
            'returns default "/" when null',
            () => {
                expect(getSafeRedirectUrl(null)).toBe(ROUTES.HOME)
            })

        it(
            'returns default "/" when undefined',
            () => {
                expect(getSafeRedirectUrl(undefined)).toBe(ROUTES.HOME)
            })

        it(
            'returns default "/" when URL is invalid',
            () => {
                expect(getSafeRedirectUrl('https://evil.com')).toBe(ROUTES.HOME)
            })

        it(
            'uses custom default',
            () => {
                expect(getSafeRedirectUrl(null, ROUTES.DASHBOARD))
                    .toBe(ROUTES.DASHBOARD)
            })

        it(
            'decodes encoded relative URL',
            () => {
                expect(
                    getSafeRedirectUrl(encodeURIComponent(ROUTES.RECOVERY_GOALS))
                ).toBe(ROUTES.RECOVERY_GOALS)
            })

        it(
            'rejects encoded external URL',
            () => {
                expect(
                    getSafeRedirectUrl(encodeURIComponent('https://evil.com'))
                ).toBe(ROUTES.HOME)
            })

        it.each([
            ['backslash', '/\\evil.com'],
            ['encoded backslash', '%2F%5Cevil.com'],
            ['tab before slash', '/\t/evil.com'],
            ['newline before slash', '/\n/evil.com'],
            ['protocol-relative', '//evil.com'],
            ['double-encoded protocol-relative', '%252F%252Fevil.com']
        ])(
            'rejects the off-site %s trick',
            (_label, url) => {
                expect(getSafeRedirectUrl(url)).toBe(ROUTES.HOME)
            })

        it(
            'falls back on malformed percent-encoding instead of throwing',
            () => {
                expect(getSafeRedirectUrl('%E0%A4%A')).toBe(ROUTES.HOME)
            })

        it(
            'keeps query and hash on same-origin paths',
            () => {
                expect(getSafeRedirectUrl('/community?tab=new#top'))
                    .toBe('/community?tab=new#top')
            })
    })
