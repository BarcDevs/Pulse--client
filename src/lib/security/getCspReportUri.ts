/** Sentry's security-report endpoint for a DSN, where browsers send CSP
 * violation reports: https://<host>/api/<projectId>/security/?sentry_key=<key>.
 * Null when the DSN is empty or malformed. The key is the public DSN key, the
 * same one every page already exposes, so the endpoint is write-only */
export const getCspReportUri = (dsn: string): string | null => {
    try {
        const { origin, username, pathname } = new URL(dsn)
        const projectId = pathname.replace(/^\/+|\/+$/g, '')

        if (!username || !/^\d+$/.test(projectId)) return null

        return `${origin}/api/${projectId}/security/?sentry_key=${username}`
    } catch {
        return null
    }
}
