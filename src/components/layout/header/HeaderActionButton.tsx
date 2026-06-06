'use client'

import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'

import { cn } from '@/lib/utils'

import type { ActionConfig } from '@/constants/config/headerPageConfigs'
import { ROUTES } from '@/constants/routes'

type HeaderActionButtonProps = {
    action: ActionConfig
}

export const HeaderActionButton = ({
    action
}: HeaderActionButtonProps) => {
    const t = useTranslations()
    const router = useRouter()
    const isOutline = action.variant === 'outline'
    const isPrimaryAction = action.type === 'newPost'

    const handleClick = () => {
        if (action.type === 'newPost') {
            router.push(ROUTES.FORUM_CREATE)
        }
        if (action.type === 'share') {
            window.dispatchEvent(
                new CustomEvent('pulse:share-progress')
            )
        }
    }

    return (
        <Button
            onClick={handleClick}
            variant={isOutline ? 'outline' : 'default'}
            className={cn(
                isPrimaryAction && 'bg-primary hover:bg-primary/90 text-primary-foreground',
                isOutline && !isPrimaryAction && 'text-muted-foreground'
            )}
        >
            {action.icon && (
                <action.icon className={'mr-2 h-4 w-4'}/>
            )}
            {t(action.label)}
        </Button>
    )
}