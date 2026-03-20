import {
    beforeEach,
    describe,
    expect,
    it,
    vi
} from 'vitest'

const {
    mockDispatch,
    mockGetState
} = vi.hoisted(() => ( {
    mockDispatch: vi.fn(),
    mockGetState: vi.fn()
} ))

vi.mock(
    '@/store',
    () => ( {
        store: {
            dispatch: mockDispatch,
            getState: mockGetState
        }
    } ))

vi.mock(
    '@/api/auth',
    () => ( {
        login: vi.fn(),
        signup: vi.fn(),
        logout: vi.fn(),
        getCsrfToken: vi.fn(),
        getMe: vi.fn()
    } ))

vi.mock(
    '@/store/authSlice',
    () => ( {
        loginAction: vi.fn((payload: any) => (
            {
                type: 'auth/login',
                payload
            }
        )),
        logoutAction: vi.fn(() => (
            { type: 'auth/logout' }
        ))
    } ))

vi.mock(
    '@/store/tokenSlice',
    () => ( {
        setTokenAction: vi.fn((token: string) => (
            {
                type: 'token/setToken',
                payload: token
            }
        )),
        removeTokenAction: vi.fn(() => (
            { type: 'token/removeToken' }
        ))
    } ))

import {
    getCsrfTokenFromStore,
    handleLogin,
    handleLogout,
    handleSignup,
    refreshAuthData
} from '@/handlers/auth'

import * as authApi from '@/api/auth'

// ==================== auth handlers ====================
describe('auth handlers',
    () => {
        beforeEach(() => {
            vi.clearAllMocks()
        })

        // ==================== getCsrfTokenFromStore ====================
        describe('getCsrfTokenFromStore',
            () => {
                it(
                    'should return token from store state',
                    () => {
                        mockGetState.mockReturnValue(
                            {
                                token: {
                                    token: 'csrf-token-123'
                                }
                            }
                        )
                        expect(getCsrfTokenFromStore())
                            .toBe('csrf-token-123')
                    })

                it(
                    'should return null when no token exists',
                    () => {
                        mockGetState.mockReturnValue(
                            { token: { token: null } }
                        )
                        expect(getCsrfTokenFromStore())
                            .toBeNull()
                    })
            })

        // ==================== handleLogin ====================
        describe('handleLogin',
            () => {
                const credentials = {
                    email: 'user@example.com',
                    password: 'Test@1234',
                    remember: false
                }

                it(
                    'should login, set CSRF token, and return true',
                    async () => {
                        vi.mocked(authApi.login)
                            .mockResolvedValueOnce({
                                data: {
                                    message: 'ok',
                                    data: {
                                        token: 'jwt',
                                        _csrf: 'csrf-123'
                                    }
                                }
                            } as any)

                        vi.mocked(authApi.getMe)
                            .mockResolvedValueOnce({
                                data: {
                                    message: 'ok',
                                    data: {
                                        user: {
                                            id: '1',
                                            firstName: 'John',
                                            lastName: 'Doe',
                                            username: 'johndoe',
                                            email: 'john@example.com',
                                            role: 'USER'
                                        }
                                    }
                                }
                            } as any)

                        const result =
                            await handleLogin(credentials)

                        expect(result).toBe(true)
                        expect(authApi.login)
                            .toHaveBeenCalledWith(credentials)
                        expect(mockDispatch)
                            .toHaveBeenCalledWith(
                                expect.objectContaining({
                                    type: 'token/setToken',
                                    payload: 'csrf-123'
                                })
                            )
                    })

                it(
                    'should return false when login returns no data',
                    async () => {
                        vi.mocked(authApi.login)
                            .mockResolvedValueOnce({
                                data: {
                                    message: 'error',
                                    data: null
                                }
                            } as any)

                        const result =
                            await handleLogin(credentials)
                        expect(result).toBe(false)
                    })

                it(
                    'should call getMe after successful login',
                    async () => {
                        vi.mocked(authApi.login)
                            .mockResolvedValueOnce({
                                data: {
                                    message: 'ok',
                                    data: {
                                        token: 'jwt',
                                        _csrf: 'csrf-456'
                                    }
                                }
                            } as any)

                        vi.mocked(authApi.getMe)
                            .mockResolvedValueOnce({
                                data: {
                                    message: 'ok',
                                    data: {
                                        user: { id: '1' }
                                    }
                                }
                            } as any)

                        await handleLogin(credentials)
                        expect(authApi.getMe).toHaveBeenCalled()
                    })
            })

        // ==================== handleSignup ====================
        describe('handleSignup',
            () => {
                const userData = {
                    firstName: 'John',
                    lastName: 'Doe',
                    email: 'john@example.com',
                    password: 'Test@1234'
                }

                it(
                    'should signup and return true on success',
                    async () => {
                        vi.mocked(authApi.signup)
                            .mockResolvedValueOnce({
                                data: {
                                    message: 'ok',
                                    data: {
                                        user: {}
                                    }
                                }
                            } as any)

                        const result = await handleSignup(userData)
                        expect(result).toBe(true)
                        expect(authApi.signup).toHaveBeenCalled()
                    })

                it(
                    'should return false when signup returns no data',
                    async () => {
                        vi.mocked(authApi.signup)
                            .mockResolvedValueOnce({
                                data: {
                                    message: 'error',
                                    data: null
                                }
                            } as any)

                        const result = await handleSignup(userData)
                        expect(result).toBe(false)
                    })

                it(
                    'should strip confirmPassword before sending to API',
                    async () => {
                        const userDataWithConfirm = {
                            ...userData,
                            confirmPassword: 'Test@1234'
                        }

                        vi.mocked(authApi.signup)
                            .mockResolvedValueOnce({
                                data: {
                                    message: 'ok',
                                    data: {
                                        user: {}
                                    }
                                }
                            } as any)

                        await handleSignup(userDataWithConfirm)

                        const calledWith =
                            vi.mocked(authApi.signup).mock.calls[ 0 ][ 0 ]
                        expect(calledWith)
                            .not.toHaveProperty('confirmPassword')
                    })
            })

        // ==================== handleLogout ====================
        describe('handleLogout',
            () => {
                it(
                    'should call logout API and dispatch both actions',
                    async () => {
                        vi.mocked(authApi.logout)
                            .mockResolvedValueOnce(undefined as any)

                        await handleLogout()

                        expect(authApi.logout).toHaveBeenCalled()
                        expect(mockDispatch).toHaveBeenCalledWith(
                            expect.objectContaining(
                                { type: 'token/removeToken' }
                            )
                        )
                        expect(mockDispatch).toHaveBeenCalledWith(
                            expect.objectContaining(
                                { type: 'auth/logout' }
                            )
                        )
                    })

                it(
                    'should dispatch removeToken before logoutAction',
                    async () => {
                        vi.mocked(authApi.logout)
                            .mockResolvedValueOnce(undefined as any)

                        await handleLogout()

                        const calls = mockDispatch.mock.calls
                        const removeTokenIndex = calls.findIndex(
                            (c: any) =>
                                c[ 0 ].type === 'token/removeToken'
                        )
                        const logoutIndex = calls.findIndex(
                            (c: any) =>
                                c[ 0 ].type === 'auth/logout'
                        )
                        expect(removeTokenIndex)
                            .toBeLessThan(logoutIndex)
                    })
            })

        // ==================== refreshAuthData ====================
        describe('refreshAuthData',
            () => {
                it(
                    'should refresh CSRF token and fetch user data',
                    async () => {
                        vi.mocked(authApi.getCsrfToken)
                            .mockResolvedValueOnce({
                                data: {
                                    message: 'ok',
                                    data: {
                                        _csrf: 'new-csrf'
                                    }
                                }
                            } as any)

                        vi.mocked(authApi.getMe)
                            .mockResolvedValueOnce({
                                data: {
                                    message: 'ok',
                                    data: {
                                        user: { id: '1' }
                                    }
                                }
                            } as any)

                        const result = await refreshAuthData()

                        expect(result).toBe(true)
                        expect(mockDispatch)
                            .toHaveBeenCalledWith(
                                expect.objectContaining({
                                    type: 'token/setToken',
                                    payload: 'new-csrf'
                                })
                            )
                    })

                it(
                    'should return false when CSRF fetch has no data',
                    async () => {
                        vi.mocked(authApi.getCsrfToken)
                            .mockResolvedValueOnce({
                                data: {
                                    message: 'error',
                                    data: null
                                }
                            } as any)

                        const result = await refreshAuthData()
                        expect(result).toBe(false)
                    })

                it(
                    'should call getMe after successful CSRF refresh',
                    async () => {
                        vi.mocked(authApi.getCsrfToken)
                            .mockResolvedValueOnce({
                                data: {
                                    message: 'ok',
                                    data: {
                                        _csrf: 'csrf-789'
                                    }
                                }
                            } as any)

                        vi.mocked(authApi.getMe)
                            .mockResolvedValueOnce({
                                data: {
                                    message: 'ok',
                                    data: {
                                        user: { id: '1' }
                                    }
                                }
                            } as any)

                        await refreshAuthData()
                        expect(authApi.getMe).toHaveBeenCalled()
                    })
            })
    })
