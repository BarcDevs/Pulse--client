import {
    afterEach,
    describe,
    expect,
    it,
    vi
} from 'vitest'

import type { MoodPainSeriesPoint } from '@/types/checkIn'

import { fillHistoryMonthNulls } from '@/lib/checkIn/fillHistoryMonthNulls'

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
// no today data → end = 2024-01-31, start = subDays(2024-01-31, 27) = 2024-01-04
// has today data → end = 2024-02-01, start = subDays(2024-02-01, 27) = 2024-01-05
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

describe('fillHistoryMonthNulls', () => {
    it('always returns exactly 28 data points', () => {
        vi.useFakeTimers()
        vi.setSystemTime(FAKE_NOW)

        const result = fillHistoryMonthNulls([])
        expect(result).toHaveLength(28)
    })

    it('without today data: first date is 2024-01-04 and last date is 2024-01-31', () => {
        vi.useFakeTimers()
        vi.setSystemTime(FAKE_NOW)

        const result = fillHistoryMonthNulls([])
        expect(result[0].date).toBe('2024-01-04')
        expect(result[result.length - 1].date).toBe('2024-01-31')
    })

    it('with today data: last date is today (2024-02-01)', () => {
        vi.useFakeTimers()
        vi.setSystemTime(FAKE_NOW)

        const todayPoint = makePoint('2024-02-01')
        const result = fillHistoryMonthNulls([todayPoint])
        expect(result[result.length - 1].date).toBe('2024-02-01')
    })

    it('with today data: first date is 2024-01-05', () => {
        vi.useFakeTimers()
        vi.setSystemTime(FAKE_NOW)

        const todayPoint = makePoint('2024-02-01')
        const result = fillHistoryMonthNulls([todayPoint])
        expect(result[0].date).toBe('2024-01-05')
    })

    it('includes existing data points by date key match', () => {
        vi.useFakeTimers()
        vi.setSystemTime(FAKE_NOW)

        const existing = makePoint('2024-01-15', 8, 2)
        const result = fillHistoryMonthNulls([existing])
        const found = result.find(p => p.date === '2024-01-15')
        expect(found).toBeDefined()
        expect(found?.mood).toBe(8)
        expect(found?.pain).toBe(2)
    })

    it('fills missing dates with null mood and pain', () => {
        vi.useFakeTimers()
        vi.setSystemTime(FAKE_NOW)

        const result = fillHistoryMonthNulls([])
        const missing = result.find(p => p.date === '2024-01-10')
        expect(missing).toBeDefined()
        expect(missing?.mood).toBeNull()
        expect(missing?.pain).toBeNull()
    })

    it('filled points have correct originalDate as ISO string', () => {
        vi.useFakeTimers()
        vi.setSystemTime(FAKE_NOW)

        const result = fillHistoryMonthNulls([])
        const filled = result.find(p => p.date === '2024-01-10')
        expect(filled?.originalDate).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/)
    })

    it('preserves existing point originalDate over generated one', () => {
        vi.useFakeTimers()
        vi.setSystemTime(FAKE_NOW)

        const existing: MoodPainSeriesPoint = {
            date: '2024-01-15',
            originalDate: '2024-01-15T08:30:00.000Z',
            mood: 7,
            pain: 4
        }
        const result = fillHistoryMonthNulls([existing])
        const found = result.find(p => p.date === '2024-01-15')
        expect(found?.originalDate).toBe('2024-01-15T08:30:00.000Z')
    })

    it('handles multiple existing data points correctly', () => {
        vi.useFakeTimers()
        vi.setSystemTime(FAKE_NOW)

        const data = [
            makePoint('2024-01-10', 6, 3),
            makePoint('2024-01-20', 9, 1)
        ]
        const result = fillHistoryMonthNulls(data)
        expect(result).toHaveLength(28)
        expect(result.find(p => p.date === '2024-01-10')?.mood).toBe(6)
        expect(result.find(p => p.date === '2024-01-20')?.mood).toBe(9)
        expect(result.find(p => p.date === '2024-01-12')?.mood).toBeNull()
    })

    it('days are in chronological order', () => {
        vi.useFakeTimers()
        vi.setSystemTime(FAKE_NOW)

        const result = fillHistoryMonthNulls([])
        for (let i = 1; i < result.length; i++) {
            expect(result[i].date > result[i - 1].date).toBe(true)
        }
    })
})
