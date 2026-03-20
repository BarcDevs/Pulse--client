import {
    afterEach,
    beforeEach,
    describe,
    expect,
    it,
    vi
} from 'vitest'

import { toRelative, toShortNumber } from '@/lib/time'

// ==================== toRelative ====================
describe(
    'toRelative',
    () => {
        beforeEach(() => {
            vi.useFakeTimers()
            vi.setSystemTime(
                new Date('2025-01-15T12:00:00Z')
            )
        })

        afterEach(() => {
            vi.useRealTimers()
        })

        it(
            'should return "less than a minute ago" for very recent dates',
            () => {
                const date = new Date('2025-01-15T11:59:50Z')
                expect(toRelative(date))
                    .toBe('less than a minute ago')
            })

        it(
            'should return relative time for a date one hour ago',
            () => {
                const date = new Date('2025-01-15T11:00:00Z')
                expect(toRelative(date))
                    .toMatch(/about 1 hour ago/)
            })

        it(
            'should return relative time for a date one day ago',
            () => {
                const date = new Date('2025-01-14T12:00:00Z')
                expect(toRelative(date))
                    .toBe('1 day ago')
            })

        it(
            'should include "ago" suffix for past dates',
            () => {
                const date = new Date('2025-01-14T12:00:00Z')
                expect(toRelative(date))
                    .toContain('ago')
            })

        it(
            'should include "in" prefix for future dates',
            () => {
                const date = new Date('2025-01-16T12:00:00Z')
                expect(toRelative(date))
                    .toContain('in')
            })

        it(
            'should handle dates several months ago',
            () => {
                const date = new Date('2024-10-15T12:00:00Z')
                expect(toRelative(date))
                    .toContain('months ago')
            })
    })

// ==================== toShortNumber ====================
describe(
    'toShortNumber',
    () => {
        it(
            'should return the number as string for values below 1000',
            () => {
                expect(toShortNumber(0)).toBe('0')
                expect(toShortNumber(1)).toBe('1')
                expect(toShortNumber(42)).toBe('42')
                expect(toShortNumber(999)).toBe('999')
            })

        it(
            'should format thousands with K suffix',
            () => {
                expect(toShortNumber(1000)).toBe('1.0K')
                expect(toShortNumber(1500)).toBe('1.5K')
                expect(toShortNumber(10000)).toBe('10.0K')
            })

        it(
            'should format millions with M suffix',
            () => {
                expect(toShortNumber(1000000)).toBe('1.0M')
                expect(toShortNumber(2500000)).toBe('2.5M')
                expect(toShortNumber(50000000)).toBe('50.0M')
            })

        it(
            'should format billions with B suffix',
            () => {
                expect(toShortNumber(1000000000)).toBe('1.0B')
                expect(toShortNumber(7500000000)).toBe('7.5B')
            })

        it(
            'should round to one decimal place',
            () => {
                expect(toShortNumber(1234)).toBe('1.2K')
                expect(toShortNumber(1255)).toBe('1.3K')
                expect(toShortNumber(1050)).toBe('1.1K')
            })

        it(
            'should handle exact boundary values',
            () => {
                expect(toShortNumber(1000)).toBe('1.0K')
                expect(toShortNumber(1000000)).toBe('1.0M')
                expect(toShortNumber(1000000000)).toBe('1.0B')
            })

        it(
            'should handle values just below boundaries',
            () => {
                expect(toShortNumber(999)).toBe('999')
                expect(toShortNumber(999999)).toBe('1000.0K')
                expect(toShortNumber(999999999)).toBe('1000.0M')
            })

        it(
            'should handle negative numbers without suffix',
            () => {
                expect(toShortNumber(-1)).toBe('-1')
                expect(toShortNumber(-500)).toBe('-500')
                expect(toShortNumber(-999)).toBe('-999')
            })
    })
