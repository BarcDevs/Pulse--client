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

export const PainIntensityChart = () => {
    const [period, setPeriod] = useState<TimePeriod>('weekly')

    const {
        data,
        isError
    } = useCheckInStats(period)

    const chartData = data?.data?.painTrend || []
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
                    {trendChartConfigs.pain.header.title}
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
                            {...trendChartConfigs.pain}
                            chart={{
                                ...trendChartConfigs.pain.chart,
                                data: chartData
                            }}
                            onPeriodChangeAction={handlePeriodChange}
                        />
                        {isIncompleteWeek && (
                            <DataNotification
                                message={chartNotifications.painIncomplete}
                            />
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
