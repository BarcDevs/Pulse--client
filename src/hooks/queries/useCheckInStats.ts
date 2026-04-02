import {useQuery} from '@tanstack/react-query'

import type {CheckInStats} from '@/types/checkIn/checkIn'
import type {Response} from '@/types/responses'

import {checkInQueryKeys} from '@/constants/queryKeys'
import {minuteInMs} from '@/constants/time'

import {fetchCheckInStats} from '@/api/checkIn'

export const useCheckInStats = () => {
    return useQuery<Response<CheckInStats>>({
        queryKey: checkInQueryKeys.stats,
        queryFn: async () => {
            const response = await fetchCheckInStats()
            return response.data
        },
        staleTime: 10 * minuteInMs
    })
}
