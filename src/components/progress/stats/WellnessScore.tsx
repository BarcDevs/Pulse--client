'use client'

import { useTranslations } from 'next-intl'

import { useCheckInStats } from '@/hooks/queries/useCheckInStats'

import {
    getTrendData,
    getWellnessStatus
} from '@/lib/stats/getTrendLabel'

import { progressLocales } from '@/locales/progressLocales'

import { WellnessScoreCard } from '../cards/WellnessScoreCard'

export const WellnessScore = () => {
    const t = useTranslations()
    const { data, isError } = useCheckInStats('weekly')

    const moodScore = isError
        ? '-'
        : data?.averageMoodScore ?? 0
    const painScore = isError
        ? '-'
        : data?.averagePainLevel ?? 0
    const moodTrend = getTrendData(
        isError ? [] : data?.moodTrend ?? [],
        'mood'
    )
    const painTrend = getTrendData(
        isError ? [] : data?.painTrend ?? [],
        'pain'
    )
    const wellnessStatus = getWellnessStatus(
        moodTrend,
        painTrend
    )

    return (
        <div className={'card-base'}>
            <div className={'flex-center-between mb-4'}>
                <div>
                    <p className={'text-muted-foreground label-uppercase'}>
                        {t(progressLocales.wellness.label)}
                    </p>
                    <h3 className={'mt-1 text-xl font-semibold text-foreground'}>
                        {wellnessStatus}
                    </h3>
                </div>
                <span className={'text-xs text-muted-foreground'}>
                    {t(progressLocales.wellness.timeframe)}
                </span>
            </div>

            <div className={'grid grid-cols-2 gap-4'}>
                <WellnessScoreCard
                    label={t(progressLocales.wellness.mood)}
                    score={moodScore}
                    trend={moodTrend}
                />
                <WellnessScoreCard
                    label={t(progressLocales.wellness.pain)}
                    score={painScore}
                    trend={painTrend}
                />
            </div>
        </div>
    )
}