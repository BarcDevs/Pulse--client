'use client'

import { useTranslations } from 'next-intl'

import { Bell } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

import { globalLocales } from '@/locales/globalLocales'

// TODO: replace with real count from notifications API endpoint
const useNotificationCount = () => 0

export const HeaderNotificationButton = () => {
    const t = useTranslations()
    const count = useNotificationCount()

    return (
        <Button
            variant={'ghost'}
            size={'icon'}
            className={'relative'}
        >
            <Bell className={'size-5 text-muted-foreground'}/>
            <Badge className={'absolute -right-1 -top-1 size-5 rounded-full p-0 text-[10px]'}>
                {count ?? 0}
            </Badge>
            <span className={'sr-only'}>
                {t(globalLocales.layout.header.notificationsAria)}
            </span>
        </Button>
    )
}
