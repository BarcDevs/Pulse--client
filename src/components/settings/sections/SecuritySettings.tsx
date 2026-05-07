'use client'

import { useTranslations } from 'next-intl'

import { Shield } from 'lucide-react'

import { toRelative } from '@/lib/time'
import { cn } from '@/lib/utils'

import { securitySettings } from '@/constants/securitySettings'

import { useAuth } from '@/context/AuthContext'

import { settingsLocales } from '@/locales/settingsLocales'

import { SecuritySettingItem as SecuritySettingItemComponent }
    from '../items/SecuritySettingItem'

export const SecuritySettings = () => {
    const t = useTranslations()
    const { user } = useAuth()

    return (
        <div className={'rounded-2xl bg-surface-card p-6'}>
            <div className={'flex items-center gap-2 mb-6'}>
                <Shield className={'h-5 w-5 text-primary'}/>
                <h3 className={'text-lg font-semibold text-foreground'}>
                    {t(settingsLocales.security.title)}
                </h3>
            </div>

            <div className={'space-y-4'}>
                {securitySettings.map((setting) => {
                    const IconComponent = setting.iconComponent
                    const iconColor = setting.variant === 'destructive'
                        ? 'text-destructive'
                        : 'text-muted-foreground'

                    const value = (() => {
                        switch (setting.id) {
                            case 'email':
                                return user?.email || ''
                            case 'password':
                                return user?.passwordUpdatedAt
                                    ? `Last changed ${toRelative(
                                        new Date(user.passwordUpdatedAt)
                                    )}`
                                    : ''
                            case 'deactivate':
                                return setting.description ? t(setting.description) : ''
                            default:
                                return ''
                        }
                    })()

                    return (
                        <SecuritySettingItemComponent
                            key={setting.id}
                            icon={
                                <IconComponent className={cn(
                                    'h-5 w-5',
                                    iconColor
                                )}/>
                            }
                            label={t(setting.label)}
                            value={value}
                            variant={setting.variant}
                            buttonText={setting.buttonText ? t(setting.buttonText) : undefined}
                        />
                    )
                })}
            </div>
        </div>
    )
}
