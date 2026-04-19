import { Goal } from '@/types/goals'

import { useGoalMutations } from '@/hooks/mutations/useGoalMutations'
import { useGoals } from '@/hooks/queries/useGoals'

import { getProgressPercentage } from '@/lib/goals'

type UseRecoveryGoalsDataReturn = {
    goals: Goal[]
    activeGoal: Goal | undefined
    overallPercentage: number
    isLoading: boolean
    isError: boolean
    error: Error | null
    refetch: () => void
    handleToggleMilestone: (
        goalId: string,
        milestoneId: string,
        isCompleted: boolean
    ) => void
}

export const useRecoveryGoalsData =
    (): UseRecoveryGoalsDataReturn => {
        const {
            data: goalsResponse,
            isLoading,
            isError,
            error,
            refetch
        } = useGoals()
        const { updateMilestone } = useGoalMutations()

        const goals = goalsResponse?.data || []
        const activeGoal = goals[0]
        const overallPercentage = activeGoal
            ? getProgressPercentage(activeGoal)
            : 0

        const handleToggleMilestone = (
            goalId: string,
            milestoneId: string,
            isCompleted: boolean
        ) => {
            updateMilestone.mutate({
                goalId,
                milestoneId,
                data: { isCompleted }
            })
        }

        return {
            goals,
            activeGoal,
            overallPercentage,
            isLoading,
            isError,
            error,
            refetch,
            handleToggleMilestone
        }
    }