import {
    afterEach,
    beforeEach,
    describe,
    expect,
    it,
    vi
} from 'vitest'

import type { CheckIn } from '@/types/checkIn'

import { isTodayCheckIn } from '@/lib/checkIn/loaderHelpers'

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

describe('isTodayCheckIn with timezone', () => {
    beforeEach(() => {
        vi.useFakeTimers()
        // 14:00 UTC -> already 2025-06-16 in Sydney, still 2025-06-15 in LA
        vi.setSystemTime(new Date('2025-06-15T14:00:00Z'))
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('matches a check-in dated for a timezone ahead of UTC', () => {
        const checkIn = { checkInDate: '2025-06-16T00:00:00Z' } as CheckIn
        expect(isTodayCheckIn(checkIn, 'Australia/Sydney')).toBe(true)
    })

    it('does not match that same check-in for a timezone behind UTC', () => {
        const checkIn = { checkInDate: '2025-06-16T00:00:00Z' } as CheckIn
        expect(isTodayCheckIn(checkIn, 'America/Los_Angeles')).toBe(false)
    })

    it('matches a check-in dated for a timezone behind UTC', () => {
        const checkIn = { checkInDate: '2025-06-15T00:00:00Z' } as CheckIn
        expect(isTodayCheckIn(checkIn, 'America/Los_Angeles')).toBe(true)
    })

    it('does not match that same check-in for a timezone ahead of UTC', () => {
        const checkIn = { checkInDate: '2025-06-15T00:00:00Z' } as CheckIn
        expect(isTodayCheckIn(checkIn, 'Australia/Sydney')).toBe(false)
    })
})
