'use client'

import {
    Goal,
    GoalStatus,
    GoalStatusToken
} from '@/types/goals'

import { buildInfoConfig } from '@/lib/goals/buildInfoConfig'
import { getGoalMilestoneStats } from '@/lib/goals/getGoalMilestoneStats'
import { cn } from '@/lib/utils'

import { GoalActiveFooter } from './GoalActiveFooter'

type GoalCardStatusFooterProps = {
    goal: Goal
    tokens: GoalStatusToken
}

export const GoalCardStatusFooter = ({
    goal,
    tokens
}: GoalCardStatusFooterProps) => {
    const {
        total,
        pct,
        completedCount
    } = getGoalMilestoneStats(goal)
    const date = new Date(goal.updatedAt).toLocaleDateString(
        'en-US', {
            month: 'short',
            day: 'numeric'
        })

    if (goal.status === GoalStatus.ACTIVE)
        return <GoalActiveFooter
            goal={goal}
            tokens={tokens}
        />

    const {
        Icon,
        iconContainerCn,
        iconCn,
        text1,
        text2,
        pct: displayPct,
        pctSizeCn
    } = buildInfoConfig(
        goal,
        tokens,
        total,
        completedCount,
        pct,
        date
    )

    return (
        <div className={cn(
            'flex items-center p-3 rounded-lg',
            displayPct !== null ? 'justify-between' : 'gap-2',
            tokens.footerBg
        )}>
            <div className={'flex items-center gap-2'}>
                <div className={iconContainerCn}>
                    <Icon className={iconCn} />
                </div>
                <div>
                    {text1 && (
                        <p className={cn('text-xs font-bold leading-tight', tokens.accentText)}>
                            {text1}
                        </p>
                    )}
                    {text2 && (
                        <p className={'text-[11px] text-on-surface-variant mt-0.5 leading-tight'}>
                            {text2}
                        </p>
                    )}
                </div>
            </div>
            {displayPct !== null && (
                <span className={cn(
                    'font-headline font-extrabold',
                    pctSizeCn,
                    tokens.accentText
                )}>
                    {`${displayPct}%`}
                </span>
            )}
        </div>
    )
}
