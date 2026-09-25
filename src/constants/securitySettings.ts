import {
    AlertTriangle,
    Lock,
    LucideIcon,
    Mail
} from 'lucide-react'

import { settingsLocales } from '@/locales/settingsLocales'

type SecuritySettingItem = {
    id: string
    iconComponent: LucideIcon
    label: string
    description?: string
    variant?: 'destructive'
    buttonText?: string
}

export const securitySettingStyles = {
    default: {
        container: 'flex items-center justify-between p-4 rounded-xl bg-surface-section',
        label: 'font-medium text-foreground'
    },
    destructive: {
        container: 'flex items-center justify-between p-4 rounded-xl border border-destructive/20 bg-destructive/5',
        label: 'font-medium text-destructive'
    }
}

export const securitySettings: SecuritySettingItem[] = [
    {
        id: 'email',
        iconComponent: Mail,
        label: settingsLocales.security.email.label
    },
    {
        id: 'password',
        iconComponent: Lock,
        label: settingsLocales.security.password.label
    },
    {
        id: 'deactivate',
        iconComponent: AlertTriangle,
        label: settingsLocales.security.deactivate.label,
        description: settingsLocales.security.deactivate.description,
        variant: 'destructive',
        buttonText: settingsLocales.security.deactivate.buttonText
    }
]
