import { Goal, MilestoneStatus } from '@/types/goals'

import { useGoalMutations }
    from '@/hooks/mutations/useGoalMutations'
import { useGoals } from '@/hooks/queries/useGoals'

import { getProgressPercentage }
    from '@/lib/goals/getProgressPercentage'
import { sortGoalsByStatus } from '@/lib/goals/sortGoalsByStatus'

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

        const goals = sortGoalsByStatus(goalsResponse || [])
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
                data: {
                    status: isCompleted
                        ? MilestoneStatus.COMPLETED
                        : MilestoneStatus.ACTIVE
                }
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