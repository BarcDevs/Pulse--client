'use client'

import { MouseEvent, useState } from 'react'

import {
    LucideIcon,
    MoreVertical,
    Pencil,
    Trash2
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

export type AdditionalAction = {
    id: string
    label: string
    icon: LucideIcon
    action: () => Promise<void>
    destructive?: boolean
    requiresConfirmation?: boolean
    confirmTitle?: string
    confirmDescription?: string
}

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
    const [confirmingActionId, setConfirmingActionId]
        = useState<string | null>(null)

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
                            className={action.destructive
                                ? 'text-destructive focus:text-destructive'
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
                                        ? 'text-destructive'
                                        : ''
                                }
                            />
                            {action.label}
                        </DropdownMenuItem>
                    ))}
                    <DropdownMenuItem
                        className={'text-destructive focus:text-destructive'}
                        onClick={(event) => {
                            stopPropagation(event)
                            setOpen(true)
                        }}
                    >
                        <Trash2
                            size={14}
                            className={'text-destructive'}
                        />
                        {deleteLabel}
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <Dialog
                open={open || confirmingActionId !== null}
                onOpenChange={(isOpen) => {
                    if (!isOpen) {
                        setOpen(false)
                        setConfirmingActionId(null)
                    }
                }}
            >
                <DialogContent
                    showCloseButton={false}
                    className={'max-w-sm'}
                >
                    <DialogHeader>
                        <div className={'flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mx-auto mb-2'}>
                            <ConfirmIcon
                                className={'text-destructive'}
                                size={20}
                            />
                        </div>
                        <DialogTitle className={'text-center'}>
                            {confirmingActionId
                                ? additionalActions.find(a =>
                                    a.id === confirmingActionId)?.confirmTitle
                                : confirmTitle}
                        </DialogTitle>
                        <DialogDescription className={'text-center'}>
                            {confirmingActionId
                                ? additionalActions.find(a =>
                                    a.id === confirmingActionId)?.confirmDescription
                                : confirmDescription}
                        </DialogDescription>
                    </DialogHeader>
                    <div className={'flex justify-center gap-2 mt-2'}>
                        <Button
                            variant={'outline'}
                            onClick={(event) => {
                                stopPropagation(event)
                                setOpen(false)
                                setConfirmingActionId(null)
                            }}
                        >
                            {cancelLabel}
                        </Button>
                        <Button
                            variant={'destructive'}
                            disabled={isLoading}
                            onClick={(event) => {
                                stopPropagation(event)
                                if (confirmingActionId) {
                                    const action = additionalActions.find(a =>
                                        a.id === confirmingActionId)
                                    if (action) {
                                        void handleAdditionalAction(action)
                                    }
                                } else {
                                    void handleDelete()
                                }
                            }}
                        >
                            {confirmingActionId
                                ? additionalActions.find(a =>
                                    a.id === confirmingActionId)?.label
                                : deleteLabel}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}
