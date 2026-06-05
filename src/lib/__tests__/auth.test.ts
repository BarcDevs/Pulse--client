import { AxiosError } from 'axios'
import {
    beforeEach,
    describe,
    expect,
    it,
    vi
} from 'vitest'

import { ROUTES } from '@/constants/routes'

vi.mock(
    '@/config',
    () => ({
        default: { serverUrl: 'http://localhost:3000' }
    })
)

vi.mock(
    '@/api/auth',
    () => ({
        refresh: vi.fn(),
        logout: vi.fn()
    })
)

vi.mock(
    '@/lib/csrf',
    () => ({
        clearCsrfToken: vi.fn()
    })
)

import {
    authState,
    callRefresh,
    initiateLogout,
    performRefresh
} from '@/lib/auth'
import { clearCsrfToken } from '@/lib/csrf'

import { logout,refresh } from '@/api/auth'

const resetAuthState = () => {
    authState.isRefreshing = false
    authState.isShuttingDown = false
    authState.requestQueue = []
    authState.onRefreshSuccess = null
}

beforeEach(() => {
    resetAuthState()
    vi.clearAllMocks()
    Object.defineProperty(window, 'location', {
        writable: true,
        value: {
            href: '',
            pathname: ROUTES.DASHBOARD,
            search: ''
        }
    })
})

// ==================== callRefresh ====================
describe(
    'callRefresh',
    () => {
        it(
            'returns true on success',
            async () => {
                vi.mocked(refresh).mockResolvedValueOnce(
                    { _csrf: 'token' }
                )
                expect(await callRefresh()).toBe(true)
            })

        it(
            'calls onRefreshSuccess on success',
            async () => {
                const cb = vi.fn()
                authState.onRefreshSuccess = cb
                vi.mocked(refresh).mockResolvedValueOnce(
                    { _csrf: 'token' }
                )
                await callRefresh()
                expect(cb).toHaveBeenCalledOnce()
            })

        it(
            'returns false on failure',
            async () => {
                vi.mocked(refresh).mockRejectedValueOnce(
                    new Error('network fail')
                )
                expect(await callRefresh()).toBe(false)
            })

        it(
            'does not call onRefreshSuccess on failure',
            async () => {
                const cb = vi.fn()
                authState.onRefreshSuccess = cb
                vi.mocked(refresh).mockRejectedValueOnce(
                    new Error('network fail')
                )
                await callRefresh()
                expect(cb).not.toHaveBeenCalled()
            })
    })

// ==================== performRefresh ====================
describe(
    'performRefresh',
    () => {
        it(
            'returns true when refresh succeeds',
            async () => {
                vi.mocked(refresh).mockResolvedValueOnce(
                    { _csrf: 'token' }
                )
                expect(await performRefresh()).toBe(true)
            })

        it(
            'calls initiateLogout and returns false when refresh fails',
            async () => {
                vi.mocked(refresh).mockRejectedValueOnce(
                    new Error('fail')
                )
                vi.mocked(logout).mockResolvedValueOnce(null)

                const result = await performRefresh()

                expect(result).toBe(false)
                expect(window.location.href).toContain(ROUTES.LOGIN)
            })

        it(
            'skips logout when skipLogout=true and refresh fails',
            async () => {
                vi.mocked(refresh).mockRejectedValueOnce(
                    new Error('fail')
                )

                const result = await performRefresh(true)

                expect(result).toBe(false)
                expect(logout).not.toHaveBeenCalled()
            })
    })

// ==================== initiateLogout ====================
describe(
    'initiateLogout',
    () => {
        beforeEach(() => {
            vi.mocked(logout).mockResolvedValue(null)
        })

        it(
            'clears CSRF token',
            async () => {
                await initiateLogout()
                expect(clearCsrfToken).toHaveBeenCalledOnce()
            })

        it(
            'sets isShuttingDown to true',
            async () => {
                await initiateLogout()
                expect(authState.isShuttingDown).toBe(true)
            })

        it(
            'resets isRefreshing to false',
            async () => {
                authState.isRefreshing = true
                await initiateLogout()
                expect(authState.isRefreshing).toBe(false)
            })

        it(
            'rejects all queued requests',
            async () => {
                const reject = vi.fn()
                authState.requestQueue = [
                    {
                        resolve: vi.fn(),
                        reject,
                        config: {} as any
                    }
                ]
                await initiateLogout()
                expect(reject).toHaveBeenCalledWith(
                    expect.any(AxiosError)
                )
                expect(authState.requestQueue).toHaveLength(0)
            })

        it(
            'redirects to /login with redirectPath param when provided',
            async () => {
                await initiateLogout(ROUTES.RECOVERY_GOALS)
                expect(window.location.href).toBe(
                    ROUTES.loginWithRedirect(ROUTES.RECOVERY_GOALS)
                )
            })

        it(
            'falls back to window.location when no redirectPath',
            async () => {
                await initiateLogout()
                expect(window.location.href).toContain(
                    `${ROUTES.LOGIN}?redirect=`
                )
            })
    })
