import type { ChartRow, ChartSeries } from '@/types/chart'

type ChartDotProps = {
    cx?: number
    cy?: number
    index?: number
    series: ChartSeries
    enrichedData: ChartRow[]
    lastRealIndex: Record<string, number>
}

export const ChartDot = ({
    cx,
    cy,
    index,
    series,
    enrichedData,
    lastRealIndex
}: ChartDotProps) => {
    const idx = index ?? -1
    const key = `dot-${series.dataKey}-${idx}`
    const hasValue = enrichedData[idx]?.[series.dataKey] != null
    if (!hasValue || cx == null || cy == null) {
        return <g key={key}/>
    }
    const prevNull = enrichedData[idx - 1]?.[series.dataKey] == null
    const nextNull = enrichedData[idx + 1]?.[series.dataKey] == null
    const atStart = idx === 0
    const atEnd = idx === enrichedData.length - 1
    const isOrphan = prevNull && nextNull
    const isEdge = (atStart && nextNull) || (atEnd && prevNull)
    if (!isOrphan && !isEdge) {
        return <g key={key}/>
    }
    const isLast = idx === lastRealIndex[series.dataKey]

    return (
        <circle
            key={key}
            cx={cx}
            cy={cy}
            r={isLast ? 4 : 3}
            fill={series.color}
            stroke={'white'}
            strokeWidth={2}
        />
    )
}
