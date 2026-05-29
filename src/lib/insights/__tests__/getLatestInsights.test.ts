import {
    describe,
    expect,
    it,
    vi
} from 'vitest'

vi.mock(
    '@/locales/dashboardLocales',
    () => ( {
        dashboardLocales: { noInsights: 'no-insights-key' }
    } ))

import type { CheckIn } from '@/types/checkIn'

import { getLatestInsights } from '@/lib/insights/getLatestInsights'

// ==================== getLatestInsights ====================
describe(
    'getLatestInsights',
    () => {
        it(
            'should return the no-insights key when checkIns is undefined',
            () => {
                expect(getLatestInsights(undefined)).toBe('no-insights-key')
            })

        it(
            'should return the no-insights key for an empty array',
            () => {
                expect(getLatestInsights([])).toBe('no-insights-key')
            })

        it(
            'should return the no-insights key when the first checkIn has no insights',
            () => {
                const checkIns = [{ insights: [] }] as unknown as CheckIn[]

                expect(getLatestInsights(checkIns)).toBe('no-insights-key')
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
