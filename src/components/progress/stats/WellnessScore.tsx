'use client'

import { useTranslations } from 'next-intl'

import { useCheckInStats } from '@/hooks/queries/useCheckInStats'

import {
    getTrendData,
    getWellnessStatusKey
} from '@/lib/stats/getTrendLabel'

import { progressLocales } from '@/locales/progressLocales'

import { WellnessScoreCard } from '../cards/WellnessScoreCard'

import { WellnessScoreSkeleton } from './WellnessScoreSkeleton'

export const WellnessScore = () => {
    const t = useTranslations()
    const {
        data,
        isLoading,
        isError
    } = useCheckInStats('weekly')

    if (isLoading) return <WellnessScoreSkeleton/>

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
    const moodTrendLabel = t(moodTrend.labelKey)
    const painTrendLabel = t(painTrend.labelKey)
    const wellnessStatusKey = getWellnessStatusKey(
        moodTrend,
        painTrend
    )
    const wellnessStatus = wellnessStatusKey
        ? t(wellnessStatusKey)
        : `${moodTrendLabel} & ${painTrendLabel}`

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
                    trendLabel={moodTrendLabel}
                />
                <WellnessScoreCard
                    label={t(progressLocales.wellness.pain)}
                    score={painScore}
                    trend={painTrend}
                    trendLabel={painTrendLabel}
                />
            </div>
        </div>
    )
}