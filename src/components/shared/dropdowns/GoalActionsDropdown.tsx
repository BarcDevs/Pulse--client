'use client'

import { useTranslations } from 'next-intl'

import { MoreVertical } from 'lucide-react'

import { DeleteButton } from '@/components/shared/DeleteButton'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

import { goalsLocales } from '@/locales/goalsLocales'

type GoalActionsDropdownProps = {
    onEditAction: () => void
    onDeleteAction: () => Promise<void>
    isDeleting?: boolean
}

export const GoalActionsDropdown = ({
    onEditAction,
    onDeleteAction,
    isDeleting = false
}: GoalActionsDropdownProps) => {
    const t = useTranslations()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant={'ghost'}
                    size={'sm'}
                    onClick={(e) => e.stopPropagation()}
                    className={'opacity-0 group-hover:opacity-100 h-8 w-8 p-0'}
                    disabled={isDeleting}
                >
                    <MoreVertical className={'w-4 h-4 text-slate-400'}/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align={'end'}>
                <DropdownMenuItem
                    onClick={(e) => {
                        e.stopPropagation()
                        onEditAction()
                    }}
                >
                    {t(goalsLocales.goalActions.edit)}
                </DropdownMenuItem>
                <DeleteButton
                    onDeleteAction={onDeleteAction}
                    confirmMessage={t(goalsLocales.goalActions.deleteConfirm)}
                    isLoading={isDeleting}
                    size={'sm'}
                    variant={'ghost'}
                />
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
