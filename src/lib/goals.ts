import {
    Goal,
    GoalCategory
} from '@/types/goals'

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
    return Math.round((goal.progress ?? 0) * 100)
}

export const getBadge = (percentage: number): GoalBadge => {
    if (percentage === 0) return GOAL_BADGES.NOT_STARTED
    if (percentage < 50) return GOAL_BADGES.IN_PROGRESS
    if (percentage < 100) return GOAL_BADGES.ON_TRACK
    return GOAL_BADGES.COMPLETE
}

export const getCategoryColor = (category: GoalCategory) => {
    switch (category) {
        case GoalCategory.PHYSICAL:
            return 'bg-secondary-container text-on-secondary-container hover:bg-secondary-container/80 [&:hover]:text-on-secondary-container'
        case GoalCategory.MENTAL:
            return 'bg-accent-light text-accent hover:bg-accent-light/80 [&:hover]:text-accent'
        case GoalCategory.LIFESTYLE:
            return 'bg-primary-light text-primary hover:bg-primary-light/80 [&:hover]:text-primary'
    }
}
