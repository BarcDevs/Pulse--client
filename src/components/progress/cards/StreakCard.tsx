'use client'

import { useTranslations } from 'next-intl'

import { Calendar } from 'lucide-react'

import { useCheckInStats } from '@/hooks/queries/useCheckInStats'

import { progressLocales } from '@/locales/progressLocales'

import { StreakCardSkeleton } from './StreakCardSkeleton'

export const StreakCard = () => {
    const t = useTranslations()
    const {
        data,
        isLoading,
        isError
    } = useCheckInStats('weekly')

    if (isLoading) return <StreakCardSkeleton/>

    const currentStreak = isError
        ? '-'
        : data?.currentStreak ?? 0
    const longestStreak = isError
        ? '-'
        : data?.longestStreak ?? 0

    return (
        <div className={'card-base'}>
            <div className={'flex-start-between'}>
                <div>
                    <p className={'text-muted-foreground label-uppercase'}>
                        {t(progressLocales.stats.streak.label)}
                    </p>
                    <div className={'mt-2 flex items-baseline gap-2'}>
                        <span className={'text-4xl font-bold text-foreground'}>
                            {currentStreak}
                        </span>
                        <span className={'text-lg text-muted-foreground'}>
                            {t(progressLocales.stats.streak.unit)}
                        </span>
                    </div>
                    <p className={'mt-1 text-sm text-muted-foreground'}>
                        {`${t(progressLocales.stats.streak.bestPrefix)} `}
                        <span className={'text-secondary font-medium'}>
                            {longestStreak}
                        </span>
                    </p>
                </div>
                <div className={'h-12 w-12 rounded-xl bg-orange-50 flex--center'}>
                    <Calendar className={'h-6 w-6 text-warning'}/>
                </div>
            </div>
        </div>
    )
}
