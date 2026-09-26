import { ComponentProps } from 'react'

import { Badge as UiBadge } from '@/components/ui/badge'

import { cn } from '@/lib/utils'

type BadgeVariant =
    | 'primary'
    | 'secondary'
    | 'accent'
    | 'success'
    | 'warning'
    | 'destructive'
    | 'neutral'
    | 'onGradient'

type BadgeProps = Omit<ComponentProps<typeof UiBadge>, 'variant'> & {
    variant?: BadgeVariant
}

export const badgeVariantStyles: Record<BadgeVariant, string> = {
    primary: 'bg-primary-light text-primary',
    secondary: 'bg-secondary-light text-secondary',
    accent: 'bg-accent-light text-accent',
    success: 'bg-success-light text-success-deep',
    warning: 'bg-warning-light text-warning-deep',
    destructive: 'bg-destructive-light text-destructive-deep',
    neutral: 'bg-muted text-muted-foreground',
    onGradient: 'bg-white/20 text-white'
}

export const Badge = ({
    variant = 'primary',
    className,
    ...props
}: BadgeProps) => (
    <UiBadge
        variant={'ghost'}
        className={cn(
            'px-2.5 py-1 text-[11px] font-semibold tracking-wide',
            badgeVariantStyles[variant],
            className
        )}
        {...props}
    />
)
