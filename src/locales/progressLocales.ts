export const progressLocales = {
    title: 'progress.title',
    subtitle: 'progress.subtitle',
    exportPdf: 'progress.exportPdf',
    shareJourney: 'progress.shareJourney',
    milestones: {
        title: 'progress.milestones.title',
        seeAll: 'progress.milestones.seeAll',
        list: 'progress.milestones.list'
    },
    wellness: {
        label: 'progress.wellness.label',
        timeframe: 'progress.wellness.timeframe',
        mood: 'progress.wellness.mood',
        pain: 'progress.wellness.pain',
        trends: {
            improving: 'progress.wellness.trends.improving',
            declining: 'progress.wellness.trends.declining',
            steady: 'progress.wellness.trends.steady',
            increasing: 'progress.wellness.trends.increasing',
            stable: 'progress.wellness.trends.stable',
            building: 'progress.wellness.trends.building'
        }
    },
    stats: {
        streak: {
            label: 'progress.stats.streak.label',
            unit: 'progress.stats.streak.unit',
            bestPrefix: 'progress.stats.streak.bestPrefix'
        },
        milestones: {
            label: 'progress.stats.milestones.label',
            unit: 'progress.stats.milestones.unit',
            nextPrefix: 'progress.stats.milestones.nextPrefix',
            nextValue: 'progress.stats.milestones.nextValue'
        }
    },
    share: {
        title: 'progress.share.title',
        tagline: 'progress.share.tagline',
        cta: 'progress.share.cta',
        filename: 'progress.share.filename',
        toastShare: 'progress.share.toastShare',
        toastCopied: 'progress.share.toastCopied',
        toastDownloaded: 'progress.share.toastDownloaded',
        streakUnit: 'progress.share.streakUnit',
        noMoodData: 'progress.share.noMoodData',
        currentStreakLabel: 'progress.share.currentStreakLabel',
        averageMoodLabel: 'progress.share.averageMoodLabel',
        milestonesLabel: 'progress.share.milestonesLabel',
        modalTitle: 'progress.share.modalTitle',
        modalDescription: 'progress.share.modalDescription'
    },
    insight: {
        label: 'progress.insight.label',
        emptyInsight: 'progress.insight.emptyInsight',
        buttonPrimary: 'progress.insight.buttonPrimary',
        buttonSecondary: 'progress.insight.buttonSecondary'
    },
    charts: {
        moodChart: {
            title: 'progress.charts.moodChart.title',
            subtitle: 'progress.charts.moodChart.subtitle',
            legendLabel: 'progress.charts.moodChart.legendLabel',
            targetLabel: 'progress.charts.moodChart.targetLabel'
        },
        painChart: {
            title: 'progress.charts.painChart.title',
            subtitle: 'progress.charts.painChart.subtitle',
            legendLabel: 'progress.charts.painChart.legendLabel'
        },
        moodTrendChart: {
            title: 'progress.charts.moodTrendChart.title',
            subtitle: 'progress.charts.moodTrendChart.subtitle',
            legendLabel: 'progress.charts.moodTrendChart.legendLabel',
            targetLabel: 'progress.charts.moodTrendChart.targetLabel'
        },
        painIntensityChart: {
            title: 'progress.charts.painIntensityChart.title',
            subtitle: 'progress.charts.painIntensityChart.subtitle',
            legendLabel: 'progress.charts.painIntensityChart.legendLabel'
        },
        timePeriods: {
            daily: 'progress.charts.timePeriods.daily',
            weekly: 'progress.charts.timePeriods.weekly',
            monthly: 'progress.charts.timePeriods.monthly'
        },
        tabTriggers: {
            week: 'progress.charts.tabTriggers.week',
            month: 'progress.charts.tabTriggers.month'
        },
        notifications: {
            moodIncomplete: 'progress.charts.notifications.moodIncomplete',
            painIncomplete: 'progress.charts.notifications.painIncomplete',
            loadError: 'progress.charts.notifications.loadError'
        }
    }
} as const
