import type { CheckInStats } from '@/types/checkIn'
import type { TimePeriod } from '@/types/time'

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

    return useQueryWithNetworkError<CheckInStats>({
        queryKey,
        queryFn: () => fetchCheckInStats(period),
        staleTime: 10 * minuteInMs,
        retry: false
    })
}
