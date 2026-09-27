import { ComponentProps } from 'react'

import { Card as UiCard } from '@/components/ui/card'

import { cn } from '@/lib/utils'

type CardVariant = 'default' | 'elevated' | 'section' | 'primary'

type CardProps = ComponentProps<typeof UiCard> & {
    variant?: CardVariant
}

const variantStyles: Record<CardVariant, string> = {
    default: 'border-0 shadow-sm',
    elevated: 'border-0 shadow-lg',
    section: 'border-0 bg-surface-section shadow-none',
    primary: 'border-0 bg-primary text-white shadow-none'
}

export const Card = ({
    variant = 'default',
    className,
    ...props
}: CardProps) => (
    <UiCard
        className={cn(variantStyles[variant], className)}
        {...props}
    />
)
