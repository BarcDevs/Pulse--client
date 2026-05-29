import {
    describe,
    expect,
    it
} from 'vitest'

import type { MoodPainSeriesPoint } from '@/types/checkIn'

import { buildWeeklyAverages } from '@/lib/checkIn/buildWeeklyAverages'

const makePoint = (
    originalDate: string,
    mood: number | null,
    pain: number | null
): MoodPainSeriesPoint => ({
    date: originalDate.slice(0, 10),
    originalDate,
    mood,
    pain
})

const jan = (day: number): string => `2024-01-${String(day).padStart(2, '0')}T12:00:00Z`
const febDay = (day: number): string => `2024-02-${String(day).padStart(2, '0')}T12:00:00Z`

const sevenPoints = Array.from({ length: 7 }, (_, i) => makePoint(jan(i + 1), i + 1, 10 - i))

describe('buildWeeklyAverages', () => {
    it('returns [] for empty input', () => {
        expect(buildWeeklyAverages([])).toEqual([])
    })

    it('returns 1 chunk for 7 data points', () => {
        const result = buildWeeklyAverages(sevenPoints)
        expect(result).toHaveLength(1)
    })

    it('calculates mood average rounded to 1 decimal', () => {
        // moods: 1,2,3,4,5,6,7 → avg = 4
        const result = buildWeeklyAverages(sevenPoints)
        expect(result[0].mood).toBe(4)
    })

    it('calculates pain average rounded to 1 decimal', () => {
        // pains: 10,9,8,7,6,5,4 → avg = 7
        const result = buildWeeklyAverages(sevenPoints)
        expect(result[0].pain).toBe(7)
    })

    it('sets originalDate to the first point originalDate', () => {
        const result = buildWeeklyAverages(sevenPoints)
        expect(result[0].originalDate).toBe(jan(1))
    })

    it('formats date label as "d - d MMM" when same month', () => {
        const result = buildWeeklyAverages(sevenPoints)
        expect(result[0].date).toBe('1 - 7 Jan')
    })

    it('formats date label as "d MMM - d MMM" when different months', () => {
        const crossMonthPoints = [
            ...Array.from({ length: 6 }, (_, i) => makePoint(jan(26 + i), 5, 5)),
            makePoint(febDay(1), 5, 5)
        ]
        const result = buildWeeklyAverages(crossMonthPoints)
        expect(result[0].date).toBe('26 Jan - 1 Feb')
    })

    it('returns 2 chunks for 14 data points', () => {
        const points = Array.from({ length: 14 }, (_, i) =>
            makePoint(jan(i + 1), 5, 5)
        )
        expect(buildWeeklyAverages(points)).toHaveLength(2)
    })

    it('returns 2 chunks for 8 data points (7 + 1)', () => {
        const points = Array.from({ length: 8 }, (_, i) =>
            makePoint(jan(i + 1), 5, 5)
        )
        expect(buildWeeklyAverages(points)).toHaveLength(2)
    })

    it('excludes null mood values from average calculation', () => {
        const points = [
            makePoint(jan(1), null, 5),
            makePoint(jan(2), 4, 5),
            makePoint(jan(3), 6, 5),
            makePoint(jan(4), null, 5),
            makePoint(jan(5), null, 5),
            makePoint(jan(6), null, 5),
            makePoint(jan(7), null, 5)
        ]
        // moods: [4, 6] → avg = 5
        const result = buildWeeklyAverages(points)
        expect(result[0].mood).toBe(5)
    })

    it('excludes null pain values from average calculation', () => {
        const points = [
            makePoint(jan(1), 5, null),
            makePoint(jan(2), 5, 3),
            makePoint(jan(3), 5, 7),
            makePoint(jan(4), 5, null),
            makePoint(jan(5), 5, null),
            makePoint(jan(6), 5, null),
            makePoint(jan(7), 5, null)
        ]
        // pains: [3, 7] → avg = 5
        const result = buildWeeklyAverages(points)
        expect(result[0].pain).toBe(5)
    })

    it('returns null mood when all mood values are null', () => {
        const points = Array.from({ length: 7 }, (_, i) =>
            makePoint(jan(i + 1), null, 5)
        )
        const result = buildWeeklyAverages(points)
        expect(result[0].mood).toBeNull()
    })

    it('returns null pain when all pain values are null', () => {
        const points = Array.from({ length: 7 }, (_, i) =>
            makePoint(jan(i + 1), 5, null)
        )
        const result = buildWeeklyAverages(points)
        expect(result[0].pain).toBeNull()
    })

    it('rounds averages correctly to 1 decimal place', () => {
        // moods: 1,2,3,4,5,6,8 → sum=29, avg=29/7≈4.1
        const points = [
            makePoint(jan(1), 1, 5),
            makePoint(jan(2), 2, 5),
            makePoint(jan(3), 3, 5),
            makePoint(jan(4), 4, 5),
            makePoint(jan(5), 5, 5),
            makePoint(jan(6), 6, 5),
            makePoint(jan(7), 8, 5)
        ]
        const result = buildWeeklyAverages(points)
        expect(result[0].mood).toBe(4.1)
    })

    it('second chunk uses the 8th point originalDate as its originalDate', () => {
        const points = Array.from({ length: 14 }, (_, i) =>
            makePoint(jan(i + 1), 5, 5)
        )
        const result = buildWeeklyAverages(points)
        expect(result[1].originalDate).toBe(jan(8))
    })
})
