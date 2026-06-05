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

export const isNetworkError = (
    error: Error | null
): boolean => {
    if (!error) return false
    const errorMsg = error.message.toLowerCase()
    return (
        errorMsg.includes('network')
        || errorMsg.includes('fetch')
        || errorMsg.includes('connection')
        || errorMsg.includes('econnrefused')
    )
}
