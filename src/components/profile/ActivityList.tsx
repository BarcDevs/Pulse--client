import { useTranslations } from 'next-intl'

import { Plus } from 'lucide-react'

import { ActivityItem } from '@/components/shared/lists/ActivityItem'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from '@/components/ui/card'

import { profileActivitiesWithIcons }
    from '@/constants/mappings/profile'

import { profileLocales } from '@/locales/profileLocales'

export const ProfileActivities = () => {
    const t = useTranslations()

    return (
        <Card className={'border-0 shadow-sm'}>
            <CardHeader className={'flex flex-row items-center justify-between'}>
                <CardTitle className={'text-lg font-semibold'}>
                    {t(profileLocales.activities.title)}
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
}
