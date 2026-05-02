import { useMemo, useState } from 'react'

import { Goal, GoalStatus } from '@/types/goals'

export const useGoalFiltering = (goals: Goal[]) => {
    const [selectedStatuses, setSelectedStatuses] =
        useState<GoalStatus[]>(Object.values(GoalStatus))

    const filteredGoals = useMemo(() =>
        goals.filter((goal) =>
            selectedStatuses.includes(goal.status)
        ),
    [goals, selectedStatuses])

    const toggleStatus = (status: GoalStatus) => {
        setSelectedStatuses((prev) =>
            prev.includes(status)
                ? prev.filter((s) => s !== status)
                : [...prev, status]
        )
    }

    return {
        selectedStatuses,
        toggleStatus,
        filteredGoals
    }
}
