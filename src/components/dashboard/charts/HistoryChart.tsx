'use client'

import { useState } from 'react'

import { useTranslations } from 'next-intl'

import { MoodPainSeriesPoint } from '@/types/checkIn'

import { TrendChart } from '@/components/shared/charts/TrendChart'
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

import { useCheckInChartData } from '@/hooks/queries/useCheckInChartData'

import { dashboardLocales } from '@/locales/dashboardLocales'
import { progressLocales } from '@/locales/progressLocales'

export const DashboardHistoryChart = () => {
    const t = useTranslations()
    const [period, setPeriod] = useState<'weekly' | 'monthly'>('weekly')
    const {
        chartData,
        isLoading,
        isError,
        previousPoint
    } = useCheckInChartData(period)

    const series = [
        {
            dataKey: 'mood',
            color: 'var(--primary)',
            label: t(dashboardLocales.stats.labels.mood),
            gradientId: 'dashMoodGradient'
        },
        {
            dataKey: 'pain',
            color: 'var(--secondary)',
            label: t(dashboardLocales.stats.labels.pain),
            gradientId: 'dashPainGradient'
        }
    ]

    const seriesPrevious = previousPoint
        ? Object.fromEntries(series.map(s => [
            s.dataKey,
            previousPoint[s.dataKey as keyof MoodPainSeriesPoint] as number | null
        ]))
        : undefined

    return (
        <Card className={'border-0 shadow-sm h-full'}>
            <CardHeader className={'flex flex-row items-center justify-between pb-6'}>
                <CardTitle className={'text-lg font-semibold'}>
                    {t(dashboardLocales.historyChart.title)}
                </CardTitle>
                <Tabs
                    value={period}
                    onValueChange={(value) => setPeriod(value as 'weekly' | 'monthly')}
                    className={'w-auto'}
                >
                    <TabsList className={'h-8 bg-muted'}>
                        <TabsTrigger
                            value={'weekly'}
                            className={'h-6 px-3 text-xs cursor-pointer'}
                        >
                            {t(dashboardLocales.historyChart.week)}
                        </TabsTrigger>
                        <TabsTrigger
                            value={'monthly'}
                            className={'h-6 px-3 text-xs cursor-pointer'}
                        >
                            {t(dashboardLocales.historyChart.month)}
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
            </CardHeader>
            <CardContent>
                {isLoading && (
                    <div className={'h-60 w-full flex items-center justify-center text-muted-foreground'}>
                        {t(progressLocales.charts.status.loading)}
                    </div>
                )}
                {isError && (
                    <div className={'h-60 flex items-center justify-center text-muted-foreground'}>
                        {t(progressLocales.charts.status.loadError)}
                    </div>
                )}
                {!isLoading && !isError && (
                    <TrendChart
                        data={chartData}
                        series={series}
                        seriesPrevious={seriesPrevious}
                        noDataLabel={t(progressLocales.charts.status.noCheckInTooltip)}
                    />
                )}
            </CardContent>
        </Card>
    )
}
