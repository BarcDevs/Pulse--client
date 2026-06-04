import {
    describe,
    expect,
    it
} from 'vitest'

import { GoalBadgeKey } from '@/lib/goals/tokens'
import {
    getBadge,
    getBadgeLabel
} from '@/lib/goals/getBadge'

describe('getBadge', () => {
    it('returns NOT_STARTED at 0', () => {
        expect(getBadge(0)).toBe(GoalBadgeKey.NOT_STARTED)
    })

    it('returns IN_PROGRESS from 1 to 49', () => {
        expect(getBadge(1)).toBe(GoalBadgeKey.IN_PROGRESS)
        expect(getBadge(49)).toBe(GoalBadgeKey.IN_PROGRESS)
    })

    it('returns ON_TRACK from 50 to 99', () => {
        expect(getBadge(50)).toBe(GoalBadgeKey.ON_TRACK)
        expect(getBadge(99)).toBe(GoalBadgeKey.ON_TRACK)
    })

    it('returns COMPLETE at 100', () => {
        expect(getBadge(100)).toBe(GoalBadgeKey.COMPLETE)
    })
})

describe('getBadgeLabel', () => {
    const t = (key: string) => key

    it('maps every badge key to its translation key', () => {
        expect(getBadgeLabel(GoalBadgeKey.NOT_STARTED, t)).toBe('goals.badges.notStarted')
        expect(getBadgeLabel(GoalBadgeKey.IN_PROGRESS, t)).toBe('goals.badges.inProgress')
        expect(getBadgeLabel(GoalBadgeKey.ON_TRACK, t)).toBe('goals.badges.onTrack')
        expect(getBadgeLabel(GoalBadgeKey.COMPLETE, t)).toBe('goals.badges.complete')
    })
})
