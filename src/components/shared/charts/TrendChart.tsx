'use client'

import { useMemo } from 'react'

import {
    Area,
    ComposedChart,
    Line,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts'

import { ChartLegend } from './ChartLegend'
import { ChartTooltip } from './ChartTooltip'

export type ChartSeries = {
    dataKey: string
    color: string
    label: string
    gradientId: string
    dashed?: boolean
}

type BridgeKey = {
    key: string
    color: string
}

type EnrichedResult = {
    enrichedData: Record<string, unknown>[]
    bridgeKeys: BridgeKey[]
}

const enrichWithBridges = (
    data: Record<string, unknown>[],
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
                if (inGap && lastRealIdx !== null) {
                    const key = `_bridge_${s.dataKey}_${bridgeIdx++}`
                    if (lastRealIdx === -1) {
                        enrichedData[0][key] = prevVal
                    } else {
                        enrichedData[lastRealIdx][key] =
                            data[lastRealIdx][s.dataKey]
                    }
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

type TrendChartProps = {
    data: Record<string, unknown>[]
    series: ChartSeries[]
    seriesPrevious?: Record<string, number | null>
    noDataLabel: string
}

export const TrendChart = ({
    data,
    series,
    seriesPrevious,
    noDataLabel
}: TrendChartProps) => {
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

    const lastRealIndex = useMemo(() => {
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
    }, [enrichedData, series])

    return (
        <div className={'flex flex-col gap-1'}>
            <div className={'h-40 w-full'}>
                <ResponsiveContainer
                    width={'100%'}
                    height={'100%'}
                >
                    <ComposedChart
                        data={hoverData}
                        margin={{
                            top: 5,
                            right: 5,
                            left: 0,
                            bottom: 0
                        }}
                    >
                        <defs>
                            {series.filter(s => !s.dashed).map(s => (
                                <linearGradient
                                    key={s.gradientId}
                                    id={s.gradientId}
                                    x1={'0'}
                                    y1={'0'}
                                    x2={'0'}
                                    y2={'1'}
                                >
                                    <stop
                                        offset={'5%'}
                                        stopColor={s.color}
                                        stopOpacity={0.3}
                                    />
                                    <stop
                                        offset={'95%'}
                                        stopColor={s.color}
                                        stopOpacity={0}
                                    />
                                </linearGradient>
                            ))}
                        </defs>
                        <XAxis
                            dataKey={'date'}
                            axisLine={false}
                            tickLine={false}
                            padding={{ left: 30, right: 10 }}
                            tick={{
                                fill: 'var(--muted-foreground)',
                                fontSize: 12
                            }}
                        />
                        <YAxis
                            domain={[0, 10]}
                            axisLine={false}
                            tickLine={false}
                            tick={{
                                fill: 'var(--muted-foreground)',
                                fontSize: 12
                            }}
                            width={30}
                        />
                        <Tooltip
                            content={(props) => (
                                <ChartTooltip
                                    {...props}
                                    series={series}
                                    noDataLabel={noDataLabel}
                                />
                            )}
                        />
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
                                }) => {
                                    const idx = props.index ?? -1
                                    const hasValue = enrichedData[idx]?.[s.dataKey] != null
                                    if (!hasValue || props.cx == null || props.cy == null) {
                                        return <g key={`dot-${s.dataKey}-${idx}`}/>
                                    }
                                    const prevNull = enrichedData[idx - 1]?.[s.dataKey] == null
                                    const nextNull = enrichedData[idx + 1]?.[s.dataKey] == null
                                    const atStart = idx === 0
                                    const atEnd = idx === enrichedData.length - 1
                                    const isOrphan = prevNull && nextNull
                                    const isEdge = (atStart && nextNull) || (atEnd && prevNull)
                                    if (!isOrphan && !isEdge) {
                                        return <g key={`dot-${s.dataKey}-${idx}`}/>
                                    }
                                    const isLast = idx === lastRealIndex[s.dataKey]
                                    return (
                                        <circle
                                            key={`dot-${s.dataKey}-${idx}`}
                                            cx={props.cx}
                                            cy={props.cy}
                                            r={isLast ? 4 : 3}
                                            fill={s.color}
                                            stroke={'white'}
                                            strokeWidth={2}
                                        />
                                    )
                                }}
                            />
                        ))}
                        <Line
                            dataKey={'__hover'}
                            stroke={'none'}
                            dot={false}
                            activeDot={false}
                            legendType={'none'}
                            isAnimationActive={false}
                        />
                        {bridgeKeys.map(b => (
                            <Line
                                key={b.key}
                                type={'monotone'}
                                dataKey={b.key}
                                stroke={b.color}
                                strokeDasharray={'4 4'}
                                strokeWidth={2}
                                strokeOpacity={0.4}
                                connectNulls={true}
                                dot={false}
                                activeDot={false}
                                legendType={'none'}
                                isAnimationActive={false}
                            />
                        ))}
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
            <ChartLegend series={series}/>
        </div>
    )
}
