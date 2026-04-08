'use client'

import { Settings2 } from 'lucide-react'

import { ActivityItem } from '@/components/shared/lists/ActivityItem'
import { Button } from '@/components/ui/button'

import { useUser } from '@/hooks/ui/useUser'

import { profilePageTexts } from '@/constants/componentTexts/profile'
import { dailyActivities } from '@/constants/componentTexts/profileActivity'

// TODO: Add time scheduling for activity preferences to Profile/ActivityPreference type
export const DailyActivityPreferences = () => {
    const { user } = useUser()

    const activities =
        user?.profile?.activityPreferences?.length
            ? user.profile.activityPreferences
                .map((activity) => {
                    const match = dailyActivities.find(
                        (dailyActivity) =>
                            dailyActivity.title === activity.name
                    )
                    return match ? {
                        id: activity.id,
                        icon: match.icon,
                        title: activity.name,
                        subtitle: activity.description,
                        tags: [activity.category]
                    } : null
                }).filter(
                    (activity): activity is NonNullable<
                        typeof activity
                    > => activity !== null
                )
            : dailyActivities

    return (
        <div className={'rounded-2xl bg-surface-card p-6'}>
            <div className={'flex items-center justify-between mb-6'}>
                <h3 className={'text-lg font-semibold text-foreground'}>
                    {profilePageTexts.activities.title}
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
