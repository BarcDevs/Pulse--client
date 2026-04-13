import { useQuery } from '@tanstack/react-query'

import { isTodayCheckIn } from '@/lib/checkIn/loaderHelpers'

import { checkInQueryKeys } from '@/constants/queryKeys'
import { minuteInMs } from '@/constants/time'

import { fetchCheckIns } from '@/api/checkIn'

export const useLatestCheckIn = () => {
    const {
        data: response,
        isLoading,
        error
    } = useQuery({
        queryKey: checkInQueryKeys.all,
        queryFn: async () => {
            const result = await fetchCheckIns(1)
            return result.data
        },
        staleTime: 5 * minuteInMs
    })

    const latestCheckIn = response?.data?.[0] ?? null
    const isTodayCheckInExists = latestCheckIn
        ? isTodayCheckIn(latestCheckIn) : false

    return {
        latestCheckIn,
        isTodayCheckInExists,
        isLoading,
        error
    }
}
