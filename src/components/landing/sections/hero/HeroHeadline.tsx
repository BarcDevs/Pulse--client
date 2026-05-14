'use client'

import { useTranslations } from 'next-intl'

import { landingLocales } from '@/locales/landingLocales'

export const HeroHeadline = () => {
    const t = useTranslations()

    return (
        <h1 className={'mb-5 text-5xl font-extrabold leading-tight tracking-tight text-foreground lg:text-6xl'}>
            {t(landingLocales.hero.headline)}
            <br/>
            <span className={'text-primary'}>
                {t(landingLocales.hero.headlineAccent)}
            </span>
        </h1>
    )
}
