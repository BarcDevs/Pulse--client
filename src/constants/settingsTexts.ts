const SETTINGS_TITLE = 'Settings'

const SETTINGS_SUBTITLE = 'Customize your HealEase experience'

const SETTINGS_TABS = [
    {
        id: 'notifications',
        label: 'Notifications',
        icon: 'Bell',
    },
    {
        id: 'privacy',
        label: 'Privacy',
        icon: 'Lock',
    },
    {
        id: 'security',
        label: 'Account & Security',
        icon: 'Shield',
    },
    {
        id: 'preferences',
        label: 'App Preferences',
        icon: 'Palette',
    },
]

const SETTINGS_SUPPORT_LABEL = 'Support'

const SETTINGS_HELP_CENTER = 'Help Center'

const SETTINGS_DISCARD_CHANGES = 'Discard Changes'

const SETTINGS_SAVE_PREFERENCES = 'Save Preferences'

const SETTINGS_NOTIFICATIONS_TITLE = 'Notifications'

const SETTINGS_NOTIFICATIONS_DAILY_REMINDER_LABEL = 'Daily Reminder'

const SETTINGS_NOTIFICATIONS_DAILY_REMINDER_DESCRIPTION = 'Receive a gentle nudge for your recovery check-ins and meditations'

const SETTINGS_NOTIFICATIONS_COMMUNITY_ALERTS_LABEL = 'Community Alerts'

const SETTINGS_NOTIFICATIONS_COMMUNITY_ALERTS_DESCRIPTION = 'Get notified when someone interacts with your posts or sends support'

const SETTINGS_PRIVACY_TITLE = 'Privacy Settings'

const SETTINGS_PRIVACY_VISIBILITY_TITLE = 'Profile Visibility'

const SETTINGS_PRIVACY_VISIBILITY_DESCRIPTION = 'Choose who can see your progress and badges'

const SETTINGS_PRIVACY_VISIBILITY_OPTIONS = [
    { value: 'onlyMe', label: 'Only Me' },
    { value: 'mentors', label: 'Mentors Only' },
    { value: 'community', label: 'Community' },
]

const SETTINGS_PRIVACY_DATA_SHARING_TITLE = 'Data Sharing'

const SETTINGS_PRIVACY_DATA_SHARING_DESCRIPTION = 'Allow HealEase to use anonymized data for research'

const SETTINGS_PRIVACY_ANONYMOUS_PARTICIPATION_LABEL = 'Anonymous Participation'

const SETTINGS_SECURITY_TITLE = 'Account & Security'

const SETTINGS_SECURITY_EMAIL_LABEL = 'Email Address'

const SETTINGS_SECURITY_EMAIL_VALUE = 'alex@example.com'

const SETTINGS_SECURITY_PASSWORD_LABEL = 'Password'

const SETTINGS_SECURITY_PASSWORD_VALUE = 'Last changed 3 months ago'

const SETTINGS_SECURITY_DEACTIVATE_LABEL = 'Deactivate Account'

const SETTINGS_SECURITY_DEACTIVATE_DESCRIPTION = 'Permanently remove your recovery data'

const SETTINGS_PREFERENCES_TITLE = 'App Preferences'

const SETTINGS_PREFERENCES_THEME_TITLE = 'Theme Mode'

const SETTINGS_PREFERENCES_THEME_DESCRIPTION = 'Select your visual preference'

const SETTINGS_PREFERENCES_THEME_LIGHT = 'Light'

const SETTINGS_PREFERENCES_THEME_DARK = 'Dark'

const SETTINGS_PREFERENCES_LANGUAGE_TITLE = 'Preferred Language'

const SETTINGS_PREFERENCES_LANGUAGE_DESCRIPTION = 'The language used across the app interface'

const SETTINGS_PREFERENCES_LANGUAGE_OPTIONS = [
    { value: 'en-US', label: 'English (US)' },
    { value: 'es', label: 'Spanish' },
    { value: 'fr', label: 'French' },
    { value: 'de', label: 'German' },
]

export {
    SETTINGS_DISCARD_CHANGES,
    SETTINGS_HELP_CENTER,
    SETTINGS_NOTIFICATIONS_COMMUNITY_ALERTS_DESCRIPTION,
    SETTINGS_NOTIFICATIONS_COMMUNITY_ALERTS_LABEL,
    SETTINGS_NOTIFICATIONS_DAILY_REMINDER_DESCRIPTION,
    SETTINGS_NOTIFICATIONS_DAILY_REMINDER_LABEL,
    SETTINGS_NOTIFICATIONS_TITLE,
    SETTINGS_PREFERENCES_LANGUAGE_DESCRIPTION,
    SETTINGS_PREFERENCES_LANGUAGE_OPTIONS,
    SETTINGS_PREFERENCES_LANGUAGE_TITLE,
    SETTINGS_PREFERENCES_THEME_DARK,
    SETTINGS_PREFERENCES_THEME_DESCRIPTION,
    SETTINGS_PREFERENCES_THEME_LIGHT,
    SETTINGS_PREFERENCES_THEME_TITLE,
    SETTINGS_PREFERENCES_TITLE,
    SETTINGS_PRIVACY_ANONYMOUS_PARTICIPATION_LABEL,
    SETTINGS_PRIVACY_DATA_SHARING_DESCRIPTION,
    SETTINGS_PRIVACY_DATA_SHARING_TITLE,
    SETTINGS_PRIVACY_TITLE,
    SETTINGS_PRIVACY_VISIBILITY_DESCRIPTION,
    SETTINGS_PRIVACY_VISIBILITY_OPTIONS,
    SETTINGS_PRIVACY_VISIBILITY_TITLE,
    SETTINGS_SAVE_PREFERENCES,
    SETTINGS_SECURITY_DEACTIVATE_DESCRIPTION,
    SETTINGS_SECURITY_DEACTIVATE_LABEL,
    SETTINGS_SECURITY_EMAIL_LABEL,
    SETTINGS_SECURITY_EMAIL_VALUE,
    SETTINGS_SECURITY_PASSWORD_LABEL,
    SETTINGS_SECURITY_PASSWORD_VALUE,
    SETTINGS_SECURITY_TITLE,
    SETTINGS_SUBTITLE,
    SETTINGS_SUPPORT_LABEL,
    SETTINGS_TABS,
    SETTINGS_TITLE,
}
