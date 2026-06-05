import {
    Minus,
    TrendingDown,
    TrendingUp
} from 'lucide-react'
import {
    describe,
    expect,
    it
} from 'vitest'

import type { TrendPoint } from '@/types/checkIn'

import {
    getTrendData,
    getWellnessStatusKey
} from '@/lib/stats/getTrendLabel'

import { progressLocales } from '@/locales/progressLocales'

const { trends, status } = progressLocales.wellness

const points = (values: number[]): TrendPoint[] =>
    values.map(v => ({ actual: v } as TrendPoint))

describe('getTrendData', () => {
    it('returns steady for mood when fewer than 2 points', () => {
        const result = getTrendData([], 'mood')
        expect(result.icon).toBe(Minus)
        expect(result.labelKey).toBe(trends.steady)
        expect(result.color).toBe('text-muted-foreground')
    })

    it('returns stable for pain when fewer than 2 points', () => {
        const result = getTrendData([{ actual: 5 } as TrendPoint], 'pain')
        expect(result.icon).toBe(Minus)
        expect(result.labelKey).toBe(trends.stable)
    })

    it('returns improving mood when second half avg exceeds first half by > 0.5', () => {
        // first half [1,2] avg=1.5, second half [8,9] avg=8.5, diff=7
        const result = getTrendData(points([1, 2, 8, 9]), 'mood')
        expect(result.icon).toBe(TrendingUp)
        expect(result.color).toBe('text-green-600')
        expect(result.labelKey).toBe(trends.improving)
    })

    it('returns declining mood when second half avg falls below first half by > 0.5', () => {
        // first half [8,9] avg=8.5, second half [1,2] avg=1.5, diff=-7
        const result = getTrendData(points([8, 9, 1, 2]), 'mood')
        expect(result.icon).toBe(TrendingDown)
        expect(result.color).toBe('text-red-600')
        expect(result.labelKey).toBe(trends.declining)
    })

    it('returns steady mood when diff is within threshold', () => {
        const result = getTrendData(points([5, 5, 5, 5]), 'mood')
        expect(result.icon).toBe(Minus)
        expect(result.labelKey).toBe(trends.steady)
    })

    it('returns improving pain when second half avg drops below first half by > 0.5 (lower pain = better)', () => {
        // first half [8,8] avg=8, second half [2,2] avg=2, diff=-6
        const result = getTrendData(points([8, 8, 2, 2]), 'pain')
        expect(result.icon).toBe(TrendingDown)
        expect(result.color).toBe('text-green-600')
        expect(result.labelKey).toBe(trends.improving)
    })

    it('returns increasing pain when second half avg exceeds first half by > 0.5', () => {
        // first half [2,2] avg=2, second half [8,8] avg=8, diff=6
        const result = getTrendData(points([2, 2, 8, 8]), 'pain')
        expect(result.icon).toBe(TrendingUp)
        expect(result.color).toBe('text-red-600')
        expect(result.labelKey).toBe(trends.increasing)
    })

    it('returns stable pain when diff is within threshold', () => {
        const result = getTrendData(points([5, 5, 5, 5]), 'pain')
        expect(result.icon).toBe(Minus)
        expect(result.labelKey).toBe(trends.stable)
    })

    it('defaults to mood metric type', () => {
        const result = getTrendData(points([1, 2, 8, 9]))
        expect(result.labelKey).toBe(trends.improving)
    })
})

describe('getWellnessStatusKey', () => {
    const improvingMood = getTrendData(points([1, 2, 8, 9]), 'mood')
    const decliningMood = getTrendData(points([8, 9, 1, 2]), 'mood')
    const steadyMood = getTrendData(points([5, 5, 5, 5]), 'mood')
    const improvingPain = getTrendData(points([8, 8, 2, 2]), 'pain')
    const increasingPain = getTrendData(points([2, 2, 8, 8]), 'pain')
    const stablePain = getTrendData(points([5, 5, 5, 5]), 'pain')

    it('returns thriving when both mood and pain are improving', () => {
        expect(getWellnessStatusKey(improvingMood, improvingPain)).toBe(status.thriving)
    })

    it('returns needsAttention when mood is declining and pain is increasing', () => {
        expect(getWellnessStatusKey(decliningMood, increasingPain)).toBe(status.needsAttention)
    })

    it('returns moodImproving when mood improving but pain not improving', () => {
        expect(getWellnessStatusKey(improvingMood, stablePain)).toBe(status.moodImproving)
    })

    it('returns painRelieving when pain improving but mood not improving', () => {
        expect(getWellnessStatusKey(steadyMood, improvingPain)).toBe(status.painRelieving)
    })

    it('returns stableAndMaintaining when mood steady and pain stable', () => {
        expect(getWellnessStatusKey(steadyMood, stablePain)).toBe(status.stableAndMaintaining)
    })

    it('returns null when no specific status matches', () => {
        expect(getWellnessStatusKey(decliningMood, stablePain)).toBeNull()
    })
})
