export type HealthInterest = {
    id: string
    slug: string
    name: string
    description: string
    category: string
    sortOrder: number
    isActive: boolean
}

export type ActivityPreference = {
    id: string
    slug: string
    name: string
    description: string
    category: string
    sortOrder: number
    isActive: boolean
}

export type Profile = {
    id: string
    userId: string
    image?: string
    bio?: string
    location?: string
    timezone?: string
    healthInterests: HealthInterest[]
    activityPreferences: ActivityPreference[]
    createdAt: string
    updatedAt: string
}

export type ProfileOptions = {
    healthInterests: HealthInterest[]
    activityPreferences: ActivityPreference[]
}

export type ProfileUpdateInput = {
    bio?: string | null
    location?: string | null
    timezone?: string | null
}