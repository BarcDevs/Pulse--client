'use client'

import { useTranslations } from 'next-intl'

import { landingLocales } from '@/locales/landingLocales'

import { HeroCTAs } from './HeroCTAs'
import { HeroHeadline } from './HeroHeadline'

export const HeroContent = () => {
    const t = useTranslations()

    return (
        <div className={'flex-1 animate-fade-in'}>
            <HeroHeadline/>
            <p className={'mb-8 max-w-md text-base leading-relaxed text-muted-foreground'}>
                {t(landingLocales.hero.subtitle)}
            </p>
            <HeroCTAs/>
        </div>
    )
}
