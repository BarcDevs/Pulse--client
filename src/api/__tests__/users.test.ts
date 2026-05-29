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
            patch: vi.fn(),
            delete: vi.fn()
        }
    } ))

import { api } from '@/api'
import {
    changePassword,
    deleteUser,
    updateUser
} from '@/api/users'

const mockUser = {
    id: 'u-1',
    firstName: 'John',
    lastName: 'Doe',
    username: 'johndoe',
    email: 'john@example.com'
}

// ==================== users API ====================
describe(
    'users API',
    () => {
        beforeEach(() => {
            vi.clearAllMocks()
        })

        // ==================== updateUser ====================
        describe(
            'updateUser',
            () => {
                it(
                    'should PATCH /users/me with updates',
                    async () => {
                        const updates = { firstName: 'Jane', username: 'janedoe' }
                        vi.mocked(api.patch)
                            .mockResolvedValueOnce({
                                data: { data: mockUser }
                            })

                        await updateUser(updates)
                        expect(api.patch)
                            .toHaveBeenCalledWith(
                                '/users/me',
                                updates
                            )
                    })

                it(
                    'should return the updated user',
                    async () => {
                        const updates = { firstName: 'Jane' }
                        vi.mocked(api.patch)
                            .mockResolvedValueOnce({
                                data: { data: mockUser }
                            })

                        const result = await updateUser(updates)
                        expect(result).toEqual(mockUser)
                    })
            })

        // ==================== changePassword ====================
        describe(
            'changePassword',
            () => {
                it(
                    'should PATCH /users/password with currentPassword and newPassword',
                    async () => {
                        const input = {
                            currentPassword: 'OldPass@1',
                            newPassword: 'NewPass@1'
                        }
                        vi.mocked(api.patch)
                            .mockResolvedValueOnce({})

                        await changePassword(input)
                        expect(api.patch)
                            .toHaveBeenCalledWith(
                                '/users/password',
                                input
                            )
                    })

                it(
                    'should resolve void',
                    async () => {
                        vi.mocked(api.patch)
                            .mockResolvedValueOnce({})

                        const result = await changePassword({
                            currentPassword: 'OldPass@1',
                            newPassword: 'NewPass@1'
                        })
                        expect(result).toBeUndefined()
                    })
            })

        // ==================== deleteUser ====================
        describe(
            'deleteUser',
            () => {
                it(
                    'should DELETE /users/me',
                    async () => {
                        vi.mocked(api.delete)
                            .mockResolvedValueOnce({})

                        await deleteUser()
                        expect(api.delete)
                            .toHaveBeenCalledWith('/users/me')
                    })

                it(
                    'should resolve void',
                    async () => {
                        vi.mocked(api.delete)
                            .mockResolvedValueOnce({})

                        const result = await deleteUser()
                        expect(result).toBeUndefined()
                    })
            })
    })
