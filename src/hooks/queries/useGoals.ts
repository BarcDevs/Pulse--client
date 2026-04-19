'use client'

import type { Goal } from '@/types/goals'

import { useQueryWithNetworkError } from '@/hooks/useQueryWithNetworkError'

import { recoveryGoalsQueryKeys } from '@/constants/queryKeys'
import { minuteInMs } from '@/constants/time'

import { fetchGoals } from '@/api/goals'

export const useGoals = () =>
    useQueryWithNetworkError<Goal[]>({
        queryKey: recoveryGoalsQueryKeys.all,
        queryFn: () => fetchGoals(),
        staleTime: 5 * minuteInMs,
        retry: false
    })
