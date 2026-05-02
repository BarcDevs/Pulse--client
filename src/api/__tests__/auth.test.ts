import {
    beforeEach,
    describe,
    expect,
    it,
    vi
} from 'vitest'

vi.mock(
    '@/api/index',
    () => ( {
        api: {
            post: vi.fn(),
            get: vi.fn()
        }
    } ))

import { api } from '@/api'
import {
    getMe,
    login,
    logout,
    refresh,
    signup
} from '@/api/auth'

// ==================== auth API ====================
describe(
    'auth API',
    () => {
        beforeEach(() => {
            vi.clearAllMocks()
        })

        // ==================== login ====================
        describe(
            'login',
            () => {
                it(
                    'should POST to /auth/login with credentials',
                    async () => {
                        const credentials = {
                            email: 'user@example.com',
                            password: 'Test@1234',
                            remember: false
                        }
                        vi.mocked(api.post)
                            .mockResolvedValueOnce({
                                data: {
                                    message: 'ok',
                                    data: {
                                        token: 't',
                                        _csrf: 'csrf'
                                    }
                                }
                            })

                        await login(credentials)
                        expect(api.post)
                            .toHaveBeenCalledWith(
                                '/auth/login',
                                credentials
                            )
                    })

                it(
                    'should return the response from the API',
                    async () => {
                        const mockResponse = {
                            data: {
                                message: 'ok',
                                data: {
                                    token: 'jwt',
                                    _csrf: 'csrf-123'
                                }
                            }
                        }
                        vi.mocked(api.post)
                            .mockResolvedValueOnce(mockResponse)

                        const result = await login({
                            email: 'user@example.com',
                            password: 'Test@1234',
                            remember: false
                        })
                        expect(result).toEqual(mockResponse.data.data)
                    })
            })

        // ==================== signup ====================
        describe(
            'signup',
            () => {
                it(
                    'should POST to /auth/signup with user data',
                    async () => {
                        const userData = {
                            firstName: 'John',
                            lastName: 'Doe',
                            email: 'john@example.com',
                            password: 'Test@1234'
                        }
                        vi.mocked(api.post)
                            .mockResolvedValueOnce({
                                data: {
                                    message: 'ok',
                                    data: { user: {} }
                                }
                            })

                        await signup(userData)
                        expect(api.post)
                            .toHaveBeenCalledWith(
                                '/auth/signup',
                                userData
                            )
                    })
            })

        // ==================== logout ====================
        describe(
            'logout',
            () => {
                it(
                    'should GET /auth/logout',
                    async () => {
                        vi.mocked(api.get)
                            .mockResolvedValueOnce({})

                        await logout()
                        expect(api.get)
                            .toHaveBeenCalledWith('/auth/logout')
                    })
            })

        // ==================== refresh ====================
        describe(
            'refresh',
            () => {
                it(
                    'should GET /auth/refresh',
                    async () => {
                        vi.mocked(api.get)
                            .mockResolvedValueOnce({
                                data: {
                                    message: 'ok',
                                    data: { _csrf: 'token-abc' }
                                }
                            })

                        await refresh()
                        expect(api.get)
                            .toHaveBeenCalledWith('/auth/refresh')
                    })
            })

        // ==================== getMe ====================
        describe(
            'getMe',
            () => {
                it(
                    'should GET /auth/me',
                    async () => {
                        const mockUser = {
                            id: '1',
                            firstName: 'John',
                            lastName: 'Doe',
                            username: 'johndoe',
                            email: 'john@example.com',
                            role: 'USER'
                        }
                        vi.mocked(api.get)
                            .mockResolvedValueOnce({
                                data: {
                                    message: 'ok',
                                    data: { user: mockUser }
                                }
                            })

                        await getMe()
                        expect(api.get)
                            .toHaveBeenCalledWith('/auth/me')
                    })
            })
    })
