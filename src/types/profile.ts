export type ProfileVisibility = 'onlyMe' | 'mentors' | 'community'

export type UserProfile = {
    id: string
    userId: string
    image?: string
    bio?: string
    location?: string
    timezone?: string
    dateFormat?: string
    theme: string
    language: string
    dailyReminder: boolean
    communityAlerts: boolean
    profileVisibility: string
    anonymousParticipation: boolean
    healthInterests?: string[]
    activityPreferences?: string[]
    createdAt: string
    updatedAt: string
}

export type Profile = {
    id: string
    userId: string
    image?: string
    bio?: string
    location?: string
    timezone?: string
    dateFormat?: string
    theme: string
    language: string
    dailyReminder: boolean
    communityAlerts: boolean
    profileVisibility: ProfileVisibility
    anonymousParticipation: boolean
    healthInterests: string[]
    activityPreferences: string[]
    likedPostIds: string[]
    likedReplyIds: string[]
    savedPostIds: string[]
    createdAt: string
    updatedAt: string
}

export type ProfileOptions = {
    activityPreferences: string[]
}

export type ProfileUpdateInput = {
    bio?: string
    location?: string
    timezone?: string
    image?: string
    theme?: string
    language?: string
    dateOfBirth?: string
    recoveryType?: string
    careProvider?: string
    dailyReminder?: boolean
    communityAlerts?: boolean
    profileVisibility?: ProfileVisibility
    anonymousParticipation?: boolean
    healthInterests?: string[]
    activityPreferences?: string[]
}
