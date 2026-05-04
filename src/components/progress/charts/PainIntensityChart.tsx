'use client'

import { useState } from 'react'

import { useTranslations } from 'next-intl'

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

import { progressLocales } from '@/locales/progressLocales'

export const PainIntensityChart = () => {
    const t = useTranslations()
    const [period, setPeriod] = useState<TimePeriod>('weekly')

    const {
        data,
        isError
    } = useCheckInStats(period)

    const chartData = data?.painTrend || []
    const isIncompleteWeek = !isCompleteWeek(
        chartData
    ) && period === 'weekly'

    const handlePeriodChange = (
        value: string
    ) => setPeriod(value as TimePeriod)

    const chartConfig = {
        header: {
            title: t(progressLocales.charts.painIntensityChart.title),
            subtitle: t(progressLocales.charts.painIntensityChart.subtitle)
        },
        chart: {
            dataKey: 'actual' as const
        },
        style: {
            color: 'var(--secondary)',
            gradientId: 'painGradient'
        },
        legend: {
            label: t(progressLocales.charts.painIntensityChart.legendLabel)
        }
    }

    return (
        <Card className={'border-0 shadow-sm h-full'}>
            <CardHeader className={'pb-3'}>
                <CardTitle className={'text-base font-semibold'}>
                    {chartConfig.header.title}
                </CardTitle>
            </CardHeader>
            <CardContent>
                {isError ? (
                    <div className={'h-60 flex items-center justify-center text-sm text-muted-foreground'}>
                        {t(progressLocales.charts.notifications.loadError)}
                    </div>
                ) : (
                    <div className={'relative'}>
                        <TrendAreaChart
                            {...chartConfig}
                            chart={{
                                ...chartConfig.chart,
                                data: chartData
                            }}
                            onPeriodChangeAction={handlePeriodChange}
                        />
                        {isIncompleteWeek && (
                            <DataNotification
                                message={t(progressLocales.charts.notifications.painIncomplete)}
                            />
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
