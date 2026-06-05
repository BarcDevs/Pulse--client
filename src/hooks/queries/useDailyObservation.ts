import type { TodayObservationResponse } from '@/types/insight'

import { useQueryWithNetworkError } from '@/hooks/useQueryWithNetworkError'

import { getMsUntilMidnight } from '@/lib/time'

import { insightsQueryKeys } from '@/constants/queryKeys'

import { fetchTodayObservation } from '@/api/insight'

export const useDailyObservation = () => {
    const {
        data,
        isLoading,
        refetch
    } = useQueryWithNetworkError<
        TodayObservationResponse | null
    >({
        queryKey: insightsQueryKeys.observation,
        queryFn: fetchTodayObservation,
        staleTime: getMsUntilMidnight(),
        retry: false
    })

    return {
        data,
        isLoading,
        refetch
    }
}
