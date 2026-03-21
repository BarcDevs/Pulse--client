'use client'

import { Moon, Settings2, Sun } from 'lucide-react'

import { ActivityItem } from '@/components/shared/ActivityItem'

import {
    DAILY_ACTIVITY_PREFERENCES,
} from '@/constants/profileActivityTexts'

const activities = [
    {
        id: 1,
        icon: <Sun className={'h-6 w-6 text-primary'} />,
        title: DAILY_ACTIVITY_PREFERENCES.morningRoutineTitle,
        subtitle: DAILY_ACTIVITY_PREFERENCES.morningRoutineSubtitle,
        tags: DAILY_ACTIVITY_PREFERENCES.morningRoutineTags,
    },
    {
        id: 2,
        icon: <Moon className={'h-6 w-6 text-primary'} />,
        title: DAILY_ACTIVITY_PREFERENCES.eveningReflectionTitle,
        subtitle: DAILY_ACTIVITY_PREFERENCES.eveningReflectionSubtitle,
        tags: DAILY_ACTIVITY_PREFERENCES.eveningReflectionTags,
    },
]

export const DailyActivityPreferences = () => {
    return (
        <div className={'rounded-2xl bg-surface-card p-6'}>
            <div className={'flex items-center justify-between mb-6'}>
                <h3 className={'text-lg font-semibold text-foreground'}>
                    {DAILY_ACTIVITY_PREFERENCES.title}
                </h3>
                <button
                    className={
                        'p-2 rounded-lg hover:bg-surface-section transition-colors'
                    }
                >
                    <Settings2 className={'h-5 w-5 text-muted-foreground'} />
                </button>
            </div>

            <div className={'space-y-4'}>
                {activities.map((activity) => (
                    <ActivityItem
                        key={activity.id}
                        icon={activity.icon}
                        title={activity.title}
                        subtitle={activity.subtitle}
                        tags={activity.tags}
                    />
                ))}
            </div>
        </div>
    )
}
