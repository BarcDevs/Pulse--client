'use client'

import {TrendAreaChart} from '@/components/shared/TrendAreaChart'

import {PROGRESS_MOOD_TREND_CHART}
    from '@/constants/progressChartsTexts'

import {MOOD_TREND_CHART_DATA} from '@/mocks/chartData'

export const MoodTrendChart = () => (
    <TrendAreaChart
        title={PROGRESS_MOOD_TREND_CHART.title}
        subtitle={PROGRESS_MOOD_TREND_CHART.subtitle}
        data={MOOD_TREND_CHART_DATA}
        dataKey={'actual'}
        targetKey={'target'}
        color={'var(--primary)'}
        gradientId={'moodGradient'}
        legendLabel={PROGRESS_MOOD_TREND_CHART.legendLabel}
        targetLabel={PROGRESS_MOOD_TREND_CHART.targetLabel}
    />
)
