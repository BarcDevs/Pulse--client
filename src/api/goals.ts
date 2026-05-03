import type {
    Goal,
    GoalCategory,
    GoalInput,
    GoalMilestone,
    GoalStatus,
    MilestoneInput,
    MilestonePatchInput,
    RecoveryGoalsStats
} from '@/types/goals'
import type { Response } from '@/types/responses'

import { api } from '@/api/index'
import { ENDPOINTS } from '@/api/routes'

export const fetchGoals = async ():
    Promise<Goal[]> => {
    const res = await api.get<Response<Goal[]>>(
        ENDPOINTS.recoveryGoals.base
    )
    return res.data.data.map((goal) => ({
        ...goal,
        status: (goal.status as string)
            .toUpperCase() as GoalStatus,
        category: (goal.category as string)
            .toUpperCase() as GoalCategory
    }))
}

export const fetchGoal = async (
    goalId: string
): Promise<Goal> => {
    const res = await api.get<{
        data: { goal: Goal; milestones: GoalMilestone[] }
    }>(
        ENDPOINTS.recoveryGoals.goal(goalId)
    )
    return {
        ...res.data.data.goal,
        milestones: res.data.data.milestones.map(
            (milestone) => ({
                ...milestone,
                status: (milestone.status as string)
                    .toUpperCase() as typeof milestone.status
            })
        )
    }
}

export const createGoal = async (
    data: GoalInput
): Promise<Goal> => {
    const res = await api.post<{
        data: Goal
    }>(
        ENDPOINTS.recoveryGoals.base,
        data
    )
    return res.data.data
}

export const updateGoal = async (
    goalId: string,
    data: Partial<GoalInput>
): Promise<Goal> => {
    const res = await api.patch<{
        data: Goal
    }>(
        ENDPOINTS.recoveryGoals.goal(goalId),
        data
    )
    return res.data.data
}

export const deleteGoal = async (
    goalId: string
): Promise<void> => {
    await api.delete(
        ENDPOINTS.recoveryGoals.goal(goalId)
    )
    return undefined
}

export const createMilestone = async (
    goalId: string,
    data: MilestoneInput
): Promise<GoalMilestone> => {
    const res = await api.post<{
        data: GoalMilestone
    }>(
        ENDPOINTS.recoveryGoals.milestones(goalId),
        data
    )
    return res.data.data
}

export const updateMilestone = async (
    goalId: string,
    milestoneId: string,
    data: MilestonePatchInput
): Promise<GoalMilestone> => {
    const res = await api.patch<{
        data: GoalMilestone
    }>(
        ENDPOINTS.recoveryGoals.milestone(
            goalId,
            milestoneId
        ),
        data
    )
    return res.data.data
}

export const deleteMilestone = async (
    goalId: string,
    milestoneId: string
): Promise<void> => {
    await api.delete(
        ENDPOINTS.recoveryGoals.milestone(
            goalId,
            milestoneId
        )
    )
    return undefined
}

export const completeMilestone = async (
    goalId: string,
    milestoneId: string
): Promise<GoalMilestone> => {
    const res = await api.patch<{
        data: GoalMilestone
    }>(
        ENDPOINTS.recoveryGoals.completeMilestone(
            goalId,
            milestoneId
        )
    )
    return res.data.data
}

export const fetchRecoveryGoalsStats = async ():
    Promise<RecoveryGoalsStats> => {
    const res = await api.get<
        Response<RecoveryGoalsStats>
    >(
        ENDPOINTS.recoveryGoals.stats
    )
    return res.data.data
}
