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

export const moodTrendChartData = [
    { date: 'Mon', actual: 5, target: 6 },
    { date: 'Tue', actual: 6, target: 6 },
    { date: 'Wed', actual: 5.5, target: 6 },
    { date: 'Thu', actual: 7, target: 6 },
    { date: 'Fri', actual: 6.5, target: 6 },
    { date: 'Sat', actual: 8, target: 6 },
    { date: 'Sun', actual: 7.5, target: 6 }
]

export const painIntensityChartData = [
    { date: 'Mon', actual: 2 },
    { date: 'Tue', actual: 3 },
    { date: 'Wed', actual: 2.5 },
    { date: 'Thu', actual: 4 },
    { date: 'Fri', actual: 3 },
    { date: 'Sat', actual: 2 },
    { date: 'Sun', actual: 2.5 }
]
