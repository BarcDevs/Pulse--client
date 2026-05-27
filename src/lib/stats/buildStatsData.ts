import type { CheckInStats } from '@/types/checkIn'
import type { RecoveryGoalsStats } from '@/types/goals'

import {
    STAT_LABELS,
    type StatLabel
} from '@/constants/stats'

import { dashboardLocales } from '@/locales/dashboardLocales'

import { getStatDescription } from './getStatDescription'

const { stats: statsLocales } = dashboardLocales

type StatData = {
    id: StatLabel
    labelKey: string
    value: string | number
    subValue: string
    subValueKey: string
    descriptionKey: string
    descriptionParams?:
        Record<string, string | number | Date>
}

const STAT_CONFIG: Record<
    StatLabel,
    {
        getValue: 
            (
                s: CheckInStats | undefined,
                goalsStats?: RecoveryGoalsStats
            ) => string | number
        subValue: string
        subValueKey: string
        getDescription: (s: CheckInStats | undefined) => {
            key: string
            params?: Record<string, string | number | Date>
        }
    }
> = {
    MOOD: {
        getValue: (s) =>
            s?.averageMoodScore?.toFixed(1) ?? '-',
        subValue: '/10',
        subValueKey: '',
        getDescription: (s) => s
            ? getStatDescription(
                'MOOD',
                s.averageMoodScore
            ) : { key: '' }
    },
    PAIN: {
        getValue: (s) =>
            s?.averagePainLevel?.toFixed(1) ?? '-',
        subValue: '/10',
        subValueKey: '',
        getDescription: (s) => s
            ? getStatDescription(
                'PAIN',
                s.averagePainLevel
            ) : { key: '' }
    },
    STREAK: {
        getValue: (s) => s?.currentStreak ?? 0,
        subValue: '',
        subValueKey: statsLocales.subValues.days,
        getDescription: (s) => s
            ? getStatDescription(
                'STREAK',
                s.currentStreak,
                s.longestStreak
            ) : { key: '' }
    },
    MILESTONES_COMPLETED: {
        getValue: (_, goalsStats) =>
            goalsStats?.milestones.completed ?? 0,
        subValue: '',
        subValueKey: '',
        getDescription: () => ({ key: '' })
    }
}

const LABEL_KEY_MAP: Record<StatLabel, string> = {
    MOOD: statsLocales.labels.mood,
    PAIN: statsLocales.labels.pain,
    STREAK: statsLocales.labels.streak,
    MILESTONES_COMPLETED: statsLocales.labels.milestonesCompleted
}

export const buildStatsData = (
    stats: CheckInStats | undefined,
    goalsStats?: RecoveryGoalsStats
): StatData[] =>
    STAT_LABELS.map((id) => {
        const config = STAT_CONFIG[id]
        const description = config.getDescription(stats)
        return {
            id,
            labelKey: LABEL_KEY_MAP[id],
            value: config.getValue(stats, goalsStats),
            subValue: config.subValue,
            subValueKey: config.subValueKey,
            descriptionKey: description.key,
            descriptionParams: description.params
        }
    })
