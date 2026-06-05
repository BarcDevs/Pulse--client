export const STAT_LABELS = [
    'MOOD',
    'PAIN',
    'STREAK',
    'MILESTONES_COMPLETED'
] as const

export type StatLabel = typeof STAT_LABELS[number]
