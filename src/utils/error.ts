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
