import { Goal } from '@/types/goals'

import { useGoalsContext } from '@/context/GoalsContext'

import { GoalSchema } from '@/validations/forms/goalSchema'

type UseGoalFormSubmitProps = {
    goal?: Goal
    onSuccessAction?: () => void
}

export const useGoalFormSubmit = ({
    goal,
    onSuccessAction
}: UseGoalFormSubmitProps) => {
    const { addGoal, updateGoal } = useGoalsContext()
    const isUpdate = Boolean(goal)

    const handleSubmit = (
        data: GoalSchema
    ): Promise<void> => {
        if (isUpdate && goal) {
            updateGoal(goal.id, data)
        } else {
            addGoal(data)
        }
        onSuccessAction?.()
        return Promise.resolve()
    }

    return { handleSubmit }
}
