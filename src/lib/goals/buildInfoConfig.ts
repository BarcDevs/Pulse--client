import {
    Check,
    type LucideIcon,
    Pause,
    XCircle
} from 'lucide-react'

import {
    Goal,
    GoalStatus,
    GoalStatusToken
} from '@/types/goals'

import { cn } from '@/lib/utils'

export type InfoConfig = {
    Icon: LucideIcon
    iconContainerCn: string
    iconCn: string
    text1: string | null
    text2: string | null
    pct: number | null
    pctSizeCn: string
}

export const buildInfoConfig = (
    goal: Goal,
    tokens: GoalStatusToken,
    total: number,
    completedCount: number,
    pct: number,
    date: string
): InfoConfig => {
    if (goal.status === GoalStatus.COMPLETED) return {
        Icon: Check,
        iconContainerCn: 'w-6 h-6 rounded-full bg-completed-goal flex items-center justify-center shrink-0',
        iconCn: 'w-3.5 h-3.5 text-white',
        text1: total > 0 ? `All ${total} milestones done` : null,
        text2: `Completed ${date}`,
        pct: 100,
        pctSizeCn: 'text-lg'
    }
    if (goal.status === GoalStatus.PAUSED) return {
        Icon: Pause,
        iconContainerCn: 'w-6 h-6 rounded-full bg-paused-goal flex items-center justify-center shrink-0',
        iconCn: 'w-3 h-3 text-white',
        text1: `Paused since ${date}`,
        text2: total > 0
            ? `${completedCount} of ${total} done · resume any time`
            : 'Resume any time',
        pct,
        pctSizeCn: 'text-base'
    }
    return {
        Icon: XCircle,
        iconContainerCn: 'w-6 h-6 rounded-full border border-abandoned-goal-soft bg-white flex items-center justify-center shrink-0',
        iconCn: cn('w-3.5 h-3.5', tokens.accentText),
        text1: `Stopped on ${date}`,
        text2: total > 0
            ? `Reached milestone ${Math.min(completedCount + 1, total)} of ${total} before stopping`
            : null,
        pct: null,
        pctSizeCn: ''
    }
}

