/**
 * Validates that a redirect URL is safe (relative path, not external)
 */
export const isValidRedirectUrl = (
    url: string
): boolean => {
    if (!url) return false

    // Only allow relative URLs starting with /
    // Reject // (protocol-relative URLs) to prevent open redirects
    return url.startsWith('/') && !url.startsWith('//')
}

/**
 * Gets a safe redirect URL or falls back to default
 */
export const getSafeRedirectUrl = (
    url: string | null | undefined,
    defaultUrl: string = '/'
): string => {
    const decoded = url ? decodeURIComponent(url) : ''

    if (isValidRedirectUrl(decoded)) {
        return decoded
    }

    return defaultUrl
}