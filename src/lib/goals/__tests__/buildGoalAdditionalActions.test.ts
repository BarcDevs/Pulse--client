import {
    describe,
    expect,
    it,
    vi
} from 'vitest'

import {
    Goal,
    GoalCategory,
    GoalStatus
} from '@/types/goals'

import {
    buildGoalAdditionalActions,
    type GoalActionCallbacks,
    type GoalActionLabels
} from '@/lib/goals/buildGoalAdditionalActions'

const baseGoal: Goal = {
    id: 'g1',
    profileId: 'p1',
    title: 'Test Goal',
    description: null,
    category: GoalCategory.PHYSICAL,
    status: GoalStatus.ACTIVE,
    isPrimary: false,
    progress: 0,
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z'
}

const labels: GoalActionLabels = {
    pause: 'Pause',
    activate: 'Activate',
    abandon: 'Abandon',
    abandonConfirm: 'Confirm abandon',
    reopen: 'Reopen',
    restore: 'Restore'
}

const callbacks: GoalActionCallbacks = {
    pauseGoal: vi.fn(),
    activateGoal: vi.fn(),
    abandonGoal: vi.fn(),
    reopenGoal: vi.fn(),
    restoreGoal: vi.fn()
}

const ids = (goal: Goal) =>
    buildGoalAdditionalActions(goal, labels, callbacks).map((a) => a.id)

describe('buildGoalAdditionalActions', () => {
    it('active goal gets pause and abandon', () => {
        const result = ids({ ...baseGoal, status: GoalStatus.ACTIVE })
        expect(result).toContain('pause')
        expect(result).toContain('abandon')
        expect(result).not.toContain('activate')
        expect(result).not.toContain('reopen')
        expect(result).not.toContain('restore')
    })

    it('paused goal gets activate and abandon', () => {
        const result = ids({ ...baseGoal, status: GoalStatus.PAUSED })
        expect(result).toContain('activate')
        expect(result).toContain('abandon')
        expect(result).not.toContain('pause')
    })

    it('completed goal gets only reopen', () => {
        expect(ids({ ...baseGoal, status: GoalStatus.COMPLETED })).toEqual(['reopen'])
    })

    it('abandoned goal gets only restore', () => {
        expect(ids({ ...baseGoal, status: GoalStatus.ABANDONED })).toEqual(['restore'])
    })

    it('pause action fires pauseGoal with goal id', async () => {
        const actions = buildGoalAdditionalActions(
            { ...baseGoal, status: GoalStatus.ACTIVE },
            labels,
            callbacks
        )
        await actions.find((a) => a.id === 'pause')!.action()
        expect(callbacks.pauseGoal).toHaveBeenCalledWith('g1')
    })

    it('activate action fires activateGoal with goal id', async () => {
        const actions = buildGoalAdditionalActions(
            { ...baseGoal, status: GoalStatus.PAUSED },
            labels,
            callbacks
        )
        await actions.find((a) => a.id === 'activate')!.action()
        expect(callbacks.activateGoal).toHaveBeenCalledWith('g1')
    })

    it('abandon action fires abandonGoal with goal id', async () => {
        const actions = buildGoalAdditionalActions(
            { ...baseGoal, status: GoalStatus.ACTIVE },
            labels,
            callbacks
        )
        await actions.find((a) => a.id === 'abandon')!.action()
        expect(callbacks.abandonGoal).toHaveBeenCalledWith('g1')
    })

    it('reopen action fires reopenGoal with goal id', async () => {
        const actions = buildGoalAdditionalActions(
            { ...baseGoal, status: GoalStatus.COMPLETED },
            labels,
            callbacks
        )
        await actions.find((a) => a.id === 'reopen')!.action()
        expect(callbacks.reopenGoal).toHaveBeenCalledWith('g1')
    })

    it('restore action fires restoreGoal with goal id', async () => {
        const actions = buildGoalAdditionalActions(
            { ...baseGoal, status: GoalStatus.ABANDONED },
            labels,
            callbacks
        )
        await actions.find((a) => a.id === 'restore')!.action()
        expect(callbacks.restoreGoal).toHaveBeenCalledWith('g1')
    })

    it('abandon action is destructive and requires confirmation', () => {
        const actions = buildGoalAdditionalActions(
            { ...baseGoal, status: GoalStatus.ACTIVE },
            labels,
            callbacks
        )
        const abandon = actions.find((a) => a.id === 'abandon')
        expect(abandon?.destructive).toBe(true)
        expect(abandon?.requiresConfirmation).toBe(true)
    })
})
