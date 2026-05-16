import {
    type LucideIcon,
    Minus,
    TrendingDown,
    TrendingUp
} from 'lucide-react'

import { TrendPoint } from '@/types/checkIn'

import { progressLocales } from '@/locales/progressLocales'

const { trends, status } = progressLocales.wellness

export type TrendData = {
    labelKey: string
    icon: LucideIcon
    color: string
}

// todo: use AI to get trend
export const getTrendData = (
    trendData: TrendPoint[],
    metricType: 'mood' | 'pain' = 'mood'
): TrendData => {
    if (trendData.length < 2)
        return metricType === 'mood'
            ? {
                labelKey: trends.steady,
                icon: Minus,
                color: 'text-muted-foreground'
            }
            : {
                labelKey: trends.stable,
                icon: Minus,
                color: 'text-muted-foreground'
            }

    const mid = Math.floor(trendData.length / 2)
    const firstHalf = trendData
        .slice(0, mid)
        .reduce((sum, p) => sum + (p.actual ?? 0), 0) / mid
    const secondHalf = trendData
            .slice(mid)
            .reduce((sum, p) => sum + (p.actual ?? 0), 0)
        / (trendData.length - mid)

    const diff = secondHalf - firstHalf
    const threshold = 0.5

    if (metricType === 'mood') {
        if (diff > threshold)
            return {
                labelKey: trends.improving,
                icon: TrendingUp,
                color: 'text-green-600'
            }
        if (diff < -threshold)
            return {
                labelKey: trends.declining,
                icon: TrendingDown,
                color: 'text-red-600'
            }
        return {
            labelKey: trends.steady,
            icon: Minus,
            color: 'text-muted-foreground'
        }
    }

    if (diff < -threshold)
        return {
            labelKey: trends.improving,
            icon: TrendingDown,
            color: 'text-green-600'
        }
    if (diff > threshold)
        return {
            labelKey: trends.increasing,
            icon: TrendingUp,
            color: 'text-red-600'
        }
    return {
        labelKey: trends.stable,
        icon: Minus,
        color: 'text-muted-foreground'
    }
}

export const getWellnessStatusKey = (
    moodTrend: TrendData,
    painTrend: TrendData
): string | null => {
    const mood = moodTrend.labelKey
    const pain = painTrend.labelKey

    if (
        mood === trends.improving
        && pain === trends.improving
    ) return status.thriving
    if (
        mood === trends.declining
        && pain === trends.increasing
    ) return status.needsAttention
    if (mood === trends.improving)
        return status.moodImproving
    if (pain === trends.improving)
        return status.painRelieving
    if (
        mood === trends.steady
        && pain === trends.stable
    ) return status.stableAndMaintaining
    return null
}