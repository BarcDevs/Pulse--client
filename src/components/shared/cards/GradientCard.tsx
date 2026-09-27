import { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

type GradientCardVariant = 'default' | 'hero'

type GradientCardProps = ComponentProps<'div'> & {
    variant?: GradientCardVariant
}

const variantStyles: Record<GradientCardVariant, string> = {
    default: 'rounded-2xl bg-linear-to-r from-primary-gradient-start to-primary-gradient-end p-6',
    hero: 'rounded-3xl bg-linear-to-br from-primary-gradient-start to-primary-deep px-12 py-14 text-center shadow-xl'
}

export const GradientCard = ({
    variant = 'default',
    className,
    ...props
}: GradientCardProps) => (
    <div
        className={cn(
            'text-primary-foreground',
            variantStyles[variant],
            className
        )}
        {...props}
    />
)
