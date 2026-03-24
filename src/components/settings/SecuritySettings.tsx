'use client'

import {
    AlertTriangle,
    Edit2,
    Lock,
    Mail,
    Shield
} from 'lucide-react'

import {Button} from '@/components/ui/button'

import * as SettingsTexts from '@/constants/settingsTexts'

export const SecuritySettings = () => (
    <div className={'rounded-2xl bg-surface-card p-6'}>
        <div className={'flex items-center gap-2 mb-6'}>
            <Shield className={'h-5 w-5 text-primary'}/>
            <h3 className={'text-lg font-semibold text-foreground'}>
                {SettingsTexts.SETTINGS_SECURITY_TITLE}
            </h3>
        </div>

        <div className={'space-y-4'}>
            <div className={'flex items-center justify-between p-4 rounded-xl bg-surface-section'}>
                <div className={'flex items-center gap-3'}>
                    <Mail className={'h-5 w-5 text-muted-foreground'}/>
                    <div>
                        <h4 className={'font-medium text-foreground'}>
                            {SettingsTexts.SETTINGS_SECURITY_EMAIL_LABEL}
                        </h4>
                        <p className={'text-sm text-muted-foreground'}>
                            {SettingsTexts.SETTINGS_SECURITY_EMAIL_VALUE}
                        </p>
                    </div>
                </div>
                <Button
                    variant={'ghost'}
                    size={'sm'}
                    className={'h-8 w-8 p-0 rounded-lg hover:bg-surface-card'}
                >
                    <Edit2 className={'h-4 w-4 text-muted-foreground'}/>
                </Button>
            </div>

            <div className={
                'flex items-center justify-between p-4 rounded-xl bg-surface-section'
            }>
                <div className={'flex items-center gap-3'}>
                    <Lock className={'h-5 w-5 text-muted-foreground'}/>
                    <div>
                        <h4 className={'font-medium text-foreground'}>
                            {SettingsTexts.SETTINGS_SECURITY_PASSWORD_LABEL}
                        </h4>
                        <p className={'text-sm text-muted-foreground'}>
                            {SettingsTexts.SETTINGS_SECURITY_PASSWORD_VALUE}
                        </p>
                    </div>
                </div>
                <Button
                    variant={'ghost'}
                    size={'sm'}
                    className={'h-8 w-8 p-0 rounded-lg hover:bg-surface-card'}
                >
                    <Edit2 className={'h-4 w-4 text-muted-foreground'}/>
                </Button>
            </div>

            <div className={'flex items-center justify-between p-4 rounded-xl border border-destructive/20 bg-destructive/5'}>
                <div className={'flex items-center gap-3'}>
                    <AlertTriangle className={'h-5 w-5 text-destructive'}/>
                    <div>
                        <h4 className={'font-medium text-destructive'}>
                            {SettingsTexts.SETTINGS_SECURITY_DEACTIVATE_LABEL}
                        </h4>
                        <p className={'text-sm text-muted-foreground'}>
                            {SettingsTexts.SETTINGS_SECURITY_DEACTIVATE_DESCRIPTION}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
)
