import {
    useMutation,
    useQueryClient
} from '@tanstack/react-query'

import {
    GoalInput,
    MilestoneInput,
    MilestonePatchInput
} from '@/types/goals'

import { recoveryGoalsQueryKeys } from '@/constants/queryKeys'

import {
    createGoal,
    createMilestone,
    deleteGoal,
    deleteMilestone,
    updateGoal,
    updateMilestone
} from '@/api/goals'

export const useGoalMutations = () => {
    const queryClient = useQueryClient()

    const createGoalMutation = useMutation({
        mutationFn: (data: GoalInput) =>
            createGoal(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: recoveryGoalsQueryKeys.all
            })
        }
    })

    const updateGoalMutation = useMutation({
        mutationFn: ({
            goalId,
            data
        }: {
            goalId: string
            data: Partial<GoalInput>
        }) => updateGoal(goalId, data),
        onSuccess: (_, { goalId }) => {
            queryClient.invalidateQueries({
                queryKey: recoveryGoalsQueryKeys.all
            })
            queryClient.invalidateQueries({
                queryKey: recoveryGoalsQueryKeys.goal(
                    goalId
                )
            })
        }
    })

    const deleteGoalMutation = useMutation({
        mutationFn: (goalId: string) =>
            deleteGoal(goalId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: recoveryGoalsQueryKeys.all
            })
        }
    })

    const createMilestoneMutation = useMutation({
        mutationFn: ({
            goalId,
            data
        }: {
            goalId: string
            data: MilestoneInput
        }) => createMilestone(goalId, data),
        onSuccess: (_, { goalId }) => {
            queryClient.invalidateQueries({
                queryKey: recoveryGoalsQueryKeys.goal(
                    goalId
                )
            })
        }
    })

    const updateMilestoneMutation = useMutation({
        mutationFn: ({
            goalId,
            milestoneId,
            data
        }: {
            goalId: string
            milestoneId: string
            data: MilestonePatchInput
        }) =>
            updateMilestone(
                goalId,
                milestoneId,
                data
            ),
        onSuccess: (_, { goalId }) => {
            queryClient.invalidateQueries({
                queryKey: recoveryGoalsQueryKeys.goal(
                    goalId
                )
            })
        }
    })

    const deleteMilestoneMutation = useMutation({
        mutationFn: ({
            goalId,
            milestoneId
        }: {
            goalId: string
            milestoneId: string
        }) => deleteMilestone(goalId, milestoneId),
        onSuccess: (_, { goalId }) => {
            queryClient.invalidateQueries({
                queryKey: recoveryGoalsQueryKeys.goal(
                    goalId
                )
            })
        }
    })

    return {
        createGoal: createGoalMutation,
        updateGoal: updateGoalMutation,
        deleteGoal: deleteGoalMutation,
        createMilestone: createMilestoneMutation,
        updateMilestone: updateMilestoneMutation,
        deleteMilestone: deleteMilestoneMutation
    }
}
