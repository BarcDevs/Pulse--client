'use client'

import { useState } from 'react'

import { TimePeriod } from '@/types/time'

import { TrendAreaChart } from '@/components/shared/charts/TrendAreaChart'
import { DataNotification } from '@/components/shared/notifications/DataNotification'

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
        error
    } = useCheckInStats(period)

    const chartData = data?.data?.painTrend || []
    const isIncompleteWeek = !isCompleteWeek(
        chartData
    ) && period === 'weekly'

    const handlePeriodChange = (
        value: string
    ) => setPeriod(value as TimePeriod)

    return (
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
            {error && (
                <div className={'text-sm text-destructive mt-2'}>
                    {chartNotifications.loadError}
                </div>
            )}
        </div>
    )
}
