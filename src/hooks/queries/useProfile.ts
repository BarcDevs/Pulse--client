import {useQuery} from '@tanstack/react-query'

import type {Profile} from '@/types/profile/profile'

import {authQueryKeys} from '@/constants/queryKeys'
import {minuteInMs} from '@/constants/time'

import {useAuth} from '@/context/AuthContext'

import {getProfile as getProfileApi} from '@/api/profile'

export const useProfile = (
    options?: {
        enabled?: boolean
    }
) => {
    const { user, isLoading: authIsLoading } = useAuth()

    const isEnabled =
        options?.enabled !== false &&
        !!user &&
        !authIsLoading

    const query = useQuery<Profile, Error>({
        queryKey: authQueryKeys.profile,
        queryFn: () => getProfileApi(),
        enabled: isEnabled,
        staleTime: 5 * minuteInMs,
        gcTime: 10 * minuteInMs
    })

    return {
        profile: query.data ?? null,
        isLoading: query.isLoading,
        isError: query.isError,
        error: query.error,
        refetch: query.refetch,
        status: query.status
    }
}
