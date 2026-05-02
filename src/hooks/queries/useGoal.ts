'use client'

import type { Goal } from '@/types/goals'

import { useQueryWithNetworkError } from '@/hooks/useQueryWithNetworkError'

import { recoveryGoalsQueryKeys } from '@/constants/queryKeys'
import { minuteInMs } from '@/constants/time'

import { fetchGoal } from '@/api/goals'

export const useGoal = (goalId: string | null | undefined) =>
    useQueryWithNetworkError<Goal | null>({
        queryKey: recoveryGoalsQueryKeys.goal(
            goalId || 'unknown'
        ),
        queryFn: () => goalId
            ? fetchGoal(goalId)
            : Promise.resolve(null),
        staleTime: 5 * minuteInMs,
        retry: false,
        enabled: Boolean(goalId)
    })
