import {
    beforeEach,
    describe,
    expect,
    it,
    vi
} from 'vitest'

import { getApiErrorMessage, isNetworkError, isUnauthorizedError } from '@/utils/error'

// ==================== error utils ====================
describe(
    'error utils',
    () => {
        beforeEach(() => {
            vi.clearAllMocks()
        })

        // ==================== getApiErrorMessage ====================
        describe(
            'getApiErrorMessage',
            () => {
                it(
                    'should return response.data.message when present',
                    () => {
                        const error = { response: { data: { message: 'API message' } } }

                        expect(getApiErrorMessage(error, 'fallback')).toBe('API message')
                    })

                it(
                    'should fall back to error.message when response.data.message is absent',
                    () => {
                        const error = new Error('native error')

                        expect(getApiErrorMessage(error, 'fallback')).toBe('native error')
                    })

                it(
                    'should fall back to fallback string when neither is present',
                    () => {
                        expect(getApiErrorMessage(null, 'fallback')).toBe('fallback')
                    })
            })

        // ==================== isUnauthorizedError ====================
        describe(
            'isUnauthorizedError',
            () => {
                it(
                    'should return false for null',
                    () => {
                        expect(isUnauthorizedError(null)).toBe(false)
                    })

                it(
                    'should return true for a 401 status error',
                    () => {
                        const error = Object.assign(new Error('unauthorized'), { response: { status: 401 } })

                        expect(isUnauthorizedError(error)).toBe(true)
                    })

                it(
                    'should return false for a 403 status error',
                    () => {
                        const error = Object.assign(new Error('forbidden'), { response: { status: 403 } })

                        expect(isUnauthorizedError(error)).toBe(false)
                    })
            })

        // ==================== isNetworkError ====================
        describe(
            'isNetworkError',
            () => {
                it(
                    'should return false for null',
                    () => {
                        expect(isNetworkError(null)).toBe(false)
                    })

                it(
                    'should return true for a message containing "network"',
                    () => {
                        expect(isNetworkError(new Error('network timeout'))).toBe(true)
                    })

                it(
                    'should return true for a message containing "ECONNREFUSED" (case insensitive)',
                    () => {
                        expect(isNetworkError(new Error('ECONNREFUSED'))).toBe(true)
                    })

                it(
                    'should return true for a message containing "fetch"',
                    () => {
                        expect(isNetworkError(new Error('fetch failed'))).toBe(true)
                    })

                it(
                    'should return false for an unrelated message',
                    () => {
                        expect(isNetworkError(new Error('something unrelated'))).toBe(false)
                    })
            })
    })
