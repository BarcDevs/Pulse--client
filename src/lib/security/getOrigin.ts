/** Origin of a URL, or null when it is empty or not a valid URL. Used on the
 * Sentry DSN, whose host (region and org id) is what connect-src must allow */
export const getOrigin = (url: string): string | null => {
    try {
        return new URL(url).origin
    } catch {
        return null
    }
}
