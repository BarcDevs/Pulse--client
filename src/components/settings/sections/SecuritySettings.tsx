'use client'

import { useTranslations } from 'next-intl'

import { Shield } from 'lucide-react'

import { settingsLocales } from '@/locales/settingsLocales'

import { DeactivateSection } from './DeactivateSection'
import { EmailSection } from './EmailSection'
import { PasswordSection } from './PasswordSection'

export const SecuritySettings = () => {
    const t = useTranslations()

    return (
        <div className={'rounded-2xl bg-surface-card p-6'}>
            <div className={'flex items-center gap-2 mb-6'}>
                <Shield className={'h-5 w-5 text-primary'}/>
                <h3 className={'text-lg font-semibold text-foreground'}>
                    {t(settingsLocales.security.title)}
                </h3>
            </div>

            <div className={'space-y-4'}>
                <EmailSection/>
                <PasswordSection/>
                <DeactivateSection/>
            </div>
        </div>
    )
}
