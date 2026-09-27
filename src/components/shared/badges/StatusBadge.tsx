import { ComponentProps } from 'react'

import { Badge } from '@/components/shared/badges/Badge'

import { cn } from '@/lib/utils'

type StatusBadgeProps = ComponentProps<typeof Badge> & {
    pulse?: boolean
}

export const StatusBadge = ({
    pulse = false,
    className,
    children,
    ...props
}: StatusBadgeProps) => (
    <Badge
        className={cn('gap-1.5', className)}
        {...props}
    >
        <span
            className={cn(
                'size-1.5 rounded-full bg-current',
                pulse && 'animate-pulse'
            )}
        />
        {children}
    </Badge>
)
