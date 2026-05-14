'use client'

import { useTranslations } from 'next-intl'

import { cn } from '@/lib/utils'

import { landingLocales } from '@/locales/landingLocales'

import { MoodChartCard } from './MoodChartCard'

const STREAK_DOTS = Array.from({ length: 28 }, (_, i) => {
    if (i < 24) return 'bg-primary'
    if (i < 26) return 'bg-primary-light'
    return 'bg-border'
})

export const HeroPreviewCard = () => {
    const t = useTranslations()

    return (
        <div className={'relative flex h-96 items-center justify-center overflow-hidden rounded-2xl bg-linear-to-br from-primary-light to-accent-light shadow-2xl'}>
            <MoodChartCard/>

            <div className={'absolute left-[18px] top-[22px] grid grid-cols-7 gap-1 rounded-xl bg-surface-card/85 p-2.5 shadow backdrop-blur-md'}>
                {STREAK_DOTS.map((cls, i) => (
                    <div key={i} className={cn('size-2 rounded-[2px]', cls)}/>
                ))}
            </div>

            <div className={'absolute right-5 top-5 rounded-xl bg-surface-card/95 px-3.5 py-2.5 shadow backdrop-blur-md'}>
                <p className={'text-xs font-bold text-secondary'}>
                    {`✦ 142 ${t(landingLocales.hero.streakLabel)}`}
                </p>
            </div>

            <div className={'absolute bottom-5 left-5 rounded-xl bg-surface-card/95 px-3.5 py-2.5 shadow backdrop-blur-md'}>
                <p className={'mb-0.5 text-[11px] uppercase tracking-wider text-muted-foreground'}>
                    {t(landingLocales.hero.moodLabel)}
                </p>
                <p className={'text-xl font-bold text-foreground'}>
                    {'8'}
                    <span className={'text-[13px] font-normal text-muted-foreground'}>
                        {'/10'}
                    </span>
                </p>
            </div>
        </div>
    )
}
