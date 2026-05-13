import type { PartialUser } from '@/types/user'

import { api } from './index'

type UpdateUserInput = {
    firstName?: string
    lastName?: string
    username?: string
}

type ChangePasswordInput = {
    currentPassword: string
    newPassword: string
}

export const updateUser = async (
    updates: UpdateUserInput
): Promise<PartialUser> => {
    const { data } = await api.patch<{
        data: PartialUser
    }>(
        '/users/me',
        updates
    )
    return data.data
}

export const changePassword = async (
    input: ChangePasswordInput
): Promise<void> => {
    await api.patch('/users/password', input)
}

export const deleteUser = async (): Promise<void> => {
    await api.delete('/users/me')
}
