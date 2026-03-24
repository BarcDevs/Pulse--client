'use client'

import {
    Bar,
    BarChart,
    Cell,
    ResponsiveContainer,
    XAxis,
    YAxis
} from 'recharts'

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from '@/components/ui/card'
import {
    Tabs,
    TabsList,
    TabsTrigger
} from '@/components/ui/tabs'

import {
    DASHBOARD_WEEKLY_CHART_MONTH,
    DASHBOARD_WEEKLY_CHART_TITLE,
    DASHBOARD_WEEKLY_CHART_WEEK
} from '@/constants/dashboardTexts'

import {WEEKLY_CHART_DATA_DERIVED} from '@/mocks/chartData'

export const DashboardWeeklyChart = () => (
    <Card className={'border-0 shadow-sm'}>
        <CardHeader className={'flex flex-row items-center justify-between pb-2'}>
            <CardTitle className={'text-lg font-semibold'}>
                {DASHBOARD_WEEKLY_CHART_TITLE}
            </CardTitle>
            <Tabs
                defaultValue={'week'}
                className={'w-auto'}
            >
                <TabsList className={'h-8 bg-muted'}>
                    <TabsTrigger
                        value={'week'}
                        className={'h-6 px-3 text-xs'}
                    >
                        {DASHBOARD_WEEKLY_CHART_WEEK}
                    </TabsTrigger>
                    <TabsTrigger
                        value={'month'}
                        className={'h-6 px-3 text-xs'}
                    >
                        {DASHBOARD_WEEKLY_CHART_MONTH}
                    </TabsTrigger>
                </TabsList>
            </Tabs>
        </CardHeader>
        <CardContent>
            <div className={'h-60 w-full'}>
                <ResponsiveContainer
                    width={'100%'}
                    height={'100%'}
                >
                    <BarChart
                        data={WEEKLY_CHART_DATA_DERIVED}
                        barCategoryGap={'20%'}
                    >
                        <XAxis
                            dataKey={'day'}
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
                        <Bar
                            dataKey={'value'}
                            radius={[6, 6, 0, 0]}
                        >
                            {WEEKLY_CHART_DATA_DERIVED
                                .map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={
                                            entry.day === 'THU'
                                                ? 'var(--primary)'
                                                : 'var(--primary-light)'
                                        }
                                    />
                                ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </CardContent>
    </Card>
)
