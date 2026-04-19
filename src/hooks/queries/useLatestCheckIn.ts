import { useQueryWithNetworkError } from '@/hooks/useQueryWithNetworkError'

import { isTodayCheckIn } from '@/lib/checkIn/loaderHelpers'

import { checkInQueryKeys } from '@/constants/queryKeys'
import { minuteInMs } from '@/constants/time'

import { fetchCheckIns } from '@/api/checkIn'

export const useLatestCheckIn = () => {
    const {
        data: response,
        isLoading,
        isError,
        error,
        refetch
    } = useQueryWithNetworkError({
        queryKey: checkInQueryKeys.all,
        queryFn: () => fetchCheckIns(1),
        staleTime: 5 * minuteInMs,
        retry: false
    })

    const latestCheckIn = response?.[0] ?? null
    const isTodayCheckInExists = latestCheckIn
        ? isTodayCheckIn(latestCheckIn) : false

    return {
        latestCheckIn,
        isTodayCheckInExists,
        isLoading,
        isError,
        error,
        refetch
    }
}
