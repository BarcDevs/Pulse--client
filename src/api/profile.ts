import {
    ActivityPreference,
    HealthInterest,
    Profile,
    ProfileOptions,
    ProfileUpdateInput} from '@/types/profile'

import {api} from './index'

export const getProfile = async (): Promise<Profile> => {
    const {data} = await api.get<Profile>(
        '/profile/me'
    )
    return data
}

export const updateProfile = async (
    updates: ProfileUpdateInput
): Promise<Profile> => {
    const {data} = await api.patch<Profile>(
        '/profile/me',
        updates
    )
    return data
}

export const getProfileOptions = async ():
    Promise<ProfileOptions> => {
    const {data} = await api.get<ProfileOptions>(
        '/profile/options'
    )
    return data
}

export const addInterests = async (
    slugs: string[]
): Promise<HealthInterest[]> => {
    const {data} = await api.post<
        HealthInterest[]
    >(
        '/health-interests',
        {slugs}
    )
    return data
}

export const removeInterest = async (
    slug: string
): Promise<void> => {
    await api.delete(
        `/health-interests/${slug}`
    )
}

export const addActivities = async (
    slugs: string[]
): Promise<ActivityPreference[]> => {
    const {data} = await api.post<
        ActivityPreference[]
    >(
        '/activities',
        {slugs}
    )
    return data
}

export const removeActivity = async (
    slug: string
): Promise<void> => {
    await api.delete(
        `/activities/${slug}`
    )
}