import {
    AlertTriangle,
    Lock, 
    LucideIcon,
    Mail
} from 'lucide-react'

import { settingsPageTexts } from './componentTexts/settings'

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
        label: 'font-medium text-foreground',
        button: 'h-8 w-8 p-0 rounded-lg hover:bg-muted-foreground/10'
    },
    destructive: {
        container: 'flex items-center justify-between p-4 rounded-xl border border-destructive/20 bg-destructive/5',
        label: 'font-medium text-destructive',
        button: ''
    }
}

export const securitySettings: SecuritySettingItem[] = [
    {
        id: 'email',
        iconComponent: Mail,
        label: settingsPageTexts.security.email,
    },
    {
        id: 'password',
        iconComponent: Lock,
        label: settingsPageTexts.security.password.label
    },
    {
        id: 'deactivate',
        iconComponent: AlertTriangle,
        label: settingsPageTexts.security.deactivate.label,
        description: settingsPageTexts.security.deactivate.description,
        variant: 'destructive',
        buttonText: settingsPageTexts.security.deactivate.buttonText
    }
]
