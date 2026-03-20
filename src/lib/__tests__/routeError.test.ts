import {
    beforeEach,
    describe,
    expect,
    it,
    vi
} from 'vitest'

vi.mock(
    '@sentry/react',
    () => ( {
        captureException: vi.fn()
    } ))

vi.mock(
    '@/pages/error/ErrorPage.tsx',
    () => ( {
        default: () => null,
        ErrorPage: () => null
    } ))

import * as Sentry from '@sentry/react'

import { routeError } from '@/lib/routeError'

// ==================== routeError ====================
describe(
    'routeError',
    () => {
        beforeEach(() => {
            vi.clearAllMocks()
            vi.spyOn(console, 'error')
                .mockImplementation(() => {
                })
        })

        // -------------------- errorComponent --------------------
        describe(
            'errorComponent',
            () => {
                it(
                    'should be defined',
                    () => {
                        expect(routeError.errorComponent)
                            .toBeDefined()
                    })
            })

        // -------------------- onError --------------------
        describe(
            'onError',
            () => {
                it(
                    'should log the error to console',
                    () => {
                        const error = new Error('Test error')
                        routeError.onError(error)

                        expect(console.error)
                            .toHaveBeenCalledWith(
                                'Route error:',
                                error
                            )
                    })

                it(
                    'should capture exception with Sentry',
                    () => {
                        const error =
                            new Error('Sentry test error')
                        routeError.onError(error)

                        expect(Sentry.captureException)
                            .toHaveBeenCalledWith(error)
                    })

                it(
                    'should handle string errors',
                    () => {
                        const error = 'String error message'
                        routeError.onError(error)

                        expect(console.error)
                            .toHaveBeenCalledWith(
                                'Route error:',
                                error
                            )
                        expect(Sentry.captureException)
                            .toHaveBeenCalledWith(error)
                    })

                it(
                    'should handle object errors',
                    () => {
                        const error = {
                            message: 'Object error',
                            code: 500
                        }
                        routeError.onError(error)

                        expect(console.error)
                            .toHaveBeenCalledWith(
                                'Route error:',
                                error
                            )
                        expect(Sentry.captureException)
                            .toHaveBeenCalledWith(error)
                    })

                it(
                    'should handle null errors',
                    () => {
                        routeError.onError(null)

                        expect(console.error)
                            .toHaveBeenCalledWith(
                                'Route error:',
                                null
                            )
                        expect(Sentry.captureException)
                            .toHaveBeenCalledWith(null)
                    })

                it(
                    'should handle undefined errors',
                    () => {
                        routeError.onError(undefined)

                        expect(console.error)
                            .toHaveBeenCalledWith(
                                'Route error:',
                                undefined
                            )
                        expect(Sentry.captureException)
                            .toHaveBeenCalledWith(undefined)
                    })
            })
    })
