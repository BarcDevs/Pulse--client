'use client'

import {
    Bell,
    History,
    Share2,
    Shield
} from 'lucide-react'

import {Button} from '@/components/ui/button'

import {
    PROFILE_SYSTEM_PRIVACY_SETTINGS,
    PROFILE_SYSTEM_PRIVACY_TITLE
} from '@/constants/profileDetailTexts'

const iconMap = {
    Security: Shield,
    Notifications: Bell,
    'Data Sharing': Share2,
    'Login History': History
}

const settings = PROFILE_SYSTEM_PRIVACY_SETTINGS
    .map((setting) => ({
        ...setting,
        icon: iconMap[setting.title as keyof typeof iconMap]
    }))

export const SystemPrivacy = () => (
    <div className={'rounded-2xl bg-surface-card p-6'}>
        <h3 className={'text-lg font-semibold text-foreground mb-6'}>
            {PROFILE_SYSTEM_PRIVACY_TITLE}
        </h3>

        <div className={'grid grid-cols-2 lg:grid-cols-4 gap-4'}>
            // todo: split button
            {settings.map((setting) => (
                <Button
                    key={setting.title}
                    variant={'ghost'}
                    className={'flex flex-col items-center p-4 rounded-xl bg-surface-section hover:bg-surface-section/80 h-auto text-center'}
                >
                    <div className={'h-12 w-12 rounded-xl bg-surface-card flex items-center justify-center mb-3'}>
                        <setting.icon className={'h-6 w-6 text-muted-foreground'}/>
                    </div>
                    <h4 className={'text-sm font-medium text-foreground'}>
                        {setting.title}
                    </h4>
                    <p className={'text-xs text-muted-foreground mt-1'}>
                        {setting.subtitle}
                    </p>
                </Button>
            ))}
        </div>
    </div>
)
