'use client'

import { useTranslations } from 'next-intl'

import { Shield } from 'lucide-react'

import { Badge } from '@/components/ui/badge'

import { cn } from '@/lib/utils'

type HeaderBadgeProps = {
    label: string
    variant?: 'default' | 'secondary' | 'live'
    icon?: 'shield' | 'pulse'
}

export const HeaderBadge = ({
    label,
    variant = 'default',
    icon
}: HeaderBadgeProps) => {
    const t = useTranslations()

    return (
        <Badge className={cn(
            'gap-2',
            variant === 'secondary' && 'bg-secondary-light text-secondary',
            variant === 'live' && 'bg-secondary/10 text-secondary'
        )}>
            {icon === 'shield' && (
                <Shield className={'size-3'}/>
            )}
            {icon === 'pulse' && (
                <span className={'h-2 w-2 rounded-full bg-secondary animate-pulse'}/>
            )}
            {t(label)}
        </Badge>
    )
}
