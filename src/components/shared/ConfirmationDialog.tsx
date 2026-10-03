'use client'

import { MouseEvent } from 'react'

import { LucideIcon, Trash2 } from 'lucide-react'

import { BaseDialog } from '@/components/shared/BaseDialog'
import { Button } from '@/components/shared/buttons/Button'

type ConfirmationDialogProps = {
    open: boolean
    onOpenChangeAction: (isOpen: boolean) => void
    title: string
    description: string
    label: string
    cancelLabel: string
    icon?: LucideIcon
    isLoading?: boolean
    onConfirmAction: () => Promise<void>
}

const DESTRUCTIVE_CLASS = 'text-destructive focus:text-destructive'

export const ConfirmationDialog = ({
    open,
    onOpenChangeAction,
    title,
    description,
    label,
    cancelLabel,
    icon: Icon = Trash2,
    isLoading = false,
    onConfirmAction
}: ConfirmationDialogProps) => {
    const stopPropagation = (event: MouseEvent<HTMLElement>) => {
        event.stopPropagation()
    }

    const handleConfirm = async (event: MouseEvent<HTMLButtonElement>) => {
        stopPropagation(event)
        await onConfirmAction()
        onOpenChangeAction(false)
    }

    const handleCancel = (event: MouseEvent<HTMLButtonElement>) => {
        stopPropagation(event)
        onOpenChangeAction(false)
    }

    return (
        <BaseDialog
            open={open}
            onOpenChangeAction={onOpenChangeAction}
            title={title}
            description={description}
            isCentered={true}
            className={'max-w-sm'}
            icon={
                <div className={'flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mx-auto mb-2'}>
                    <Icon
                        className={DESTRUCTIVE_CLASS}
                        size={20}
                    />
                </div>
            }
        >
            <div className={'flex justify-center gap-2'}>
                <Button
                    variant={'secondary'}
                    onClick={handleCancel}
                >
                    {cancelLabel}
                </Button>
                <Button
                    variant={'destructive'}
                    disabled={isLoading}
                    onClick={handleConfirm}
                >
                    {label}
                </Button>
            </div>
        </BaseDialog>
    )
}
