import { AxiosError } from 'axios'

import type { ApiErrorDetail } from '@/types/responses'

type ErrorResponse = {
    message?: string
    error?: ApiErrorDetail[]
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
        const detail = data?.error?.[0]
        if (detail?.error) {
            return detail.error
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

/**
 * Returns the raw error detail (statusType, property) from an Axios error
 * response, for callers that need more than the display message — e.g.
 * highlighting the offending form field via `property`.
 */
export const getErrorDetail = (
    error: unknown
): ApiErrorDetail | undefined => {
    if (!(error instanceof AxiosError)) return undefined

    const data = error.response?.data as ErrorResponse
    return data?.error?.[0]
}
