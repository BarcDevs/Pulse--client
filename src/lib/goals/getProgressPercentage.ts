import { Goal } from '@/types/goals'

export const getProgressPercentage = (
    goal: Goal
): number => {
    return Math.min(
        100,
        Math.round((goal.progress ?? 0) * 100)
    )
}
