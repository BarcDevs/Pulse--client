import {
    describe,
    expect,
    it
} from 'vitest'

import { reverseChartData } from '@/utils/chart'

// ==================== reverseChartData ====================
describe(
    'reverseChartData',
    () => {
        it(
            'should reverse an array of objects',
            () => {
                const data = [{ value: 1 }, { value: 2 }, { value: 3 }]

                expect(reverseChartData(data)).toEqual([{ value: 3 }, { value: 2 }, { value: 1 }])
            })

        it(
            'should NOT mutate the original array',
            () => {
                const data = [{ value: 1 }, { value: 2 }, { value: 3 }]
                reverseChartData(data)

                expect(data).toEqual([{ value: 1 }, { value: 2 }, { value: 3 }])
            })

        it(
            'should return an empty array for an empty input',
            () => {
                expect(reverseChartData([])).toEqual([])
            })

        it(
            'should return the same single element for a one-element array',
            () => {
                const data = [{ value: 42 }]

                expect(reverseChartData(data)).toEqual([{ value: 42 }])
            })
    })
