'use client'

import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

import {
    Goal,
    GoalStatus
} from '@/types/goals'

import { GoalActionsDropdown } from '@/components/shared/dropdowns/GoalActionsDropdown'
import { Badge } from '@/components/ui/badge'

import { getCategoryColor } from '@/lib/goals'
import { cn } from '@/lib/utils'

import { ROUTES } from '@/constants/routes'

import { goalsLocales } from '@/locales/goalsLocales'

type GoalCardProps = {
    goal: Goal
    onEditAction: (goalId: string) => void
    onDeleteAction: (goalId: string) => Promise<void>
    isDeleting?: boolean
}

export const GoalCard = ({
    goal,
    onEditAction,
    onDeleteAction,
    isDeleting = false
}: GoalCardProps) => {
    const t = useTranslations()
    const router = useRouter()
    const isPaused = goal.status === GoalStatus.PAUSED

    const progressPercent =
        Math.round((goal.progress ?? 0) * 100)

    const categoryColor = getCategoryColor(goal.category)

    const handleCardClick = () => {
        router.push(`${ROUTES.RECOVERY_GOALS}/${goal.id}`)
    }

    return (
        <div
            onClick={handleCardClick}
            className={cn(
                'p-6 rounded-xl group transition-colors shadow-sm cursor-pointer relative',
                isPaused
                    ? 'bg-amber-50/80 ring-1 ring-amber-200 hover:bg-amber-50'
                    : 'bg-surface-container-lowest hover:bg-blue-50/30'
            )}
        >
            <div className={'flex justify-between items-start mb-6'}>
                <div className={'flex flex-wrap items-center gap-2'}>
                    <Badge className={cn(
                        categoryColor,
                        'px-3 py-1 text-xs font-bold rounded-full uppercase tracking-widest'
                    )}>
                        {t(goalsLocales.categoryLabels[goal.category])}
                    </Badge>
                    {isPaused && (
                        // TODO: Replace this temporary paused badge/card treatment with the approved paused-goal design.
                        <Badge
                            variant={'outline'}
                            className={'border-amber-300 bg-amber-100 text-amber-900 px-3 py-1 text-xs font-bold rounded-full uppercase tracking-widest'}
                        >
                            {t(goalsLocales.statusLabels[goal.status])}
                        </Badge>
                    )}
                </div>
                <GoalActionsDropdown
                    onEditAction={() => onEditAction(goal.id)}
                    onDeleteAction={() => onDeleteAction(goal.id)}
                    isDeleting={isDeleting}
                />
            </div>

            <h4 className={'text-xl font-headline font-bold mb-2'}>
                {goal.title}
            </h4>
            {goal.description && (
                <p className={cn(
                    'text-sm leading-relaxed mb-6',
                    isPaused
                        ? 'text-amber-900/75'
                        : 'text-on-surface-variant'
                )}>
                    {goal.description}
                </p>
            )}

            <div className={'space-y-2'}>
                <div className={cn(
                    'flex justify-between text-xs font-bold uppercase tracking-wider',
                    isPaused
                        ? 'text-amber-900/60'
                        : 'text-slate-400'
                )}>
                    <span>
                        {t(goalsLocales.goalCard.progressLabel)}
                    </span>
                    <span>{progressPercent}%</span>
                </div>
                <div className={cn(
                    'h-2 rounded-full overflow-hidden',
                    isPaused
                        ? 'bg-amber-200/70'
                        : 'bg-outline-variant'
                )}>
                    <div
                        className={cn(
                            'h-full w-full rounded-full transition-all',
                            isPaused ? 'bg-amber-500' : 'bg-primary'
                        )}
                        style={{ width: `${progressPercent}%` }}
                    />
                </div>
            </div>
        </div>
    )
}
