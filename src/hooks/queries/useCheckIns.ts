'use client'

import type { CheckIn } from '@/types/checkIn'

import { useQueryWithNetworkError } from '@/hooks/useQueryWithNetworkError'

import { checkInQueryKeys } from '@/constants/queryKeys'
import { minuteInMs } from '@/constants/time'

import { fetchCheckIns } from '@/api/checkIn'

export const useCheckIns = (
    limit?: number,
    options?: {
        enabled?: boolean
    }
) => useQueryWithNetworkError<CheckIn[]>({
    queryKey: [
        ...checkInQueryKeys.all,
        'list',
        limit
    ] as const,
    queryFn: () => fetchCheckIns(limit),
    staleTime: 5 * minuteInMs,
    enabled: options?.enabled !== false,
    retry: false
})
