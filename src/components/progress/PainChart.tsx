'use client'

import {TrendAreaChart} from '@/components/shared/TrendAreaChart'

import {PROGRESS_PAIN_CHART} from '@/constants/progressChartsTexts'

import {PAIN_CHART_DATA} from '@/mocks/chartData'

export const ProgressPainChart = () => (
    <TrendAreaChart
        title={PROGRESS_PAIN_CHART.title}
        subtitle={PROGRESS_PAIN_CHART.subtitle}
        data={PAIN_CHART_DATA}
        dataKey={'actual'}
        color={'var(--secondary)'}
        gradientId={'painGradient'}
        legendLabel={PROGRESS_PAIN_CHART.legendLabel}
    />
)
