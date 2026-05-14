'use client'

import { useTranslations } from 'next-intl'

import { Logo } from '@/components/shared/brand/Logo'

import { landingLocales } from '@/locales/landingLocales'

export const HeroPreviewCard = () => {
    const t = useTranslations()

    return (
        <div className={'relative flex h-80 items-center justify-center overflow-hidden rounded-2xl bg-linear-to-br from-primary-light to-accent-light shadow-2xl'}>
            <div className={'flex size-24 items-center justify-center rounded-full bg-primary/10'}>
                <Logo/>
            </div>

            <div className={'absolute right-5 top-5 rounded-xl bg-surface-card/95 px-3 py-2.5 shadow-md backdrop-blur-sm'}>
                <p className={'text-xs font-bold text-secondary'}>
                    {`✦ 142 ${t(landingLocales.hero.streakLabel)}`}
                </p>
            </div>

            <div className={'absolute bottom-5 left-5 rounded-xl bg-surface-card/95 px-3 py-2.5 shadow-md backdrop-blur-sm'}>
                <p className={'mb-0.5 text-xs uppercase tracking-wider text-muted-foreground'}>
                    {t(landingLocales.hero.moodLabel)}
                </p>
                <p className={'text-xl font-bold text-foreground'}>
                    {'8/10'}
                </p>
            </div>
        </div>
    )
}
