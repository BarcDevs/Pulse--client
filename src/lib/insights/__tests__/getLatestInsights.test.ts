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
            'should return an empty array when checkIns is undefined',
            () => {
                expect(getLatestInsights(undefined)).toEqual([])
            })

        it(
            'should return an empty array for an empty array',
            () => {
                expect(getLatestInsights([])).toEqual([])
            })

        it(
            'should return an empty array when the first checkIn has no insights',
            () => {
                const checkIns = [{ insights: [] }] as unknown as CheckIn[]

                expect(getLatestInsights(checkIns)).toEqual([])
            })

        it(
            'should return all insights of the latest check-in oldest first',
            () => {
                const baseline = {
                    content: 'Baseline',
                    createdAt: '2026-10-02T08:00:00.000Z'
                }
                const support = {
                    content: 'Support',
                    createdAt: '2026-10-02T09:00:00.000Z'
                }
                const checkIns = [
                    { insights: [support, baseline] },
                    {
                        insights: [{
                            content: 'Yesterday',
                            createdAt: '2026-10-01T09:00:00.000Z'
                        }]
                    }
                ] as unknown as CheckIn[]

                expect(getLatestInsights(checkIns)).toEqual([baseline, support])
            })

        it(
            'should skip insights with empty content',
            () => {
                const real = {
                    content: 'Real',
                    createdAt: '2026-10-02T08:00:00.000Z'
                }
                const checkIns = [
                    {
                        insights: [
                            real,
                            {
                                content: '',
                                createdAt: '2026-10-02T09:00:00.000Z'
                            }
                        ]
                    }
                ] as unknown as CheckIn[]

                expect(getLatestInsights(checkIns)).toEqual([real])
            })
    })
