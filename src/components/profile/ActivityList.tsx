import {Plus} from 'lucide-react'

import {ActivityItem} from '@/components/shared/ActivityItem'
import {Button} from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from '@/components/ui/card'

import {profilePageTexts} from '@/constants/componentTexts/profile'
import {profileActivitiesWithIcons}
    from '@/constants/mappings/profile'

export const ProfileActivities = () => (
    <Card className={'border-0 shadow-sm'}>
        <CardHeader className={'flex flex-row items-center justify-between'}>
            <CardTitle className={'text-lg font-semibold'}>
                {profilePageTexts.activities.title}
            </CardTitle>
            <Button
                variant={'ghost'}
                size={'icon'}
                className={'text-muted-foreground'}
            >
                <Plus className={'size-5'}/>
            </Button>
        </CardHeader>
        <CardContent className={'space-y-4'}>
            {profileActivitiesWithIcons.map((activity) => (
                <ActivityItem
                    key={activity.title}
                    icon={activity.icon}
                    title={activity.title}
                    subtitle={activity.time}
                    tags={activity.tags}
                    variant={'card'}
                />
            ))}
        </CardContent>
    </Card>
)
