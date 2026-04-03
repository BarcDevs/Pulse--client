import {
    Activity,
    Flame,
    Smile,
    TrendingUp
} from 'lucide-react'

export const dashboardStatsIconMap = {
    MOOD: Smile,
    PAIN: Activity,
    STREAK: Flame,
    PROGRESS: TrendingUp
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
    PROGRESS: {
        iconColor: 'text-secondary',
        iconBg: 'bg-secondary-light',
        descriptionColor: undefined
    }
}
