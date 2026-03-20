import type {CheckIn, MoodPainSeriesPoint} from '@/types/checkIn'

export const buildMoodPainSeries = (
    history: CheckIn[]
): MoodPainSeriesPoint[] =>
    history
        .slice()
        .sort((a, b) =>
            a.checkInDate.localeCompare(b.checkInDate)
        )
        .map(item => ({
            date: item.checkInDate.slice(0, 10),
            mood: item.moodScore,
            pain: item.painLevel
        }))