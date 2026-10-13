import type { ChartRow, ChartSeries } from '@/types/chart'

export const getLastRealIndex = (
    enrichedData: ChartRow[],
    series: ChartSeries[]
) => {
    const result: Record<string, number> = {}
    for (const s of series) {
        for (let i = enrichedData.length - 1; i >= 0; i--) {
            const val = enrichedData[i][s.dataKey]
            if (val !== null && val !== undefined) {
                result[s.dataKey] = i
                break
            }
        }
    }
    return result
}
