'use client'

import { useTranslations } from 'next-intl'

import type { LucideIcon } from 'lucide-react'

import { Badge } from '@/components/shared/badges/Badge'
import { StatusBadge } from '@/components/shared/badges/StatusBadge'

type HeaderBadgeProps = {
    label: string
    variant?: 'default' | 'secondary' | 'live'
    icon?: LucideIcon
    pulse?: boolean
}

export const HeaderBadge = ({
    label,
    variant = 'default',
    icon: Icon,
    pulse
}: HeaderBadgeProps) => {
    const t = useTranslations()
    const badgeVariant = variant === 'default' ? 'primary' : 'secondary'
    const content = (
        <>
            {Icon && (
                <Icon className={'size-3'}/>
            )}
            {t(label)}
        </>
    )

    if (pulse) {
        return (
            <StatusBadge
                pulse
                variant={badgeVariant}
                className={'gap-2'}
            >
                {content}
            </StatusBadge>
        )
    }

    return (
        <Badge
            variant={badgeVariant}
            className={'gap-2'}
        >
            {content}
        </Badge>
    )
}