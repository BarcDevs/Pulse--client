import {
    Brain,
    Heart,
    Lock,
    Rocket
} from 'lucide-react'

import { progressPageTexts } from '@/constants/componentTexts/progress'

export const progressMilestonesIconMap = {
    'First Step': Rocket,
    '7-Day Streak': Heart,
    'Mind Master': Brain,
    '1 Month Active': Lock
}

export const progressMilestonesStyleMap = {
    'First Step': {
        iconBg: 'bg-primary-light',
        iconColor: 'text-primary'
    },
    '7-Day Streak': {
        iconBg: 'bg-red-50',
        iconColor: 'text-red-500'
    },
    'Mind Master': {
        iconBg: 'bg-accent-light',
        iconColor: 'text-accent'
    },
    '1 Month Active': {
        iconBg: 'bg-gray-100',
        iconColor: 'text-gray-400'
    }
}

export const progressMilestones =
    progressPageTexts.milestones.list.map((milestone) => ({
        ...milestone,
        icon:
            progressMilestonesIconMap[
                milestone.title as
                    keyof typeof progressMilestonesIconMap
                ],
        ...progressMilestonesStyleMap[
            milestone.title as
                keyof typeof progressMilestonesStyleMap
            ]
    }))
