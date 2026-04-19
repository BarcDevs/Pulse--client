'use client'

import type { CheckIn } from '@/types/checkIn'
import type { Response } from '@/types/responses'

import { useQueryWithError } from '@/hooks/useQueryWithError'

import { checkInQueryKeys } from '@/constants/queryKeys'
import { minuteInMs } from '@/constants/time'

import { fetchCheckIns } from '@/api/checkIn'

export const useCheckIns = (
    limit?: number,
    options?: {
        enabled?: boolean
    }
) => {
    return useQueryWithError<Response<CheckIn[]>>({
        queryKey: [
            ...checkInQueryKeys.all,
            'list',
            limit
        ] as const,
        queryFn: async () => {
            const response = await fetchCheckIns(limit)
            return response.data
        },
        staleTime: 5 * minuteInMs,
        enabled: options?.enabled !== false,
        retry: false
    })
}
