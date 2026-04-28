'use client'

import { useRouter } from 'next/navigation'

import { Goal } from '@/types/goals'

import { GoalActionsDropdown } from '@/components/shared/dropdowns/GoalActionsDropdown'
import { Badge } from '@/components/ui/badge'

import { getCategoryColor } from '@/lib/goals'
import { cn } from '@/lib/utils'

import  { recoveryGoalsPageTexts as pageTexts }
    from '@/constants/componentTexts/recoveryGoals'
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

    const milestones = goal.milestones || []
    const completedCount = milestones.filter(
        (m) => m?.status === 'COMPLETED'
    ).length
    const totalCount = milestones.length
    const progressPercent = totalCount > 0
        ? Math.round((completedCount / totalCount) * 100)
        : 0

    const categoryColor = getCategoryColor(goal.category)

    const handleCardClick = () => {
        router.push(`${ROUTES.RECOVERY_GOALS}/${goal.id}`)
    }

    return (
        <div
            onClick={handleCardClick}
            className={'bg-surface-container-lowest p-6 rounded-xl group hover:bg-blue-50/30 transition-colors shadow-sm cursor-pointer relative'}>
            <div className={'flex justify-between items-start mb-6'}>
                <Badge
                    className={cn(
                        categoryColor,
                        'px-3 py-1 text-xs font-bold rounded-full uppercase tracking-widest'
                    )}
                >
                    {pageTexts.categoryLabels[goal.category]}
                </Badge>
                <GoalActionsDropdown
                    onEditAction={() => onEditAction(goal.id)}
                    onDeleteAction={() => onDeleteAction(goal.id)}
                />
            </div>

            <h4 className={'text-xl font-headline font-bold mb-2'}>
                {goal.title}
            </h4>
            {goal.description && (
                <p className={'text-on-surface-variant text-sm leading-relaxed mb-6'}>
                    {goal.description}
                </p>
            )}

            <div className={'space-y-2'}>
                <div className={'flex justify-between text-xs font-bold uppercase tracking-wider text-slate-400'}>
                    <span>{pageTexts.goalCard.progressLabel}</span>
                    <span>{progressPercent}%</span>
                </div>
                <div className={'h-2 bg-outline-variant rounded-full overflow-hidden'}>
                    <div
                        className={'h-full bg-primary w-full rounded-full transition-all'}
                        style={{ width: `${progressPercent}%` }}
                    />
                </div>
            </div>
        </div>
    )
}
