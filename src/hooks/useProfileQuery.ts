import {
    useQuery,
    useQueryClient
} from '@tanstack/react-query'

import {Profile} from '@/types/profile'

import {minuteInMs} from '@/constants/time'

import {getProfile} from '@/api/profile'

export const profileQueryKey = [
    'profile',
    'me'
] as const

export const useProfileQuery = () => {
    return useQuery<Profile>({
        queryKey: profileQueryKey,
        queryFn: getProfile,
        staleTime: 5 * minuteInMs
    })
}

export const useInvalidateProfileQuery = () => {
    const queryClient = useQueryClient()
    return () =>
        queryClient.invalidateQueries({
            queryKey: profileQueryKey
        })
}