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

import {ChartTooltipContent} from '@/components/ui/chart-tooltip'

type HistoryChartContentProps = {
    reorderedData: unknown[]
    hoveredIndex: number | null
    setHoveredIndex: (index: number | null) => void
}

export const HistoryChartContent = ({
    reorderedData,
    hoveredIndex,
    setHoveredIndex
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
                            hideLabel
                            formatter={(value) => ['Mood: ' + value]}
                        />
                    }
                    cursor={false}
                />
                <Bar
                    dataKey={'mood'}
                    radius={[6, 6, 0, 0]}
                    fill={'#e8f4fd'}
                    isAnimationActive={false}
                    onMouseEnter={(_, index) => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                >
                    {reorderedData.map(
                        (_, index) => (
                            <Cell
                                key={`bar-${index}`}
                                fill={
                                    hoveredIndex === index ?
                                        '#4a90e2' :
                                        '#e8f4fd'
                                }
                            />
                        )
                    )}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    </div>
)