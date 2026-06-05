import { ElementType } from 'react'

import {
    Activity,
    CalendarCheck,
    Flame,
    Heart,
    Smile,
    TrendingDown,
    Trophy,
    Zap
} from 'lucide-react'

import type { ObservationType } from '@/types/insight'

export const observationIconMap: Record<ObservationType, ElementType> = {
    activity_consistency: Activity,
    checkin_consistency: CalendarCheck,
    streak_consistency: Flame,
    mood_stability: Heart,
    pain_improvement: TrendingDown,
    better_days_pattern: Zap
}

export const dashboardStatsIconMap = {
    MOOD: Smile,
    PAIN: Activity,
    STREAK: Flame,
    MILESTONES_COMPLETED: Trophy
}

export const dashboardStatsStyleMap = {
    MOOD: {
        iconColor: 'text-primary',
        iconBg: 'bg-primary-light',
        descriptionColor: 'text-primary'
    },
    PAIN: {
        descriptionColor: 'text-warning',
        iconColor: 'text-destructive',
        iconBg: 'bg-red-50'
    },
    STREAK: {
        iconColor: 'text-warning',
        iconBg: 'bg-amber-50',
        descriptionColor: undefined
    },
    MILESTONES_COMPLETED: {
        iconColor: 'text-secondary',
        iconBg: 'bg-secondary-light',
        descriptionColor: undefined
    }
}
