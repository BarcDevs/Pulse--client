import {
    Brain,
    Heart,
    Lock,
    Rocket
} from 'lucide-react'

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

export const progressMilestonesLocaleMap = {
    'First Step': 'progress.milestones.list.0.title',
    '7-Day Streak': 'progress.milestones.list.1.title',
    'Mind Master': 'progress.milestones.list.2.title',
    '1 Month Active': 'progress.milestones.list.3.title'
}

export const progressMilestones = [
    {
        title: 'First Step',
        titleKey: progressMilestonesLocaleMap['First Step'],
        icon: progressMilestonesIconMap['First Step'],
        ...progressMilestonesStyleMap['First Step'],
        achieved: false,
        description: 'progress.milestones.list.0.description'
    },
    {
        title: '7-Day Streak',
        titleKey: progressMilestonesLocaleMap['7-Day Streak'],
        icon: progressMilestonesIconMap['7-Day Streak'],
        ...progressMilestonesStyleMap['7-Day Streak'],
        achieved: false,
        description: 'progress.milestones.list.1.description'
    },
    {
        title: 'Mind Master',
        titleKey: progressMilestonesLocaleMap['Mind Master'],
        icon: progressMilestonesIconMap['Mind Master'],
        ...progressMilestonesStyleMap['Mind Master'],
        achieved: false,
        description: 'progress.milestones.list.2.description'
    },
    {
        title: '1 Month Active',
        titleKey: progressMilestonesLocaleMap['1 Month Active'],
        icon: progressMilestonesIconMap['1 Month Active'],
        ...progressMilestonesStyleMap['1 Month Active'],
        achieved: false,
        description: 'progress.milestones.list.3.description'
    }
]
