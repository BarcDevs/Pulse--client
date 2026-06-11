import type { CheckIn } from '@/types/checkIn'

export const getLatestInsights = (
    checkIns: CheckIn[] | undefined
) => {
    const latestInsight =
        checkIns?.[0]?.insights?.[0]

    return latestInsight?.content ?? null
}