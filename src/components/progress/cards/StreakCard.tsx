'use client'

import {Calendar} from 'lucide-react'

import {useCheckInStats} from '@/hooks/queries/useCheckInStats'

import {progressPageTexts} from '@/constants/componentTexts/progress'

export const StreakCard = () => {
    const { data } = useCheckInStats('weekly')

    const currentStreak = data?.data
        ?.currentStreak ?? 0
    const longestStreak = data?.data
        ?.longestStreak ?? 0

    return (
        <div className={'rounded-2xl bg-surface-card p-6'}>
            <div className={'flex items-start justify-between'}>
                <div>
                    <p className={'text-xs font-medium text-muted-foreground uppercase tracking-wider'}>
                        {progressPageTexts.stats
                            .streak.label}
                    </p>
                    <div className={'mt-2 flex items-baseline gap-2'}>
                        <span className={'text-4xl font-bold text-foreground'}>
                            {currentStreak}
                        </span>
                        <span className={'text-lg text-muted-foreground'}>
                            {progressPageTexts.stats
                                .streak.unit}
                        </span>
                    </div>
                    <p className={'mt-1 text-sm text-muted-foreground'}>
                        {`${progressPageTexts.stats
                            .streak.bestPrefix} `}
                        <span className={'text-secondary font-medium'}>
                            {longestStreak}
                        </span>
                    </p>
                </div>
                <div className={'h-12 w-12 rounded-xl bg-orange-50 flex items-center justify-center'}>
                    <Calendar className={'h-6 w-6 text-warning'}/>
                </div>
            </div>
        </div>
    )
}
