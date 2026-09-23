export const getApiErrorMessage = (
    error: unknown,
    fallback: string
): string =>
    (error as any)?.response?.data?.message
    ?? (error instanceof Error ? error.message : fallback)

export const isUnauthorizedError = (
    error: Error | null
): boolean => {
    if (!error) return false
    return (error as any).response?.status === 401
}

const unreachableStatuses = [502, 503, 504]

const isProxyFailure = (error: Error): boolean => {
    const response = (error as any).response
    if (!response) return false
    if (unreachableStatuses.includes(response.status)) return true
    // Next.js proxy answers 500 with an empty body when the backend is down
    return response.status === 500 && !response.data?.message
}

export const isNetworkError = (
    error: Error | null
): boolean => {
    if (!error) return false
    if ((error as any).code === 'ERR_NETWORK') return true
    if (isProxyFailure(error)) return true
    const errorMsg = error.message.toLowerCase()
    return (
        errorMsg.includes('network')
        || errorMsg.includes('fetch')
        || errorMsg.includes('connection')
        || errorMsg.includes('econnrefused')
    )
}
