'use client'

import { useTranslations } from 'next-intl'

import {
    Activity,
    Smile,
    Zap
} from 'lucide-react'

import { useCheckInStats } from '@/hooks/queries/useCheckInStats'

import { cn } from '@/lib/utils'
import { getWellnessData } from '@/lib/wellness'
import { wellnessColors } from '@/lib/wellnessColors'

import { FEATURES } from '@/config/features'

import { progressLocales } from '@/locales/progressLocales'

import { WellnessCardSkeleton } from './WellnessCardSkeleton'
import { WellnessScoreCard } from './WellnessScoreCard'

export const WellnessCard = () => {
    const t = useTranslations()
    const {
        data,
        isLoading,
        isError
    } = useCheckInStats('weekly')

    if (isLoading) return <WellnessCardSkeleton/>

    const {
        moodScore,
        painScore,
        moodTrend,
        painTrend,
        moodTrendLabel,
        painTrendLabel,
        wellnessStatus
    } = getWellnessData(data, isError, t)

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

            <div className={cn(
                'grid gap-4',
                FEATURES.wellnessEnergy ? 'grid-cols-3' : 'grid-cols-2'
            )}>
                <WellnessScoreCard
                    label={t(progressLocales.wellness.mood)}
                    score={moodScore}
                    trend={moodTrend}
                    trendLabel={moodTrendLabel}
                    icon={Smile}
                    color={wellnessColors.mood.primary}
                />
                <WellnessScoreCard
                    label={t(progressLocales.wellness.pain)}
                    score={painScore}
                    trend={painTrend}
                    trendLabel={painTrendLabel}
                    icon={Activity}
                    color={wellnessColors.pain.primary}
                />
                {FEATURES.wellnessEnergy && (
                    <WellnessScoreCard
                        label={t(progressLocales.wellness.energy)}
                        score={0}
                        trend={moodTrend}
                        trendLabel={''}
                        icon={Zap}
                        color={wellnessColors.energy.primary}
                    />
                )}
            </div>
        </div>
    )
}
