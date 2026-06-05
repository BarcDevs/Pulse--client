import { useTranslations } from 'next-intl'

import { insightsLocales } from '@/locales/insightsLocales'
import { OBSERVATION_STAT_MOCK } from '@/mocks/insightsMockData'

export const ObservationCard = () => {
    const t = useTranslations()

    return (
        <div className={'rounded-xl bg-surface-section p-4'}>
            <p className={'label-uppercase text-muted-foreground'}>
                {t(insightsLocales.behavioralPatterns.observation.label)}
            </p>
            <h4 className={'mt-1 font-semibold text-foreground'}>
                {t(insightsLocales.behavioralPatterns.observation.title)}
            </h4>
            <p className={'mt-2 text-sm text-muted-foreground'}>
                {t(insightsLocales.behavioralPatterns.observation.description)}
            </p>
            <div className={'mt-4'}>
                <div className={'text-3xl font-bold text-primary'}>
                    {OBSERVATION_STAT_MOCK}
                </div>
                <p className={'text-xs text-muted-foreground'}>
                    {t(insightsLocales.behavioralPatterns.observation.statLabel)}
                </p>
            </div>
        </div>
    )
}
