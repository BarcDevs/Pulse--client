import {
    Check,
    Pause,
    XCircle
} from 'lucide-react'
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

import { buildInfoConfig } from '@/lib/goals/buildInfoConfig'
import { GOAL_STATUS_TOKENS } from '@/lib/goals/tokens'

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

const t = (key: string) => key
const DATE = 'Jan 1, 2026'

describe('buildInfoConfig — COMPLETED', () => {
    it('uses Check icon and pct=100', () => {
        const config = buildInfoConfig(
            { ...baseGoal, status: GoalStatus.COMPLETED },
            GOAL_STATUS_TOKENS[GoalStatus.COMPLETED],
            3, 3, 100, DATE, t
        )
        expect(config.Icon).toBe(Check)
        expect(config.pct).toBe(100)
        expect(config.pctSizeCn).toBe('text-lg')
    })

    it('text1 is null when no milestones', () => {
        const config = buildInfoConfig(
            { ...baseGoal, status: GoalStatus.COMPLETED },
            GOAL_STATUS_TOKENS[GoalStatus.COMPLETED],
            0, 0, 100, DATE, t
        )
        expect(config.text1).toBeNull()
        expect(config.text2).toBeTruthy()
    })

    it('text1 shows milestone summary when milestones exist', () => {
        const config = buildInfoConfig(
            { ...baseGoal, status: GoalStatus.COMPLETED },
            GOAL_STATUS_TOKENS[GoalStatus.COMPLETED],
            4, 4, 100, DATE, t
        )
        expect(config.text1).toBeTruthy()
    })
})

describe('buildInfoConfig — PAUSED', () => {
    it('uses Pause icon and passes through pct', () => {
        const config = buildInfoConfig(
            { ...baseGoal, status: GoalStatus.PAUSED },
            GOAL_STATUS_TOKENS[GoalStatus.PAUSED],
            4, 2, 50, DATE, t
        )
        expect(config.Icon).toBe(Pause)
        expect(config.pct).toBe(50)
        expect(config.pctSizeCn).toBe('text-base')
    })

    it('shows milestone progress in text2 when milestones exist', () => {
        const config = buildInfoConfig(
            { ...baseGoal, status: GoalStatus.PAUSED },
            GOAL_STATUS_TOKENS[GoalStatus.PAUSED],
            4, 2, 50, DATE, t
        )
        expect(config.text2).toBeTruthy()
    })

    it('shows resumeAnytime in text2 when no milestones', () => {
        const config = buildInfoConfig(
            { ...baseGoal, status: GoalStatus.PAUSED },
            GOAL_STATUS_TOKENS[GoalStatus.PAUSED],
            0, 0, 30, DATE, t
        )
        expect(config.text2).toBeTruthy()
    })
})

describe('buildInfoConfig — ACTIVE', () => {
    it('falls through to XCircle branch (same as ABANDONED)', () => {
        const config = buildInfoConfig(
            { ...baseGoal, status: GoalStatus.ACTIVE },
            GOAL_STATUS_TOKENS[GoalStatus.ACTIVE],
            2, 1, 40, DATE, t
        )
        expect(config.Icon).toBe(XCircle)
        expect(config.pct).toBeNull()
    })
})

describe('buildInfoConfig — ABANDONED', () => {
    it('uses XCircle icon and pct is null', () => {
        const config = buildInfoConfig(
            { ...baseGoal, status: GoalStatus.ABANDONED },
            GOAL_STATUS_TOKENS[GoalStatus.ABANDONED],
            3, 1, 33, DATE, t
        )
        expect(config.Icon).toBe(XCircle)
        expect(config.pct).toBeNull()
        expect(config.pctSizeCn).toBe('')
    })

    it('text2 is null when no milestones', () => {
        const config = buildInfoConfig(
            { ...baseGoal, status: GoalStatus.ABANDONED },
            GOAL_STATUS_TOKENS[GoalStatus.ABANDONED],
            0, 0, 0, DATE, t
        )
        expect(config.text2).toBeNull()
    })

    it('text2 shows milestone number when milestones exist', () => {
        const config = buildInfoConfig(
            { ...baseGoal, status: GoalStatus.ABANDONED },
            GOAL_STATUS_TOKENS[GoalStatus.ABANDONED],
            5, 2, 40, DATE, t
        )
        expect(config.text2).toBeTruthy()
    })
})
