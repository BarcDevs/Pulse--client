'use client'

import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

import { Button } from '@/components/shared/buttons/Button'

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
    const variant = isOutline && !isPrimaryAction ? 'secondary' : 'primary'

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
            variant={variant}
            aria-label={t(action.label)}
        >
            {action.icon && (
                <action.icon className={'sm:mr-2 h-4 w-4'}/>
            )}
            <span className={'hidden sm:inline'}>
                {t(action.label)}
            </span>
        </Button>
    )
}