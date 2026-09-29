'use client'

import { useTranslations } from 'next-intl'

import { landingLocales } from '@/locales/landingLocales'

export const HeroHeadline = () => {
    const t = useTranslations()

    const line2 = t(landingLocales.hero.headlineLine2)

    return (
        <h1 className={'mb-5 text-5xl font-extrabold leading-[1.1] tracking-[-0.05em] text-foreground lg:text-[56px]'}>
            {t(landingLocales.hero.headline)}
            {line2 && (
                <>
                    <br/>
                    {line2}
                </>
            )}
            <br/>
            <span className={'text-primary-gradient-start'}>
                {t(landingLocales.hero.headlineAccent)}
            </span>
        </h1>
    )
}
