import {
    Profile,
    ProfileOptions,
    ProfileUpdateInput
} from '@/types/profile'

import { api } from './index'
import { ENDPOINTS } from './routes'

export const getProfile = async ():
    Promise<Profile> => {
    const { data } = await api.get<{
        data: Profile
    }>(
        ENDPOINTS.profile.base
    )
    return data.data
}

export const updateProfile = async (
    updates: ProfileUpdateInput
): Promise<Profile> => {
    const { data } = await api.patch<{
        data: Profile
    }>(
        ENDPOINTS.profile.base,
        updates
    )
    return data.data
}

export const getProfileOptions = async ():
    Promise<ProfileOptions> => {
    const { data } = await api.get<{
        data: string[]
    }>(ENDPOINTS.profile.listActivities)
    return { activityPreferences: data.data }
}