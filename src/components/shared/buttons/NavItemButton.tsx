import { ComponentProps } from 'react'

import { Button } from '@/components/shared/buttons/Button'

import { cn } from '@/lib/utils'

type NavItemButtonLayout = 'row' | 'compact' | 'stacked'
type NavItemButtonTone = 'default' | 'destructive'

type NavItemButtonProps = Omit<ComponentProps<typeof Button>, 'variant' | 'size'> & {
    isActive?: boolean
    soft?: boolean
    tone?: NavItemButtonTone
    layout?: NavItemButtonLayout
}

const layoutStyles: Record<NavItemButtonLayout, string> = {
    row: 'w-full justify-start gap-3 rounded-xl px-4 py-3',
    compact: 'w-full justify-start gap-3 rounded-md px-2 py-1.5',
    stacked: 'min-w-0 flex-1 flex-col items-center justify-center gap-0.5 rounded-lg px-1 py-2 hover:bg-transparent'
}

const activeStyles = 'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground'
const softActiveStyles = 'bg-primary-light text-primary hover:bg-primary-light hover:text-primary'
const idleStyles = 'text-muted-foreground hover:bg-surface-section hover:text-foreground'
const destructiveStyles = 'text-destructive hover:text-destructive'

export const NavItemButton = ({
    isActive = false,
    soft = false,
    tone = 'default',
    layout = 'row',
    className,
    ...props
}: NavItemButtonProps) => (
    <Button
        variant={'ghost'}
        className={cn(
            'h-auto text-sm font-medium',
            layoutStyles[layout],
            isActive
                ? (soft ? softActiveStyles : activeStyles)
                : idleStyles,
            !isActive && tone === 'destructive' && destructiveStyles,
            className
        )}
        {...props}
    />
)
