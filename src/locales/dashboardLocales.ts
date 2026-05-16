export const dashboardLocales = {
    title: 'dashboard.title',
    greeting: 'dashboard.greeting',
    checkIn: {
        badge: 'dashboard.checkIn.badge',
        title: 'dashboard.checkIn.title',
        description: 'dashboard.checkIn.description',
        button: 'dashboard.checkIn.button'
    },
    aiInsight: {
        label: 'dashboard.aiInsight.label'
    },
    noInsights: 'dashboard.noInsights',
    community: {
        label: 'dashboard.community.label',
        viewAll: 'dashboard.community.viewAll'
    },
    todaysFocus: {
        label: 'dashboard.todaysFocus.label',
        badge: 'dashboard.todaysFocus.badge',
        title: 'dashboard.todaysFocus.title',
        description: 'dashboard.todaysFocus.description'
    },
    historyChart: {
        title: 'dashboard.historyChart.title',
        week: 'dashboard.historyChart.week',
        month: 'dashboard.historyChart.month'
    },
    stats: {
        labels: {
            mood: 'dashboard.stats.labels.mood',
            pain: 'dashboard.stats.labels.pain',
            streak: 'dashboard.stats.labels.streak',
            progress: 'dashboard.stats.labels.progress'
        },
        subValues: {
            days: 'dashboard.stats.subValues.days'
        },
        descriptions: {
            mood: {
                great: 'dashboard.stats.descriptions.mood.great',
                stable: 'dashboard.stats.descriptions.mood.stable',
                low: 'dashboard.stats.descriptions.mood.low'
            },
            pain: {
                decreasing: 'dashboard.stats.descriptions.pain.decreasing',
                elevated: 'dashboard.stats.descriptions.pain.elevated',
                high: 'dashboard.stats.descriptions.pain.high'
            },
            streak: {
                newRecord: 'dashboard.stats.descriptions.streak.newRecord',
                personalBest: 'dashboard.stats.descriptions.streak.personalBest'
            }
        }
    }
} as const
