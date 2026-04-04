import {
    AlertTriangle,
    Lock,
    Mail
} from 'lucide-react'

import { settingsPageTexts } from './componentTexts/settings'

type SecuritySettingItem = {
    id: string
    iconComponent: typeof Mail
    label: string
    value: string
    variant?: 'destructive'
}

export const securitySettings: SecuritySettingItem[] = [
    {
        id: 'email',
        iconComponent: Mail,
        label: settingsPageTexts.security.email.label,
        value: settingsPageTexts.security.email.value
    },
    {
        id: 'password',
        iconComponent: Lock,
        label: settingsPageTexts.security.password.label,
        value: settingsPageTexts.security.password.value
    },
    {
        id: 'deactivate',
        iconComponent: AlertTriangle,
        label: settingsPageTexts.security.deactivate.label,
        value: settingsPageTexts.security.deactivate.description,
        variant: 'destructive'
    }
]
