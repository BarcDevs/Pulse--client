import type {CheckInStats} from '@/types/checkIn/checkIn'

import {
    STAT_LABELS,
    type StatLabel
} from '@/constants/stats'

import {getStatDescription} from './getStatDescription'

type StatData = {
    label: string
    value: string | number
    subValue: string
    description: string
}

const STAT_CONFIG: Record<
    StatLabel,
    {
        getValue: (
            s: CheckInStats | undefined
        ) => string | number
        subValue: string
        getDescription: (
            s: CheckInStats | undefined
        ) => string
    }
> = {
    MOOD: {
        getValue: (s) =>
            s?.averageMoodScore?.toFixed(1) ?? '-',
        subValue: '/10',
        getDescription: (s) => s ? (
            getStatDescription(
                'MOOD',
                s.averageMoodScore
            )
        ) : ''
    },
    PAIN: {
        getValue: (s) =>
            s?.averagePainLevel?.toFixed(1) ?? '-',
        subValue: '/10',
        getDescription: (s) => s ? (
            getStatDescription(
                'PAIN',
                s.averagePainLevel
            )
        ) : ''
    },
    STREAK: {
        getValue: (s) => s?.currentStreak ?? 0,
        subValue: ' days',
        getDescription: (s) => s ? (
            getStatDescription(
                'STREAK',
                s.currentStreak,
                s.longestStreak
            )
        ) : ''
    },
    PROGRESS: {
        getValue: () => '-',
        subValue: '',
        getDescription: () => ''
    }
}

export const buildStatsData = (
    stats: CheckInStats | undefined
): StatData[] => {
    return STAT_LABELS.map((label) => {
        const config = STAT_CONFIG[label]
        return {
            label,
            value: config.getValue(stats),
            subValue: config.subValue,
            description: config.getDescription(stats)
        }
    })
}
