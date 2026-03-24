'use client'

import {TrendAreaChart} from '@/components/shared/TrendAreaChart'

import {PROGRESS_MOOD_CHART} from '@/constants/progressChartsTexts'

import {MOOD_CHART_DATA} from '@/mocks/chartData'

export const ProgressMoodChart = () => (
    <TrendAreaChart
        title={PROGRESS_MOOD_CHART.title}
        subtitle={PROGRESS_MOOD_CHART.subtitle}
        data={MOOD_CHART_DATA}
        dataKey={'actual'}
        targetKey={'target'}
        color={'var(--primary)'}
        gradientId={'moodGradient'}
        legendLabel={PROGRESS_MOOD_CHART.legendLabel}
        targetLabel={PROGRESS_MOOD_CHART.targetLabel}
    />
)
