'use client'

import { useCheckInStats } from '@/hooks/queries/useCheckInStats'

import {
    getTrendData,
    getWellnessStatus
} from '@/lib/stats/getTrendLabel'

import { progressPageTexts } from '@/constants/componentTexts/progress'

import { WellnessScoreCard } from '../cards/WellnessScoreCard'

export const WellnessScore = () => {
    const { data, isError } = useCheckInStats('weekly')

    const moodScore = isError
        ? '-'
        : data?.data?.averageMoodScore ?? 0
    const painScore = isError
        ? '-'
        : data?.data?.averagePainLevel ?? 0
    const moodTrend = getTrendData(
        isError ? [] : data?.data?.moodTrend ?? [],
        'mood'
    )
    const painTrend = getTrendData(
        isError ? [] : data?.data?.painTrend ?? [],
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
                        {progressPageTexts
                            .wellness.label}
                    </p>
                    <h3 className={'mt-1 text-xl font-semibold text-foreground'}>
                        {wellnessStatus}
                    </h3>
                </div>
                <span className={'text-xs text-muted-foreground'}>
                    {progressPageTexts
                        .wellness.timeframe}
                </span>
            </div>

            <div className={'grid grid-cols-2 gap-4'}>
                <WellnessScoreCard
                    label={progressPageTexts
                        .wellness.mood}
                    score={moodScore}
                    trend={moodTrend}
                />
                <WellnessScoreCard
                    label={progressPageTexts
                        .wellness.pain}
                    score={painScore}
                    trend={painTrend}
                />
            </div>
        </div>
    )
}