'use client'

import { useRouter } from 'next/navigation'

import { MoreVertical } from 'lucide-react'

import { Goal } from '@/types/goals'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

import { recoveryGoalsPageTexts } from '@/constants/componentTexts/recoveryGoals'
import { ROUTES } from '@/constants/routes'

type GoalCardProps = {
    goal: Goal
    onEditAction: (goalId: string) => void
    onDeleteAction: (goalId: string) => void
}

export const GoalCard = ({
    goal,
    onEditAction,
    onDeleteAction
}: GoalCardProps) => {
    const router = useRouter()

    const completedCount = goal.milestones.filter(
        (m) => m.status === 'COMPLETED'
    ).length
    const totalCount = goal.milestones.length
    const progressPercent = totalCount > 0
        ? Math.round((completedCount / totalCount) * 100)
        : 0

    const categoryColor = goal.category === 'PHYSICAL'
        ? 'bg-secondary-container text-on-secondary-container'
        : goal.category === 'MENTAL'
            ? 'bg-tertiary-fixed text-on-tertiary-fixed-variant'
            : 'bg-surface-container-high text-on-surface-variant'

    const handleCardClick = () => {
        router.push(ROUTES.RECOVERY_GOALS + '/' + goal.id)
    }

    return (
        <div
            onClick={handleCardClick}
            className={'bg-surface-container-lowest p-6 rounded-xl group hover:bg-blue-50/30 transition-colors shadow-sm cursor-pointer relative'}>
            <div className={'flex justify-between items-start mb-6'}>
                <Badge
                    className={categoryColor + ' px-3 py-1 text-xs font-bold rounded-full uppercase tracking-widest'}
                    variant={'secondary'}
                >
                    {recoveryGoalsPageTexts.categoryLabels[goal.category]}
                </Badge>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant={'ghost'}
                            size={'sm'}
                            onClick={(e) => e.stopPropagation()}
                            className={'opacity-0 group-hover:opacity-100 h-8 w-8 p-0'}
                        >
                            <MoreVertical className={'w-4 h-4 text-slate-400'} />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align={'end'}>
                        <DropdownMenuItem
                            onClick={(e) => {
                                e.stopPropagation()
                                onEditAction(goal.id)
                            }}
                        >
                            Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={(e) => {
                                e.stopPropagation()
                                onDeleteAction(goal.id)
                            }}
                            className={'text-destructive'}
                        >
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <h4 className={'text-xl font-headline font-bold mb-2'}>
                {goal.title}
            </h4>
            <p className={'text-on-surface-variant text-sm leading-relaxed mb-6'}>
                {goal.description}
            </p>

            <div className={'space-y-2'}>
                <div className={'flex justify-between text-xs font-bold uppercase tracking-wider text-slate-400'}>
                    <span>Progress</span>
                    <span>{progressPercent}%</span>
                </div>
                <div className={'h-2 bg-surface-container rounded-full overflow-hidden'}>
                    <div
                        className={'h-full bg-primary w-full rounded-full transition-all'}
                        style={{ width: `${progressPercent}%` }}
                    />
                </div>
            </div>
        </div>
    )
}
