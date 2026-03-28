import {TrendAreaChart} from '@/components/shared/TrendAreaChart'

import {
    moodTrendChartData,
    progressCharts
} from '@/constants/componentTexts/progressCharts'

export const MoodTrendChart = () => (
    <TrendAreaChart
        header={{
            title: progressCharts.moodTrendChart.title,
            subtitle: progressCharts.moodTrendChart.subtitle
        }}
        chart={{
            data: moodTrendChartData,
            dataKey: 'actual',
            targetKey: 'target'
        }}
        style={{
            color: 'var(--primary)',
            gradientId: 'moodGradient'
        }}
        legend={{
            label: progressCharts.moodTrendChart.legendLabel,
            targetLabel: progressCharts.moodTrendChart.targetLabel
        }}
    />
)
