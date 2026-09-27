import { ComponentProps } from 'react'

import { Badge } from '@/components/shared/badges/Badge'

import { cn } from '@/lib/utils'

type CountBadgeProps = ComponentProps<typeof Badge>

export const CountBadge = ({
    className,
    ...props
}: CountBadgeProps) => (
    <Badge
        className={cn(
            'size-5 justify-center p-0 text-[10px]',
            className
        )}
        {...props}
    />
)
