'use client'

import { useTranslations } from 'next-intl'

import { ChartCard } from '@/components/shared/charts/ChartCard'

import { progressLocales } from '@/locales/progressLocales'

export const MoodTrendChart = () => {
    const t = useTranslations()

    return (
        <ChartCard
            title={t(progressLocales.charts.moodTrendChart.title)}
            series={[{
                dataKey: 'mood',
                color: 'var(--primary)',
                label: t(progressLocales.charts.moodTrendChart.legendLabel),
                gradientId: 'moodGradient'
            }]}
        />
    )
}
