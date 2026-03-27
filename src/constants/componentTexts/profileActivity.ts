import {
    type LucideIcon,
    Moon,
    Sun
} from 'lucide-react'

export const profileActivity = {
    dailyPreferences: {
        title: 'Daily Activity Preferences',
        morningRoutine: {
            title: 'Morning Routine',
            subtitle: 'Scheduled for 07:30 AM',
            tags: ['Meditation', 'Stretch']
        },
        eveningReflection: {
            title: 'Evening Reflection',
            subtitle: 'Scheduled for 09:00 PM',
            tags: ['Journaling', 'Breathwork']
        }
    }
}

export type DailyActivity = {
    id: number
    icon: LucideIcon
    title: string
    subtitle: string
    tags: string[]
}

export const dailyActivities: DailyActivity[] = [
    {
        id: 1,
        icon: Sun,
        title: profileActivity.dailyPreferences.morningRoutine.title,
        subtitle: profileActivity.dailyPreferences.morningRoutine.subtitle,
        tags: profileActivity.dailyPreferences.morningRoutine.tags
    },
    {
        id: 2,
        icon: Moon,
        title: profileActivity.dailyPreferences.eveningReflection.title,
        subtitle: profileActivity.dailyPreferences.eveningReflection.subtitle,
        tags: profileActivity.dailyPreferences.eveningReflection.tags
    }
]
