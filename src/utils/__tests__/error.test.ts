import {
    beforeEach,
    describe,
    expect,
    it,
    vi
} from 'vitest'

import {
    getApiErrorMessage,
    isAbortedError,
    isNetworkError,
    isUnauthorizedError
} from '@/utils/error'

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

                it(
                    'should return true for an axios ERR_NETWORK code',
                    () => {
                        const error = Object.assign(new Error('x'), { code: 'ERR_NETWORK' })

                        expect(isNetworkError(error)).toBe(true)
                    })

                it(
                    'should return true for 502/503/504 responses',
                    () => {
                        const error = Object.assign(new Error('x'), { response: { status: 503, data: {} } })

                        expect(isNetworkError(error)).toBe(true)
                    })

                it(
                    'should return true for an empty-bodied 500 (proxy, backend down)',
                    () => {
                        const error = Object.assign(new Error('Request failed with status code 500'), { response: { status: 500, data: '' } })

                        expect(isNetworkError(error)).toBe(true)
                    })

                it(
                    'should return false for a 500 carrying an API error message',
                    () => {
                        const error = Object.assign(new Error('Request failed with status code 500'), { response: { status: 500, data: { message: 'boom' } } })

                        expect(isNetworkError(error)).toBe(false)
                    })
            })
    })

describe('isAbortedError', () => {
    it('matches an axios request aborted mid-flight', () => {
        const error = Object.assign(new Error('Request aborted'), { code: 'ECONNABORTED' })

        expect(isAbortedError(error)).toBe(true)
    })

    it.each([
        ['a timeout', Object.assign(new Error('timeout of 10000ms exceeded'), { code: 'ECONNABORTED' })],
        ['a network error', Object.assign(new Error('Network Error'), { code: 'ERR_NETWORK' })],
        ['no error', null]
    ])('does not match %s', (_label, error) => {
        expect(isAbortedError(error)).toBe(false)
    })
})
