'use client'

import { useTranslations } from 'next-intl'

import { Award, Flame } from 'lucide-react'

import { useCheckIns } from '@/hooks/queries/useCheckIns'
import { useCheckInStats } from '@/hooks/queries/useCheckInStats'

import {
    getTodayMidnight,
    toDateStr
} from '@/lib/time'

import { progressLocales } from '@/locales/progressLocales'

import { StreakBars } from './StreakBars'
import { StreakCardSkeleton } from './StreakCardSkeleton'

export const StreakCard = () => {
    const t = useTranslations()
    const {
        data,
        isLoading,
        isError
    } = useCheckInStats('weekly')
    const {
        data: checkIns = [],
        isLoading: checkInsLoading
    } = useCheckIns(14)

    if (isLoading || checkInsLoading)
        return <StreakCardSkeleton/>

    const currentStreak = isError ? 0 : (data?.currentStreak ?? 0)
    const longestStreak = isError ? '-' : (data?.longestStreak ?? 0)

    const today = getTodayMidnight()
    const windowStart = new Date(today)
    windowStart.setDate(today.getDate() - 13)
    const windowStartStr = toDateStr(windowStart)
    const checkedInCount = checkIns.filter(
        c => c.checkInDate.slice(0, 10) >= windowStartStr
    ).length

    return (
        <div className={'card-base'}>
            <div className={'flex-start-between mb-3'}>
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
                </div>
                <div className={'h-12 w-12 rounded-xl flex--center bg-streak-icon-bg'}>
                    <Flame className={'h-6 w-6 text-warning'}/>
                </div>
            </div>

            <div className={'flex-center-between mb-2'}>
                <p className={'text-xs font-semibold text-muted-foreground label-uppercase'}>
                    {t(progressLocales.stats.streak.last14Days)}
                </p>
                <p className={'text-xs text-muted-foreground'}>
                    {t(progressLocales.stats.streak.checkedIn, { count: checkedInCount })}
                </p>
            </div>

            <StreakBars
                checkIns={checkIns}
                currentStreak={currentStreak}
            />

            <div className={'mt-3 pt-3 border-t border-border flex-center-between'}>
                <div className={'flex items-center gap-1.5 text-muted-foreground'}>
                    <Award className={'h-4 w-4'}/>
                </div>
                <span className={'text-sm font-bold text-foreground'}>
                    {t(progressLocales.stats.streak.personalBest, { days: longestStreak })}
                </span>
            </div>
        </div>
    )
}
