'use client'

import { useTranslations } from 'next-intl'

import {
    Goal,
    GoalStatusToken,
    MilestoneStatus
} from '@/types/goals'

import { getGoalMilestoneStats } from '@/lib/goals/getGoalMilestoneStats'
import { cn } from '@/lib/utils'

import { goalsLocales } from '@/locales/goalsLocales'

type Props = {
    goal: Goal
    tokens: GoalStatusToken
}

export const GoalActiveFooter = ({
    goal,
    tokens
}: Props) => {
    const t = useTranslations()
    const {
        milestones,
        total,
        pct,
        completedCount
    } = getGoalMilestoneStats(goal)

    const segments = total > 0
        ? milestones.length > 0
            ? milestones.map(m => ({ id: m.id, status: m.status }))
            : Array.from({ length: total }, (_, i) => ({
                id: String(i),
                status: i < completedCount
                    ? MilestoneStatus.COMPLETED
                    : i === completedCount
                        ? MilestoneStatus.ACTIVE
                        : MilestoneStatus.LOCKED
            }))
        : null

    return (
        <div>
            {goal.nextMilestone && (
                <div className={'flex items-center gap-2 mb-2.5'}>
                    <div className={'w-1.5 h-1.5 rounded-full bg-active-goal ring-2 ring-active-goal-soft shrink-0'}/>
                    <span className={'text-xs text-on-surface-variant truncate'}>
                        {t(
                            goalsLocales.activeFooter.nextMilestone, {
                                milestone: goal.nextMilestone
                            })}
                    </span>
                </div>
            )}
            <div className={'flex justify-between mb-1.5'}>
                <span className={'text-[10px] font-bold uppercase tracking-wider text-on-surface-variant/60'}>
                    {total > 0
                        ? t(
                            goalsLocales.activeFooter.phaseProgress, {
                                current: Math.min(completedCount + 1, total),
                                total
                            }
                        ) : t(goalsLocales.activeFooter.progress)
                    }
                </span>
                <span className={cn(
                    'text-[10px] font-bold',
                    tokens.accentText
                )}>
                    {`${pct}%`}
                </span>
            </div>
            {segments ? (
                <div className={cn('h-1.5 rounded-full overflow-hidden flex gap-0.5', tokens.progressTrack)}>
                    {segments.map((seg) => (
                        <div
                            key={seg.id}
                            className={cn(
                                'flex-1 h-full rounded-full transition-colors',
                                seg.status === MilestoneStatus.COMPLETED
                                    ? tokens.progressFill
                                    : seg.status === MilestoneStatus.ACTIVE
                                        ? cn(tokens.progressFill, 'opacity-50')
                                        : 'bg-transparent'
                            )}
                        />
                    ))}
                </div>
            ) : (
                <div className={cn(
                    'h-1.5 rounded-full overflow-hidden',
                    tokens.progressTrack
                )}>
                    <div
                        className={cn(
                            'h-full rounded-full transition-all',
                            tokens.progressFill
                        )}
                        style={{ width: `${pct}%` }}
                    />
                </div>
            )}
        </div>
    )
}
