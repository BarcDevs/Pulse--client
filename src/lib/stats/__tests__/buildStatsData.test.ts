import { describe, expect,it } from 'vitest'

import type { CheckInStats } from '@/types/checkIn'

import { buildStatsData } from '@/lib/stats/buildStatsData'

const mockStats = (overrides: Partial<CheckInStats> = {}): CheckInStats => ({
    total: 10,
    totalCheckIns: 10,
    avgMood: 7.5,
    averageMoodScore: 7.5,
    avgPain: 3.2,
    averagePainLevel: 3.2,
    topActivities: [],
    currentStreak: 5,
    longestStreak: 10,
    moodTrend: [],
    painTrend: [],
    milestonesAchieved: 2,
    ...overrides
})

// ==================== buildStatsData ====================
describe('buildStatsData', () => {
    it('returns 4 items, one per STAT_LABEL', () => {
        const result = buildStatsData(undefined)
        expect(result).toHaveLength(4)
    })

    it('each item has the required shape fields', () => {
        const result = buildStatsData(mockStats())
        for (const item of result) {
            expect(item).toHaveProperty('id')
            expect(item).toHaveProperty('labelKey')
            expect(item).toHaveProperty('value')
            expect(item).toHaveProperty('subValue')
            expect(item).toHaveProperty('subValueKey')
            expect(item).toHaveProperty('descriptionKey')
        }
    })

    describe('undefined stats — default values', () => {
        it('MOOD value is "-"', () => {
            const result = buildStatsData(undefined)
            const mood = result.find(s => s.id === 'MOOD')!
            expect(mood.value).toBe('-')
        })

        it('PAIN value is "-"', () => {
            const result = buildStatsData(undefined)
            const pain = result.find(s => s.id === 'PAIN')!
            expect(pain.value).toBe('-')
        })

        it('STREAK value is 0', () => {
            const result = buildStatsData(undefined)
            const streak = result.find(s => s.id === 'STREAK')!
            expect(streak.value).toBe(0)
        })

        it('PROGRESS value is "-"', () => {
            const result = buildStatsData(undefined)
            const progress = result.find(s => s.id === 'PROGRESS')!
            expect(progress.value).toBe('-')
        })
    })

    describe('with defined stats', () => {
        it('MOOD value is averageMoodScore formatted to 1 decimal', () => {
            const result = buildStatsData(mockStats({ averageMoodScore: 7.5 }))
            const mood = result.find(s => s.id === 'MOOD')!
            expect(mood.value).toBe('7.5')
        })

        it('PAIN value is averagePainLevel formatted to 1 decimal', () => {
            const result = buildStatsData(mockStats({ averagePainLevel: 3.2 }))
            const pain = result.find(s => s.id === 'PAIN')!
            expect(pain.value).toBe('3.2')
        })

        it('STREAK value is currentStreak', () => {
            const result = buildStatsData(mockStats({ currentStreak: 5 }))
            const streak = result.find(s => s.id === 'STREAK')!
            expect(streak.value).toBe(5)
        })

        it('PROGRESS value is always "-"', () => {
            const result = buildStatsData(mockStats())
            const progress = result.find(s => s.id === 'PROGRESS')!
            expect(progress.value).toBe('-')
        })
    })

    describe('label keys', () => {
        it('MOOD labelKey is dashboard.stats.labels.mood', () => {
            const result = buildStatsData(undefined)
            const mood = result.find(s => s.id === 'MOOD')!
            expect(mood.labelKey).toBe('dashboard.stats.labels.mood')
        })

        it('PAIN labelKey is dashboard.stats.labels.pain', () => {
            const result = buildStatsData(undefined)
            const pain = result.find(s => s.id === 'PAIN')!
            expect(pain.labelKey).toBe('dashboard.stats.labels.pain')
        })

        it('STREAK labelKey is dashboard.stats.labels.streak', () => {
            const result = buildStatsData(undefined)
            const streak = result.find(s => s.id === 'STREAK')!
            expect(streak.labelKey).toBe('dashboard.stats.labels.streak')
        })

        it('PROGRESS labelKey is dashboard.stats.labels.progress', () => {
            const result = buildStatsData(undefined)
            const progress = result.find(s => s.id === 'PROGRESS')!
            expect(progress.labelKey).toBe('dashboard.stats.labels.progress')
        })
    })

    describe('subValues', () => {
        it('STREAK subValueKey is dashboard.stats.subValues.days', () => {
            const result = buildStatsData(undefined)
            const streak = result.find(s => s.id === 'STREAK')!
            expect(streak.subValueKey).toBe('dashboard.stats.subValues.days')
        })

        it('MOOD subValue is /10', () => {
            const result = buildStatsData(undefined)
            const mood = result.find(s => s.id === 'MOOD')!
            expect(mood.subValue).toBe('/10')
        })

        it('PAIN subValue is /10', () => {
            const result = buildStatsData(undefined)
            const pain = result.find(s => s.id === 'PAIN')!
            expect(pain.subValue).toBe('/10')
        })
    })

    describe('descriptionKey', () => {
        it('is a non-empty string for MOOD with defined stats', () => {
            const result = buildStatsData(mockStats({ averageMoodScore: 7.5 }))
            const mood = result.find(s => s.id === 'MOOD')!
            expect(typeof mood.descriptionKey).toBe('string')
            expect(mood.descriptionKey.length).toBeGreaterThan(0)
        })

        it('is a non-empty string for PAIN with defined stats', () => {
            const result = buildStatsData(mockStats({ averagePainLevel: 3.2 }))
            const pain = result.find(s => s.id === 'PAIN')!
            expect(typeof pain.descriptionKey).toBe('string')
            expect(pain.descriptionKey.length).toBeGreaterThan(0)
        })

        it('is a non-empty string for STREAK with defined stats', () => {
            const result = buildStatsData(mockStats({ currentStreak: 5, longestStreak: 10 }))
            const streak = result.find(s => s.id === 'STREAK')!
            expect(typeof streak.descriptionKey).toBe('string')
            expect(streak.descriptionKey.length).toBeGreaterThan(0)
        })
    })
})
