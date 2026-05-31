import type { TodayObservationResponse } from '@/types/insight'

import { useQueryWithNetworkError } from '@/hooks/useQueryWithNetworkError'

import { insightsQueryKeys } from '@/constants/queryKeys'
import { hourInMs } from '@/constants/time'

import { fetchTodayObservation } from '@/api/insight'

export const useDailyObservation = () => {
    const {
        data,
        isLoading,
        refetch
    } = useQueryWithNetworkError<TodayObservationResponse | null>({
        queryKey: insightsQueryKeys.observation,
        queryFn: fetchTodayObservation,
        staleTime: hourInMs,
        retry: false
    })

    return {
        data,
        isLoading,
        refetch
    }
}
