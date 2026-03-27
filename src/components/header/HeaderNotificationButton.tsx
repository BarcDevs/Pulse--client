import {Bell} from 'lucide-react'

import {Badge} from '@/components/ui/badge'
import {Button} from '@/components/ui/button'

import {
    HEADER_NOTIFICATION_BADGE_COUNT,
    NOTIFICATIONS_ARIA
} from '@/constants/layoutTexts'

export const HeaderNotificationButton = () => (
    <Button
        variant={'ghost'}
        size={'icon'}
        className={'relative'}
    >
        <Bell className={'size-5 text-muted-foreground'}/>
        <Badge className={'absolute -right-1 -top-1 size-5 rounded-full p-0 text-[10px]'}>
            {HEADER_NOTIFICATION_BADGE_COUNT}
        </Badge>
        <span className={'sr-only'}>
            {NOTIFICATIONS_ARIA}
        </span>
    </Button>
)
