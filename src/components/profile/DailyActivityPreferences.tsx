'use client'

import {Settings2} from 'lucide-react'

import {ActivityItem} from '@/components/shared/ActivityItem'
import {Button} from '@/components/ui/button'

import {
    DAILY_ACTIVITIES,
    DAILY_ACTIVITY_PREFERENCES
} from '@/constants/profileActivityTexts'

export const DailyActivityPreferences = () => (
    <div className={'rounded-2xl bg-surface-card p-6'}>
        <div className={'flex items-center justify-between mb-6'}>
            <h3 className={'text-lg font-semibold text-foreground'}>
                {DAILY_ACTIVITY_PREFERENCES.title}
            </h3>
            <Button
                variant={'ghost'}
                size={'sm'}
                className={'h-8 w-8 p-0 rounded-lg hover:bg-surface-section'}
            >
                <Settings2 className={'h-5 w-5 text-muted-foreground'}/>
            </Button>
        </div>

        <div className={'space-y-4'}>
            {DAILY_ACTIVITIES.map((activity) => (
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
