'use client'

import { MoreVertical } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

import { recoveryGoalsPageTexts as pageTexts } 
    from '@/constants/componentTexts/recoveryGoals'

type GoalActionsDropdownProps = {
    onEditAction: () => void
    onDeleteAction: () => void
}

export const GoalActionsDropdown = ({
    onEditAction,
    onDeleteAction
}: GoalActionsDropdownProps) => (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button
                variant={'ghost'}
                size={'sm'}
                onClick={(e) => e.stopPropagation()}
                className={'opacity-0 group-hover:opacity-100 h-8 w-8 p-0'}
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
                {pageTexts.goalActions.edit}
            </DropdownMenuItem>
            <DropdownMenuItem
                onClick={(e) => {
                    e.stopPropagation()
                    onDeleteAction()
                }}
                className={'text-destructive'}
            >
                {pageTexts.goalActions.delete}
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
)
