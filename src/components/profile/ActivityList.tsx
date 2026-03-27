import {Plus} from 'lucide-react'

import {ActivityItem} from '@/components/shared/ActivityItem'
import {Button} from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from '@/components/ui/card'

import {PROFILE_ACTIVITIES_WITH_ICONS} from '@/constants/profileMaps'
import {PROFILE_ACTIVITIES_TITLE} from '@/constants/profileTexts'

export const ProfileActivities = () => (
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
                <Plus className={'size-5'}/>
            </Button>
        </CardHeader>
        <CardContent className={'space-y-4'}>
            {PROFILE_ACTIVITIES_WITH_ICONS.map((activity) => (
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
