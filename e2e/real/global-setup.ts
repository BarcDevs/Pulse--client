const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:4001'

export default async function globalSetup() {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 3_000)

    try {
        const response = await fetch(`${serverUrl}/api/status`, { signal: controller.signal })
        if (!response.ok) {
            throw new Error(`responded with status ${response.status}`)
        }
    } catch (error) {
        throw new Error(
            `pulse--server is not reachable at ${serverUrl} (${(error as Error).message}). `
            + 'See e2e/real/README.md for how to start it before running this suite.'
        )
    } finally {
        clearTimeout(timeout)
    }
}
