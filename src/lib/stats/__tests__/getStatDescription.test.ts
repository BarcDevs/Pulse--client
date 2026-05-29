import {
    describe,
    expect,
    it
} from 'vitest'

import { getStatDescription } from '@/lib/stats/getStatDescription'

import { dashboardLocales } from '@/locales/dashboardLocales'

const { descriptions } = dashboardLocales.stats

describe('getStatDescription', () => {
    it('returns empty key when currentValue is undefined', () => {
        expect(getStatDescription('MOOD', undefined).key).toBe('')
    })

    describe('MOOD', () => {
        it('returns great for value >= 7', () => {
            expect(getStatDescription('MOOD', 7).key).toBe(descriptions.mood.great)
            expect(getStatDescription('MOOD', 10).key).toBe(descriptions.mood.great)
        })

        it('returns stable for 5 <= value < 7', () => {
            expect(getStatDescription('MOOD', 5).key).toBe(descriptions.mood.stable)
            expect(getStatDescription('MOOD', 6).key).toBe(descriptions.mood.stable)
        })

        it('returns low for value < 5', () => {
            expect(getStatDescription('MOOD', 4).key).toBe(descriptions.mood.low)
            expect(getStatDescription('MOOD', 1).key).toBe(descriptions.mood.low)
        })
    })

    describe('PAIN', () => {
        it('returns decreasing for value <= 3', () => {
            expect(getStatDescription('PAIN', 1).key).toBe(descriptions.pain.decreasing)
            expect(getStatDescription('PAIN', 3).key).toBe(descriptions.pain.decreasing)
        })

        it('returns elevated for 3 < value <= 6', () => {
            expect(getStatDescription('PAIN', 4).key).toBe(descriptions.pain.elevated)
            expect(getStatDescription('PAIN', 6).key).toBe(descriptions.pain.elevated)
        })

        it('returns high for value > 6', () => {
            expect(getStatDescription('PAIN', 7).key).toBe(descriptions.pain.high)
            expect(getStatDescription('PAIN', 10).key).toBe(descriptions.pain.high)
        })
    })

    describe('STREAK', () => {
        it('returns newRecord when current equals longest', () => {
            const result = getStatDescription('STREAK', 10, 10)
            expect(result.key).toBe(descriptions.streak.newRecord)
            expect(result.params).toBeUndefined()
        })

        it('returns personalBest with days param when not a new record', () => {
            const result = getStatDescription('STREAK', 8, 15)
            expect(result.key).toBe(descriptions.streak.personalBest)
            expect(result.params).toEqual({ days: 15 })
        })

        it('defaults longestValue to 0 when undefined', () => {
            const result = getStatDescription('STREAK', 5)
            expect(result.params).toEqual({ days: 0 })
        })
    })
})
