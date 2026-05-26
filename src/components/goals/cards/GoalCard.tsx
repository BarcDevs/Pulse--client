'use client'

import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

import { Play } from 'lucide-react'

import {
    Goal,
    GoalStatus
} from '@/types/goals'

import { ActionsMenu } from '@/components/shared/ActionsMenu'
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
    onActivateAction?: (goalId: string) => Promise<void>
}

export const GoalCard = ({
    goal,
    onEditAction,
    onDeleteAction,
    isDeleting = false,
    onActivateAction
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

    const additionalActions = isPaused && onActivateAction ? [
        {
            id: 'activate',
            label: t(goalsLocales.goalActions.activate),
            icon: Play,
            action: () => onActivateAction(goal.id)
        }
    ] : []

    return (
        <div
            className={cn(
                'p-6 rounded-xl group transition-colors shadow-sm relative',
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
                <ActionsMenu
                    onEditAction={() => onEditAction(goal.id)}
                    onDeleteAction={() => onDeleteAction(goal.id)}
                    isLoading={isDeleting}
                    editLabel={t(goalsLocales.goalActions.edit)}
                    deleteLabel={t(goalsLocales.goalActions.delete)}
                    cancelLabel={t(goalsLocales.goalForm.buttons.cancel)}
                    confirmTitle={t(goalsLocales.goalActions.delete)}
                    confirmDescription={t(goalsLocales.goalActions.deleteConfirm)}
                    additionalActions={additionalActions}
                />
            </div>

            <button
                type={'button'}
                onClick={handleCardClick}
                className={'block w-full text-left rounded-lg focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring'}
            >
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
            </button>
        </div>
    )
}
