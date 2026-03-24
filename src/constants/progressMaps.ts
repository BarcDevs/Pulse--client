import {
    Brain,
    Heart,
    Lock,
    Rocket
} from 'lucide-react'

import { PROGRESS_MILESTONES } from '@/constants/progressTexts'

export const PROGRESS_MILESTONES_ICON_MAP = {
    'First Step': Rocket,
    '7-Day Streak': Heart,
    'Mind Master': Brain,
    '1 Month Active': Lock,
}

export const PROGRESS_MILESTONES_STYLE_MAP = {
    'First Step': {
        iconBg: 'bg-primary-light',
        iconColor: 'text-primary',
    },
    '7-Day Streak': {
        iconBg: 'bg-red-50',
        iconColor: 'text-red-500',
    },
    'Mind Master': {
        iconBg: 'bg-accent-light',
        iconColor: 'text-accent',
    },
    '1 Month Active': {
        iconBg: 'bg-gray-100',
        iconColor: 'text-gray-400',
    },
}

export const PROGRESS_MILESTONES_WITH_ICONS =
    PROGRESS_MILESTONES.map((milestone) => ({
        ...milestone,
        icon:
            PROGRESS_MILESTONES_ICON_MAP[
                milestone.title as
                    keyof typeof PROGRESS_MILESTONES_ICON_MAP
            ],
        ...PROGRESS_MILESTONES_STYLE_MAP[
            milestone.title as
                keyof typeof PROGRESS_MILESTONES_STYLE_MAP
        ],
    }))
