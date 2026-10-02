import type { CheckIn, CheckInInsight } from '@/types/checkIn'

export const getLatestInsights = (
    checkIns: CheckIn[] | undefined
): CheckInInsight[] =>
    (checkIns?.[0]?.insights ?? [])
        .filter((insight) => insight.content)
        .sort((a, b) => a.createdAt.localeCompare(b.createdAt))
