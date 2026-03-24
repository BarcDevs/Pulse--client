import {
    Activity,
    Flame,
    Smile,
    TrendingUp
} from 'lucide-react'

import { DASHBOARD_STATS_CARDS } from '@/constants/dashboardTexts'

export const DASHBOARD_STATS_ICON_MAP = {
    MOOD: Smile,
    PAIN: Activity,
    STREAK: Flame,
    PROGRESS: TrendingUp,
}

export const DASHBOARD_STATS_STYLE_MAP = {
    MOOD: {
        iconColor: 'text-primary',
        iconBg: 'bg-primary-light',
        descriptionColor: undefined,
    },
    PAIN: {
        descriptionColor: 'text-secondary',
        iconColor: 'text-destructive',
        iconBg: 'bg-red-50',
    },
    STREAK: {
        iconColor: 'text-warning',
        iconBg: 'bg-amber-50',
        descriptionColor: undefined,
    },
    PROGRESS: {
        iconColor: 'text-secondary',
        iconBg: 'bg-secondary-light',
        descriptionColor: undefined,
    },
}

export const DASHBOARD_STATS_WITH_ICONS =
    DASHBOARD_STATS_CARDS.map((stat) => ({
        ...stat,
        icon:
            DASHBOARD_STATS_ICON_MAP[
                stat.label as keyof typeof DASHBOARD_STATS_ICON_MAP
            ],
        ...DASHBOARD_STATS_STYLE_MAP[
            stat.label as keyof typeof DASHBOARD_STATS_STYLE_MAP
        ],
    }))
