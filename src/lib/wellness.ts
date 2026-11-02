import { useTranslations } from 'next-intl'

import type { CheckInStats } from '@/types/checkIn'

import {
    getTrendData,
    getWellnessStatusKey
} from '@/lib/stats/getTrendLabel'

export const getWellnessData = (
    data: CheckInStats | undefined,
    isError: boolean,
    t: ReturnType<typeof useTranslations>
) => {
    const moodScore = isError ? '-' : (data?.averageMoodScore ?? 0)
    const painScore = isError ? '-' : (data?.averagePainLevel ?? 0)
    const moodTrend = getTrendData(isError ? [] : (data?.moodTrend ?? []), 'mood')
    const painTrend = getTrendData(isError ? [] : (data?.painTrend ?? []), 'pain')
    const moodTrendLabel = moodTrend.labelKey ? t(moodTrend.labelKey) : ''
    const painTrendLabel = painTrend.labelKey ? t(painTrend.labelKey) : ''
    const wellnessStatusKey = getWellnessStatusKey(moodTrend, painTrend)
    const hasTrend = !!moodTrend.labelKey && !!painTrend.labelKey
    const wellnessStatus = wellnessStatusKey
        ? t(wellnessStatusKey)
        : hasTrend
            ? `${moodTrendLabel} & ${painTrendLabel}`
            : ''
    return {
        moodScore,
        painScore,
        moodTrend,
        painTrend,
        moodTrendLabel,
        painTrendLabel,
        wellnessStatus
    }
}
