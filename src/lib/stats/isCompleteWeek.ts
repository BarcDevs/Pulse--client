import { TrendPoint } from '@/types/checkIn/checkIn'

export const isCompleteWeek = (
    trendData: TrendPoint[]
): boolean => {
    const uniqueDays = new Set(
        trendData.map(point => point.date)
    ).size
    return uniqueDays >= 7
}
