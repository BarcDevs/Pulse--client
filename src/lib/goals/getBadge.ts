import { GOAL_BADGES, type GoalBadge } from './tokens'

export const getBadge = (percentage: number): GoalBadge => {
    if (percentage === 0) return GOAL_BADGES.NOT_STARTED
    if (percentage < 50) return GOAL_BADGES.IN_PROGRESS
    if (percentage < 100) return GOAL_BADGES.ON_TRACK
    return GOAL_BADGES.COMPLETE
}
