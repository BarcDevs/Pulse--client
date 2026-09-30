const RESET_EMAIL_KEY = 'auth:reset:email'

// Kept out of the URL, which Sentry and analytics record. sessionStorage
// survives a reload of the reset page; the in-memory copy covers browsers
// that block storage
let memoryEmail: string | null = null

export const saveResetEmail = (email: string): void => {
    memoryEmail = email

    try {
        sessionStorage.setItem(RESET_EMAIL_KEY, email)
    } catch {
        // sessionStorage unavailable - the in-memory copy is used instead
    }
}

export const getResetEmail = (): string | null => {
    try {
        return sessionStorage.getItem(RESET_EMAIL_KEY) ?? memoryEmail
    } catch {
        return memoryEmail
    }
}

export const clearResetEmail = (): void => {
    memoryEmail = null

    try {
        sessionStorage.removeItem(RESET_EMAIL_KEY)
    } catch {
        // sessionStorage unavailable - nothing to clear
    }
}
