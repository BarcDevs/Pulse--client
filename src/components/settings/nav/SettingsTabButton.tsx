import { ComponentType } from 'react'

import { NavItemButton } from '@/components/shared/buttons/NavItemButton'

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
    <NavItemButton
        isActive={isActive}
        onClick={onClick}
    >
        <Icon className={'h-5 w-5'}/>
        {label}
    </NavItemButton>
)
