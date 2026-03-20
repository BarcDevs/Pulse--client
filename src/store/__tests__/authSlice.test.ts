import {
    describe,
    expect,
    it,
    vi
} from 'vitest'

vi.mock(
    '@/config',
    () => ( {
        default: {
            loginDuration: 604800000
        }
    } ))

import authSlice, {
    loginAction,
    logoutAction
} from '@/store/authSlice'

// ==================== authSlice ====================
describe('authSlice',
    () => {
        const mockUser = {
            id: '1',
            firstName: 'John',
            lastName: 'Doe',
            username: 'johndoe',
            email: 'john@example.com',
            role: 'USER' as const
        }

        const initialState = {
            isAuthenticated: false,
            user: undefined,
            expiresAt: null
        }

        it(
            'should return the initial state',
            () => {
                const state = authSlice(
                    undefined,
                    { type: 'unknown' }
                )
                expect(state.isAuthenticated).toBe(false)
                expect(state.user).toBeUndefined()
                expect(state.expiresAt).toBeNull()
            })

        it(
            'should handle login without remember',
            () => {
                const state = authSlice(
                    initialState,
                    loginAction({
                        user: mockUser
                    }))
                expect(state.isAuthenticated).toBe(true)
                expect(state.user).toEqual(mockUser)
                expect(state.expiresAt).toBeNull()
            })

        it(
            'should handle login with remember and set expiresAt',
            () => {
                const now = 1700000000000
                vi.spyOn(Date, 'now').mockReturnValue(now)

                const state = authSlice(
                    initialState,
                    loginAction({
                        user: mockUser,
                        remember: true
                    }))

                expect(state.isAuthenticated).toBe(true)
                expect(state.user).toEqual(mockUser)
                expect(state.expiresAt).toBe(now + 604800000)

                vi.restoreAllMocks()
            })

        it(
            'should handle logout from authenticated state',
            () => {
                const loggedInState = {
                    isAuthenticated: true,
                    user: mockUser,
                    expiresAt: Date.now() + 604800000
                }

                const state = authSlice(
                    loggedInState,
                    logoutAction()
                )
                expect(state.isAuthenticated).toBe(false)
                expect(state.user).toBeUndefined()
                expect(state.expiresAt).toBeNull()
            })

        it(
            'should clear all auth data on logout',
            () => {
                const loggedInState = {
                    isAuthenticated: true,
                    user: mockUser,
                    expiresAt: Date.now() + 604800000
                }

                const state = authSlice(
                    loggedInState,
                    logoutAction()
                )
                expect(state).toEqual({
                    isAuthenticated: false,
                    user: undefined,
                    expiresAt: null
                })
            })

        it(
            'should replace user on subsequent login',
            () => {
                const newUser = {
                    ...mockUser,
                    id: '2',
                    email: 'new@example.com'
                }
                const loggedInState = {
                    isAuthenticated: true,
                    user: mockUser,
                    expiresAt: null
                }

                const state = authSlice(
                    loggedInState,
                    loginAction({
                        user: newUser
                    })
                )
                expect(state.user).toEqual(newUser)
            })

        it(
            'should handle logout when already logged out',
            () => {
                const state = authSlice(
                    initialState,
                    logoutAction()
                )
                expect(state).toEqual({
                    isAuthenticated: false,
                    user: undefined,
                    expiresAt: null
                })
            })
    })
