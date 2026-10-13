import { useMemo } from 'react'

import type { ChartRow, ChartSeries } from '@/types/chart'

import { enrichWithBridges } from '@/lib/charts/enrichWithBridges'
import { getLastRealIndex } from '@/lib/charts/getLastRealIndex'
import { getNoDataRanges } from '@/lib/charts/getNoDataRanges'

export const useTrendChartData = (
    data: ChartRow[],
    series: ChartSeries[],
    seriesPrevious?: Record<string, number | null>
) => {
    const { enrichedData, bridgeKeys } = useMemo(
        () => enrichWithBridges(
            data,
            series,
            seriesPrevious
        ),
        [data, series, seriesPrevious]
    )

    const hoverData = useMemo(
        () => enrichedData.map(d => ({
            ...d,
            __hover: 0
        })),
        [enrichedData]
    )

    const noDataRanges = useMemo(
        () => getNoDataRanges(enrichedData, series),
        [enrichedData, series]
    )

    const lastRealIndex = useMemo(
        () => getLastRealIndex(enrichedData, series),
        [enrichedData, series]
    )

    return {
        enrichedData,
        bridgeKeys,
        hoverData,
        noDataRanges,
        lastRealIndex
    }
}
