import {
    eachDayOfInterval,
    subDays
} from 'date-fns'
import type { Locale } from 'date-fns'

import { MoodPainSeriesPoint } from '@/types/checkIn'

import { formatByUserPreference } from '@/lib/time'

import { defaults } from '@/constants/defaults'

const fmt = (date: Date, locale?: Locale) =>
    formatByUserPreference(
        date,
        true,
        defaults.checkIn.dateFormat,
        locale
    )

export const fillHistoryMonthNulls = (
    data: MoodPainSeriesPoint[],
    locale?: Locale
): MoodPainSeriesPoint[] => {
    const today = new Date()
    const todayKey = fmt(today, locale)
    const hasTodayData = data.some(p => p.date === todayKey)
    const end = hasTodayData ? today : subDays(today, 1)
    const start = subDays(end, 27)
    const days = eachDayOfInterval({ start, end })

    const dataByDate = new Map(data.map(p => [p.date, p]))

    return days.map((day) => {
        const key = fmt(day, locale)
        return dataByDate.get(key) ?? {
            date: key,
            originalDate: day.toISOString(),
            mood: null,
            pain: null
        }
    })
}