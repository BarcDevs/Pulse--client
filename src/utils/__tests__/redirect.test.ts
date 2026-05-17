import {
    describe,
    expect,
    it
} from 'vitest'

import {
    getSafeRedirectUrl,
    isValidRedirectUrl
} from '@/utils/redirect'

// ==================== isValidRedirectUrl ====================
describe(
    'isValidRedirectUrl',
    () => {
        it(
            'returns true for relative path',
            () => {
                expect(isValidRedirectUrl('/dashboard')).toBe(true)
            })

        it(
            'returns true for path with query string',
            () => {
                expect(isValidRedirectUrl('/profile?tab=settings')).toBe(true)
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
                expect(getSafeRedirectUrl('/dashboard')).toBe('/dashboard')
            })

        it(
            'returns default "/" when null',
            () => {
                expect(getSafeRedirectUrl(null)).toBe('/')
            })

        it(
            'returns default "/" when undefined',
            () => {
                expect(getSafeRedirectUrl(undefined)).toBe('/')
            })

        it(
            'returns default "/" when URL is invalid',
            () => {
                expect(getSafeRedirectUrl('https://evil.com')).toBe('/')
            })

        it(
            'uses custom default',
            () => {
                expect(getSafeRedirectUrl(null, '/dashboard')).toBe('/dashboard')
            })

        it(
            'decodes encoded relative URL',
            () => {
                expect(
                    getSafeRedirectUrl(encodeURIComponent('/dashboard/goals'))
                ).toBe('/dashboard/goals')
            })

        it(
            'rejects encoded external URL',
            () => {
                expect(
                    getSafeRedirectUrl(encodeURIComponent('https://evil.com'))
                ).toBe('/')
            })
    })
