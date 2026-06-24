import {
    AxiosError,
    AxiosInstance,
    InternalAxiosRequestConfig
} from 'axios'

import {
    clearCsrfToken
} from '@/lib/csrf'

export type QueuedRequest = {
    resolve: (value: any) => void
    reject: (error: any) => void
    config: InternalAxiosRequestConfig
}

export const authState = {
    isRefreshing: false,
    isShuttingDown: false,
    isCommunityPage: false,
    requestQueue: [] as QueuedRequest[],
    onRefreshSuccess: null as (() => void) | null,
    onNetworkRecovery: null as (() => void) | null
}

export const callRefresh = async ():
    Promise<boolean> => {
    try {
        const { refresh } = await import('@/api/auth')
        await refresh()
        authState.onRefreshSuccess?.()
        return true
    } catch {
        return false
    }
}

export const performRefresh = async (
    skipLogout = false
): Promise<boolean> => {
    const success = await callRefresh()
    if (!success && !skipLogout) await initiateLogout()
    return success
}

export const rejectAll = (error: AxiosError) => {
    authState.requestQueue.forEach((req) => {
        req.reject(error)
    })
    authState.requestQueue = []
}

export const flushQueue = (
    api: AxiosInstance,
    success: boolean,
    error?: AxiosError
) => {
    authState.requestQueue.forEach((req) => {
        if (authState.isShuttingDown) {
            req.reject(
                error
                || new AxiosError('App shutting down')
            )
        } else if (success) {
            req.resolve(api(req.config))
        } else {
            req.reject(
                error
                || new AxiosError('Refresh failed')
            )
        }
    })
    authState.requestQueue = []
}

export const initiateLogout = async (
    redirectPath?: string
) => {
    authState.isRefreshing = false
    clearCsrfToken()

    try {
        const { logout } = await import('@/api/auth')
        await logout()
    } catch {/** Ignore errors during logout */}

    authState.isShuttingDown = true
    rejectAll(new AxiosError('Session expired'))

    if (typeof window !== 'undefined') {
        const path = redirectPath
            ?? window.location.pathname + window.location.search
        window.location.href =
            `/login?redirect=${encodeURIComponent(path)}`
    }
}

export const redirectToGoogleAuth = async (
    redirect?: string | null
) => {
    const url = new URL(
        '/api/v1/auth/google',
        window.location.origin
    )
    if (redirect) url.searchParams.set('redirect', redirect)
    window.location.href = url.toString()
}