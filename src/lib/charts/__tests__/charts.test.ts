import { describe, expect, it } from 'vitest'

import type { ChartSeries } from '@/types/chart'

import { enrichWithBridges } from '../enrichWithBridges'
import { getLastRealIndex } from '../getLastRealIndex'
import { getNoDataRanges } from '../getNoDataRanges'

const mood: ChartSeries = {
    dataKey: 'mood',
    color: 'red',
    label: 'Mood',
    gradientId: 'g'
}

const rows = (values: (number | null)[]) => values.map(
    (mood, i) => ({ date: `d${i}`, mood })
)

describe('enrichWithBridges', () => {
    it('bridges a gap between two real points', () => {
        const { enrichedData, bridgeKeys } = enrichWithBridges(
            rows([1, null, null, 4]),
            [mood]
        )

        expect(bridgeKeys).toEqual([{ key: '_bridge_mood_0', color: 'red' }])
        expect(enrichedData[0]._bridge_mood_0).toBe(1)
        expect(enrichedData[3]._bridge_mood_0).toBe(4)
        expect(enrichedData[1]._bridge_mood_0).toBeUndefined()
    })

    it('does not bridge from the off-screen anchor', () => {
        const { bridgeKeys } = enrichWithBridges(
            rows([null, null, 4]),
            [mood],
            { mood: 7 }
        )

        expect(bridgeKeys).toEqual([])
    })

    it('skips dashed series', () => {
        const { bridgeKeys } = enrichWithBridges(
            rows([1, null, 4]),
            [{ ...mood, dashed: true }]
        )

        expect(bridgeKeys).toEqual([])
    })

    it('does not mutate the input rows', () => {
        const data = rows([1, null, 4])
        enrichWithBridges(data, [mood])

        expect(data[0]).toEqual({ date: 'd0', mood: 1 })
    })
})

describe('getNoDataRanges', () => {
    it('greys the leading and trailing gaps only', () => {
        expect(getNoDataRanges(
            rows([null, null, 3, null, 5, null]),
            [mood]
        )).toEqual([
            { x1: 'd0', x2: 'd2' },
            { x1: 'd4', x2: 'd5' }
        ])
    })

    it('greys the whole window when there is no data', () => {
        expect(getNoDataRanges(
            rows([null, null, null]),
            [mood]
        )).toEqual([{ x1: 'd0', x2: 'd2' }])
    })

    it('returns nothing for an empty window', () => {
        expect(getNoDataRanges([], [mood])).toEqual([])
    })
})

describe('getLastRealIndex', () => {
    it('finds the last real value per series', () => {
        expect(getLastRealIndex(
            rows([1, 2, null, null]),
            [mood]
        )).toEqual({ mood: 1 })
    })

    it('omits a series with no real value', () => {
        expect(getLastRealIndex(
            rows([null, null]),
            [mood]
        )).toEqual({})
    })
})
