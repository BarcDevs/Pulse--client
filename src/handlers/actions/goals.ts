import { Goal } from '@/types/goals'

import {
    createGoal,
    updateGoal
} from '@/api/goals'
import { GoalSchema } from '@/validations/forms/goalSchema'

export const handleGoalCreate = async (
    data: GoalSchema
): Promise<Goal> => {
    return createGoal(data)
}

export const handleGoalUpdate = async (
    goalId: string,
    data: Partial<GoalSchema>
): Promise<Goal> => {
    return updateGoal(goalId, data)
}

export const handleGoalSave = async (
    data: GoalSchema,
    existingGoal?: Goal
): Promise<{ goal: Goal; created: boolean }> => {
    if (existingGoal) {
        const goal = await handleGoalUpdate(
            existingGoal.id,
            data
        )
        return { goal, created: false }
    }

    const goal = await handleGoalCreate(data)
    return { goal, created: true }
}
