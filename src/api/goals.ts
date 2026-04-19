import type {
    Goal,
    GoalInput,
    GoalMilestone,
    MilestoneInput,
    MilestonePatchInput
} from '@/types/goals'
import type { Response } from '@/types/responses'

import { api } from '@/api/index'
import { ENDPOINTS } from '@/api/routes'

export const fetchGoals = async ():
    Promise<Goal[]> => {
    const res = await api.get<Response<Goal[]>>(
        ENDPOINTS.recoveryGoals.base
    )
    return res.data.data
}

export const fetchGoal = async (
    goalId: string
): Promise<Goal> => {
    const res = await api.get<Response<Goal>>(
        ENDPOINTS.recoveryGoals.goal(goalId)
    )
    return res.data.data
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
