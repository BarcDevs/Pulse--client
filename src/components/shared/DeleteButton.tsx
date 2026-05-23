'use client'

import { ComponentProps } from 'react'

import { useTranslations } from 'next-intl'

import { Trash2 } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { cn } from '@/lib/utils'

import { communityLocales } from '@/locales/communityLocales'

type DeleteButtonProps = Omit<
    ComponentProps<typeof Button>,
    'onClick'
> & {
    onDeleteAction: () => Promise<void>
    confirmMessage?: string
    isLoading?: boolean
}

export const DeleteButton = ({
    onDeleteAction,
    confirmMessage,
    isLoading = false,
    variant = 'ghost',
    className,
    ...buttonProps
}: DeleteButtonProps) => {
    const t = useTranslations()
    const defaultMessage =
        t(communityLocales.confirmations.deletePost)

    const handleClick = async () => {
        const confirmed = confirm(
            confirmMessage ?? defaultMessage
        )
        if (confirmed)
            await onDeleteAction()
    }

    return (
        <Button
            {...buttonProps}
            variant={variant}
            className={cn(
                variant === 'ghost' && 'text-destructive',
                className
            )}
            onClick={handleClick}
            disabled={isLoading || buttonProps.disabled}
        >
            <Trash2 size={18}/>
        </Button>
    )
}
