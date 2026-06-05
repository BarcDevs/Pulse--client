import type { Locale } from 'date-fns'

import type { MoodPainSeriesPoint } from '@/types/checkIn'

import { useQueryWithNetworkError } from '@/hooks/useQueryWithNetworkError'

import { checkInQueryKeys } from '@/constants/queryKeys'
import { minuteInMs } from '@/constants/time'

import { fetchCheckInHistory } from '@/api/checkIn'

export const useCheckInHistory = (
    days: number,
    locale?: Locale,
    options?: {
        enabled?: boolean
    }
) => useQueryWithNetworkError<MoodPainSeriesPoint[]>({
    queryKey: [
        ...checkInQueryKeys.all,
        'history',
        days,
        locale?.code
    ] as const,
    queryFn: () => fetchCheckInHistory(days, locale),
    staleTime: 5 * minuteInMs,
    enabled: options?.enabled !== false,
    retry: false
})
