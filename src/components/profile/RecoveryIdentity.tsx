'use client'

import { useTranslations } from 'next-intl'

import { profileLocales } from '@/locales/profileLocales'

import { RecoveryInterestList } from './RecoveryInterestList'
import { RecoveryQuote } from './RecoveryQuote'

export const RecoveryIdentity = () => {
    const t = useTranslations()

    return (
        <div className={'card-base'}>
            <h3 className={'mb-2 text-lg font-semibold text-foreground'}>
                {t(profileLocales.recoveryIdentity.title)}
            </h3>
            <p className={'mb-6 text-sm text-muted-foreground'}>
                {t(profileLocales.recoveryIdentity.subtitle)}
            </p>

            {/* TODO: show RecoveryIdentityPicker when global isEditing is true */}
            <RecoveryInterestList/>

            <RecoveryQuote/>
        </div>
    )
}
