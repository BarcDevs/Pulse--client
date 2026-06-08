'use client'

import { MouseEvent, useState } from 'react'

import {
    MoreVertical,
    Pencil,
    Trash2
} from 'lucide-react'

import { AdditionalAction } from '@/types/actionMenu'

import { ConfirmationDialog } from '@/components/shared/ConfirmationDialog'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

const DESTRUCTIVE_CLASS = 'text-destructive focus:text-destructive'
const DESTRUCTIVE_ICON_CLASS = 'text-destructive'

type ActionsMenuProps = {
    onEditAction: () => void
    onDeleteAction: () => Promise<void>
    isLoading: boolean
    editLabel: string
    deleteLabel: string
    cancelLabel: string
    confirmTitle: string
    confirmDescription: string
    iconSize?: number
    additionalActions?: AdditionalAction[]
}

export const ActionsMenu = ({
    onEditAction,
    onDeleteAction,
    isLoading,
    editLabel,
    deleteLabel,
    cancelLabel,
    confirmTitle,
    confirmDescription,
    iconSize = 16,
    additionalActions = []
}: ActionsMenuProps) => {
    const [open, setOpen] = useState(false)
    const [confirmingActionId, setConfirmingActionId] =
        useState<string | null>(null)

    const confirmingAction = additionalActions.find((a) =>
        a.id === confirmingActionId)
    const ConfirmIcon = confirmingAction?.icon ?? Trash2

    const stopPropagation = (
        event: MouseEvent<HTMLElement>
    ) => event.stopPropagation()


    const handleDelete = async () => {
        try {
            await onDeleteAction()
        } finally {
            setOpen(false)
        }
    }

    const handleAdditionalAction = async (
        action: AdditionalAction
    ) => {
        try {
            await action.action()
        } finally {
            if (action.requiresConfirmation)
                setConfirmingActionId(null)

            setOpen(false)
        }
    }

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant={'ghost'}
                        size={'sm'}
                        disabled={isLoading}
                        className={'h-8 w-8 p-0'}
                        onClick={stopPropagation}
                    >
                        <MoreVertical size={iconSize}/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align={'end'}>
                    <DropdownMenuItem
                        onClick={(event) => {
                            stopPropagation(event)
                            onEditAction()
                        }}
                    >
                        <Pencil size={14}/>
                        {editLabel}
                    </DropdownMenuItem>
                    {additionalActions.map((action) => (
                        <DropdownMenuItem
                            key={action.id}
                            className={
                                action.destructive
                                    ? DESTRUCTIVE_CLASS
                                    : ''
                            }
                            onClick={(event) => {
                                stopPropagation(event)
                                if (action.requiresConfirmation) {
                                    setConfirmingActionId(action.id)
                                } else {
                                    void handleAdditionalAction(action)
                                }
                            }}
                        >
                            <action.icon
                                size={14}
                                className={
                                    action.destructive
                                        ? DESTRUCTIVE_ICON_CLASS
                                        : ''
                                }
                            />
                            {action.label}
                        </DropdownMenuItem>
                    ))}
                    <DropdownMenuItem
                        className={DESTRUCTIVE_CLASS}
                        onClick={(event) => {
                            stopPropagation(event)
                            setOpen(true)
                        }}
                    >
                        <Trash2
                            size={14}
                            className={DESTRUCTIVE_ICON_CLASS}
                        />
                        {deleteLabel}
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <ConfirmationDialog
                open={open || confirmingActionId !== null}
                onOpenChangeAction={(isOpen) => {
                    if (!isOpen) {
                        setOpen(false)
                        setConfirmingActionId(null)
                    }
                }}
                title={confirmingAction?.confirmTitle ?? confirmTitle}
                description={
                    confirmingAction?.confirmDescription
                    ?? confirmDescription
                }
                label={confirmingAction?.label ?? deleteLabel}
                icon={ConfirmIcon}
                cancelLabel={cancelLabel}
                isLoading={isLoading}
                onConfirmAction={confirmingActionId && confirmingAction
                    ? () => handleAdditionalAction(confirmingAction)
                    : handleDelete
                }
            />
        </>
    )
}
