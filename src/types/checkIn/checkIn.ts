export type CheckInInsightType = 'tip' | 'warning' | 'positive'

export type CheckInInsight = {
    id: string
    type: CheckInInsightType
    text: string
    content?: string
}

export type MoodPainSeriesPoint = {
    date: string
    mood: number
    pain: number
    energy?: number
}

export type CheckIn = {
    id: string
    userId: string
    checkInDate: string
    moodScore: number
    painLevel: number
    energy?: number
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
}

export type PaginatedResponse<T> = {
    data: T[]
    total: number
    page: number
    pageSize: number
    hasMore: boolean
}