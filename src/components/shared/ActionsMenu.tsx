'use client'

import { MouseEvent, useState } from 'react'

import {
    MoreHorizontal,
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
    iconSize = 16
}: ActionsMenuProps) => {
    const [open, setOpen] = useState(false)

    const stopPropagation = (
        event: MouseEvent<HTMLElement>
    ) => {
        event.stopPropagation()
    }

    const handleDelete = async () => {
        try {
            await onDeleteAction()
        } finally {
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
                        <MoreHorizontal size={iconSize}/>
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
                open={open}
                onOpenChange={setOpen}
            >
                <DialogContent
                    showCloseButton={false}
                    className={'max-w-sm'}
                >
                    <DialogHeader>
                        <div className={'flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mx-auto mb-2'}>
                            <Trash2
                                className={'text-destructive'}
                                size={20}
                            />
                        </div>
                        <DialogTitle className={'text-center'}>
                            {confirmTitle}
                        </DialogTitle>
                        <DialogDescription className={'text-center'}>
                            {confirmDescription}
                        </DialogDescription>
                    </DialogHeader>
                    <div className={'flex justify-center gap-2 mt-2'}>
                        <Button
                            variant={'outline'}
                            onClick={(event) => {
                                stopPropagation(event)
                                setOpen(false)
                            }}
                        >
                            {cancelLabel}
                        </Button>
                        <Button
                            variant={'destructive'}
                            disabled={isLoading}
                            onClick={(event) => {
                                stopPropagation(event)
                                void handleDelete()
                            }}
                        >
                            {deleteLabel}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}
