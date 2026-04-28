import { Goal } from '@/types/goals'

import { useGoalMutations } from '@/hooks/mutations/useGoalMutations'

import { GoalSchema } from '@/validations/forms/goalSchema'

type UseGoalFormSubmitProps = {
    goal?: Goal
    onSuccessAction?: () => void
}

export const useGoalFormSubmit = ({
    goal,
    onSuccessAction
}: UseGoalFormSubmitProps) => {
    const { createGoal, updateGoal } = useGoalMutations()

    const isUpdate = Boolean(goal)
    const isSubmitting =
        createGoal.isPending
        || updateGoal.isPending

    const handleSubmit = async (data: GoalSchema) => {
        if (isUpdate && goal) {
            await updateGoal.mutateAsync({
                goalId: goal.id,
                data
            })
        } else {
            await createGoal.mutateAsync(data)
        }

        if (onSuccessAction) {
            onSuccessAction()
        }
    }

    return {
        handleSubmit,
        isSubmitting
    }
}
