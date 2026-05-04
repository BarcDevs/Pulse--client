import { useTranslations } from 'next-intl'

import { Badge } from '@/components/ui/badge'

import { insightsLocales } from '@/locales/insightsLocales'

export const PredictionCard = () => {
    const t = useTranslations()

    return (
        <div className={'rounded-xl bg-primary p-4 text-white'}>
            <p className={'label-uppercase opacity-80'}>
                {t(insightsLocales.behavioralPatterns.prediction.label)}
            </p>
            <h4 className={'mt-1 font-semibold'}>
                {t(insightsLocales.behavioralPatterns.prediction.title)}
            </h4>
            <p className={'mt-2 text-sm opacity-90'}>
                {t(insightsLocales.behavioralPatterns.prediction.description)}
            </p>
            <Badge className={'mt-4 border-0 bg-white/20 text-white'}>
                {t(insightsLocales.behavioralPatterns.prediction.badge)}
            </Badge>
        </div>
    )
}
