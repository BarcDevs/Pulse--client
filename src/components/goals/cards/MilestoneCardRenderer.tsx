'use client'

import { parseISO } from 'date-fns'

import { GoalMilestone, MilestoneStatus } from '@/types/goals'

import { Button } from '@/components/ui/button'

import { getMilestoneCardConfig } from '@/lib/milestones'
import { formatByUserPreference } from '@/lib/time'
import { cn } from '@/lib/utils'

import {
    recoveryGoalsPageTexts as pageTexts
} from '@/constants/componentTexts/recoveryGoals'

type MilestoneCardRendererProps = {
    milestone: GoalMilestone
    onCompleteAction?: () => void
}

export const MilestoneCardRenderer = ({
    milestone,
    onCompleteAction
}: MilestoneCardRendererProps) => {
    const isCompleted = milestone.status === MilestoneStatus.COMPLETED
    const isActive = milestone.status === MilestoneStatus.ACTIVE

    const {
        bgClass,
        borderClass,
        opacityClass,
        padding,
        statusLabel,
        statusBadgeClass,
        titleSize,
        contentLayout
    } = getMilestoneCardConfig(milestone, pageTexts)

    return (
        <div className={cn(
            bgClass,
            borderClass,
            opacityClass,
            padding,
            'rounded-xl flex--col gap-2'
        )}>
            <span className={statusBadgeClass}>
                {statusLabel}
            </span>
            <div className={cn(contentLayout, 'gap-2')}>
                <div className={cn(isActive && 'flex-1', 'flex--col gap-2')}>
                    <h3 className={cn(
                        'font-bold font-headline',
                        titleSize
                    )}>
                        {milestone.title}
                    </h3>
                    {milestone.description && (
                        <p className={cn(
                            'text-on-surface-variant',
                            isActive && 'leading-relaxed'
                        )}>
                            {milestone.description}
                        </p>
                    )}
                </div>

                {isActive && onCompleteAction && (
                    <Button
                        onClick={onCompleteAction}
                        size={'sm'}
                    >
                        {pageTexts.detail.markCompletePhase}
                    </Button>
                )}

                {isCompleted && milestone.completedAt && (
                    <span className={'text-xs font-medium text-outline shrink-0'}>
                        {`Completed on ${
                            formatByUserPreference(
                                parseISO(
                                    milestone.completedAt
                                ),
                                true
                            )
                        }`}
                    </span>
                )}
            </div>
        </div>
    )
}