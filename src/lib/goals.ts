import { Goal } from '@/types/goals'

export const GOAL_BADGES = {
    NOT_STARTED: 'NOT STARTED',
    IN_PROGRESS: 'IN PROGRESS',
    ON_TRACK: 'ON TRACK',
    COMPLETE: 'COMPLETE'
} as const

export type GoalBadge =
    typeof GOAL_BADGES[keyof typeof GOAL_BADGES]

export const getProgressPercentage = (
    goal: Goal
): number => {
    if (goal.milestones.length === 0) return 0
    const completed = goal.milestones.filter(
        (m) => m.isCompleted
    ).length
    return Math.round(
        (completed / goal.milestones.length) * 100
    )
}

export const getBadge = (percentage: number): GoalBadge => {
    if (percentage === 0) return GOAL_BADGES.NOT_STARTED
    if (percentage < 50) return GOAL_BADGES.IN_PROGRESS
    if (percentage < 100) return GOAL_BADGES.ON_TRACK
    return GOAL_BADGES.COMPLETE
}
