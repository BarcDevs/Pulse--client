import { ComponentProps } from 'react'

import { Badge } from '@/components/shared/badges/Badge'

import { cn } from '@/lib/utils'

type LabelBadgeSize = 'sm' | 'md'

type LabelBadgeProps = ComponentProps<typeof Badge> & {
    size?: LabelBadgeSize
}

const sizeStyles: Record<LabelBadgeSize, string> = {
    sm: 'px-2 py-0.5',
    md: 'gap-1.5 px-3 py-1'
}

export const LabelBadge = ({
    size = 'md',
    className,
    ...props
}: LabelBadgeProps) => (
    <Badge
        className={cn(
            'text-xs font-bold uppercase tracking-widest',
            sizeStyles[size],
            className
        )}
        {...props}
    />
)
