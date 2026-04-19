import type { CheckInStats } from '@/types/checkIn'
import type { Response } from '@/types/responses'
import { TimePeriod } from '@/types/time'

import { useQueryWithNetworkError } from '@/hooks/useQueryWithNetworkError'

import { checkInQueryKeys } from '@/constants/queryKeys'
import { minuteInMs } from '@/constants/time'

import { fetchCheckInStats } from '@/api/checkIn'

export const useCheckInStats = (
    period?: TimePeriod
) => {
    const queryKey = period
        ? [...checkInQueryKeys.stats, period]
        : checkInQueryKeys.stats

    return useQueryWithNetworkError<Response<CheckInStats>>({
        queryKey,
        queryFn: async () => {
            const response =
                await fetchCheckInStats(period)
            return response.data
        },
        staleTime: 10 * minuteInMs,
        retry: false
    })
}
