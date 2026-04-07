'use client'

import { ComponentProps } from 'react'

import { Trash2 } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { cn } from '@/lib/utils'

import { communityPageTexts } from '@/constants/componentTexts/community'

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
    confirmMessage = communityPageTexts.confirmations.deletePost,
    isLoading = false,
    variant = 'ghost',
    className,
    ...buttonProps
}: DeleteButtonProps) => {
    const handleClick = async () => {
        const confirmed = confirm(confirmMessage)
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
