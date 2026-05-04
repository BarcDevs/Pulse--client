import { useTranslations } from 'next-intl'

import { insightsLocales } from '@/locales/insightsLocales'

export const ObservationCard = () => {
    const t = useTranslations()

    return (
        <div className={'space-y-3'}>
            <div className={'flex items-center gap-2'}>
                <span className={'text-xs font-medium text-muted-foreground uppercase tracking-wider'}>
                    {t(insightsLocales.behavioralPatterns.observation.label)}
                </span>
            </div>
            <h4 className={'text-base font-medium text-foreground'}>
                {t(insightsLocales.behavioralPatterns.observation.title)}
            </h4>
            <p className={'text-sm text-muted-foreground leading-relaxed'}>
                {t(insightsLocales.behavioralPatterns.observation.description)}
            </p>
            <div className={'mt-4'}>
                <div className={'text-3xl font-bold text-foreground'}>
                    {t(insightsLocales.behavioralPatterns.observation.stat)}
                </div>
                <p className={'text-xs text-muted-foreground'}>
                    {t(insightsLocales.behavioralPatterns.observation.statLabel)}
                </p>
            </div>
        </div>
    )
}
