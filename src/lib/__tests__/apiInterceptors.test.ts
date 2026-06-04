import { AxiosError } from 'axios'
import {
    beforeEach,
    describe,
    expect,
    it,
    vi
} from 'vitest'

import { ROUTES } from '@/constants/routes'

const mockAuthState = vi.hoisted(() => ({
    isShuttingDown: false,
    isRefreshing: false,
    requestQueue: [] as any[],
    onRefreshSuccess: null
}))

vi.mock(
    '@/lib/auth',
    () => ({
        authState: mockAuthState,
        callRefresh: vi.fn(),
        performRefresh: vi.fn(),
        initiateLogout: vi.fn(),
        flushQueue: vi.fn(),
        rejectAll: vi.fn()
    })
)

vi.mock(
    '@/lib/csrf',
    () => ({
        getCsrfToken: vi.fn().mockReturnValue('csrf-token'),
        setCsrfToken: vi.fn()
    })
)

import { handleResponseError } from '@/lib/apiInterceptors'
import {
    callRefresh,
    flushQueue,
    initiateLogout,
    performRefresh
} from '@/lib/auth'

const makeError = ({
    status = 401,
    message,
    url = '/api/data',
    retry = false
}: {
    status?: number
    message?: string
    url?: string
    retry?: boolean
} = {}) => {
    const error = new AxiosError(message ?? 'Error')
    error.response = {
        status,
        data: { message }
    } as any
    error.config = {
        url,
        _retry: retry
    } as any
    return error
}

const mockApi = vi.fn()

// ==================== handleResponseError ====================
describe(
    'handleResponseError',
    () => {
        beforeEach(() => {
            mockAuthState.isShuttingDown = false
            mockAuthState.isRefreshing = false
            mockAuthState.requestQueue = []
            vi.clearAllMocks()
            vi.mocked(callRefresh).mockResolvedValue(true)
            vi.mocked(performRefresh).mockResolvedValue(true)
            vi.mocked(initiateLogout).mockResolvedValue(undefined)
            mockApi.mockResolvedValue({ data: {} })
        })

        it(
            'rejects immediately when shutting down',
            async () => {
                mockAuthState.isShuttingDown = true
                const error = makeError()
                await expect(
                    handleResponseError(error, mockApi as any)
                ).rejects.toBe(error)
            })

        it(
            'passes through non-401 errors',
            async () => {
                const error = makeError({ status: 500 })
                await expect(
                    handleResponseError(error, mockApi as any)
                ).rejects.toBe(error)
                expect(initiateLogout).not.toHaveBeenCalled()
            })

        it(
            'passes through 401 on /auth/login without logout',
            async () => {
                const error = makeError({ url: '/auth/login' })
                await expect(
                    handleResponseError(error, mockApi as any)
                ).rejects.toBe(error)
                expect(initiateLogout).not.toHaveBeenCalled()
            })

        it(
            'passes through 401 on /auth/signup without logout',
            async () => {
                const error = makeError({ url: '/auth/signup' })
                await expect(
                    handleResponseError(error, mockApi as any)
                ).rejects.toBe(error)
                expect(initiateLogout).not.toHaveBeenCalled()
            })

        it(
            'passes through 401 on /auth/refresh without logout',
            async () => {
                const error = makeError({ url: '/auth/refresh' })
                await expect(
                    handleResponseError(error, mockApi as any)
                ).rejects.toBe(error)
                expect(initiateLogout).not.toHaveBeenCalled()
            })

        // ==================== CSRF errors ====================
        describe(
            'CSRF error',
            () => {
                it(
                    'calls callRefresh and retries request on CSRF error',
                    async () => {
                        const error = makeError({
                            message: 'Unauthorized! CSRF token is invalid or missing'
                        })
                        vi.mocked(callRefresh).mockResolvedValue(true)

                        await handleResponseError(error, mockApi as any)

                        expect(callRefresh).toHaveBeenCalledOnce()
                        expect(mockApi).toHaveBeenCalledWith(error.config)
                    })

                it(
                    'calls initiateLogout when CSRF refresh fails',
                    async () => {
                        const error = makeError({
                            message: 'Unauthorized! CSRF token is invalid or missing'
                        })
                        vi.mocked(callRefresh).mockResolvedValue(false)

                        await expect(
                            handleResponseError(error, mockApi as any)
                        ).rejects.toBe(error)

                        expect(initiateLogout).toHaveBeenCalledOnce()
                        expect(mockApi).not.toHaveBeenCalled()
                    })

                it(
                    'skips CSRF refresh when already retried and calls initiateLogout',
                    async () => {
                        const error = makeError({
                            message: 'Unauthorized! CSRF token is invalid or missing',
                            retry: true
                        })

                        await expect(
                            handleResponseError(error, mockApi as any)
                        ).rejects.toBe(error)

                        expect(callRefresh).not.toHaveBeenCalled()
                        expect(initiateLogout).toHaveBeenCalledOnce()
                    })
            })

        // ==================== token 401 ====================
        describe(
            'token 401',
            () => {
                it(
                    'calls initiateLogout when already retried',
                    async () => {
                        const error = makeError({ retry: true })

                        await expect(
                            handleResponseError(error, mockApi as any)
                        ).rejects.toBe(error)

                        expect(initiateLogout).toHaveBeenCalledOnce()
                    })

                it(
                    'queues request on first 401',
                    async () => {
                        const error = makeError()

                        handleResponseError(error, mockApi as any)

                        await new Promise(r => setTimeout(r, 0))

                        expect(mockAuthState.requestQueue).toHaveLength(1)
                    })

                it(
                    'starts performRefresh on first 401',
                    async () => {
                        const error = makeError()

                        handleResponseError(error, mockApi as any)

                        await new Promise(r => setTimeout(r, 0))

                        expect(performRefresh).toHaveBeenCalledOnce()
                    })

                it(
                    'does not start refresh when already refreshing',
                    async () => {
                        mockAuthState.isRefreshing = true
                        const error = makeError()

                        handleResponseError(error, mockApi as any)

                        await new Promise(r => setTimeout(r, 0))

                        expect(performRefresh).not.toHaveBeenCalled()
                    })

                it(
                    'calls flushQueue with success after refresh',
                    async () => {
                        vi.mocked(performRefresh).mockResolvedValue(true)
                        const error = makeError()

                        handleResponseError(error, mockApi as any)

                        await new Promise(r => setTimeout(r, 0))

                        expect(flushQueue).toHaveBeenCalledWith(
                            mockApi,
                            true,
                            undefined
                        )
                    })

                it(
                    'marks _retry on original request',
                    async () => {
                        const error = makeError()

                        handleResponseError(error, mockApi as any)

                        expect((error.config as any)._retry).toBe(true)
                    })
            })
    })
