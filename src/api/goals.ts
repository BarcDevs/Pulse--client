import {
    Goal,
    GoalInput,
    GoalMilestone,
    MilestoneInput,
    MilestonePatchInput
} from '@/types/goals'
import { ApiResponse, Response } from '@/types/responses'

import { ENDPOINTS } from '@/constants/endpoints'

import { api } from '@/api/index'

export const fetchGoals = async (): ApiResponse<Goal[]> =>
    api.get<Response<Goal[]>>(
        ENDPOINTS.recoveryGoals.base
    )

export const fetchGoal = async (
    goalId: string
): ApiResponse<Goal> =>
    api.get<Response<Goal>>(
        ENDPOINTS.recoveryGoals.goal(goalId)
    )

export const createGoal = async (
    data: GoalInput
): ApiResponse<Goal> =>
    api.post<Response<Goal>>(
        ENDPOINTS.recoveryGoals.base,
        data
    )

export const updateGoal = async (
    goalId: string,
    data: Partial<GoalInput>
): ApiResponse<Goal> =>
    api.patch<Response<Goal>>(
        ENDPOINTS.recoveryGoals.goal(goalId),
        data
    )

export const deleteGoal = async (
    goalId: string
): ApiResponse<void> =>
    api.delete<Response<void>>(
        ENDPOINTS.recoveryGoals.goal(goalId)
    )

export const createMilestone = async (
    goalId: string,
    data: MilestoneInput
): ApiResponse<GoalMilestone> =>
    api.post<Response<GoalMilestone>>(
        ENDPOINTS.recoveryGoals.milestones(goalId),
        data
    )

export const updateMilestone = async (
    goalId: string,
    milestoneId: string,
    data: MilestonePatchInput
): ApiResponse<GoalMilestone> =>
    api.patch<Response<GoalMilestone>>(
        ENDPOINTS.recoveryGoals.milestone(
            goalId,
            milestoneId
        ),
        data
    )

export const deleteMilestone = async (
    goalId: string,
    milestoneId: string
): ApiResponse<void> =>
    api.delete<Response<void>>(
        ENDPOINTS.recoveryGoals.milestone(
            goalId,
            milestoneId
        )
    )
