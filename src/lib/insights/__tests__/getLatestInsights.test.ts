import {
    describe,
    expect,
    it
} from 'vitest'

import type { CheckIn } from '@/types/checkIn'

import { getLatestInsights } from '@/lib/insights/getLatestInsights'

// ==================== getLatestInsights ====================
describe(
    'getLatestInsights',
    () => {
        it(
            'should return null when checkIns is undefined',
            () => {
                expect(getLatestInsights(undefined)).toBe(null)
            })

        it(
            'should return null for an empty array',
            () => {
                expect(getLatestInsights([])).toBe(null)
            })

        it(
            'should return null when the first checkIn has no insights',
            () => {
                const checkIns = [{ insights: [] }] as unknown as CheckIn[]

                expect(getLatestInsights(checkIns)).toBe(null)
            })

        it(
            'should return the insight content when present',
            () => {
                const checkIns = [
                    { insights: [{ content: 'Great progress today!' }] }
                ] as unknown as CheckIn[]

                expect(getLatestInsights(checkIns)).toBe('Great progress today!')
            })
    })
