'use client'

import {
    GoalMilestone,
    MilestoneStatus
} from '@/types/goals'

import { getMilestoneIconColor } from '@/lib/milestones'
import { cn } from '@/lib/utils'

import { MilestoneCardRenderer } from './MilestoneCardRenderer'
import { milestoneStatusIcons } from './milestoneStatusIcons'

type MilestoneCardProps = {
    milestone: GoalMilestone
    onCompleteAction?: () => void
}

export const MilestoneCard = ({
    milestone,
    onCompleteAction
}: MilestoneCardProps) => {

    return (
        <div className={'relative z-10 flex items-start group'}>
            <div className={cn(
                getMilestoneIconColor(
                    milestone?.status
                ),
                milestone?.status
                    === MilestoneStatus.ACTIVE
                    && 'shadow-lg shadow-primary/25',
                'w-20 h-20 rounded-full flex items-center justify-center shrink-0 border-4 border-surface'
            )}>
                {milestoneStatusIcons[milestone?.status]}
            </div>
            <div className={'ml-8 mt-2 flex-1'}>
                <MilestoneCardRenderer
                    milestone={milestone}
                    onCompleteAction={onCompleteAction}
                />
            </div>
        </div>
    )
}
