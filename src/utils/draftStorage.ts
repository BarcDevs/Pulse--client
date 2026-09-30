import { COMMUNITY_DRAFT_PREFIX } from '@/utils/communityDraft'
import { PROFILE_DRAFT_PREFIX } from '@/utils/profileDraft'

const DRAFT_PREFIXES = [
    COMMUNITY_DRAFT_PREFIX,
    PROFILE_DRAFT_PREFIX
]

const getDraftKeys = (): string[] =>
    Object.keys(localStorage)
        .filter((key) => DRAFT_PREFIXES.some((prefix) => key.startsWith(prefix)))

const isExpired = (raw: string | null): boolean => {
    try {
        const entry = raw ? JSON.parse(raw) : null
        return typeof entry?.expiresAt !== 'number'
            || Date.now() > entry.expiresAt
    } catch {
        return true
    }
}

/** Removes every community and profile draft. Called on explicit logout and
 * account deactivation, not on session expiry, whose drafts are kept so
 * they can be restored after logging back in. */
export const clearAllDrafts = (): void => {
    try {
        getDraftKeys().forEach((key) => localStorage.removeItem(key))
    } catch {
        // localStorage unavailable - nothing to clear
    }
}

/** Drops expired or unreadable drafts that were never opened again. */
export const sweepExpiredDrafts = (): void => {
    try {
        getDraftKeys()
            .filter((key) => isExpired(localStorage.getItem(key)))
            .forEach((key) => localStorage.removeItem(key))
    } catch {
        // localStorage unavailable - nothing to sweep
    }
}
