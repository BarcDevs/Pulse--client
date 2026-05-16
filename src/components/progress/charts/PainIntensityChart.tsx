'use client'

import { useTranslations } from 'next-intl'

import { ChartCard } from '@/components/shared/charts/ChartCard'

import { progressLocales } from '@/locales/progressLocales'

export const PainIntensityChart = () => {
    const t = useTranslations()

    return (
        <ChartCard
            title={t(progressLocales.charts.painIntensityChart.title)}
            series={[{
                dataKey: 'pain',
                color: 'var(--secondary)',
                label: t(progressLocales.charts.painIntensityChart.legendLabel),
                gradientId: 'painGradient'
            }]}
        />
    )
}
