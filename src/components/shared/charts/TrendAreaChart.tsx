'use client'

import {
    Area,
    AreaChart,
    Line,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts'

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from '@/components/ui/card'

import {ChartLegend} from './ChartLegend'
import {ChartTabs} from './ChartTabs'

type ChartConfig = {
    data: Array<Record<string, unknown>>
    dataKey: string
    targetKey?: string
}

type StyleConfig = {
    color: string
    gradientId: string
}

type LegendConfig = {
    label: string
    targetLabel?: string
}

type HeaderConfig = {
    title: string
    subtitle: string
}

type TrendAreaChartProps = {
    header: HeaderConfig
    chart: ChartConfig
    style: StyleConfig
    legend: LegendConfig
}

export const TrendAreaChart = ({
    header,
    chart,
    style,
    legend,
}: TrendAreaChartProps) => (
    <Card className={'border-0 shadow-sm'}>
        <CardHeader className={'flex flex-row items-center justify-between pb-2'}>
            <CardTitle className={'text-lg font-semibold'}>
                {header.title}
            </CardTitle>
            <ChartTabs defaultValue={'weekly'}/>
        </CardHeader>
        <CardContent>
            <p className={'mb-4 text-sm text-muted-foreground'}>
                {header.subtitle}
            </p>
            <div className={'h-50 w-full'}>
                <ResponsiveContainer
                    width={'100%'}
                    height={'100%'}
                >
                    <AreaChart data={chart.data}>
                        <defs>
                            <linearGradient
                                id={style.gradientId}
                                x1={'0'}
                                y1={'0'}
                                x2={'0'}
                                y2={'1'}
                            >
                                <stop
                                    offset={'5%'}
                                    stopColor={style.color}
                                    stopOpacity={0.3}
                                />
                                <stop
                                    offset={'95%'}
                                    stopColor={style.color}
                                    stopOpacity={0}
                                />
                            </linearGradient>
                        </defs>
                        <XAxis
                            dataKey={'date'}
                            axisLine={false}
                            tickLine={false}
                            tick={{
                                fill: 'var(--muted-foreground)',
                                fontSize: 12,
                            }}
                        />
                        <YAxis
                            domain={[0, 10]}
                            axisLine={false}
                            tickLine={false}
                            tick={{
                                fill: 'var(--muted-foreground)',
                                fontSize: 12,
                            }}
                            width={30}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'var(--card)',
                                border: '1px solid var(--border)',
                                borderRadius: '8px',
                            }}
                        />
                        <Area
                            type={'monotone'}
                            dataKey={chart.dataKey}
                            stroke={style.color}
                            strokeWidth={2}
                            fill={`url(#${style.gradientId})`}
                        />
                        {chart.targetKey && (
                            <Line
                                type={'monotone'}
                                dataKey={chart.targetKey}
                                stroke={'var(--muted-foreground)'}
                                strokeDasharray={'5 5'}
                                strokeWidth={1}
                                dot={false}
                            />
                        )}
                    </AreaChart>
                </ResponsiveContainer>
            </div>
            <ChartLegend
                color={style.color}
                legendLabel={legend.label}
                targetKey={chart.targetKey}
                targetLabel={legend.targetLabel}
            />
        </CardContent>
    </Card>
)