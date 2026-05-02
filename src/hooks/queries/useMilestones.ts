'use client'

import { useQueries } from '@tanstack/react-query'

import { MilestoneStatus } from '@/types/goals'

import { useGoals } from '@/hooks/queries/useGoals'

import { minuteInMs } from '@/constants/time'

import { fetchGoal } from '@/api/goals'

export const useMilestones = () => {
    const { data: goals } = useGoals()

    const milestonesQueries = useQueries({
        queries: (goals || []).map((goal) => ({
            queryKey: ['goal', goal.id],
            queryFn: () => fetchGoal(goal.id),
            staleTime: 5 * minuteInMs,
            enabled: Boolean(goals)
        }))
    })

    const allMilestones = milestonesQueries
        .flatMap((q) => q.data?.milestones || [])
    const activeMilestones = allMilestones
        .filter((m) => m.status === MilestoneStatus.ACTIVE)
        .length

    return {
        allMilestones,
        activeMilestones,
        isLoading: milestonesQueries.some((q) => q.isLoading),
        isError: milestonesQueries.some((q) => q.isError)
    }
}
