'use client'

import { ReactNode } from 'react'

import {
    Activity,
    Check,
    Lock
} from 'lucide-react'

import { GoalMilestone } from '@/types/goals'

import { getMilestoneIconColor } from '@/lib/milestones'
import { cn } from '@/lib/utils'

import { MilestoneCardRenderer } from './MilestoneCardRenderer'

type MilestoneCardProps = {
    milestone: GoalMilestone
    onCompleteAction?: () => void
}

export const MilestoneCard = ({
    milestone,
    onCompleteAction
}: MilestoneCardProps) => {
    const icons: Record<string, ReactNode> = {
        COMPLETED: <Check className={'w-8 h-8 text-primary-foreground'}/>,
        ACTIVE: <Activity className={'w-8 h-8 text-primary-foreground'}/>,
        LOCKED: <Lock className={'w-8 h-8 text-outline'}/>
    }

    return (
        <div className={'relative z-10 flex items-start group'}>
            <div className={cn(
                getMilestoneIconColor(milestone?.status),
                'w-20 h-20 rounded-full flex items-center justify-center shrink-0 border-4 border-surface shadow-sm'
            )}>
                {icons[milestone?.status]}
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
