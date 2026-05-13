import { FEATURES } from '@/config/features'

import { settingsLocales } from '@/locales/settingsLocales'

export const SETTINGS_TABS_CONFIG = [
    {
        id: 'notifications',
        labelKey: settingsLocales.notifications.title,
        icon: 'Bell',
        active: FEATURES.settingsNotifications
    },
    {
        id: 'privacy',
        labelKey: settingsLocales.privacy.title,
        icon: 'Lock',
        active: FEATURES.settingsPrivacy
    },
    {
        id: 'security',
        labelKey: settingsLocales.security.title,
        icon: 'Shield',
        active: FEATURES.settingsSecurity
    },
    {
        id: 'preferences',
        labelKey: 'settings.preferences.title',
        icon: 'Palette',
        active: FEATURES.settingsPreferences
    }
] as const
