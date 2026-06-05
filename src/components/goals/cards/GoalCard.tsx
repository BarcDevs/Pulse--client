'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'

import {
    Activity,
    Check,
    Pause,
    XCircle
} from 'lucide-react'

import {
    Goal,
    GoalStatus
} from '@/types/goals'

import { ActionsMenu } from '@/components/shared/ActionsMenu'
import { Badge } from '@/components/ui/badge'

import { getGoalCardAdditionalActions } from '@/lib/goals/buildGoalAdditionalActions'
import { getCategoryColor } from '@/lib/goals/getCategoryColor'
import { GOAL_STATUS_TOKENS } from '@/lib/goals/tokens'
import { cn } from '@/lib/utils'

import { ROUTES } from '@/constants/routes'

import { useGoalsContext } from '@/context/GoalsContext'

import { goalsLocales } from '@/locales/goalsLocales'

import { GoalCardStatusFooter } from './GoalCardStatusFooter'

const STATUS_RIBBON_ICON = {
    [GoalStatus.ACTIVE]: Activity,
    [GoalStatus.PAUSED]: Pause,
    [GoalStatus.COMPLETED]: Check,
    [GoalStatus.ABANDONED]: XCircle
} as const

type GoalCardProps = {
    goal: Goal
    onEditAction: (goalId: string) => void
}

export const GoalCard = ({
    goal,
    onEditAction
}: GoalCardProps) => {
    const t = useTranslations()
    const {
        deleteGoal,
        activateGoal,
        pauseGoal,
        abandonGoal,
        reopenGoal,
        restoreGoal,
        isPending
    } = useGoalsContext()

    const isCompleted = goal.status === GoalStatus.COMPLETED
    const isAbandoned = goal.status === GoalStatus.ABANDONED
    const statusTokens = GOAL_STATUS_TOKENS[goal.status]
    const RibbonIcon = STATUS_RIBBON_ICON[goal.status]

    const additionalActions = getGoalCardAdditionalActions(
        goal,
        t,
        {
            pauseGoal,
            activateGoal,
            abandonGoal,
            reopenGoal,
            restoreGoal
        }
    )

    return (
        <div
            className={cn(
                'rounded-xl relative overflow-hidden transition-all duration-150 shadow-sm hover:-translate-y-0.5',
                statusTokens.cardBg,
                statusTokens.cardBorder,
                isAbandoned && 'opacity-75'
            )}
        >
            <div
                className={'absolute left-0 top-0 bottom-0 w-1.25'}
                style={{ background: statusTokens.stripeGradient }}
            />
            {isCompleted && (
                <div className={'absolute -right-12 -top-12 w-40 h-40 rounded-full pointer-events-none bg-completed-goal/5 blur-2xl'} />
            )}

            <div className={'py-5 pl-5 pr-3 flex flex-col h-full'}>
                <div className={'flex justify-between items-start mb-4'}>
                    <div className={'flex flex-wrap items-center gap-2'}>
                        <Badge className={cn(
                            getCategoryColor(goal.category),
                            'px-3 py-1 text-xs font-bold rounded-full uppercase tracking-widest'
                        )}>
                            {t(goalsLocales.categoryLabels[goal.category])}
                        </Badge>
                        <Badge className={cn(
                            statusTokens.ribbonCn,
                            'flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-full uppercase tracking-widest'
                        )}>
                            <RibbonIcon className={'w-3 h-3'} />
                            {t(goalsLocales.statusLabels[goal.status])}
                        </Badge>
                    </div>
                    <ActionsMenu
                        onEditAction={() => onEditAction(goal.id)}
                        onDeleteAction={() => deleteGoal(goal.id)}
                        isLoading={isPending}
                        editLabel={t(goalsLocales.goalActions.edit)}
                        deleteLabel={t(goalsLocales.goalActions.delete)}
                        cancelLabel={t(goalsLocales.goalForm.buttons.cancel)}
                        confirmTitle={t(goalsLocales.goalActions.delete)}
                        confirmDescription={t(goalsLocales.goalActions.deleteConfirm)}
                        additionalActions={additionalActions}
                    />
                </div>

                <Link
                    href={`${ROUTES.RECOVERY_GOALS}/${goal.id}`}
                    className={'block w-full text-left rounded-lg focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring mb-5'}
                >
                    <h4 className={'text-xl font-headline font-bold mb-2 text-on-surface'}>
                        {goal.title}
                    </h4>
                    {goal.description && (
                        <p className={'text-sm leading-relaxed text-on-surface-variant'}>
                            {goal.description}
                        </p>
                    )}
                </Link>

                <GoalCardStatusFooter
                    goal={goal}
                    tokens={statusTokens}
                />
            </div>
        </div>
    )
}
