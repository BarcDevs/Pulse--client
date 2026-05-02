import { useGoalMutations } from '@/hooks/mutations/useGoalMutations'

export const useConfirmDelete = () => {
    const { deleteGoal } = useGoalMutations()

    const handleConfirmDelete = async (goalId: string) => {
        const confirmed = confirm(
            'Delete this goal? This action cannot be undone.'
        )

        if (confirmed) {
            try {
                await deleteGoal.mutateAsync(goalId)
            } catch (err) {
                console.error('Failed to delete goal:', err)
            }
        }
    }

    return { handleConfirmDelete }
}
