import { ComponentProps } from 'react'

import { Button } from '@/components/shared/buttons/Button'

import { cn } from '@/lib/utils'

type TabButtonVariant = 'underline' | 'segmented' | 'side'

type TabButtonProps = Omit<ComponentProps<typeof Button>, 'variant' | 'size'> & {
    isActive?: boolean
    variant?: TabButtonVariant
}

const variantStyles: Record<TabButtonVariant, { base: string, active: string, idle: string }> = {
    underline: {
        base: 'h-auto rounded-none border-b-2 px-4 py-3 text-xs font-medium hover:bg-transparent',
        active: 'border-primary text-primary hover:text-primary',
        idle: 'border-transparent text-muted-foreground hover:text-foreground'
    },
    segmented: {
        base: 'h-8 rounded-md px-3 text-xs font-medium',
        active: 'bg-surface-card text-foreground shadow-sm hover:bg-surface-card hover:text-foreground',
        idle: 'text-muted-foreground hover:text-foreground'
    },
    side: {
        base: 'h-auto w-full justify-start rounded-none border-s-2 px-3 py-1.5 text-start text-sm font-normal hover:bg-transparent',
        active: 'border-primary font-semibold text-primary hover:text-primary',
        idle: 'border-transparent text-muted-foreground hover:text-on-surface'
    }
}

export const TabButton = ({
    isActive = false,
    variant = 'underline',
    className,
    ...props
}: TabButtonProps) => (
    <Button
        variant={'ghost'}
        className={cn(
            variantStyles[variant].base,
            isActive
                ? variantStyles[variant].active
                : variantStyles[variant].idle,
            className
        )}
        {...props}
    />
)
