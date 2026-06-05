import { GoalStatus } from '@/types/goals'

import { getGoalStatusOrder } from './statusOrder'

export const sortGoalStatuses = (
    statuses: GoalStatus[]
): GoalStatus[] =>
    [...statuses].sort(
        (a, b) =>
            getGoalStatusOrder(a)
            - getGoalStatusOrder(b)
    )
