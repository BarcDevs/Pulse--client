'use client'

import { useTranslations } from 'next-intl'

import { Bell } from 'lucide-react'

import { CountBadge } from '@/components/shared/badges/CountBadge'
import { IconButton } from '@/components/shared/buttons/IconButton'

import { globalLocales } from '@/locales/globalLocales'

// TODO: replace with real count from notifications API endpoint
const useNotificationCount = () => 0

export const HeaderNotificationButton = () => {
    const t = useTranslations()
    const count = useNotificationCount()

    return (
        <IconButton className={'relative'}>
            <Bell className={'size-5 text-muted-foreground'}/>
            <CountBadge className={'absolute -right-1 -top-1'}>
                {count ?? 0}
            </CountBadge>
            <span className={'sr-only'}>
                {t(globalLocales.layout.header.notificationsAria)}
            </span>
        </IconButton>
    )
}
