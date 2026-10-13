'use client'

import {
    ComposedChart,
    Line,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts'

import { ChartRow, ChartSeries } from '@/types/chart'
import { ClassName } from '@/types/react'

import { useTrendChartData } from '@/hooks/ui/useTrendChartData'

import { cn } from '@/lib/utils'

import { BridgeLines } from './BridgeLines'
import { ChartGradients } from './ChartGradients'
import { ChartLegend } from './ChartLegend'
import { ChartTooltip } from './ChartTooltip'
import { NoDataAreas } from './NoDataAreas'
import { SeriesLayers } from './SeriesLayers'

type TrendChartProps = {
    data: ChartRow[]
    series: ChartSeries[]
    seriesPrevious?: Record<string, number | null>
    noDataLabel: string
    plotClassName?: ClassName
}

export const TrendChart = ({
    data,
    series,
    seriesPrevious,
    noDataLabel,
    plotClassName = 'h-40'
}: TrendChartProps) => {
    const {
        enrichedData,
        bridgeKeys,
        hoverData,
        noDataRanges,
        lastRealIndex
    } = useTrendChartData(
        data,
        series,
        seriesPrevious
    )

    return (
        <div className={'flex flex-col gap-1'}>
            <div className={cn('w-full', plotClassName)}>
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
                        <ChartGradients series={series}/>
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
                        <NoDataAreas ranges={noDataRanges}/>
                        <Tooltip
                            content={(props) => (
                                <ChartTooltip
                                    {...props}
                                    series={series}
                                    noDataLabel={noDataLabel}
                                />
                            )}
                        />
                        <SeriesLayers
                            series={series}
                            enrichedData={enrichedData}
                            lastRealIndex={lastRealIndex}
                        />
                        <Line
                            dataKey={'__hover'}
                            stroke={'none'}
                            dot={false}
                            activeDot={false}
                            legendType={'none'}
                            isAnimationActive={false}
                        />
                        <BridgeLines bridgeKeys={bridgeKeys}/>
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
            <ChartLegend series={series}/>
        </div>
    )
}
