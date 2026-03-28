import {TrendAreaChart} from '@/components/shared/charts/TrendAreaChart'

import {
    painIntensityChartData,
    progressCharts
} from '@/constants/componentTexts/progressCharts'

export const PainIntensityChart = () => (
    <TrendAreaChart
        header={{
            title: progressCharts.painIntensityChart.title,
            subtitle: progressCharts.painIntensityChart.subtitle
        }}
        chart={{
            data: painIntensityChartData,
            dataKey: 'actual'
        }}
        style={{
            color: 'var(--secondary)',
            gradientId: 'painGradient'
        }}
        legend={{
            label: progressCharts.painIntensityChart.legendLabel
        }}
    />
)
