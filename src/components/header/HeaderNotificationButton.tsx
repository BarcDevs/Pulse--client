import {Bell} from 'lucide-react'

import {Badge} from '@/components/ui/badge'
import {Button} from '@/components/ui/button'

import {appLayoutTexts} from '@/constants/componentTexts/ui/layout'

export const HeaderNotificationButton = () => (
    <Button
        variant={'ghost'}
        size={'icon'}
        className={'relative'}
    >
        <Bell className={'size-5 text-muted-foreground'}/>
        <Badge className={'absolute -right-1 -top-1 size-5 rounded-full p-0 text-[10px]'}>
            {appLayoutTexts.header.notificationBadgeCount}
        </Badge>
        <span className={'sr-only'}>
            {appLayoutTexts.header.notificationsAria}
        </span>
    </Button>
)
