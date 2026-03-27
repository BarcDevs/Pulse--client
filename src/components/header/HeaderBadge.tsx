import {Shield} from 'lucide-react'

import {Badge} from '@/components/ui/badge'

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
    const badgeClassName = variant === 'secondary'
        ? 'bg-secondary-light text-secondary'
        : variant === 'live'
            ? 'bg-secondary/10 text-secondary'
            : ''

    return (
        <Badge className={`gap-2 ${badgeClassName}`}>
            {icon === 'shield' && (
                <Shield className={'size-3'}/>
            )}
            {icon === 'pulse' && (
                <span className={'h-2 w-2 rounded-full bg-secondary animate-pulse'}/>
            )}
            {label}
        </Badge>
    )
}
