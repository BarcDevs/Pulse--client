import {
    ActivityPreference,
    HealthInterest,
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
    const { data } = await api.get<{
        data: ProfileOptions
    }>(
        '/profile/options'
    )
    return data.data
}

export const addInterests = async (
    slugs: string[]
): Promise<HealthInterest[]> => {
    const { data } = await api.post<{
        message: string
        data: HealthInterest[]
    }>(
        '/profile/health-interests',
        { slugs }
    )
    return data.data
}

export const removeInterest = async (
    slug: string
): Promise<void> => {
    await api.delete(
        `/profile/health-interests/${slug}`
    )
}

export const addActivities = async (
    slugs: string[]
): Promise<ActivityPreference[]> => {
    const { data } = await api.post<{
        message: string
        data: ActivityPreference[]
    }>(
        '/profile/activities',
        { slugs }
    )
    return data.data
}

export const removeActivity = async (
    slug: string
): Promise<void> => {
    await api.delete(
        `/profile/activities/${slug}`
    )
}