import {
    Bell,
    Lock,
    type LucideIcon,
    Palette,
    Shield
} from 'lucide-react'

import { settingsLocales } from '@/locales/settingsLocales'

export type SettingsTab = {
    id: string
    labelKey: string
    icon: LucideIcon
}

export const SETTINGS_TABS_CONFIG: SettingsTab[] = [
    {
        id: 'notifications',
        labelKey: settingsLocales.notifications.title,
        icon: Bell
    },
    {
        id: 'privacy',
        labelKey: settingsLocales.privacy.title,
        icon: Lock
    },
    {
        id: 'security',
        labelKey: settingsLocales.security.title,
        icon: Shield
    },
    {
        id: 'preferences',
        labelKey: 'settings.preferences.title',
        icon: Palette
    }
]