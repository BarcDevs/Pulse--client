export type CheckInInsightType = 'MOOD_DROP_ALERT' | 'MOTIVATIONAL' | 'WEEKLY_SUMMARY'

export type CheckInInsight = {
    id: string
    checkInId: string
    type: CheckInInsightType
    content: string
    title: string
    userId: string
    classification: string
    priority: 'high' | 'normal'
    metadata?: Record<string, unknown>
    createdAt: string
}

export type MoodPainSeriesPoint = {
    date: string
    originalDate: string
    mood: number | null
    pain: number | null
}

export type CheckIn = {
    id: string
    userId: string
    checkInDate: string
    moodScore: number
    painLevel: number
    activities: string[]
    notes?: string
    insights?: CheckInInsight[]
    createdAt: string
    updatedAt: string
}

export type CheckInInput = {
    mood: number
    pain: number
    energy?: number
    activities: string[]
    notes?: string
}

export type TrendPoint = {
    date: string
    actual: number | null
    target?: number
}

export type CheckInStats = {
    total: number
    totalCheckIns: number
    avgMood: number
    averageMoodScore: number
    avgPain: number
    averagePainLevel: number
    topActivities: string[]
    currentStreak: number
    longestStreak: number
    moodTrend: TrendPoint[]
    painTrend: TrendPoint[]
    milestonesAchieved: number
}

export type PaginatedResponse<T> = {
    data: T[]
    total: number
    page: number
    pageSize: number
    hasMore: boolean
}
