import { useMemo, useState } from 'react'

import { Goal, GoalStatus } from '@/types/goals'

import {
    GOAL_STATUS_ORDER,
    sortGoalsByStatus,
    sortGoalStatuses
} from '@/lib/goals'

export const useGoalFiltering = (goals: Goal[]) => {
    const [selectedStatuses, setSelectedStatuses] =
        useState<GoalStatus[]>([...GOAL_STATUS_ORDER])

    const filteredGoals = useMemo(() =>
        sortGoalsByStatus(
            goals.filter((goal) =>
                selectedStatuses.includes(goal.status)
            )
        ),
    [goals, selectedStatuses])

    const toggleStatus = (status: GoalStatus) => {
        setSelectedStatuses((prev) =>
            prev.includes(status)
                ? prev.filter((s) => s !== status)
                : sortGoalStatuses([...prev, status])
        )
    }

    return {
        selectedStatuses,
        toggleStatus,
        filteredGoals
    }
}
