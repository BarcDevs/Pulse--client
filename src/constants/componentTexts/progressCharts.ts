import type { TrendAreaChartProps } from '@/components/shared/charts/TrendAreaChart'

export const progressCharts = {
    moodChart: {
        title: 'Mood Trend',
        subtitle: 'Daily average mood score',
        legendLabel: 'Actual Score',
        targetLabel: 'Weekly Target'
    },
    painChart: {
        title: 'Pain Intensity',
        subtitle: 'Tracking physical symptoms over time',
        legendLabel: 'Pain Level (lower is better)'
    },
    moodTrendChart: {
        title: 'Mood Trend',
        subtitle: 'Daily average mood score',
        legendLabel: 'Mood Score',
        targetLabel: 'Weekly Target'
    },
    painIntensityChart: {
        title: 'Pain Intensity',
        subtitle: 'Tracking physical progression over time',
        legendLabel: 'Pain Level (Joints)'
    }
}

export const chartTimePeriods: Record<string, string> = {
    daily: 'Daily',
    weekly: 'Weekly',
    monthly: 'Monthly'
}

export const chartTabTriggers: Record<string, string> = {
    week: 'Week',
    month: 'Month'
}

export const chartNotifications = {
    moodIncomplete: 'Track your mood patterns to discover what brings you joy',
    painIncomplete: 'Every day brings new insights into your recovery',
    loadError: 'Failed to load data'
}

type TrendChartConfig = Omit<
    TrendAreaChartProps,
    'chart' | 'onPeriodChangeAction'
> & {
    chart: Omit<
        TrendAreaChartProps['chart'],
        'data'
    >
}

export const trendChartConfigs: Record<
    'mood' | 'pain',
    TrendChartConfig
> = {
    mood: {
        header: {
            title: progressCharts.moodTrendChart.title,
            subtitle: progressCharts.moodTrendChart.subtitle
        },
        chart: {
            dataKey: 'actual',
            targetKey: 'target'
        },
        style: {
            color: 'var(--primary)',
            gradientId: 'moodGradient'
        },
        legend: {
            label: progressCharts.moodTrendChart.legendLabel,
            targetLabel: progressCharts.moodTrendChart.targetLabel
        }
    },
    pain: {
        header: {
            title: progressCharts.painIntensityChart.title,
            subtitle: progressCharts.painIntensityChart.subtitle
        },
        chart: {
            dataKey: 'actual'
        },
        style: {
            color: 'var(--secondary)',
            gradientId: 'painGradient'
        },
        legend: {
            label: progressCharts.painIntensityChart.legendLabel
        }
    }
}
