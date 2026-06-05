import { useTranslations } from 'next-intl'

import { TrendingUp } from 'lucide-react'

import { insightsLocales } from '@/locales/insightsLocales'

export const PredictionCard = () => {
    const t = useTranslations()

    return (
        <div className={'rounded-xl bg-primary p-5 text-primary-foreground'}>
            <span className={'label-uppercase opacity-80'}>
                {t(insightsLocales.behavioralPatterns.prediction.label)}
            </span>
            <h4 className={'mt-2 text-base font-medium'}>
                {t(insightsLocales.behavioralPatterns.prediction.title)}
            </h4>
            <p className={'mt-2 text-sm opacity-80 leading-relaxed'}>
                {t(insightsLocales.behavioralPatterns.prediction.description)}
            </p>
            <div className={'mt-4 flex items-center gap-2 text-xs'}>
                <TrendingUp className={'h-4 w-4'}/>
                {t(insightsLocales.behavioralPatterns.prediction.confidence)}
            </div>
        </div>
    )
}
