import {
    Profile,
    ProfileOptions,
    ProfileUpdateInput
} from '@/types/profile'

import { api } from './index'

export const getProfile = async ():
    Promise<Profile> => {
    const { data } = await api.get<{
        data: Profile
    }>(
        '/profile'
    )
    return data.data
}

export const updateProfile = async (
    updates: ProfileUpdateInput
): Promise<Profile> => {
    const { data } = await api.patch<{
        data: Profile
    }>(
        '/profile',
        updates
    )
    return data.data
}

export const getProfileOptions = async ():
    Promise<ProfileOptions> => {
    const { data } = await api.get<{ data: string[] }>('/profile/list/activities')
    return { activityPreferences: data.data }
}