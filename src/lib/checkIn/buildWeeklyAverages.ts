import { format } from 'date-fns'

import { MoodPainSeriesPoint } from '@/types/checkIn'

const avg = (values: number[]): number | null =>
    values.length > 0
        ? Math.round((values.reduce((s, v) => s + v, 0)
        / values.length) * 10) / 10
        : null

const rangeLabel = (
    first: string,
    last: string
): string => {
    const start = new Date(first)
    const end = new Date(last)
    const startMonth = format(start, 'MMM')
    const endMonth = format(end, 'MMM')
    return startMonth === endMonth
        ? `${format(start, 'd')} - ${format(end, 'd MMM')}`
        : `${format(start, 'd MMM')} - ${format(end, 'd MMM')}`
}

export const buildWeeklyAverages = (
    data: MoodPainSeriesPoint[]
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
            date: rangeLabel(first.originalDate, last.originalDate),
            originalDate: first.originalDate,
            mood: avg(moods),
            pain: avg(pains)
        }
    })
}
