'use client'

import { useTranslations } from 'next-intl'

import { appSettings } from '@/config/appSettings'

import { globalLocales } from '@/locales/globalLocales'

export const CrisisNotice = () => {
    const t = useTranslations()

    return (
        <div className={'mt-10 text-slate-400 text-xs'}>
            <p>
                {`${t(globalLocales.errors.errorPage.crisisNoticeStart)} `}
                {appSettings.supportPhoneNumber && (
                    <span className={'text-primary dark:text-primary/80 font-semibold underline underline-offset-2 decoration-primary/30'}>
                        {appSettings.supportPhoneNumber}
                    </span>
                )}
            </p>
        </div>
    )
}
