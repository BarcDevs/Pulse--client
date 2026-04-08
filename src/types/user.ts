export type Role = 'USER' | 'ADMIN'

export type UserProfile = {
    id: string
    userId: string
    image?: string | null
    bio?: string | null
    location?: string | null
    timezone?: string | null
    dateFormat?: string | null
    theme: string
    language: string
    dailyReminder: boolean
    communityAlerts: boolean
    profileVisibility: string
    anonymousParticipation: boolean
    createdAt: Date
    updatedAt: Date
}

export type User = {
    id: string
    firstName: string
    lastName: string
    username: string
    email: string
    role: Role
    passwordUpdatedAt?: string
    createdAt: string
    deletedAt?: string | null
    profile?: UserProfile
}

export type PartialUser = {
    id: string
    firstName: string
    lastName: string
    username: string
    profile?: UserProfile
}
