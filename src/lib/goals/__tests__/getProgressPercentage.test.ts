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

import { getProgressPercentage } from '@/lib/goals/getProgressPercentage'

const baseGoal: Goal = {
    id: 'g1',
    profileId: 'p1',
    title: 'Test Goal',
    description: null,
    category: GoalCategory.PHYSICAL,
    status: GoalStatus.ACTIVE,
    isPrimary: false,
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z'
}

describe('getProgressPercentage', () => {
    it('defaults to 0 when progress is undefined', () => {
        expect(getProgressPercentage(baseGoal)).toBe(0)
    })

    it('converts fractional progress to integer percentage', () => {
        expect(getProgressPercentage({ ...baseGoal, progress: 0.5 })).toBe(50)
        expect(getProgressPercentage({ ...baseGoal, progress: 0.75 })).toBe(75)
    })

    it('rounds fractional results', () => {
        expect(getProgressPercentage({ ...baseGoal, progress: 0.333 })).toBe(33)
    })

    it('returns 100 at exactly 1', () => {
        expect(getProgressPercentage({ ...baseGoal, progress: 1 })).toBe(100)
    })

    it('caps at 100 when progress exceeds 1', () => {
        expect(getProgressPercentage({ ...baseGoal, progress: 1.5 })).toBe(100)
    })

    it('returns negative value for negative progress (no floor applied)', () => {
        expect(getProgressPercentage({ ...baseGoal, progress: -0.5 })).toBe(-50)
    })
})
