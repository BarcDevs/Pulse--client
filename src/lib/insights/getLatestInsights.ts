import {CheckIn} from '@/types/checkIn'
import {Response} from '@/types/responses'

import {dashboardPageTexts}
    from '@/constants/componentTexts/dashboard'

export const getLatestInsights = (
    checkInsResponse: Response<CheckIn[]> | undefined
) => {
    const latestInsight =
        checkInsResponse?.data?.[0]?.insights?.[0]

    return latestInsight?.content ??
        dashboardPageTexts.noInsights
}