'use client'

import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'

import type { ActionConfig } from '@/constants/config/headerPageConfigs'
import { ROUTES } from '@/constants/routes'

import { headerIcon } from './headerIcon'

type HeaderActionButtonProps = {
    action: ActionConfig
}

export const HeaderActionButton = ({
    action
}: HeaderActionButtonProps) => {
    const router = useRouter()
    const isOutline = action.variant === 'outline'
    const isPrimaryAction = action.type === 'newPost'

    const handleClick = () => {
        if (action.type === 'newPost') {
            router.push(ROUTES.FORUM_CREATE)
        }
    }

    return (
        <Button
            onClick={handleClick}
            variant={isOutline ? 'outline' : 'default'}
            className={
                isPrimaryAction
                    ? 'bg-primary hover:bg-primary/90 text-primary-foreground'
                    : isOutline
                        ? 'text-muted-foreground'
                        : ''
            }
        >
            {headerIcon(action.icon)}
            {action.label}
        </Button>
    )
}
