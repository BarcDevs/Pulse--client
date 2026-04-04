import { format } from 'date-fns'

import type { CheckIn, MoodPainSeriesPoint } from '@/types/checkIn/checkIn'

export const buildMoodPainSeries = (
    history: CheckIn[]
): MoodPainSeriesPoint[] =>
    history
        .slice()
        .sort((a, b) =>
            a.checkInDate.localeCompare(b.checkInDate)
        )
        .map(item => {
            const dateObj = new Date(item.checkInDate)
            return {
                date: format(dateObj, 'd MMM'),
                originalDate: item.checkInDate,
                mood: item.moodScore,
                pain: item.painLevel
            }
        })