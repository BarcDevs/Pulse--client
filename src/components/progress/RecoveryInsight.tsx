'use client'

import { useTranslations } from 'next-intl'

import { Sparkles } from 'lucide-react'

import { GradientCard } from '@/components/shared/cards/GradientCard'

import { useLatestCheckIn }
    from '@/hooks/queries/useLatestCheckIn'

import { progressLocales } from '@/locales/progressLocales'

export const RecoveryInsight = () => {
    const t = useTranslations()
    const { latestCheckIn } = useLatestCheckIn()

    const insight = latestCheckIn?.insights?.[0]

    const isEmpty = !insight

    const mainText = isEmpty
        ? t(progressLocales.insight.emptyInsight)
        : insight.content

    const secondaryText = insight?.title

    return (
        <GradientCard>
            <div className={'flex items-start justify-between'}>
                <div className={'flex items-center gap-2'}>
                    <Sparkles className={'h-5 w-5'}/>
                    <span className={'text-sm font-medium'}>
                        {t(progressLocales.insight.label)}
                    </span>
                </div>
            </div>

            <p className={'mt-4 text-primary-foreground/80 text-sm leading-relaxed'}>
                {mainText}
            </p>

            {!isEmpty && secondaryText && (
                <p className={'mt-2 text-primary-foreground/70 text-xs leading-relaxed'}>
                    {secondaryText}
                </p>
            )}

        </GradientCard>
    )
}