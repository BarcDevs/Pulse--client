import {
    describe,
    expect,
    it,
    vi
} from 'vitest'

import { render, screen } from '@testing-library/react'

import {
    Goal,
    GoalCategory,
    GoalStatus
} from '@/types/goals'

import { GoalsGrid } from '@/components/goals/GoalsGrid'

vi.mock(
    'next-intl',
    () => ({
        useTranslations: () => (key: string) => key
    })
)

vi.mock(
    '@/components/goals/cards/GoalCard',
    () => ({
        GoalCard: ({ goal }: { goal: Goal }) => (
            <div data-testid={'goal-card'}>
                {goal.id}
            </div>
        )
    })
)

vi.mock(
    '@/components/shared/EmptyState',
    () => ({
        EmptyState: ({ message }: { message: string }) => (
            <div>{message}</div>
        )
    })
)

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
    'GoalsGrid',
    () => {
        it(
            'renders goals ordered by status and then progress descending',
            () => {
                render(
                    <GoalsGrid
                        goals={[
                            createGoal({
                                id: 'completed-low',
                                title: 'Completed Low',
                                status: GoalStatus.COMPLETED,
                                progress: 0.1
                            }),
                            createGoal({
                                id: 'paused-high',
                                title: 'Paused High',
                                status: GoalStatus.PAUSED,
                                progress: 0.8
                            }),
                            createGoal({
                                id: 'active-low',
                                title: 'Active Low',
                                status: GoalStatus.ACTIVE,
                                progress: 0.2
                            }),
                            createGoal({
                                id: 'active-high',
                                title: 'Active High',
                                status: GoalStatus.ACTIVE,
                                progress: 0.9
                            }),
                            createGoal({
                                id: 'abandoned-high',
                                title: 'Abandoned High',
                                status: GoalStatus.ABANDONED,
                                progress: 1
                            })
                        ]}
                        onEditAction={vi.fn()}
                        onDeleteAction={vi.fn(async () => undefined)}
                    />
                )

                expect(
                    screen.getAllByTestId('goal-card').map((node) =>
                        node.textContent
                    )
                ).toEqual([
                    'active-high',
                    'active-low',
                    'paused-high',
                    'completed-low',
                    'abandoned-high'
                ])
            }
        )
    }
)
