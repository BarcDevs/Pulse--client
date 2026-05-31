export const progressLocales = {
    title: 'progress.title',
    subtitle: 'progress.subtitle',
    exportPdf: 'progress.exportPdf',
    shareJourney: 'progress.shareJourney',
    milestones: {
        title: 'progress.milestones.title',
        seeAll: 'progress.milestones.seeAll',
        empty: 'progress.milestones.empty'
    },
    wellness: {
        label: 'progress.wellness.label',
        timeframe: 'progress.wellness.timeframe',
        mood: 'progress.wellness.mood',
        pain: 'progress.wellness.pain',
        energy: 'progress.wellness.energy',
        trends: {
            improving: 'progress.wellness.trends.improving',
            declining: 'progress.wellness.trends.declining',
            steady: 'progress.wellness.trends.steady',
            increasing: 'progress.wellness.trends.increasing',
            stable: 'progress.wellness.trends.stable',
            building: 'progress.wellness.trends.building'
        },
        status: {
            thriving: 'progress.wellness.status.thriving',
            needsAttention: 'progress.wellness.status.needsAttention',
            moodImproving: 'progress.wellness.status.moodImproving',
            painRelieving: 'progress.wellness.status.painRelieving',
            stableAndMaintaining: 'progress.wellness.status.stableAndMaintaining'
        }
    },
    stats: {
        streak: {
            label: 'progress.stats.streak.label',
            unit: 'progress.stats.streak.unit',
            personalBest: 'progress.stats.streak.personalBest',
            last14Days: 'progress.stats.streak.last14Days',
            checkedIn: 'progress.stats.streak.checkedIn'
        },
        milestones: {
            label: 'progress.stats.milestones.label',
            unit: 'progress.stats.milestones.unit',
            outOf: 'progress.stats.milestones.outOf',
            acrossGoals: 'progress.stats.milestones.acrossGoals',
            percentComplete: 'progress.stats.milestones.percentComplete',
            completedCount: 'progress.stats.milestones.completedCount',
            inProgressCount: 'progress.stats.milestones.inProgressCount',
            upcomingCount: 'progress.stats.milestones.upcomingCount',
            nextUp: 'progress.stats.milestones.nextUp'
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
        modalDescription: 'progress.share.modalDescription',
        download: 'progress.share.download',
        share: 'progress.share.share'
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
            weekly: 'progress.charts.timePeriods.weekly',
            monthly: 'progress.charts.timePeriods.monthly'
        },
        tabTriggers: {
            week: 'progress.charts.tabTriggers.week',
            month: 'progress.charts.tabTriggers.month'
        },
        status: {
            loadError: 'progress.charts.status.loadError',
            noCheckIn: 'progress.charts.status.noCheckIn',
            noCheckInTooltip: 'progress.charts.status.noCheckInTooltip'
        }
    }
} as const
