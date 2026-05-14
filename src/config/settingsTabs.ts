import {
    Bell,
    Lock,
    type LucideIcon,
    Palette,
    Shield
} from 'lucide-react'

import { FEATURES } from '@/config/features'

import { settingsLocales } from '@/locales/settingsLocales'

export type SettingsTab = {
    id: string
    labelKey: string
    icon: LucideIcon
    active: boolean
}

export const SETTINGS_TABS_CONFIG: SettingsTab[] = [
    {
        id: 'notifications',
        labelKey: settingsLocales.notifications.title,
        icon: Bell,
        active: FEATURES.settingsNotifications
    },
    {
        id: 'privacy',
        labelKey: settingsLocales.privacy.title,
        icon: Lock,
        active: FEATURES.settingsPrivacy
    },
    {
        id: 'security',
        labelKey: settingsLocales.security.title,
        icon: Shield,
        active: FEATURES.settingsSecurity
    },
    {
        id: 'preferences',
        labelKey: 'settings.preferences.title',
        icon: Palette,
        active: FEATURES.settingsPreferences
    }
]