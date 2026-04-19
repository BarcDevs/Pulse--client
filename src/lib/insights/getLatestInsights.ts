import type { CheckIn } from '@/types/checkIn'

import { dashboardPageTexts }
    from '@/constants/componentTexts/dashboard'

export const getLatestInsights = (
    checkIns: CheckIn[] | undefined
) => {
    const latestInsight =
        checkIns?.[0]?.insights?.[0]

    return latestInsight?.content
        ?? dashboardPageTexts.noInsights
}