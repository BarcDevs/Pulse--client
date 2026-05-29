import {
    afterEach,
    describe,
    expect,
    it,
    vi
} from 'vitest'

import type { MoodPainSeriesPoint } from '@/types/checkIn'

import { fillHistoryWeekNulls } from '@/lib/checkIn/fillHistoryWeekNulls'

vi.mock('@/lib/time', () => ({
    formatByUserPreference: vi.fn((date: Date) => {
        const y = date.getFullYear()
        const m = String(date.getMonth() + 1).padStart(2, '0')
        const d = String(date.getDate()).padStart(2, '0')
        return `${y}-${m}-${d}`
    })
}))

vi.mock('@/constants/defaults', () => ({
    defaults: { checkIn: { dateFormat: 'yyyy-MM-dd' } }
}))

// today = 2024-02-01 (Thursday)
// no today data → end = 2024-01-31, start = subDays(2024-01-31, 6) = 2024-01-25
// has today data → end = 2024-02-01, start = subDays(2024-02-01, 6) = 2024-01-26
const FAKE_NOW = new Date('2024-02-01T12:00:00Z')

afterEach(() => {
    vi.useRealTimers()
})

const makePoint = (
    date: string,
    mood: number | null = 5,
    pain: number | null = 3
): MoodPainSeriesPoint => ({
    date,
    originalDate: `${date}T12:00:00.000Z`,
    mood,
    pain
})

describe('fillHistoryWeekNulls', () => {
    it('returns an object with days and previousPoint properties', () => {
        vi.useFakeTimers()
        vi.setSystemTime(FAKE_NOW)

        const result = fillHistoryWeekNulls([])
        expect(result).toHaveProperty('days')
        expect(result).toHaveProperty('previousPoint')
    })

    it('days always has exactly 7 entries', () => {
        vi.useFakeTimers()
        vi.setSystemTime(FAKE_NOW)

        const result = fillHistoryWeekNulls([])
        expect(result.days).toHaveLength(7)
    })

    it('without today data: last day is yesterday (2024-01-31)', () => {
        vi.useFakeTimers()
        vi.setSystemTime(FAKE_NOW)

        const result = fillHistoryWeekNulls([])
        expect(result.days[result.days.length - 1].date).toBe('2024-01-31')
    })

    it('without today data: first day is 2024-01-25', () => {
        vi.useFakeTimers()
        vi.setSystemTime(FAKE_NOW)

        const result = fillHistoryWeekNulls([])
        expect(result.days[0].date).toBe('2024-01-25')
    })

    it('with today data: last day is today (2024-02-01)', () => {
        vi.useFakeTimers()
        vi.setSystemTime(FAKE_NOW)

        const todayPoint = makePoint('2024-02-01')
        const result = fillHistoryWeekNulls([todayPoint])
        expect(result.days[result.days.length - 1].date).toBe('2024-02-01')
    })

    it('with today data: first day is 2024-01-26', () => {
        vi.useFakeTimers()
        vi.setSystemTime(FAKE_NOW)

        const todayPoint = makePoint('2024-02-01')
        const result = fillHistoryWeekNulls([todayPoint])
        expect(result.days[0].date).toBe('2024-01-26')
    })

    it('merges existing data into days by date key', () => {
        vi.useFakeTimers()
        vi.setSystemTime(FAKE_NOW)

        const existing = makePoint('2024-01-28', 9, 1)
        const result = fillHistoryWeekNulls([existing])
        const found = result.days.find(p => p.date === '2024-01-28')
        expect(found?.mood).toBe(9)
        expect(found?.pain).toBe(1)
    })

    it('fills missing days with null mood and pain', () => {
        vi.useFakeTimers()
        vi.setSystemTime(FAKE_NOW)

        const result = fillHistoryWeekNulls([])
        result.days.forEach(day => {
            expect(day.mood).toBeNull()
            expect(day.pain).toBeNull()
        })
    })

    it('filled days have correctly formatted originalDate', () => {
        vi.useFakeTimers()
        vi.setSystemTime(FAKE_NOW)

        const result = fillHistoryWeekNulls([])
        const filled = result.days.find(p => p.date === '2024-01-27')
        expect(filled?.originalDate).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/)
    })

    it('previousPoint is null when no data exists before the 7-day window', () => {
        vi.useFakeTimers()
        vi.setSystemTime(FAKE_NOW)

        const result = fillHistoryWeekNulls([])
        expect(result.previousPoint).toBeNull()
    })

    it('previousPoint is the most recent data point before the window with non-null mood or pain', () => {
        vi.useFakeTimers()
        vi.setSystemTime(FAKE_NOW)

        // window start = 2024-01-25, so data before that date qualifies
        const before = makePoint('2024-01-20', 7, 4)
        const result = fillHistoryWeekNulls([before])
        expect(result.previousPoint).toEqual(before)
    })

    it('previousPoint ignores points before window with both mood and pain null', () => {
        vi.useFakeTimers()
        vi.setSystemTime(FAKE_NOW)

        const nullPoint = makePoint('2024-01-18', null, null)
        const result = fillHistoryWeekNulls([nullPoint])
        expect(result.previousPoint).toBeNull()
    })

    it('previousPoint picks the most recent point when multiple exist before window', () => {
        vi.useFakeTimers()
        vi.setSystemTime(FAKE_NOW)

        const older = makePoint('2024-01-10', 4, 6)
        const newer = makePoint('2024-01-22', 8, 2)
        const result = fillHistoryWeekNulls([older, newer])
        expect(result.previousPoint).toEqual(newer)
    })

    it('previousPoint is null when only null-valued points exist before window', () => {
        vi.useFakeTimers()
        vi.setSystemTime(FAKE_NOW)

        const nullMoodOnly = makePoint('2024-01-15', null, null)
        const nullPainOnly = makePoint('2024-01-16', null, null)
        const result = fillHistoryWeekNulls([nullMoodOnly, nullPainOnly])
        expect(result.previousPoint).toBeNull()
    })

    it('previousPoint accepts point with null mood but non-null pain', () => {
        vi.useFakeTimers()
        vi.setSystemTime(FAKE_NOW)

        const partialPoint = makePoint('2024-01-20', null, 5)
        const result = fillHistoryWeekNulls([partialPoint])
        expect(result.previousPoint).toEqual(partialPoint)
    })

    it('previousPoint accepts point with non-null mood but null pain', () => {
        vi.useFakeTimers()
        vi.setSystemTime(FAKE_NOW)

        const partialPoint = makePoint('2024-01-20', 6, null)
        const result = fillHistoryWeekNulls([partialPoint])
        expect(result.previousPoint).toEqual(partialPoint)
    })

    it('days are in chronological order', () => {
        vi.useFakeTimers()
        vi.setSystemTime(FAKE_NOW)

        const result = fillHistoryWeekNulls([])
        for (let i = 1; i < result.days.length; i++) {
            expect(result.days[i].date > result.days[i - 1].date).toBe(true)
        }
    })
})
