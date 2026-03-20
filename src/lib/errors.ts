import {AxiosError} from 'axios'

type ErrorResponse = {
    message?: string
    error?: string
}

const HTTP_ERROR_MESSAGES: Record<
    number,
    string
> = {
    400: 'Invalid request. Please check your input.',
    401: 'You are not authenticated. Please log in.',
    403: 'You do not have permission to perform this action.',
    404: 'The requested resource was not found.',
    409: 'This resource already exists.',
    422: 'Invalid input. Please check your data.',
    429: 'Too many requests. Please try again later.',
    500: 'Server error. Please try again later.',
    502: 'Bad gateway. Please try again later.',
    503: 'Service temporarily unavailable. Please try again later.',
    504: 'Request timeout. Please try again later.'
}

export const getErrorMessage = (
    error: unknown
): string => {
    // Handle axios errors
    if (error instanceof AxiosError) {
        const status = error.response?.status
        const data = error.response?.data as ErrorResponse

        // First, try to get specific error message
        if (data?.error && typeof data.error === 'string') {
            return data.error
        }

        if (data?.message && typeof data.message === 'string') {
            return data.message
        }

        // Fall back to HTTP status code mapping
        if (status && status in HTTP_ERROR_MESSAGES) {
            return HTTP_ERROR_MESSAGES[status]
        }

        // Generic fallback for unmapped status codes
        if (status) {
            return 'An error occurred. Please try again.'
        }

        // Network error (no response)
        return 'Network error. Please check your connection.'
    }

    // Handle standard Error objects
    if (error instanceof Error) {
        return error.message
    }

    // Handle string errors
    if (typeof error === 'string') {
        return error
    }

    // Generic fallback
    return 'An unexpected error occurred. Please try again.'
}
