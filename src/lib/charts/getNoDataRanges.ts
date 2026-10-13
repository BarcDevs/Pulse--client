import type {
    ChartRow,
    ChartSeries,
    NoDataRange
} from '@/types/chart'

export const getNoDataRanges = (
    enrichedData: ChartRow[],
    series: ChartSeries[]
): NoDataRange[] => {
    const realSeries = series.filter(s => !s.dashed)
    const hasDataAt = (i: number) => realSeries.some(
        s => enrichedData[i][s.dataKey] != null
    )

    let firstGlobalIdx = -1
    let lastGlobalIdx = -1
    for (let i = 0; i < enrichedData.length; i++) {
        if (hasDataAt(i)) {
            if (firstGlobalIdx === -1) firstGlobalIdx = i
            lastGlobalIdx = i
        }
    }

    const ranges: NoDataRange[] = []
    if (firstGlobalIdx === -1) {
        if (enrichedData.length > 0) {
            ranges.push({
                x1: enrichedData[0].date as string,
                x2: enrichedData[enrichedData.length - 1].date as string
            })
        }
        return ranges
    }
    if (firstGlobalIdx > 0) {
        ranges.push({
            x1: enrichedData[0].date as string,
            x2: enrichedData[firstGlobalIdx].date as string
        })
    }
    if (lastGlobalIdx < enrichedData.length - 1) {
        ranges.push({
            x1: enrichedData[lastGlobalIdx].date as string,
            x2: enrichedData[enrichedData.length - 1].date as string
        })
    }
    return ranges
}
