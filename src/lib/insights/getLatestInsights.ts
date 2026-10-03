import type { CheckIn, CheckInInsight } from '@/types/checkIn'

export const getDisplayInsights = (
    insights: CheckInInsight[] = []
): CheckInInsight[] =>
    insights
        .filter((insight) => insight.content)
        .sort((a, b) => a.createdAt.localeCompare(b.createdAt))

export const getLatestInsights = (
    checkIns: CheckIn[] | undefined
): CheckInInsight[] =>
    getDisplayInsights(checkIns?.[0]?.insights)
