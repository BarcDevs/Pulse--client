import {
    eachDayOfInterval,
    isBefore,
    subDays
} from 'date-fns'

import { MoodPainSeriesPoint } from '@/types/checkIn'

import { formatByUserPreference } from '@/lib/time'

import { defaults } from '@/constants/defaults'

const fmt = (date: Date) =>
    formatByUserPreference(
        date, 
        true, 
        defaults.checkIn.dateFormat
    )

type FillWeekResult = {
    days: MoodPainSeriesPoint[]
    previousPoint: MoodPainSeriesPoint | null
}

export const fillHistoryWeekNulls = (
    data: MoodPainSeriesPoint[]
): FillWeekResult => {
    const today = new Date()
    const todayKey = fmt(today)
    const hasTodayData = data.some(p => p.date === todayKey)
    const end = hasTodayData ? today : subDays(today, 1)
    const start = subDays(end, 6)
    const days = eachDayOfInterval({ start, end })

    const dataByDate = new Map(data.map(p => [p.date, p]))

    const previousPoint = data
        .filter(p =>
            isBefore(new Date(p.originalDate), start)
            && (p.mood !== null || p.pain !== null)
        )
        .sort((a, b) => new Date(b.originalDate).getTime()
            - new Date(a.originalDate).getTime())[0] ?? null

    return {
        days: days.map((day) => {
            const key = fmt(day)
            return dataByDate.get(key) ?? {
                date: key,
                originalDate: day.toISOString(),
                mood: null,
                pain: null
            }
        }),
        previousPoint
    }
}