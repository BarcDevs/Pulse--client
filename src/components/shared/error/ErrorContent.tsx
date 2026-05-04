'use client'

import { useTranslations } from 'next-intl'

import { globalLocales } from '@/locales/globalLocales'

export const ErrorContent = () => {
    const t = useTranslations()

    return (
        <div className={'space-y-4 max-w-2xl'}>
            <span className={'inline-flex items-center px-3 py-1 rounded-full bg-error-container text-on-error-container text-xs font-bold tracking-widest uppercase'}>
                {t(globalLocales.errors.errorPage.badge)}
            </span>
            <h1 className={'text-3xl md:text-4xl font-extrabold tracking-tight leading-tight'}>
                <span className={'text-primary-gradient-start dark:text-primary-gradient-start'}>
                    {t(globalLocales.errors.errorPage.mainHeading)}
                </span>
                <br/>
                <span className={'text-primary'}>
                    {t(globalLocales.errors.errorPage.subHeading)}
                </span>
            </h1>
            <p className={'text-sm md:text-base text-on-surface-variant font-body leading-relaxed px-2'}>
                {t(globalLocales.errors.errorPage.description)}
            </p>
        </div>
    )
}
