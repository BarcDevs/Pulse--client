import { ComponentType } from 'react'

import { Button } from '@/components/ui/button'

import { cn } from '@/lib/utils'

type SettingsTabButtonProps = {
    icon: ComponentType<{className?: string}>
    label: string
    isActive: boolean
    onClick: () => void
}

export const SettingsTabButton = ({
    icon: Icon,
    label,
    isActive,
    onClick
}: SettingsTabButtonProps) => (
    <Button
        onClick={onClick}
        variant={isActive ? 'default' : 'ghost'}
        className={cn(
            'w-full justify-start gap-3 px-4 py-3 rounded-xl',
            isActive
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-surface-section hover:text-foreground'
        )}
    >
        <Icon className={'h-5 w-5'}/>
        {label}
    </Button>
)
