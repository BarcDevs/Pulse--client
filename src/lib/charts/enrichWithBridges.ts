import type {
    BridgeKey,
    ChartRow,
    ChartSeries
} from '@/types/chart'

type EnrichedResult = {
    enrichedData: ChartRow[]
    bridgeKeys: BridgeKey[]
}

export const enrichWithBridges = (
    data: ChartRow[],
    series: ChartSeries[],
    seriesPrevious?: Record<string, number | null>
): EnrichedResult => {
    const enrichedData = data.map(d => ({ ...d }))
    const bridgeKeys: BridgeKey[] = []

    for (const s of series) {
        if (s.dashed) continue

        const prevVal = seriesPrevious?.[s.dataKey]
        // -1 = virtual anchor before window; null = no anchor yet
        let lastRealIdx: number | null =
            (
                prevVal !== null
                && prevVal !== undefined
            ) ? -1 : null
        let inGap = false
        let bridgeIdx = 0

        for (let i = 0; i < data.length; i++) {
            const val = data[i][s.dataKey]
            const isReal = val !== null && val !== undefined

            if (isReal) {
                // Skip bridging from the off-screen virtual anchor (-1) —
                // it has no visible point to draw the dashed line from
                if (inGap && lastRealIdx !== null && lastRealIdx !== -1) {
                    const key = `_bridge_${s.dataKey}_${bridgeIdx++}`
                    enrichedData[lastRealIdx][key] =
                        data[lastRealIdx][s.dataKey]
                    enrichedData[i][key] = val
                    bridgeKeys.push({ key, color: s.color })
                }
                lastRealIdx = i
                inGap = false
            } else if (lastRealIdx !== null) {
                inGap = true
            }
        }
    }

    return { enrichedData, bridgeKeys }
}
