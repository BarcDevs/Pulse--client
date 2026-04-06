import type { ProfileVisibility } from '@/types/profile'

export const DEFAULT_LANGUAGE = 'en-US'
export const DEFAULT_VISIBILITY: ProfileVisibility = 'onlyMe'

export const visibilityMap: Record<ProfileVisibility, string> = {
    onlyMe: 'Only Me',
    mentors: 'Mentors Only',
    community: 'Community'
}

export const languageMap: Record<string, string> = {
    'en-US': 'English (US)',
    'he-IL': 'עברית'
}

export const settingsPageTexts = {
    title: 'Settings',
    subtitle: 'Customize your HealEase experience',
    tabs: [
        {
            id: 'notifications',
            label: 'Notifications',
            icon: 'Bell'
        },
        {
            id: 'privacy',
            label: 'Privacy',
            icon: 'Lock'
        },
        {
            id: 'security',
            label: 'Account & Security',
            icon: 'Shield'
        },
        {
            id: 'preferences',
            label: 'App Preferences',
            icon: 'Palette'
        }
    ],
    support: {
        label: 'Support',
        helpCenter: 'Help Center'
    },
    buttons: {
        discardChanges: 'Discard Changes',
        savePreferences: 'Save Preferences',
        savingPreferences: 'Saving...'
    },
    notifications: {
        title: 'Notifications',
        dailyReminder: {
            label: 'Daily Reminder',
            description: 'Receive a gentle nudge for your recovery check-ins and meditations'
        },
        communityAlerts: {
            label: 'Community Alerts',
            description: 'Get notified when someone interacts with your posts or sends support'
        }
    },
    privacy: {
        title: 'Privacy Settings',
        visibility: {
            title: 'Profile Visibility',
            description: 'Choose who can see your progress and badges',
            options: [
                { value: 'onlyMe', label: 'Only Me' },
                { value: 'mentors', label: 'Mentors Only' },
                { value: 'community', label: 'Community' }
            ]
        },
        dataSharing: {
            title: 'Data Sharing',
            description: 'Allow HealEase to use anonymized data for research'
        },
        anonymousParticipation: {
            label: 'Anonymous Participation'
        }
    },
    security: {
        title: 'Account & Security',
        email: 'Email Address',
        password: {
            label: 'Password',
            value: 'Last changed 3 months ago'
        },
        deactivate: {
            label: 'Deactivate Account',
            description: 'Permanently remove your recovery data',
            buttonText: 'Deactivate'
        }
    },
    preferences: {
        title: 'App Preferences',
        theme: {
            title: 'Theme Mode',
            description: 'Select your visual preference',
            light: 'Light',
            dark: 'Dark'
        },
        language: {
            title: 'Preferred Language',
            description: 'The language used across the app interface',
            options: [
                { value: 'en-US', label: 'English (US)' },
                { value: 'he-IL', label: 'עברית' }
            ]
        }
    }
}
