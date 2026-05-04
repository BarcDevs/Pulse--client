'use client'

import { useTranslations } from 'next-intl'

import { Icon } from '@/components/shared/ui/Icon'

import { globalLocales } from '@/locales/globalLocales'

export const JournalSavedCard = () => {
    const t = useTranslations()

    return (
        <div className={'p-6 bg-surface-container-low rounded-xl border border-outline-variant/5'}>
            <div className={'mb-3'}>
                <Icon
                    name={'error/clinical-notes'}
                    size={24}
                />
            </div>
            <h4 className={'font-bold text-primary mb-1'}>
                {t(globalLocales.errors.errorPage.journalSavedTitle)}
            </h4>
            <p className={'text-xs text-on-surface-variant'}>
                {t(globalLocales.errors.errorPage.journalSavedDesc)}
            </p>
        </div>
    )
}
