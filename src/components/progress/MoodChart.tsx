'use client'

import { TrendAreaChart } from '@/components/shared/TrendAreaChart'

import { PROGRESS_MOOD_CHART } from '@/constants/progressChartsTexts'

const data = [
    { date: 'Mon', actual: 5, target: 6 },
    { date: 'Tue', actual: 6, target: 6 },
    { date: 'Wed', actual: 5.5, target: 6 },
    { date: 'Thu', actual: 7, target: 6 },
    { date: 'Fri', actual: 6.5, target: 6 },
    { date: 'Sat', actual: 8, target: 6 },
    { date: 'Sun', actual: 7.5, target: 6 },
]

export const ProgressMoodChart = () => (
    <TrendAreaChart
        title={PROGRESS_MOOD_CHART.title}
        subtitle={PROGRESS_MOOD_CHART.subtitle}
        data={data}
        dataKey={'actual'}
        targetKey={'target'}
        color={'var(--primary)'}
        gradientId={'moodGradient'}
        legendLabel={PROGRESS_MOOD_CHART.legendLabel}
        targetLabel={PROGRESS_MOOD_CHART.targetLabel}
    />
)
