import type { MoodPainSeriesPoint } from '@/types/checkIn'
import type { Response } from '@/types/responses'

import { useQueryWithNetworkError } from '@/hooks/useQueryWithNetworkError'

import { checkInQueryKeys } from '@/constants/queryKeys'
import { minuteInMs } from '@/constants/time'

import { fetchCheckInHistory } from '@/api/checkIn'

export const useCheckInHistory = (
    days: number,
    options?: {
        enabled?: boolean
    }
) => useQueryWithNetworkError<Response<MoodPainSeriesPoint[]>>({
    queryKey: [
        ...checkInQueryKeys.all,
        'history',
        days
    ] as const,
    queryFn: async () => {
        const response = await fetchCheckInHistory(days)
        return response.data
    },
    staleTime: 5 * minuteInMs,
    enabled: options?.enabled !== false,
    retry: false
})
