import { format, parseISO } from 'date-fns'

import { MilestoneStatus } from '@/types/goals'

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

export const formatMilestoneDate = (
    dateString?: string
): string => {
    if (!dateString) return ''
    try {
        return format(parseISO(dateString), 'MMM dd')
    } catch {
        return dateString
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
