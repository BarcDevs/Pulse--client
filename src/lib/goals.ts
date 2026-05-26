import {
    Goal,
    GoalCategory,
    GoalStatus
} from '@/types/goals'

export const GOAL_BADGES = {
    NOT_STARTED: 'NOT STARTED',
    IN_PROGRESS: 'IN PROGRESS',
    ON_TRACK: 'ON TRACK',
    COMPLETE: 'COMPLETE'
} as const

export type GoalBadge =
    typeof GOAL_BADGES[keyof typeof GOAL_BADGES]

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

export const sortGoalStatuses = (
    statuses: GoalStatus[]
): GoalStatus[] =>
    [...statuses].sort(
        (a, b) => getGoalStatusOrder(a) - getGoalStatusOrder(b)
    )

export const sortGoalsByStatus = (
    goals: Goal[]
): Goal[] =>
    [...goals].sort((a, b) => {
        const statusOrderDifference =
            getGoalStatusOrder(a.status)
            - getGoalStatusOrder(b.status)

        if (statusOrderDifference !== 0)
            return statusOrderDifference

        const progressDifference =
            (b.progress ?? 0) - (a.progress ?? 0)

        if (progressDifference !== 0)
            return progressDifference

        return a.title.localeCompare(b.title)
    })

export const getProgressPercentage = (
    goal: Goal
): number => {
    return Math.min(100, Math.round((goal.progress ?? 0) * 100))
}

export const getBadge = (percentage: number): GoalBadge => {
    if (percentage === 0) return GOAL_BADGES.NOT_STARTED
    if (percentage < 50) return GOAL_BADGES.IN_PROGRESS
    if (percentage < 100) return GOAL_BADGES.ON_TRACK
    return GOAL_BADGES.COMPLETE
}

export const getCategoryColor = (
    category: GoalCategory
) => {
    switch (category) {
        case GoalCategory.PHYSICAL:
            return 'bg-secondary-container text-on-secondary-container hover:bg-secondary-container/80 [&:hover]:text-on-secondary-container'
        case GoalCategory.MENTAL:
            return 'bg-tertiary-fixed text-tertiary hover:bg-tertiary-fixed-dim [&:hover]:text-tertiary'
        case GoalCategory.LIFESTYLE:
            return 'bg-primary-light text-primary hover:bg-primary-light/80 [&:hover]:text-primary'
    }
}
