import type { Profile } from '@/types/profile'

import { useQueryWithNetworkError } from '@/hooks/useQueryWithNetworkError'

import { authQueryKeys } from '@/constants/queryKeys'
import { minuteInMs } from '@/constants/time'

import { useAuth } from '@/context/AuthContext'

import { getProfile as getProfileApi } from '@/api/profile'

export const useProfile = (
    options?: {
        enabled?: boolean
    }
) => {
    const { user, isLoading: authIsLoading } = useAuth()

    const isEnabled =
        options?.enabled !== false
        && !!user
        && !authIsLoading

    const query = useQueryWithNetworkError<Profile>({
        queryKey: authQueryKeys.profile,
        queryFn: () => getProfileApi(),
        enabled: isEnabled,
        staleTime: 5 * minuteInMs,
        gcTime: 10 * minuteInMs,
        retry: false
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
