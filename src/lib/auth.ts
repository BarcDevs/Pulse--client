import {
    AxiosError,
    AxiosInstance,
    InternalAxiosRequestConfig
} from 'axios'

import {
    clearCsrfToken
} from '@/lib/csrf'

import config from '@/config'

export type QueuedRequest = {
    resolve: (value: any) => void
    reject: (error: any) => void
    config: InternalAxiosRequestConfig
}

export const authState = {
    isRefreshing: false,
    isShuttingDown: false,
    requestQueue: [] as QueuedRequest[]
}

export const performRefresh = async ():
    Promise<boolean> => {
    try {
        const { refresh } = await import(
            '@/api/auth'
            )

        await refresh()
        return true
    } catch (error: any) {
        if (error.response?.status === 401)
            await initiateLogout()
        return false
    }
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

export const initiateLogout = async () => {
    authState.isShuttingDown = true
    authState.isRefreshing = false
    rejectAll(
        new AxiosError('Session expired')
    )
    clearCsrfToken()

    try {
        const { logout } = await import(
                '@/api/auth'
            )
        await logout()
    } catch {/* Ignore errors during logout */}

    if (typeof window !== 'undefined')
        window.location.href = '/login'
}

export const redirectToGoogleAuth = async () => {
    window.location.href =
        `${config.serverUrl}/api/v1/auth/google`
}