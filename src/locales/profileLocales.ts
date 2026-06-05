export const profileLocales = {
    info: {
        memberSince: 'profile.info.memberSince'
    },
    levelBadge: 'profile.levelBadge',
    stats: {
        streak: 'profile.stats.streak',
        milestones: 'profile.stats.milestones',
        goals: 'profile.stats.goals'
    },
    recoveryIdentity: {
        title: 'profile.recoveryIdentity.title',
        subtitle: 'profile.recoveryIdentity.subtitle',
        empty: 'profile.recoveryIdentity.empty',
        edit: 'profile.recoveryIdentity.edit',
        done: 'profile.recoveryIdentity.done'
    },
    interestCategories: {
        'physical-recovery': 'profile.interestCategories.physical-recovery',
        'wellness': 'profile.interestCategories.wellness',
        'mental-emotional': 'profile.interestCategories.mental-emotional',
        'community-support': 'profile.interestCategories.community-support'
    },
    basicInfo: {
        title: 'profile.basicInfo.title',
        edit: 'profile.basicInfo.edit',
        fields: 'profile.basicInfo.fields',
        fullName: 'profile.basicInfo.fullName',
        emailAddress: 'profile.basicInfo.emailAddress',
        dateOfBirth: 'profile.basicInfo.dateOfBirth',
        primarySupportContact: 'profile.basicInfo.primarySupportContact',
        firstName: 'common.fields.firstName',
        lastName: 'common.fields.lastName',
        username: 'common.fields.username',
        location: 'common.fields.location',
        locationNotSet: 'profile.basicInfo.locationNotSet',
        recoveryType: 'profile.basicInfo.recoveryType',
        careProvider: 'profile.basicInfo.careProvider',
        notSet: 'profile.basicInfo.notSet',
        save: 'profile.basicInfo.save',
        saving: 'profile.basicInfo.saving',
        cancel: 'profile.basicInfo.cancel',
        emailNote: 'profile.basicInfo.emailNote',
        emailNoteLink: 'profile.basicInfo.emailNoteLink'
    },
    goals: {
        title: 'profile.goals.title',
        viewRoadmap: 'profile.goals.viewRoadmap'
    },
    activities: {
        title: 'profile.activities.title'
    },
    settings: {
        title: 'profile.settings.title',
        list: 'profile.settings.list'
    },
    dailyPreferences: {
        title: 'profile.dailyPreferences.title',
        subtitle: 'profile.dailyPreferences.subtitle',
        editSubtitle: 'profile.dailyPreferences.editSubtitle',
        empty: 'profile.dailyPreferences.empty',
        morningRoutine: {
            title: 'profile.dailyPreferences.morningRoutine.title',
            subtitle: 'profile.dailyPreferences.morningRoutine.subtitle',
            tags: 'profile.dailyPreferences.morningRoutine.tags'
        },
        eveningReflection: {
            title: 'profile.dailyPreferences.eveningReflection.title',
            subtitle: 'profile.dailyPreferences.eveningReflection.subtitle',
            tags: 'profile.dailyPreferences.eveningReflection.tags'
        }
    },
    systemPrivacy: {
        title: 'profile.systemPrivacy.title',
        settings: 'profile.systemPrivacy.settings',
        manageSettings: 'profile.systemPrivacy.manageSettings',
        signOut: 'profile.systemPrivacy.signOut'
    },
    bio: {
        title: 'profile.bio.title',
        placeholder: 'profile.bio.placeholder',
        empty: 'profile.bio.empty'
    },
    savingMessage: 'profile.savingMessage',
    editBanner: {
        viewing: 'profile.editBanner.viewing',
        viewingSubtitle: 'profile.editBanner.viewingSubtitle',
        editing: 'profile.editBanner.editing',
        editingSubtitle: 'profile.editBanner.editingSubtitle',
        edit: 'profile.editBanner.edit',
        save: 'profile.editBanner.save',
        cancel: 'profile.editBanner.cancel'
    },
    toasts: {
        saveFailed: 'profile.toasts.saveFailed'
    },
    recoveryQuotes: [
        '0',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9'
    ].map(
        (i) => `profile.recoveryQuotes.${i}` as const
    )
} as const
