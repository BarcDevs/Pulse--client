'use client'

import { MoreVertical } from 'lucide-react'

import { DeleteButton } from '@/components/shared/DeleteButton'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

type DeleteMenuProps = {
    onDeleteAction: () => Promise<void>
    confirmMessage: string
    isLoading: boolean
    iconSize?: number
    buttonClassName?: string
}

export const DeleteMenu = ({
    onDeleteAction,
    confirmMessage,
    isLoading,
    iconSize = 14,
    buttonClassName = 'h-6 w-6 p-0'
}: DeleteMenuProps) => (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button
                variant={'ghost'}
                size={'sm'}
                disabled={isLoading}
                className={buttonClassName}
            >
                <MoreVertical size={iconSize}/>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align={'end'}>
            <DeleteButton
                onDeleteAction={onDeleteAction}
                confirmMessage={confirmMessage}
                isLoading={isLoading}
                size={'sm'}
                variant={'ghost'}
            />
        </DropdownMenuContent>
    </DropdownMenu>
)
