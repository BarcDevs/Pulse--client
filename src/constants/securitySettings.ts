import {
    AlertTriangle,
    Lock,
    Mail
} from 'lucide-react'

import * as SettingsTexts from './settingsTexts'

type SecuritySettingItem = {
    id: string
    iconComponent: typeof Mail
    label: string
    value: string
    variant?: 'destructive'
}

export const SECURITY_SETTINGS: SecuritySettingItem[] = [
    {
        id: 'email',
        iconComponent: Mail,
        label: SettingsTexts.SETTINGS_SECURITY_EMAIL_LABEL,
        value: SettingsTexts.SETTINGS_SECURITY_EMAIL_VALUE,
    },
    {
        id: 'password',
        iconComponent: Lock,
        label: SettingsTexts.SETTINGS_SECURITY_PASSWORD_LABEL,
        value: SettingsTexts.SETTINGS_SECURITY_PASSWORD_VALUE,
    },
    {
        id: 'deactivate',
        iconComponent: AlertTriangle,
        label: SettingsTexts.SETTINGS_SECURITY_DEACTIVATE_LABEL,
        value: SettingsTexts.SETTINGS_SECURITY_DEACTIVATE_DESCRIPTION,
        variant: 'destructive',
    },
]
