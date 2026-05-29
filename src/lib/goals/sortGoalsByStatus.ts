import { Goal } from '@/types/goals'

import { getGoalStatusOrder } from './statusOrder'

export const sortGoalsByStatus = (
    goals: Goal[]
): Goal[] =>
    [...goals].sort((a, b) => {
        const statusOrderDifference =
            getGoalStatusOrder(a.status)
            - getGoalStatusOrder(b.status)

        if (statusOrderDifference !== 0)
            return statusOrderDifference

        const progressDifference =
            (b.progress ?? 0) - (a.progress ?? 0)

        if (progressDifference !== 0)
            return progressDifference

        return a.title.localeCompare(b.title)
    })
