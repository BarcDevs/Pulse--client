import { GoalMilestone, MilestoneStatus } from '@/types/goals'

export type MilestoneCardConfig = {
    bgClass: string
    borderClass: string
    opacityClass: string
    padding: string
    statusLabel: string
    statusBadgeClass: string
    titleSize: string
    contentLayout: string
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
    pageTexts: any
): MilestoneCardConfig => {
    const isCompleted = milestone.status === MilestoneStatus.COMPLETED
    const isActive = milestone.status === MilestoneStatus.ACTIVE
    const isLocked = milestone.status === MilestoneStatus.LOCKED

    const getFormattedStatusLabel = (): string => {
        if (isCompleted)
            return pageTexts.milestoneCardLabels.completedFormat.replace(
                '{order}',
                String(milestone.order)
            )
        if (isActive)
            return pageTexts.milestoneStatusLabels.ACTIVE
        return pageTexts.milestoneCardLabels.lockedFormat.replace(
            '{order}',
            String(milestone.order)
        )
    }

    return {
        bgClass: isActive ? 'bg-surface-container-lowest' : 'bg-surface-container-low',
        borderClass: isActive ? 'border-l-4 border-primary' : '',
        opacityClass: isLocked ? 'opacity-50 grayscale' : '',
        padding: isActive ? 'p-8' : 'p-6',
        statusLabel: getFormattedStatusLabel(),
        statusBadgeClass: isActive
            ? 'inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-primary-fixed text-on-primary-fixed uppercase tracking-tighter mb-3'
            : isCompleted
                ? 'text-xs font-bold text-secondary uppercase tracking-widest mb-1 block'
                : 'text-xs font-bold text-outline uppercase tracking-widest mb-1 block',
        titleSize: isActive ? 'text-2xl mb-3' : 'text-xl mb-2',
        contentLayout: isActive
            ? 'flex flex-col md:flex-row md:items-center justify-between gap-6'
            : 'flex justify-between items-start'
    }
}
