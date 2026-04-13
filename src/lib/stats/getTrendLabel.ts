import { TrendPoint } from '@/types/checkIn'

export type TrendData = {
    label: string
    icon: 'up' | 'down' | 'flat'
    color: string
}

// todo: use AI to get trend
export const getTrendData = (
    trendData: TrendPoint[],
    metricType: 'mood' | 'pain' = 'mood'
): TrendData => {
    if (trendData.length < 2)
        return metricType === 'mood' ? {
            label: 'Steady',
            icon: 'flat',
            color: 'text-muted-foreground'
        } : {
            label: 'No change',
            icon: 'flat',
            color: 'text-muted-foreground'
        }

    const mid = Math.floor(trendData.length / 2)
    const firstHalf = trendData
        .slice(0, mid)
        .reduce((sum, p) => sum + p.actual, 0) / mid
    const secondHalf = trendData
            .slice(mid)
            .reduce((sum, p) => sum + p.actual, 0)
        / (trendData.length - mid)

    const diff = secondHalf - firstHalf
    const threshold = 0.5

    if (metricType === 'mood') {
        if (diff > threshold) {
            return {
                label: 'Improving',
                icon: 'up',
                color: 'text-green-600'
            }
        } else if (diff < -threshold) {
            return {
                label: 'Declining',
                icon: 'down',
                color: 'text-red-600'
            }
        }

        return {
            label: 'Steady',
            icon: 'flat',
            color: 'text-muted-foreground'
        }
    }

    if (diff < -threshold) {
        return {
            label: 'Improving',
            icon: 'down',
            color: 'text-green-600'
        }
    } else if (diff > threshold) {
        return {
            label: 'Increasing',
            icon: 'up',
            color: 'text-red-600'
        }
    }

    return {
        label: 'Stable',
        icon: 'flat',
        color: 'text-muted-foreground'
    }
}

export const getWellnessStatus = (
    moodTrend: TrendData,
    painTrend: TrendData
): string => {
    const moodLabel = moodTrend.label
    const painLabel = painTrend.label

    if ((moodLabel === 'Improving') && (
        painLabel === 'Improving'
    )) return 'Thriving & Improving'

    if ((moodLabel === 'Declining') && (
        painLabel === 'Increasing'
    )) return 'Needs Attention'

    if (moodLabel === 'Improving')
        return 'Mood Improving'

    if (painLabel === 'Improving')
        return 'Pain Relieving'

    if ((moodLabel === 'Steady') && (
        painLabel === 'Stable'
    )) return 'Stable & Maintaining'

    return `${moodLabel} & ${painLabel}`
}