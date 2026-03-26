import {TrendAreaChart} from '@/components/shared/TrendAreaChart'

import {PROGRESS_MOOD_TREND_CHART}
    from '@/constants/progressChartsTexts'

const MOOD_TREND_CHART_DATA = [
    {date: 'Mon', actual: 5, target: 6},
    {date: 'Tue', actual: 6, target: 6},
    {date: 'Wed', actual: 5.5, target: 6},
    {date: 'Thu', actual: 7, target: 6},
    {date: 'Fri', actual: 6.5, target: 6},
    {date: 'Sat', actual: 8, target: 6},
    {date: 'Sun', actual: 7.5, target: 6}
]

export const MoodTrendChart = () => (
    <TrendAreaChart
        header={{
            title: PROGRESS_MOOD_TREND_CHART.title,
            subtitle: PROGRESS_MOOD_TREND_CHART.subtitle,
        }}
        chart={{
            data: MOOD_TREND_CHART_DATA,
            dataKey: 'actual',
            targetKey: 'target',
        }}
        style={{
            color: 'var(--primary)',
            gradientId: 'moodGradient',
        }}
        legend={{
            label: PROGRESS_MOOD_TREND_CHART.legendLabel,
            targetLabel: PROGRESS_MOOD_TREND_CHART.targetLabel,
        }}
    />
)
