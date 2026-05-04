export const goalsLocales = {
    header: {
        title: 'goals.header.title',
        description: 'goals.header.description'
    },
    categoryLabels: {
        PHYSICAL: 'goals.categoryLabels.PHYSICAL',
        MENTAL: 'goals.categoryLabels.MENTAL',
        LIFESTYLE: 'goals.categoryLabels.LIFESTYLE'
    },
    statusLabels: {
        ACTIVE: 'goals.statusLabels.ACTIVE',
        COMPLETED: 'goals.statusLabels.COMPLETED',
        PAUSED: 'goals.statusLabels.PAUSED',
        ABANDONED: 'goals.statusLabels.ABANDONED'
    },
    milestoneStatusLabels: {
        LOCKED: 'goals.milestoneStatusLabels.LOCKED',
        ACTIVE: 'goals.milestoneStatusLabels.ACTIVE',
        COMPLETED: 'goals.milestoneStatusLabels.COMPLETED'
    },
    milestoneCardLabels: {
        completedFormat: 'goals.milestoneCardLabels.completedFormat',
        lockedFormat: 'goals.milestoneCardLabels.lockedFormat'
    },
    overview: {
        greeting: 'goals.overview.greeting',
        subtitle: 'goals.overview.subtitle',
        newGoalButton: 'goals.overview.newGoalButton',
        addGoalPlaceholder: 'goals.overview.addGoalPlaceholder',
        addGoalSubtitle: 'goals.overview.addGoalSubtitle'
    },
    mainCard: {
        badge: 'goals.mainCard.badge',
        overall: 'goals.mainCard.overall'
    },
    statSummary: {
        title: 'goals.statSummary.title',
        description: 'goals.statSummary.description'
    },
    milestones: {
        title: 'goals.milestones.title',
        subtitle: 'goals.milestones.subtitle',
        viewAll: 'goals.milestones.viewAll',
        markComplete: 'goals.milestones.markComplete',
        markIncomplete: 'goals.milestones.markIncomplete'
    },
    detail: {
        breadcrumbGoals: 'goals.detail.breadcrumbGoals',
        markCompletePhase: 'goals.detail.markCompletePhase',
        markIncompletePhase: 'goals.detail.markIncompletePhase'
    },
    insights: {
        title: 'goals.insights.title',
        weeklyViewTitle: 'goals.insights.weeklyViewTitle',
        emptyState: 'goals.insights.emptyState',
        failedToLoad: 'goals.insights.failedToLoad'
    },
    actions: {
        completeToday: 'goals.actions.completeToday',
        editPlan: 'goals.actions.editPlan'
    },
    goalCard: {
        progressLabel: 'goals.goalCard.progressLabel'
    },
    goalActions: {
        edit: 'goals.goalActions.edit',
        delete: 'goals.goalActions.delete'
    },
    goalStats: {
        activeMilestonesLabel: 'goals.goalStats.activeMilestonesLabel'
    },
    emptyState: {
        message: 'goals.emptyState.message'
    },
    goalForm: {
        createTitle: 'goals.goalForm.createTitle',
        updateTitle: 'goals.goalForm.updateTitle',
        subtitle: 'goals.goalForm.subtitle',
        backLabel: 'goals.goalForm.backLabel',
        fields: {
            titleLabel: 'goals.goalForm.fields.titleLabel',
            titlePlaceholder: 'goals.goalForm.fields.titlePlaceholder',
            descriptionLabel: 'goals.goalForm.fields.descriptionLabel',
            descriptionPlaceholder: 'goals.goalForm.fields.descriptionPlaceholder',
            categoryLabel: 'goals.goalForm.fields.categoryLabel',
            categoryPlaceholder: 'goals.goalForm.fields.categoryPlaceholder',
            targetDateLabel: 'goals.goalForm.fields.targetDateLabel'
        },
        buttons: {
            create: 'goals.goalForm.buttons.create',
            update: 'goals.goalForm.buttons.update',
            creating: 'goals.goalForm.buttons.creating',
            updating: 'goals.goalForm.buttons.updating',
            cancel: 'goals.goalForm.buttons.cancel'
        },
        smartTip: {
            title: 'goals.goalForm.smartTip.title',
            bundles: 'goals.goalForm.smartTip.bundles'
        }
    }
} as const
