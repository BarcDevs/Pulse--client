import { settingsLocales } from '@/locales/settingsLocales'

export const SETTINGS_TABS_CONFIG = [
    {
        id: 'notifications',
        labelKey: settingsLocales.notifications.title,
        icon: 'Bell'
    },
    {
        id: 'privacy',
        labelKey: settingsLocales.privacy.title,
        icon: 'Lock'
    },
    {
        id: 'security',
        labelKey: settingsLocales.security.title,
        icon: 'Shield'
    },
    {
        id: 'preferences',
        labelKey: 'settings.preferences.title',
        icon: 'Palette'
    }
] as const
