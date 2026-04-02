import {useQuery} from '@tanstack/react-query'

import type {User} from '@/types'
import type {Response} from '@/types/responses'
import type {AuthResponse} from '@/types/responses/auth'

import {AUTH_QUERY_KEYS} from '@/constants/queryKeys'
import {minuteInMs} from '@/constants/time'

import {getMe as getMeApi} from '@/api/auth'

export const useGetMe = () => {
    const query = useQuery<
        Response<AuthResponse>,
        Error,
        User
    >({
        queryKey: AUTH_QUERY_KEYS.getMe,
        queryFn: async () => {
            const response = await getMeApi()
            return response.data
        },
        select: (
            data: Response<AuthResponse>
        ) => data.data.user,
        staleTime: 30 * minuteInMs,
        gcTime: 15 * minuteInMs
    })

    return {
        user: query.data ?? null,
        isLoading: query.isLoading,
        isError: query.isError,
        error: query.error,
        refetch: query.refetch,
        status: query.status
    }
}
