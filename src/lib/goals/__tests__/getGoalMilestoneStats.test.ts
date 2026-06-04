import {
    describe,
    expect,
    it
} from 'vitest'

import {
    Goal,
    GoalCategory,
    GoalStatus,
    MilestoneStatus
} from '@/types/goals'

import { getGoalMilestoneStats } from '@/lib/goals/getGoalMilestoneStats'

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

const milestone = (
    id: string,
    status: MilestoneStatus,
    order = 1
) => ({
    id,
    goalId: 'g1',
    title: `Milestone ${id}`,
    status,
    order,
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z'
})

describe('getGoalMilestoneStats', () => {
    it('returns zeros with empty goal', () => {
        const stats = getGoalMilestoneStats(baseGoal)
        expect(stats.total).toBe(0)
        expect(stats.pct).toBe(0)
        expect(stats.completedCount).toBe(0)
        expect(stats.activeMilestone).toBeUndefined()
        expect(stats.milestones).toEqual([])
    })

    it('converts progress fraction to rounded pct', () => {
        expect(getGoalMilestoneStats({ ...baseGoal, progress: 0.75 }).pct).toBe(75)
        expect(getGoalMilestoneStats({ ...baseGoal, progress: 0.333 }).pct).toBe(33)
    })

    it('uses milestonesCount as total when milestones array absent', () => {
        const stats = getGoalMilestoneStats({
            ...baseGoal,
            milestonesCount: 5,
            progress: 0.4
        })
        expect(stats.total).toBe(5)
        // completedCount = round(0.4 * 5) = 2
        expect(stats.completedCount).toBe(2)
    })

    it('counts completed milestones from array', () => {
        const milestones = [
            milestone('m1', MilestoneStatus.COMPLETED, 1),
            milestone('m2', MilestoneStatus.ACTIVE, 2),
            milestone('m3', MilestoneStatus.LOCKED, 3)
        ]
        const stats = getGoalMilestoneStats({ ...baseGoal, milestones })
        expect(stats.total).toBe(3)
        expect(stats.completedCount).toBe(1)
    })

    it('finds first active milestone', () => {
        const milestones = [
            milestone('m1', MilestoneStatus.COMPLETED, 1),
            milestone('m2', MilestoneStatus.ACTIVE, 2),
            milestone('m3', MilestoneStatus.LOCKED, 3)
        ]
        const stats = getGoalMilestoneStats({ ...baseGoal, milestones })
        expect(stats.activeMilestone?.id).toBe('m2')
    })

    it('returns undefined activeMilestone when none is active', () => {
        const milestones = [
            milestone('m1', MilestoneStatus.COMPLETED, 1),
            milestone('m2', MilestoneStatus.LOCKED, 2)
        ]
        const stats = getGoalMilestoneStats({ ...baseGoal, milestones })
        expect(stats.activeMilestone).toBeUndefined()
    })
})
