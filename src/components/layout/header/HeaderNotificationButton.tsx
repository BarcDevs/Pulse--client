'use client'

import { useTranslations } from 'next-intl'

import { Bell } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

import { globalLocales } from '@/locales/globalLocales'

export const HeaderNotificationButton = () => {
    const t = useTranslations()

    return (
        <Button
            variant={'ghost'}
            size={'icon'}
            className={'relative'}
        >
            <Bell className={'size-5 text-muted-foreground'}/>
            <Badge className={'absolute -right-1 -top-1 size-5 rounded-full p-0 text-[10px]'}>
                {t(globalLocales.layout.header.notificationBadgeCount)}
            </Badge>
            <span className={'sr-only'}>
                {t(globalLocales.layout.header.notificationsAria)}
            </span>
        </Button>
    )
}
