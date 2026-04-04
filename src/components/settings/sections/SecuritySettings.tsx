'use client'

import { Shield } from 'lucide-react'

import { cn } from '@/lib/utils'

import { settingsPageTexts } from '@/constants/componentTexts/settings'
import { securitySettings } from '@/constants/securitySettings'

import { SecuritySettingItem } from '../items/SecuritySettingItem'

export const SecuritySettings = () => (
    <div className={'rounded-2xl bg-surface-card p-6'}>
        <div className={'flex items-center gap-2 mb-6'}>
            <Shield className={'h-5 w-5 text-primary'}/>
            <h3 className={'text-lg font-semibold text-foreground'}>
                {settingsPageTexts.security.title}
            </h3>
        </div>

        <div className={'space-y-4'}>
            {securitySettings.map((setting) => {
                const IconComponent = setting.iconComponent
                const iconColor = setting.variant === 'destructive'
                    ? 'text-destructive'
                    : 'text-muted-foreground'

                return (
                    <SecuritySettingItem
                        key={setting.id}
                        icon={
                            <IconComponent className={cn(
                                'h-5 w-5',
                                iconColor
                            )}/>
                        }
                        label={setting.label}
                        value={setting.value}
                        variant={setting.variant}
                    />
                )
            })}
        </div>
    </div>
)
