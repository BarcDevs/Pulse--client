import type { User } from '@/types/user'

import { useQueryWithError } from '@/hooks/useQueryWithError'

import { authQueryKeys } from '@/constants/queryKeys'
import { minuteInMs } from '@/constants/time'

import { getMe as getMeApi } from '@/api/auth'

export const useGetMe = (enabled = true) => {
    const query = useQueryWithError<User>({
        queryKey: authQueryKeys.getMe,
        queryFn: async () => {
            const response = await getMeApi()
            return response.user
        },
        enabled,
        staleTime: 30 * minuteInMs,
        gcTime: 15 * minuteInMs,
        retry: false
    })

    return {
        user: query.data ?? null,
        status: {
            value: query.status,
            isLoading: query.isLoading,
            isError: query.isError,
            error: query.error
        },
        actions: {
            refetch: query.refetch
        }
    }
}
