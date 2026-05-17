'use client'

import { useState } from 'react'

import { useTranslations } from 'next-intl'

import { Lock } from 'lucide-react'

import { toRelative } from '@/lib/time'

import { useAuth } from '@/context/AuthContext'

import { settingsLocales } from '@/locales/settingsLocales'

import { SecuritySettingItem } from '../items/SecuritySettingItem'
import { PasswordChangeStep } from '../steps/PasswordChangeStep'

export const PasswordSection = () => {
    const t = useTranslations()
    const { user } = useAuth()
    const [expanded, setExpanded] = useState(false)
    const passwordValue = user?.passwordUpdatedAt
        ? `Last changed ${toRelative(
            new Date(user.passwordUpdatedAt)
        )}`
        : ''
    return (
        <div>
            <SecuritySettingItem
                icon={<Lock className={'h-5 w-5 text-muted-foreground'}/>}
                label={t(settingsLocales.security.password.label)}
                value={passwordValue}
                onClickAction={() => setExpanded((prev) => !prev)}
            />
            {expanded && (
                <PasswordChangeStep
                    onSuccessAction={() => setExpanded(false)}
                    onCancelAction={() => setExpanded(false)}
                />
            )}
        </div>
    )
}
