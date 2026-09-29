// Placeholder origin for resolving relative URLs the way a browser would
const SAME_ORIGIN_PROBE = 'http://same-origin.invalid'

/** Validates that a redirect URL is safe (relative path, not external) */
export const isValidRedirectUrl = (
    url: string
): boolean => {
    if (!url || !url.startsWith('/')) return false

    /** Browsers treat `\` as `/` and drop tabs/newlines, so `/\evil.com` or
    * `/\t/evil.com` resolve off-site. Resolve it and require our origin. */
    try {
        return new URL(url, SAME_ORIGIN_PROBE).origin === SAME_ORIGIN_PROBE
    } catch {
        return false
    }
}

/** Gets a safe redirect URL or falls back to default */
export const getSafeRedirectUrl = (
    url?: string | null,
    defaultUrl: string = '/'
): string => {
    let decoded = ''
    try {
        decoded = url ? decodeURIComponent(url) : ''
    } catch {
        return defaultUrl
    }

    if (isValidRedirectUrl(decoded)) {
        return decoded
    }

    return defaultUrl
}
