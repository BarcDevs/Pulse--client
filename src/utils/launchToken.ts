const LAUNCH_PARAM = 'lm'
const LAUNCH_SENT_KEY = 'launch:opened'
const LAUNCH_TOKEN_PATTERN = /^[A-Za-z0-9_-]{16,128}$/

// Same shape the server accepts, so a mangled link never costs a request
export const getLaunchToken = (search: string): string | null => {
    const token = new URLSearchParams(search).get(LAUNCH_PARAM)

    return token && LAUNCH_TOKEN_PATTERN.test(token) ? token : null
}

// sessionStorage keeps the open to one call per visit across reloads; the
// in-memory copy covers browsers that block storage
let memorySentToken: string | null = null

export const markLaunchOpenSent = (token: string): boolean => {
    try {
        if (sessionStorage.getItem(LAUNCH_SENT_KEY) === token) return false
        sessionStorage.setItem(LAUNCH_SENT_KEY, token)
        return true
    } catch {
        if (memorySentToken === token) return false
        memorySentToken = token
        return true
    }
}
