'use client'

import { TrendAreaChart } from '@/components/shared/TrendAreaChart'

import { PROGRESS_PAIN_CHART } from '@/constants/progressChartsTexts'

const data = [
    { date: 'Mon', actual: 6 },
    { date: 'Tue', actual: 5 },
    { date: 'Wed', actual: 5.5 },
    { date: 'Thu', actual: 4 },
    { date: 'Fri', actual: 3.5 },
    { date: 'Sat', actual: 3 },
    { date: 'Sun', actual: 3 },
]

export const ProgressPainChart = () => (
    <TrendAreaChart
        title={PROGRESS_PAIN_CHART.title}
        subtitle={PROGRESS_PAIN_CHART.subtitle}
        data={data}
        dataKey={'actual'}
        color={'var(--secondary)'}
        gradientId={'painGradient'}
        legendLabel={PROGRESS_PAIN_CHART.legendLabel}
    />
)
