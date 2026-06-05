'use client'

import { useTranslations } from 'next-intl'

import { useProfileEditContext } from '@/context/ProfileEditContext'

import { profileLocales } from '@/locales/profileLocales'

import { RecoveryIdentityPicker } from './RecoveryIdentityPicker'
import { RecoveryInterestList } from './RecoveryInterestList'
import { RecoveryQuote } from './RecoveryQuote'

export const RecoveryIdentity = () => {
    const t = useTranslations()
    const { isEditing } = useProfileEditContext()

    return (
        <div className={'card-base'}>
            <h3 className={'mb-2 text-lg font-semibold text-foreground'}>
                {t(profileLocales.recoveryIdentity.title)}
            </h3>
            <p className={'mb-6 text-sm text-muted-foreground'}>
                {isEditing
                    ? t(profileLocales.recoveryIdentity.edit)
                    : t(profileLocales.recoveryIdentity.subtitle)
                }
            </p>

            {isEditing ? (
                <RecoveryIdentityPicker/>
            ) : (
                <RecoveryInterestList/>
            )}

            <RecoveryQuote/>
        </div>
    )
}
