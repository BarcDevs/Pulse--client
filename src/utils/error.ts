export const extractErrorMsg = (error: unknown): string => {
    if (typeof error === 'string') {
        return error
    }

    if (error instanceof Error) {
        return error.message
    }

    if (typeof error === 'object' && error !== null) {
        const e = error as Record<string, unknown>
        if ('message' in e && typeof e.message === 'string') {
            return e.message
        }
        if ('error' in e && typeof e.error === 'string') {
            return e.error
        }
    }

    return 'An unexpected error occurred'
}
