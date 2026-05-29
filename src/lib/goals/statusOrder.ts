import { GoalStatus } from '@/types/goals'

export const GOAL_STATUS_ORDER = [
    GoalStatus.ACTIVE,
    GoalStatus.PAUSED,
    GoalStatus.COMPLETED,
    GoalStatus.ABANDONED
] as const

export const getGoalStatusOrder = (
    status: GoalStatus
): number => {
    const index = GOAL_STATUS_ORDER.indexOf(status)

    return index === -1 ? GOAL_STATUS_ORDER.length : index
}
