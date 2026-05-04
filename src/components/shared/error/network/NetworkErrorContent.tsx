'use client'

import { useTranslations } from 'next-intl'

import { globalLocales } from '@/locales/globalLocales'

export const NetworkErrorContent = () => {
    const t = useTranslations()

    return (
        <div className={'space-y-6'}>
            <h1 className={'font-headline text-5xl md:text-6xl font-extrabold text-foreground tracking-tight'}>
                {t(globalLocales.errors.networkErrorPage.title)}
            </h1>
            <p className={'text-foreground text-lg md:text-xl leading-relaxed max-w-lg mx-auto'}>
                {t(globalLocales.errors.networkErrorPage.description)}
            </p>
        </div>
    )
}