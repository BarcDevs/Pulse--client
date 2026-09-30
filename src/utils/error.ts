import type { ApiErrorDetail } from '@/types/responses'

import { apiErrorLocales } from '@/locales/globalLocales'

export const getApiErrorMessage = (
    error: unknown,
    fallback: string
): string =>
    (error as any)?.response?.data?.message
    ?? (error instanceof Error ? error.message : fallback)

const getApiErrorDetail = (
    error: unknown
): ApiErrorDetail | undefined =>
    (error as any)?.response?.data?.error?.[0]

/**
 * Localizes an API error by its stable `code`, interpolating `params` into
 * the translated template. Falls back to the raw server/fallback message
 * when there's no code, or no translation for it yet — additive, never
 * breaking on unmapped codes.
 */
export const getLocalizedApiErrorMessage = (
    t: (key: string, params?: Record<string, string>) => string,
    error: unknown,
    fallback: string
): string => {
    const detail = getApiErrorDetail(error)
    const localeKey = detail?.code
        ? apiErrorLocales[detail.code as keyof typeof apiErrorLocales]
        : undefined

    if (localeKey) return t(localeKey, detail?.params)

    return getApiErrorMessage(error, fallback)
}

export const getApiErrorStatus = (
    error: unknown
): number | undefined =>
    (error as any)?.response?.status

export const isUnauthorizedError = (
    error: Error | null
): boolean => {
    if (!error) return false
    return getApiErrorStatus(error) === 401
}

const unreachableStatuses = [502, 503, 504]

const isProxyFailure = (error: Error): boolean => {
    const status = getApiErrorStatus(error)
    if (status === undefined) return false
    if (unreachableStatuses.includes(status)) return true
    // Next.js proxy answers 500 with an empty body when the backend is down
    return status === 500 && !(error as any).response?.data?.message
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
