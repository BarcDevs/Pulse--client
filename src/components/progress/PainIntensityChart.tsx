'use client'

import {TrendAreaChart} from '@/components/shared/TrendAreaChart'

import {PROGRESS_PAIN_INTENSITY_CHART}
    from '@/constants/progressChartsTexts'

import {PAIN_INTENSITY_CHART_DATA} from '@/mocks/chartData'

export const PainIntensityChart = () => (
    <TrendAreaChart
        title={PROGRESS_PAIN_INTENSITY_CHART.title}
        subtitle={PROGRESS_PAIN_INTENSITY_CHART.subtitle}
        data={PAIN_INTENSITY_CHART_DATA}
        dataKey={'actual'}
        color={'var(--secondary)'}
        gradientId={'painGradient'}
        legendLabel={PROGRESS_PAIN_INTENSITY_CHART.legendLabel}
    />
)
