import {
    afterEach,
    beforeEach,
    describe,
    expect,
    it,
    vi
} from 'vitest'

import type { CheckIn, CheckInStats } from '@/types/checkIn'

import { isTodayCheckIn, normalizeStats } from '@/lib/checkIn/loaderHelpers'

describe('normalizeStats', () => {
    it('passes through non-null values unchanged', () => {
        const raw = {
            totalCheckIns: 5,
            averageMoodScore: 7,
            averagePainLevel: 3
        } as CheckInStats

        expect(normalizeStats(raw)).toEqual(raw)
    })

    it('replaces null totalCheckIns with 0', () => {
        const raw = {
            totalCheckIns: null,
            averageMoodScore: 5,
            averagePainLevel: 3
        } as unknown as CheckInStats

        expect(normalizeStats(raw).totalCheckIns).toBe(0)
    })

    it('replaces null averageMoodScore with 0', () => {
        const raw = {
            totalCheckIns: 5,
            averageMoodScore: null,
            averagePainLevel: 3
        } as unknown as CheckInStats

        expect(normalizeStats(raw).averageMoodScore).toBe(0)
    })

    it('replaces null averagePainLevel with 0', () => {
        const raw = {
            totalCheckIns: 5,
            averageMoodScore: 7,
            averagePainLevel: null
        } as unknown as CheckInStats

        expect(normalizeStats(raw).averagePainLevel).toBe(0)
    })

    it('preserves zero values (does not replace 0 with 0 via ??)', () => {
        const raw = {
            totalCheckIns: 0,
            averageMoodScore: 0,
            averagePainLevel: 0
        } as CheckInStats

        expect(normalizeStats(raw)).toEqual(raw)
    })
})

describe('isTodayCheckIn', () => {
    beforeEach(() => {
        vi.useFakeTimers()
        vi.setSystemTime(new Date('2025-06-15T12:00:00Z'))
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('returns true when checkInDate matches today', () => {
        const checkIn = { checkInDate: '2025-06-15T00:00:00Z' } as CheckIn
        expect(isTodayCheckIn(checkIn)).toBe(true)
    })

    it('returns false for yesterday', () => {
        const checkIn = { checkInDate: '2025-06-14T00:00:00Z' } as CheckIn
        expect(isTodayCheckIn(checkIn)).toBe(false)
    })

    it('returns false for tomorrow', () => {
        const checkIn = { checkInDate: '2025-06-16T00:00:00Z' } as CheckIn
        expect(isTodayCheckIn(checkIn)).toBe(false)
    })
})
