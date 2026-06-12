import type { Locale } from 'date-fns'
import { format } from 'date-fns'

import { MoodPainSeriesPoint } from '@/types/checkIn'

import { parseDateOnly } from '@/lib/time'

const avg = (values: number[]): number | null =>
    values.length > 0
        ? Math.round((values.reduce((s, v) => s + v, 0)
        / values.length) * 10) / 10
        : null

const rangeLabel = (
    first: string,
    last: string,
    locale?: Locale
): string => {
    const start = parseDateOnly(first)
    const end = parseDateOnly(last)
    const options = locale ? { locale } : undefined
    const startMonth = format(start, 'MMM', options)
    const endMonth = format(end, 'MMM', options)
    return startMonth === endMonth
        // eslint-disable-next-line custom-rules/enforce-function-call-breaking
        ? `${format(start, 'd', options)} - ${format(end, 'd MMM', options)}`
        // eslint-disable-next-line custom-rules/enforce-function-call-breaking
        : `${format(start, 'd MMM', options)} - ${format(end, 'd MMM', options)}`
}

export const buildWeeklyAverages = (
    data: MoodPainSeriesPoint[],
    locale?: Locale
): MoodPainSeriesPoint[] => {
    const chunks: MoodPainSeriesPoint[][] = []
    for (let i = 0; i < data.length; i += 7)
        chunks.push(data.slice(i, i + 7))

    return chunks.map((chunk) => {
        const moods = chunk.filter(p => p.mood !== null)
            .map(p => p.mood as number)
        const pains = chunk.filter(p => p.pain !== null)
            .map(p => p.pain as number)
        const first = chunk[0]
        const last = chunk[chunk.length - 1]

        return {
            date: rangeLabel(
                first.originalDate,
                last.originalDate,
                locale
            ),
            originalDate: first.originalDate,
            mood: avg(moods),
            pain: avg(pains)
        }
    })
}
