'use client'

import { TrendAreaChart } from '@/components/shared/TrendAreaChart'

import { PROGRESS_PAIN_INTENSITY_CHART } from '@/constants/progressChartsTexts'

const painData = [
    { date: 'Mon', actual: 2 },
    { date: 'Tue', actual: 3 },
    { date: 'Wed', actual: 2.5 },
    { date: 'Thu', actual: 4 },
    { date: 'Fri', actual: 3 },
    { date: 'Sat', actual: 2 },
    { date: 'Sun', actual: 2.5 },
]

export const PainIntensityChart = () => (
    <TrendAreaChart
        title={PROGRESS_PAIN_INTENSITY_CHART.title}
        subtitle={PROGRESS_PAIN_INTENSITY_CHART.subtitle}
        data={painData}
        dataKey={'actual'}
        color={'var(--secondary)'}
        gradientId={'painGradient'}
        legendLabel={PROGRESS_PAIN_INTENSITY_CHART.legendLabel}
    />
)
