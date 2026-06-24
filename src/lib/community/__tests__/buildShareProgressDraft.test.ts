import { describe, expect, it } from 'vitest'

import type { CheckInStats } from '@/types/checkIn'

import { buildShareProgressDraft } from '@/lib/community/buildShareProgressDraft'

const t = (key: string) => key

const stats: CheckInStats = {
    total: 10,
    totalCheckIns: 10,
    avgMood: 4,
    averageMoodScore: 4.2,
    avgPain: 2,
    averagePainLevel: 2.1,
    topActivities: [],
    currentStreak: 7,
    longestStreak: 14,
    moodTrend: [],
    painTrend: [],
    milestonesAchieved: 3
}

describe('buildShareProgressDraft', () => {
    it('builds a draft with the sharedProgress category and progress tag', () => {
        const draft = buildShareProgressDraft(t, stats, 5)

        expect(draft.category).toBe('sharedProgress')
        expect(draft.tags).toEqual(['progress'])
        expect(draft.title).toBe('progress.share.communityPostTitle')
    })

    it('renders stats into the HTML body', () => {
        const draft = buildShareProgressDraft(t, stats, 5)

        expect(draft.body).toContain('7')
        expect(draft.body).toContain('4.2')
        expect(draft.body).toContain('5')
        expect(draft.body).toContain('<ul>')
    })

    it('defaults milestonesCompleted to 0 when undefined', () => {
        const draft = buildShareProgressDraft(t, stats, undefined)

        expect(draft.body).toContain('progress.share.milestonesLabel:</strong> 0')
    })
})
