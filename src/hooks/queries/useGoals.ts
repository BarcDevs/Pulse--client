'use client'

import { useQuery } from '@tanstack/react-query'

import { Goal } from '@/types/goals'
import { Response } from '@/types/responses'

import { recoveryGoalsQueryKeys } from '@/constants/queryKeys'
import { minuteInMs } from '@/constants/time'

import { fetchGoals } from '@/api/goals'

export const useGoals = () =>
    useQuery<Response<Goal[]>>({
        queryKey: recoveryGoalsQueryKeys.all,
        queryFn: async () => {
            const response = await fetchGoals()
            return response.data
        },
        staleTime: 5 * minuteInMs
    })
