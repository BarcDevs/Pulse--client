'use client'

import { GoalMilestone, MilestoneStatus } from '@/types/goals'

import { Button } from '@/components/ui/button'

import { formatMilestoneDate } from '@/lib/milestones'
import { cn } from '@/lib/utils'

import { recoveryGoalsPageTexts as pageTexts }
    from '@/constants/componentTexts/recoveryGoals'

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
    const isLocked = milestone.status === MilestoneStatus.LOCKED

    const bgClass = isActive
        ? 'bg-surface-container-lowest'
        : 'bg-surface-container-low'
    const borderClass = isActive ? 'border-l-4 border-primary' : ''
    const opacityClass = isLocked ? 'opacity-50 grayscale' : ''
    const padding = isActive ? 'p-8' : 'p-6'

    const statusLabel = isCompleted
        ? pageTexts.milestoneStatusLabels.COMPLETED
        : isActive
            ? pageTexts.milestoneStatusLabels.ACTIVE
            : pageTexts.milestoneStatusLabels.LOCKED

    const statusBadgeClass = isActive
        ? 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-primary-fixed text-on-primary-fixed uppercase tracking-tighter mb-3'
        : 'text-xs font-bold text-secondary uppercase tracking-tighter mb-1 block'

    const titleSize = isActive ? 'text-2xl mb-3' : 'text-xl mb-2'
    const contentLayout = isActive
        ? 'flex flex-col md:flex-row md:items-center justify-between gap-6'
        : 'flex justify-between items-start'

    return (
        <div className={cn(
            bgClass,
            borderClass,
            opacityClass,
            padding,
            'rounded-xl'
        )}>
            <div className={contentLayout}>
                <div className={cn(isActive && 'flex-1')}>
                    <span className={statusBadgeClass}>
                        {statusLabel}
                    </span>
                    <h3 className={cn(
                        'font-bold font-headline',
                        titleSize
                    )}>
                        {milestone.title}
                    </h3>
                    {milestone.description && (
                        <p className={cn(
                            'text-on-surface-variant',
                            isActive ? 'mb-6 leading-relaxed' : 'text-sm'
                        )}>
                            {milestone.description}
                        </p>
                    )}
                </div>

                {isActive && (
                    <Button
                        onClick={onCompleteAction}
                        className={cn(
                            'shrink-0',
                            'bg-linear-to-br from-primary to-primary-container',
                            'text-primary-foreground',
                            'font-bold py-3 px-6',
                            'rounded-lg text-sm',
                            'shadow-md hover:opacity-90',
                            'transition-opacity',
                            'active:scale-95'
                        )}
                    >
                        {pageTexts.detail.markCompletePhase}
                    </Button>
                )}

                {isCompleted && milestone.completedAt && (
                    <span className={'text-xs font-medium text-outline'}>
                        Completed on {formatMilestoneDate(milestone.completedAt)}
                    </span>
                )}
            </div>
        </div>
    )
}
