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

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { CHART_TIME_PERIODS } from '@/constants/sharedComponentTexts'

type TrendAreaChartProps = {
    title: string
    subtitle: string
    data: Array<Record<string, unknown>>
    dataKey: string
    targetKey?: string
    color: string
    gradientId: string
    legendLabel: string
    targetLabel?: string
}

export const TrendAreaChart = ({
    title,
    subtitle,
    data,
    dataKey,
    targetKey,
    color,
    gradientId,
    legendLabel,
    targetLabel = 'Weekly Target',
}: TrendAreaChartProps) => (
        <Card className={'border-0 shadow-sm'}>
            <CardHeader className={'flex flex-row items-center justify-between pb-2'}>
                <CardTitle className={'text-lg font-semibold'}>
                    {title}
                </CardTitle>
                <Tabs defaultValue={'weekly'} className={'w-auto'}>
                    <TabsList className={'h-8 bg-muted'}>
                        <TabsTrigger
                            value={'daily'}
                            className={'h-6 px-3 text-xs'}
                        >
                            {CHART_TIME_PERIODS.daily}
                        </TabsTrigger>
                        <TabsTrigger
                            value={'weekly'}
                            className={'h-6 px-3 text-xs'}
                        >
                            {CHART_TIME_PERIODS.weekly}
                        </TabsTrigger>
                        <TabsTrigger
                            value={'monthly'}
                            className={'h-6 px-3 text-xs'}
                        >
                            {CHART_TIME_PERIODS.monthly}
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
            </CardHeader>
            <CardContent>
                <p className={'mb-4 text-sm text-muted-foreground'}>
                    {subtitle}
                </p>
                <div className={'h-[200px] w-full'}>
                    <ResponsiveContainer width={'100%'} height={'100%'}>
                        <AreaChart data={data}>
                            <defs>
                                <linearGradient
                                    id={gradientId}
                                    x1={'0'}
                                    y1={'0'}
                                    x2={'0'}
                                    y2={'1'}
                                >
                                    <stop
                                        offset={'5%'}
                                        stopColor={color}
                                        stopOpacity={0.3}
                                    />
                                    <stop
                                        offset={'95%'}
                                        stopColor={color}
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
                                dataKey={dataKey}
                                stroke={color}
                                strokeWidth={2}
                                fill={`url(#${gradientId})`}
                            />
                            {targetKey && (
                                <Line
                                    type={'monotone'}
                                    dataKey={targetKey}
                                    stroke={'var(--muted-foreground)'}
                                    strokeDasharray={'5 5'}
                                    strokeWidth={1}
                                    dot={false}
                                />
                            )}
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
                <div className={'mt-4 flex items-center gap-6'}>
                    <div className={'flex items-center gap-2'}>
                        <div
                            className={'size-3 rounded-full'}
                            style={{ backgroundColor: color }}
                        />
                        <span className={'text-sm text-muted-foreground'}>
                            {legendLabel}
                        </span>
                    </div>
                    {targetKey && (
                        <div className={'flex items-center gap-2'}>
                            <div
                                className={
                                    'h-0.5 w-4 border-t-2 border-dashed border-muted-foreground'
                                }
                            />
                            <span
                                className={
                                    'text-sm text-muted-foreground'
                                }
                            >
                                {targetLabel}
                            </span>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    )