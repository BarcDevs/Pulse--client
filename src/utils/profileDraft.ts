import config from '@/config'

type ProfileDraftData = {
    username: string
    firstName: string
    lastName: string
    location: string
    bio: string
    healthInterests: string[]
    activityPreferences: string[]
}

// Health-related fields are never written to localStorage
type ProfileDraftInput = ProfileDraftData & {
    dateOfBirth?: string
    recoveryType?: string
    careProvider?: string
}

type DraftEntry = {
    data: ProfileDraftData
    expiresAt: number
}

const getProfileDraftKey = (userId: string) => `${PROFILE_DRAFT_PREFIX}basicInfo:${userId}`

export const PROFILE_DRAFT_PREFIX = 'profile:draft:'

export const saveProfileDraft = (
    userId: string,
    input: ProfileDraftInput
): void => {
    const data: ProfileDraftData = {
        username: input.username,
        firstName: input.firstName,
        lastName: input.lastName,
        location: input.location,
        bio: input.bio,
        healthInterests: input.healthInterests,
        activityPreferences: input.activityPreferences
    }
    try {
        const entry: DraftEntry = {
            data,
            expiresAt: Date.now() + config.profileDraftTtl
        }
        localStorage.setItem(getProfileDraftKey(userId), JSON.stringify(entry))
    } catch {
        // localStorage unavailable - silently skip
    }
}

export const getProfileDraft = (userId: string): ProfileDraftData | null => {
    try {
        const key = getProfileDraftKey(userId)
        const raw = localStorage.getItem(key)
        if (!raw) return null
        const entry: DraftEntry = JSON.parse(raw)
        if (
            !entry
            || typeof entry.expiresAt !== 'number'
            || !entry.data
        ) return null
        if (Date.now() > entry.expiresAt) {
            localStorage.removeItem(key)
            return null
        }
        return entry.data
    } catch {
        return null
    }
}

export const clearProfileDraft = (userId: string): void => {
    try {
        localStorage.removeItem(getProfileDraftKey(userId))
    } catch {
        // ignore
    }
}
