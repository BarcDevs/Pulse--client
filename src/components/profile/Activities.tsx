import { Moon, Plus, Sun } from 'lucide-react'

import { ActivityItem } from '@/components/shared/ActivityItem'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import {
    PROFILE_ACTIVITIES_LIST,
    PROFILE_ACTIVITIES_TITLE,
} from '@/constants/profileTexts'

const iconMap = {
    'Morning Routine': Sun,
    'Evening Reflection': Moon,
}

const activities = PROFILE_ACTIVITIES_LIST.map((activity) => ({
    ...activity,
    icon: iconMap[activity.title as keyof typeof iconMap],
}))

export const ProfileActivities = () => {
    return (
        <Card className={'border-0 shadow-sm'}>
            <CardHeader className={'flex flex-row items-center justify-between'}>
                <CardTitle className={'text-lg font-semibold'}>
                    {PROFILE_ACTIVITIES_TITLE}
                </CardTitle>
                <Button
                    variant={'ghost'}
                    size={'icon'}
                    className={'text-muted-foreground'}
                >
                    <Plus className={'size-5'} />
                </Button>
            </CardHeader>
            <CardContent className={'space-y-4'}>
                {activities.map((activity) => (
                    <ActivityItem
                        key={activity.title}
                        icon={
                            <activity.icon className={'size-5 text-primary'} />
                        }
                        title={activity.title}
                        subtitle={activity.time}
                        tags={activity.tags}
                        variant={'card'}
                    />
                ))}
            </CardContent>
        </Card>
    )
}
