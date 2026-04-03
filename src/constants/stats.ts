export const STAT_LABELS = [
    'MOOD',
    'PAIN',
    'STREAK',
    'PROGRESS'
] as const

export type StatLabel = typeof STAT_LABELS[number]
