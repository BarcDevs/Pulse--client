import {
    beforeEach,
    describe,
    expect,
    it
} from 'vitest'

import { clearCsrfToken, getCsrfToken, setCsrfToken } from '@/lib/csrf'

// ==================== csrf ====================
describe(
    'csrf',
    () => {
        beforeEach(() => {
            clearCsrfToken()
        })

        // ==================== getCsrfToken ====================
        describe(
            'getCsrfToken',
            () => {
                it(
                    'should return null initially',
                    () => {
                        expect(getCsrfToken()).toBeNull()
                    })

                it(
                    'should return the token after setCsrfToken',
                    () => {
                        setCsrfToken('my-token')
                        expect(getCsrfToken()).toBe('my-token')
                    })
            })

        // ==================== setCsrfToken ====================
        describe(
            'setCsrfToken',
            () => {
                it(
                    'should set token to null',
                    () => {
                        setCsrfToken('some-token')
                        setCsrfToken(null)
                        expect(getCsrfToken()).toBeNull()
                    })
            })

        // ==================== clearCsrfToken ====================
        describe(
            'clearCsrfToken',
            () => {
                it(
                    'should reset to null after being set',
                    () => {
                        setCsrfToken('token-to-clear')
                        clearCsrfToken()
                        expect(getCsrfToken()).toBeNull()
                    })

                it(
                    'should stay null when token is already null',
                    () => {
                        clearCsrfToken()
                        expect(getCsrfToken()).toBeNull()
                    })
            })
    })
