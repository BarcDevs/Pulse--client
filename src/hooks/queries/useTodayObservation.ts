import type { TodayObservationResponse } from '@/types/insight'

import { useQueryWithNetworkError } from '@/hooks/useQueryWithNetworkError'

import { insightsQueryKeys } from '@/constants/queryKeys'
import { minuteInMs } from '@/constants/time'

import { fetchTodayObservation } from '@/api/insight'

export const useTodayObservation = () =>
    useQueryWithNetworkError<TodayObservationResponse | null>({
        queryKey: insightsQueryKeys.observation,
        queryFn: fetchTodayObservation,
        staleTime: 60 * minuteInMs,
        retry: false
    })
