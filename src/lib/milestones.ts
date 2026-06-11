import { useTranslations } from 'next-intl'

import type {
    Goal,
    GoalsLocales,
    MilestoneCardConfig,
    RecoveryGoalsStats
} from '@/types/goals'
import {
    GoalMilestone,
    GoalStatus,
    MilestoneStatus
} from '@/types/goals'

import { progressLocales } from '@/locales/progressLocales'

export const getMilestonesData = (
    stats: RecoveryGoalsStats | undefined,
    goals: Goal[],
    isError: boolean,
    t: ReturnType<typeof useTranslations>
) => {
    const completed = isError ? 0 : stats?.milestones.completed ?? 0
    const total = isError ? 0 : stats?.milestones.totalCreated ?? 0
    const inProgress = isError ? 0 : stats?.milestones.active ?? 0
    const upcoming = Math.max(total - completed - inProgress, 0)
    const completionRate = isError ? 0
        : Math.min(stats?.milestones.completionRate ?? 0, 1)
    const goalsCount = isError
        ? 0 : (stats?.goals.active ?? 0) + (stats?.goals.completed ?? 0)
    const nextMilestone = goals
        .filter(g => g.status === GoalStatus.ACTIVE)
        .sort((a, b) => (b.progress ?? 0) - (a.progress ?? 0))
        .at(0)?.nextMilestone
    const indicatorWidth = `${Math.min(completionRate * 100, 100)}%`
    const remainingWidth = Math.max(0, 100 - completionRate * 100)
    const inProgressPct = total > 0
        ? Math.min((inProgress / total) * 100, remainingWidth)
        : 0
    const inProgressWidth = `${inProgressPct}%`
    const m = progressLocales.stats.milestones
    return {
        completed,
        total,
        completionRate,
        nextMilestone,
        indicatorWidth,
        inProgressWidth,
        acrossGoalsLabel: t(m.acrossGoals, {
            count: goalsCount
        }),
        percentCompleteLabel: t(
            m.percentComplete,
            { percent: Math.round(completionRate * 100) }),
        completedCountLabel: t(m.completedCount, {
            count: completed
        }),
        inProgressCountLabel: t(m.inProgressCount, {
            count: inProgress
        }),
        upcomingCountLabel: t(m.upcomingCount, {
            count: upcoming
        }),
        nextUpLabel: t(m.nextUp)
    }
}

export const getMilestoneIconColor = (
    status: MilestoneStatus
): string => {
    switch (status) {
        case MilestoneStatus.COMPLETED:
            return 'bg-secondary'
        case MilestoneStatus.ACTIVE:
            return 'bg-primary'
        default:
            return 'bg-surface-container-highest'
    }
}

export const getInsightColor = (
    type: string
): string => {
    switch (type) {
        case 'MOTIVATIONAL':
            return 'bg-blue-50'
        case 'MOOD_DROP_ALERT':
            return 'bg-purple-50'
        case 'WEEKLY_SUMMARY':
            return 'bg-green-50'
        default:
            return 'bg-slate-50'
    }
}

export const getMilestoneCardConfig = (
    milestone: GoalMilestone,
    goalsLocales: GoalsLocales
): MilestoneCardConfig => {
    const isCompleted = milestone.status === MilestoneStatus.COMPLETED
    const isActive = milestone.status === MilestoneStatus.ACTIVE
    const isLocked = milestone.status === MilestoneStatus.LOCKED

    const getStatusLabelKey = () => {
        if (isCompleted)
            return goalsLocales.milestoneCardLabels.completedFormat as string
        if (isActive)
            return goalsLocales.milestoneCardLabels.activeFormat as string
        return goalsLocales.milestoneCardLabels.lockedFormat as string
    }

    return {
        bgClass: isActive ? 'bg-surface-container-lowest' : 'bg-surface-container-low',
        borderClass: isActive ? 'border-l-4 border-primary' : '',
        opacityClass: isLocked ? 'opacity-50 grayscale' : '',
        padding: isActive ? 'p-5' : 'p-4',
        statusLabelKey: getStatusLabelKey(),
        statusLabelOrder: milestone.order,
        statusBadgeClass: isActive
            ? 'inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-primary-fixed text-on-primary-fixed uppercase tracking-normal'
            : isCompleted
                ? 'text-xs font-bold text-secondary uppercase tracking-widest block'
                : 'text-xs font-bold text-outline uppercase tracking-widest block',
        titleSize: isActive ? 'text-2xl' : 'text-xl',
        contentLayout: isActive
            ? 'flex flex-col md:flex-row md:items-center justify-between gap-6'
            : 'flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2'
    }
}
