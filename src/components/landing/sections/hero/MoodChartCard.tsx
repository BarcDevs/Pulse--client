'use client'

import { useTranslations } from 'next-intl'

import { landingLocales } from '@/locales/landingLocales'

import { MoodChartSvg } from './MoodChartSvg'

export const MoodChartCard = () => {
    const t = useTranslations()

    return (
        <div className={'w-70 rounded-2xl bg-surface-card/90 px-4.5 pb-3.5 pt-4.5 shadow-lg backdrop-blur-md'}>
            <div className={'mb-3.5 flex items-baseline justify-between'}>
                <div>
                    <p className={'mb-0.5 text-[10px] uppercase tracking-widest text-muted-foreground'}>
                        {t(landingLocales.hero.chartPeriod)}
                    </p>
                    <p className={'text-[15px] font-bold text-foreground'}>
                        {t(landingLocales.hero.chartTrend)}
                    </p>
                </div>
                <span className={'rounded-full bg-secondary-light px-2 py-0.5 text-[11px] font-bold text-secondary'}>
                    {'+18%'}
                </span>
            </div>

            <MoodChartSvg/>

            <div className={'mt-2 flex justify-between text-[10px] text-muted-foreground'}>
                <span>{'Apr 15'}</span>
                <span>{'Apr 22'}</span>
                <span>{t(landingLocales.hero.chartToday)}</span>
            </div>
        </div>
    )
}
