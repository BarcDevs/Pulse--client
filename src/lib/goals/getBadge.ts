import { type GoalBadge, GoalBadgeKey } from './tokens'

export const getBadge = (percentage: number): GoalBadge => {
    if (percentage === 0) return GoalBadgeKey.NOT_STARTED
    if (percentage < 50) return GoalBadgeKey.IN_PROGRESS
    if (percentage < 100) return GoalBadgeKey.ON_TRACK
    return GoalBadgeKey.COMPLETE
}

export const getBadgeLabel = (
    badgeKey: GoalBadge,
    t: (key: string) => string
): string => {
    const badgeMap: Record<GoalBadge, string> = {
        [GoalBadgeKey.NOT_STARTED]: t('goals.badges.notStarted'),
        [GoalBadgeKey.IN_PROGRESS]: t('goals.badges.inProgress'),
        [GoalBadgeKey.ON_TRACK]: t('goals.badges.onTrack'),
        [GoalBadgeKey.COMPLETE]: t('goals.badges.complete')
    }
    return badgeMap[badgeKey]
}
