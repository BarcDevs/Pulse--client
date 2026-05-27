'use client'

import { useTranslations } from 'next-intl'

import { Target } from 'lucide-react'

import { useRecoveryGoalsStats } from '@/hooks/queries/useRecoveryGoalsStats'

import { progressLocales } from '@/locales/progressLocales'

import { MilestonesCardSkeleton } from './MilestonesCardSkeleton'

export const MilestonesCard = () => {
    const t = useTranslations()
    const {
        data,
        isLoading,
        isError
    } = useRecoveryGoalsStats()

    if (isLoading) return <MilestonesCardSkeleton/>

    const milestonesAchieved = isError
        ? '-'
        : data?.milestones.completed ?? 0

    return (
        <div className={'card-base'}>
            <div className={'flex-start-between'}>
                <div>
                    <p className={'text-muted-foreground label-uppercase'}>
                        {t(progressLocales.stats.milestones.label)}
                    </p>
                    <div className={'mt-2 flex items-baseline gap-2'}>
                        <span className={'text-4xl font-bold text-foreground'}>
                            {milestonesAchieved}
                        </span>
                        <span className={'text-lg text-muted-foreground'}>
                            {t(progressLocales.stats.milestones.unit)}
                        </span>
                    </div>
                </div>
                <div className={'h-12 w-12 rounded-xl bg-purple-50 flex--center'}>
                    <Target className={'h-6 w-6 text-purple'}/>
                </div>
            </div>
        </div>
    )
}
