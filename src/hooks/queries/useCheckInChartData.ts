import { MoodPainSeriesPoint } from '@/types/checkIn'
import { TimePeriod } from '@/types/time'

import { useCheckInHistory } from '@/hooks/queries/useCheckInHistory'
import { useDirection } from '@/hooks/useDirection'

import { buildWeeklyAverages } from '@/lib/checkIn/buildWeeklyAverages'
import { fillHistoryMonthNulls } from '@/lib/checkIn/fillHistoryMonthNulls'
import { fillHistoryWeekNulls } from '@/lib/checkIn/fillHistoryWeekNulls'

import { reverseChartData } from '@/utils/chart'

// Weekly fetches 14 to have pre-window data available for bridge anchoring
const PERIOD_FETCH: Record<TimePeriod, number> = {
    weekly: 14,
    monthly: 35
}

export const useCheckInChartData = (period: TimePeriod) => {
    const dir = useDirection()
    const {
        data,
        isLoading,
        isError
    } = useCheckInHistory(PERIOD_FETCH[period])

    if (isLoading || isError || !data) {
        return {
            chartData: [],
            isLoading,
            isError,
            previousPoint: null
        }
    }

    const rawData = data

    let filled: MoodPainSeriesPoint[]
    let previousPoint: MoodPainSeriesPoint | null = null

    if (period === 'weekly') {
        const result = fillHistoryWeekNulls(rawData)
        filled = result.days
        previousPoint = result.previousPoint
    } else {
        filled = buildWeeklyAverages(fillHistoryMonthNulls(rawData))
    }

    const chartData = dir === 'rtl' ? reverseChartData(filled) : filled

    return {
        chartData,
        isLoading,
        isError,
        previousPoint
    }
}
