import {
    describe,
    expect,
    it,
    vi
} from 'vitest'

import { CheckIn } from '@/types/checkIn'

vi.mock('@/constants/defaults', () => ({
    defaults: { checkIn: { maxSuggestedActivities: 5 } }
}))

import { aggregateActivities, pickQuote } from '@/utils/checkIn'

const makeCheckIn = (activities: string[]): CheckIn =>
    ({ activities } as CheckIn)

// ==================== aggregateActivities ====================
describe('aggregateActivities', () => {
    it('returns [] for empty array', () => {
        expect(aggregateActivities([])).toEqual([])
    })

    it('returns single activity label', () => {
        const result = aggregateActivities([makeCheckIn(['walking'])])
        expect(result).toEqual(['walking'])
    })

    it('deduplicates case-insensitively and uses first occurrence label', () => {
        const checkIns = [
            makeCheckIn(['Walking']),
            makeCheckIn(['walking'])
        ]
        const result = aggregateActivities(checkIns)
        expect(result).toHaveLength(1)
        expect(result[0]).toBe('Walking')
    })

    it('sorts by frequency — most frequent first', () => {
        const checkIns = [
            makeCheckIn(['yoga']),
            makeCheckIn(['walking', 'walking']),
            makeCheckIn(['yoga'])
        ]
        const result = aggregateActivities(checkIns)
        expect(result[0]).toBe('yoga')
        expect(result[1]).toBe('walking')
    })

    it('limits results to maxSuggestedActivities (5)', () => {
        const checkIns = [
            makeCheckIn(['a', 'b', 'c', 'd', 'e', 'f'])
        ]
        const result = aggregateActivities(checkIns)
        expect(result).toHaveLength(5)
    })

    it('trims whitespace from activity strings', () => {
        const checkIns = [makeCheckIn(['  walking  '])]
        const result = aggregateActivities(checkIns)
        expect(result).toHaveLength(1)
        expect(result[0]).toBe('  walking  ')
    })

    it('skips empty and whitespace-only activities', () => {
        const checkIns = [makeCheckIn(['', '   ', 'yoga'])]
        const result = aggregateActivities(checkIns)
        expect(result).toEqual(['yoga'])
    })
})

// ==================== pickQuote ====================
describe('pickQuote', () => {
    const quotes = ['quote A', 'quote B', 'quote C', 'quote D']

    it('returns a string from the quotes array', () => {
        const result = pickQuote(quotes, 'en')
        expect(quotes).toContain(result)
    })

    it('is deterministic for the same locale and date', () => {
        const first = pickQuote(quotes, 'en')
        const second = pickQuote(quotes, 'en')
        expect(first).toBe(second)
    })

    it('may return a different result for a different locale', () => {
        const results = new Set(
            ['en', 'he', 'fr', 'de', 'es', 'pt', 'it', 'ru', 'ar', 'zh']
                .map(locale => pickQuote(quotes, locale))
        )
        // At least 2 distinct locales should differ over a set of 10
        expect(results.size).toBeGreaterThan(1)
    })

    it('always returns the single item when array has length 1', () => {
        const result = pickQuote(['only quote'], 'en')
        expect(result).toBe('only quote')
    })
})
