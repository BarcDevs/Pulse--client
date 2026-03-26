import {
    LucideIcon,
    Moon,
    Sun
} from 'lucide-react'

export const DAILY_ACTIVITY_PREFERENCES = {
    title: 'Daily Activity Preferences',
    morningRoutineTitle: 'Morning Routine',
    morningRoutineSubtitle: 'Scheduled for 07:30 AM',
    morningRoutineTags: ['Meditation', 'Stretch'],
    eveningReflectionTitle: 'Evening Reflection',
    eveningReflectionSubtitle: 'Scheduled for 09:00 PM',
    eveningReflectionTags: ['Journaling', 'Breathwork']
}

export type DailyActivity = {
    id: number
    icon: LucideIcon
    title: string
    subtitle: string
    tags: string[]
}

export const DAILY_ACTIVITIES: DailyActivity[] = [
    {
        id: 1,
        icon: Sun,
        title: DAILY_ACTIVITY_PREFERENCES.morningRoutineTitle,
        subtitle: DAILY_ACTIVITY_PREFERENCES.morningRoutineSubtitle,
        tags: DAILY_ACTIVITY_PREFERENCES.morningRoutineTags
    },
    {
        id: 2,
        icon: Moon,
        title: DAILY_ACTIVITY_PREFERENCES.eveningReflectionTitle,
        subtitle: DAILY_ACTIVITY_PREFERENCES.eveningReflectionSubtitle,
        tags: DAILY_ACTIVITY_PREFERENCES.eveningReflectionTags
    }
]
