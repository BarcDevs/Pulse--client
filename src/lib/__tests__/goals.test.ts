import {
    describe,
    expect,
    it
} from 'vitest'

import {
    Goal,
    GoalCategory,
    GoalStatus
} from '@/types/goals'

import { sortGoalsByStatus } from '@/lib/goals/sortGoalsByStatus'
import { sortGoalStatuses } from '@/lib/goals/sortGoalStatuses'
import { GOAL_STATUS_ORDER } from '@/lib/goals/statusOrder'

const createGoal = (
    overrides: Partial<Goal>
): Goal => ({
    id: overrides.id ?? 'goal-id',
    profileId: overrides.profileId ?? 'profile-id',
    title: overrides.title ?? 'Goal',
    description: overrides.description ?? null,
    category: overrides.category ?? GoalCategory.PHYSICAL,
    status: overrides.status ?? GoalStatus.ACTIVE,
    targetDate: overrides.targetDate ?? null,
    isPrimary: overrides.isPrimary ?? false,
    milestones: overrides.milestones,
    progress: overrides.progress ?? 0,
    createdAt: overrides.createdAt ?? '2026-01-01T00:00:00.000Z',
    updatedAt: overrides.updatedAt ?? '2026-01-01T00:00:00.000Z'
})

describe(
    'sortGoalStatuses',
    () => {
        it(
            'orders statuses by active, paused, completed, abandoned',
            () => {
                expect(
                    sortGoalStatuses([
                        GoalStatus.ABANDONED,
                        GoalStatus.COMPLETED,
                        GoalStatus.ACTIVE,
                        GoalStatus.PAUSED
                    ])
                ).toEqual([...GOAL_STATUS_ORDER])
            }
        )
    }
)

describe(
    'sortGoalsByStatus',
    () => {
        it(
            'orders goals by status and then by progress descending',
            () => {
                const goals = [
                    createGoal({
                        id: 'completed-low',
                        title: 'Completed Low',
                        status: GoalStatus.COMPLETED,
                        progress: 0.2
                    }),
                    createGoal({
                        id: 'active-low',
                        title: 'Active Low',
                        status: GoalStatus.ACTIVE,
                        progress: 0.1
                    }),
                    createGoal({
                        id: 'paused-high',
                        title: 'Paused High',
                        status: GoalStatus.PAUSED,
                        progress: 0.9
                    }),
                    createGoal({
                        id: 'active-high',
                        title: 'Active High',
                        status: GoalStatus.ACTIVE,
                        progress: 0.8
                    }),
                    createGoal({
                        id: 'abandoned-high',
                        title: 'Abandoned High',
                        status: GoalStatus.ABANDONED,
                        progress: 1
                    }),
                    createGoal({
                        id: 'completed-high',
                        title: 'Completed High',
                        status: GoalStatus.COMPLETED,
                        progress: 0.95
                    }),
                    createGoal({
                        id: 'paused-low',
                        title: 'Paused Low',
                        status: GoalStatus.PAUSED,
                        progress: 0.15
                    })
                ]

                expect(
                    sortGoalsByStatus(goals).map(({ id }) => id)
                ).toEqual([
                    'active-high',
                    'active-low',
                    'paused-high',
                    'paused-low',
                    'completed-high',
                    'completed-low',
                    'abandoned-high'
                ])
            }
        )

        it(
            'keeps alphabetical fallback when status and progress match',
            () => {
                const goals = [
                    createGoal({
                        id: 'b',
                        title: 'Bravo',
                        status: GoalStatus.ACTIVE,
                        progress: 0.5
                    }),
                    createGoal({
                        id: 'a',
                        title: 'Alpha',
                        status: GoalStatus.ACTIVE,
                        progress: 0.5
                    })
                ]

                expect(
                    sortGoalsByStatus(goals).map(({ id }) => id)
                ).toEqual(['a', 'b'])
            }
        )
    }
)
