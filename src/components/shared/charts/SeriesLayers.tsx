import { Area, Line } from 'recharts'

import type { ChartRow, ChartSeries } from '@/types/chart'

import { ChartDot } from './ChartDot'

type SeriesLayersProps = {
    series: ChartSeries[]
    enrichedData: ChartRow[]
    lastRealIndex: Record<string, number>
}

export const SeriesLayers = ({
    series,
    enrichedData,
    lastRealIndex
}: SeriesLayersProps) => (
    <>
        {series.map(s => s.dashed ? (
            <Line
                key={s.dataKey}
                type={'monotone'}
                dataKey={s.dataKey}
                stroke={s.color}
                strokeDasharray={'5 5'}
                strokeWidth={1}
                dot={false}
                connectNulls={false}
            />
        ) : (
            <Area
                key={s.dataKey}
                type={'monotone'}
                dataKey={s.dataKey}
                stroke={s.color}
                strokeWidth={2}
                fill={`url(#${s.gradientId})`}
                connectNulls={false}
                dot={(props: {
                    cx?: number
                    cy?: number
                    index?: number
                }) => (
                    <ChartDot
                        cx={props.cx}
                        cy={props.cy}
                        index={props.index}
                        series={s}
                        enrichedData={enrichedData}
                        lastRealIndex={lastRealIndex}
                    />
                )}
            />
        ))}
    </>
)
