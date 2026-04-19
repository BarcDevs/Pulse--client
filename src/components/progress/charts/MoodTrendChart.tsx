'use client'

import { useState } from 'react'

import { TimePeriod } from '@/types/time'

import { TrendAreaChart } from '@/components/shared/charts/TrendAreaChart'
import { DataNotification } from '@/components/shared/notifications/DataNotification'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from '@/components/ui/card'

import { useCheckInStats } from '@/hooks/queries/useCheckInStats'

import { isCompleteWeek } from '@/lib/stats/isCompleteWeek'

import {
    chartNotifications,
    trendChartConfigs
} from '@/constants/componentTexts/progressCharts'

// todo: merge pain and mood charts into one reusable entity
export const MoodTrendChart = () => {
    const [period, setPeriod] = useState<TimePeriod>('weekly')

    const {
        data,
        isError
    } = useCheckInStats(period)

    const chartData = data?.moodTrend || []
    const isIncompleteWeek = !isCompleteWeek(
        chartData
    ) && period === 'weekly'

    const handlePeriodChange = (
        value: string
    ) => setPeriod(value as TimePeriod)

    return (
        <Card className={'border-0 shadow-sm h-full'}>
            <CardHeader className={'pb-3'}>
                <CardTitle className={'text-base font-semibold'}>
                    {trendChartConfigs.mood.header.title}
                </CardTitle>
            </CardHeader>
            <CardContent>
                {isError ? (
                    <div className={'h-60 flex items-center justify-center text-sm text-muted-foreground'}>
                        Failed to load data
                    </div>
                ) : (
                    <div className={'relative'}>
                        <TrendAreaChart
                            {...trendChartConfigs.mood}
                            chart={{
                                ...trendChartConfigs.mood.chart,
                                data: chartData
                            }}
                            onPeriodChangeAction={handlePeriodChange}
                        />
                        {isIncompleteWeek && (
                            <DataNotification
                                message={chartNotifications.moodIncomplete}
                            />
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
