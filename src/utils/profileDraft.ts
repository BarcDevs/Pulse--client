import config from '@/config'

type ProfileDraftData = {
    username: string
    firstName: string
    lastName: string
    location: string
    bio: string
    healthInterests: string[]
    activityPreferences: string[]
    dateOfBirth: string
    recoveryType: string
    careProvider: string
}

type DraftEntry = {
    data: ProfileDraftData
    expiresAt: number
}

const getProfileDraftKey = (userId: string) => `profile:draft:basicInfo:${userId}`

export const saveProfileDraft = (userId: string, data: ProfileDraftData): void => {
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
