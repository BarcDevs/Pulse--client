import {
    beforeEach,
    describe,
    expect,
    it,
    vi
} from 'vitest'

import {renderHook} from '@testing-library/react'

const {
    mockUseSelector,
    mockHandleLogin,
    mockHandleLogout,
    mockHandleSignup
} = vi.hoisted(() => ({
    mockUseSelector: vi.fn(),
    mockHandleLogin: vi.fn(),
    mockHandleLogout: vi.fn(),
    mockHandleSignup: vi.fn()
}))

vi.mock('react-redux', () => ({
    useSelector: mockUseSelector
}))

vi.mock('@/handlers/auth', () => ({
    handleLogin: mockHandleLogin,
    handleLogout: mockHandleLogout,
    handleSignup: mockHandleSignup,
    getCsrfTokenFromStore: vi.fn(),
    refreshAuthData: vi.fn()
}))

import {useAuth} from '@/hooks/useAuth'

// ==================== useAuth ====================
describe('useAuth',
    () => {
        const mockUser = {
            id: '1',
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@example.com',
            username: 'johndoe',
            role: 'USER'
        }

        beforeEach(() => {
            vi.clearAllMocks()

            vi.stubGlobal(
                'location',
                {reload: vi.fn()}
            )

            mockUseSelector.mockImplementation(
                (selector: any) => {
                    const state = {
                        auth: {
                            isAuthenticated: false,
                            user: null,
                            expiresAt: null
                        }
                    }
                    return selector(state)
                })
        })

        // ==================== user state ====================
        describe('user state',
            () => {
                it(
                    'should return null user when not authenticated',
                    () => {
                        const {result} = renderHook(
                            () => useAuth()
                        )
                        expect(result.current.user).toBeNull()
                    })

                it(
                    'should return user when authenticated',
                    () => {
                        mockUseSelector.mockImplementation(
                            (selector: any) => {
                                const state = {
                                    auth: {
                                        isAuthenticated: true,
                                        user: mockUser,
                                        expiresAt: Date.now() +
                                            3600000
                                    }
                                }
                                return selector(state)
                            })

                        const {result} = renderHook(
                            () => useAuth()
                        )
                        expect(result.current.user)
                            .toEqual(mockUser)
                    })
            })

        // ==================== isLoggedIn ====================
        describe('isLoggedIn',
            () => {
                it(
                    'should return false when not authenticated',
                    () => {
                        const {result} = renderHook(() =>
                            useAuth())
                        expect(result.current.isLoggedIn)
                            .toBe(false)
                    })

                it(
                    'should return true when authenticated',
                    () => {
                        mockUseSelector.mockImplementation(
                            (selector: any) => {
                                const state = {
                                    auth: {
                                        isAuthenticated: true,
                                        user: mockUser,
                                        expiresAt: Date.now() +
                                            3600000
                                    }
                                }
                                return selector(state)
                            })

                        const {result} = renderHook(
                            () => useAuth()
                        )
                        expect(result.current.isLoggedIn)
                            .toBe(true)
                    })
            })

        // ==================== login ====================
        describe('login',
            () => {
                it(
                    'should call handleLogin with credentials',
                    async () => {
                        const credentials = {
                            email: 'test@example.com',
                            password: 'Test@1234',
                            remember: false
                        }

                        mockHandleLogin
                            .mockResolvedValueOnce(true)

                        const {result} = renderHook(() =>
                            useAuth()
                        )
                        await result.current.login(credentials)

                        expect(mockHandleLogin)
                            .toHaveBeenCalledWith(credentials)
                    })

                it(
                    'should return result from handleLogin',
                    async () => {
                        mockHandleLogin
                            .mockResolvedValueOnce(true)

                        const {result} = renderHook(() =>
                            useAuth()
                        )
                        const loginResult =
                            await result.current.login({
                                email: 'test@example.com',
                                password: 'Test@1234',
                                remember: false
                            })

                        expect(loginResult).toBe(true)
                    })
            })

        // ==================== register ====================
        describe('register',
            () => {
                it(
                    'should call handleSignup with data',
                    async () => {
                        const signupData = {
                            firstName: 'John',
                            lastName: 'Doe',
                            email: 'john@example.com',
                            password: 'Test@1234',
                            confirmPassword: 'Test@1234'

                        }

                        mockHandleSignup
                            .mockResolvedValueOnce(true)

                        const {result} = renderHook(
                            () => useAuth()
                        )
                        await result.current.register(signupData)

                        expect(mockHandleSignup)
                            .toHaveBeenCalledWith(signupData)
                    })

                it(
                    'should return result from handleSignup',
                    async () => {
                        mockHandleSignup
                            .mockResolvedValueOnce(true)

                        const {result} = renderHook(
                            () => useAuth()
                        )
                        const registerResult =
                            await result.current.register({
                                email: 'john@example.com',
                                firstName: 'John',
                                lastName: 'Doe',
                                password: 'Test@1234',
                                confirmPassword: 'Test@1234'
                            })

                        expect(registerResult).toBe(true)
                    })
            })

        // ==================== logout ====================
        describe('logout',
            () => {
                it(
                    'should call handleLogout',
                    async () => {
                        mockHandleLogout
                            .mockResolvedValueOnce(undefined)

                        const {result} = renderHook(() =>
                            useAuth()
                        )
                        await result.current.logout()

                        expect(mockHandleLogout)
                            .toHaveBeenCalled()
                    })

                it(
                    'should reload page on logout',
                    async () => {
                        mockHandleLogout
                            .mockResolvedValueOnce(undefined)

                        const {result} = renderHook(
                            () => useAuth()
                        )
                        await result.current.logout()

                        expect(window.location.reload)
                            .toHaveBeenCalled()
                    })
            })

        // ==================== checkAuth ====================
        describe('checkAuth',
            () => {
                it(
                    'should call logout when token has expired',
                    async () => {
                        mockUseSelector.mockImplementation(
                            (selector: any) => {
                                const state = {
                                    auth: {
                                        isAuthenticated: true,
                                        user: mockUser,
                                        expiresAt: Date.now() -
                                            1000
                                    }
                                }
                                return selector(state)
                            })

                        mockHandleLogout
                            .mockResolvedValueOnce(undefined)

                        const {result} = renderHook(
                            () => useAuth()
                        )
                        await result.current.checkAuth()

                        expect(mockHandleLogout)
                            .toHaveBeenCalled()
                    })

                it(
                    'should not call logout when token is still valid',
                    async () => {
                        mockUseSelector.mockImplementation(
                            (selector: any) => {
                                const state = {
                                    auth: {
                                        isAuthenticated: true,
                                        user: mockUser,
                                        expiresAt: Date.now() +
                                            3600000
                                    }
                                }
                                return selector(state)
                            })

                        const {result} = renderHook(
                            () => useAuth()
                        )
                        await result.current.checkAuth()

                        expect(mockHandleLogout).not
                            .toHaveBeenCalled()
                    })

                it(
                    'should not call logout when expiresAt is null',
                    async () => {
                        mockUseSelector.mockImplementation(
                            (selector: any) => {
                                const state = {
                                    auth: {
                                        isAuthenticated: false,
                                        user: null,
                                        expiresAt: null
                                    }
                                }
                                return selector(state)
                            })

                        const {result} = renderHook(
                            () => useAuth()
                        )
                        await result.current.checkAuth()

                        expect(mockHandleLogout).not
                            .toHaveBeenCalled()
                    })
            })
    })
