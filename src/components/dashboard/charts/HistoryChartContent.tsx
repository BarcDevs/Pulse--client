'use client'

import {
    Bar,
    BarChart,
    Cell,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts'

import type { SetState } from '@/types/utils/react'

import { ChartTooltipContent } from '@/components/ui/chart-tooltip'

type HistoryChartContentProps = {
    reorderedData: unknown[]
    hoveredIndex: number | null
    setHoveredIndexAction: SetState<number | null>
}

export const HistoryChartContent = ({
    reorderedData,
    hoveredIndex,
    setHoveredIndexAction
}: HistoryChartContentProps) => (
    <div
        className={'h-60 w-full'}
        dir={'ltr'}
    >
        <ResponsiveContainer
            width={800}
            height={240}
        >
            <BarChart
                data={reorderedData}
                barCategoryGap={'20%'}
                layout={'horizontal'}
            >
                <XAxis
                    dataKey={'date'}
                    axisLine={false}
                    tickLine={false}
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
                    content={
                        <ChartTooltipContent
                            formatter={(value) => [`Mood: ${value}`]}
                        />
                    }
                    cursor={false}
                />
                <Bar
                    dataKey={'mood'}
                    radius={[6, 6, 0, 0]}
                    fill={'#e8f4fd'}
                    isAnimationActive={false}
                    onMouseEnter={
                        (_, index) =>
                            setHoveredIndexAction(index)
                    }
                    onMouseLeave={() =>
                        setHoveredIndexAction(null)
                    }
                >
                    {reorderedData.map(
                        (_, index) => (
                            <Cell
                                key={`bar-${index}`}
                                fill={
                                    hoveredIndex === index
                                        ? '#4a90e2'
                                        : '#e8f4fd'
                                }
                            />
                        )
                    )}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    </div>
)