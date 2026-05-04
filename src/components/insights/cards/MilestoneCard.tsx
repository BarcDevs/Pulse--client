import { useTranslations } from 'next-intl'

import { Trophy } from 'lucide-react'

import { insightsLocales } from '@/locales/insightsLocales'

export const MilestoneCard = () => {
    const t = useTranslations()

    return (
        <div className={'rounded-2xl bg-linear-to-br from-accent to-accent/80 p-6 text-accent-foreground h-full'}>
            <div className={'flex items-center justify-between'}>
                <Trophy className={'h-8 w-8 text-accent-foreground/80'}/>
            </div>

            <h3 className={'mt-4 text-xl font-semibold'}>
                {t(insightsLocales.milestone.title)}
            </h3>

            <p className={'mt-2 text-accent-foreground/80 text-sm leading-relaxed'}>
                {t(insightsLocales.milestone.description)}
            </p>

            <div className={'mt-4 inline-flex items-center gap-2 bg-white/20 rounded-full px-3 py-1.5 text-xs font-medium'}>
                {t(insightsLocales.milestone.label)}
            </div>
        </div>
    )
}
