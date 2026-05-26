'use client'

import { useState } from 'react'

import { useTranslations } from 'next-intl'

import { MoodPainSeriesPoint } from '@/types/checkIn'
import { TimePeriod } from '@/types/time'

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from '@/components/ui/card'

import { useCheckInChartData } from '@/hooks/queries/useCheckInChartData'

import { progressLocales } from '@/locales/progressLocales'

import { ChartCardSkeleton } from './ChartCardSkeleton'
import { ChartTabs } from './ChartTabs'
import { ChartSeries, TrendChart } from './TrendChart'

type ChartCardProps = {
    title: string
    series: ChartSeries[]
}

export const ChartCard = ({ title, series }: ChartCardProps) => {
    const t = useTranslations()
    const [period, setPeriod] = useState<TimePeriod>('weekly')
    const {
        chartData,
        isLoading,
        isError,
        previousPoint
    } = useCheckInChartData(period)

    const seriesPrevious = previousPoint
        ? Object.fromEntries(series.map(s => [
            s.dataKey,
            previousPoint[s.dataKey as keyof MoodPainSeriesPoint] as number | null
        ]))
        : undefined

    return (
        <Card className={'border-0 shadow-sm'}>
            <CardHeader className={'flex flex-row items-center justify-between p-4 pb-2'}>
                <CardTitle className={'text-base font-semibold'}>
                    {title}
                </CardTitle>
                <ChartTabs
                    defaultValue={period}
                    onValueChangeAction={(v) => setPeriod(v as TimePeriod)}
                />
            </CardHeader>
            <CardContent className={'px-4 pb-3 pt-2'}>
                {isLoading && <ChartCardSkeleton/>}
                {isError && (
                    <div className={'h-60 flex items-center justify-center text-sm text-muted-foreground'}>
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
