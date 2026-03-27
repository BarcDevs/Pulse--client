import {
    Activity,
    Flame,
    Smile,
    TrendingUp
} from 'lucide-react'

import {dashboardPageTexts} from '@/constants/componentTexts/dashboard'

export const dashboardStatsIconMap = {
    MOOD: Smile,
    PAIN: Activity,
    STREAK: Flame,
    progress: TrendingUp
}

export const dashboardStatsStyleMap = {
    MOOD: {
        iconColor: 'text-primary',
        iconBg: 'bg-primary-light',
        descriptionColor: undefined
    },
    PAIN: {
        descriptionColor: 'text-secondary',
        iconColor: 'text-destructive',
        iconBg: 'bg-red-50'
    },
    STREAK: {
        iconColor: 'text-warning',
        iconBg: 'bg-amber-50',
        descriptionColor: undefined
    },
    progress: {
        iconColor: 'text-secondary',
        iconBg: 'bg-secondary-light',
        descriptionColor: undefined
    }
}

export const dashboardStatsWithIcons =
    dashboardPageTexts.statsCards.map((stat) => ({
        ...stat,
        icon:
            dashboardStatsIconMap[
                stat.label as keyof typeof dashboardStatsIconMap
                ],
        ...dashboardStatsStyleMap[
            stat.label as keyof typeof dashboardStatsStyleMap
            ]
    }))
