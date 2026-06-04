import {
    AxiosError,
    AxiosInstance,
    AxiosResponse,
    InternalAxiosRequestConfig
} from 'axios'

import {
    authState,
    callRefresh,
    flushQueue,
    initiateLogout,
    performRefresh
} from '@/lib/auth'
import {
    getCsrfToken,
    setCsrfToken
} from '@/lib/csrf'

import { ROUTES } from '@/constants/routes'
import { ENDPOINTS } from '@/api/routes'

export const handleRequestSuccess = (
    config: InternalAxiosRequestConfig
) => {
    if (authState.isShuttingDown)
        return Promise.reject(
            new Error('App shutting down')
        )

    const csrfToken = getCsrfToken()

    if (
        csrfToken
        && [
            'POST',
            'PUT',
            'PATCH',
            'DELETE'
        ].includes((config.method || '')
            .toUpperCase())
    ) {
        config.headers['x-csrf-token'] = csrfToken
    }

    return config
}

export const handleRequestError = (error: any) =>
    Promise.reject(error)

export const handleResponseSuccess = (
    response: AxiosResponse
) => {
    const data = response.data as any
    const csrfToken =
        data?.data?._csrf
        || data?._csrf
    if (csrfToken)
        setCsrfToken(csrfToken)
    authState.onNetworkRecovery?.()
    return response
}

const UNAUTHENTICATED_ENDPOINTS = [
    ENDPOINTS.auth.login,
    ENDPOINTS.auth.signup,
    ENDPOINTS.auth.refresh,
    ENDPOINTS.auth.logout,
    ENDPOINTS.auth.me
]

const isCsrfError = (error: AxiosError): boolean => {
    const data = error.response?.data as any
    const msg: string = data?.message || data?.error || ''
    return msg.toLowerCase().includes('csrf')
}

export const handleResponseError = async (
    error: AxiosError,
    api: AxiosInstance
) => {
    if (authState.isShuttingDown)
        return Promise.reject(error)

    const originalRequest =
        error.config as
            InternalAxiosRequestConfig & {
            _retry?: boolean
        }

    const isUnauthorized = error.response?.status === 401
    const isUnauthEndpoint = UNAUTHENTICATED_ENDPOINTS.includes(
        originalRequest?.url ?? ''
    )
    const alreadyRetried = originalRequest?._retry

    const onCommunityPage = typeof window !== 'undefined'
        && window.location.pathname.startsWith(ROUTES.COMMUNITY)

    if (isUnauthorized && !isUnauthEndpoint) {
        if (isCsrfError(error) && !alreadyRetried) {
            originalRequest._retry = true
            const success = await callRefresh()
            if (success) return api(originalRequest)
            await initiateLogout()
            return Promise.reject(error)
        }

        if (alreadyRetried) {
            if (!onCommunityPage) await initiateLogout()
            return Promise.reject(error)
        }

        originalRequest._retry = true

        return new Promise<any>(
            (resolve, reject) => {
                authState.requestQueue.push({
                    resolve,
                    reject,
                    config: originalRequest
                })

                if (!authState.isRefreshing) {
                    authState.isRefreshing = true

                    performRefresh(onCommunityPage)
                        .then((success) => {
                            flushQueue(api, success, success ? undefined : error)
                        })
                        .catch(() => {
                            flushQueue(api, false, error)
                        })
                        .finally(() => {
                            authState.isRefreshing = false
                        })
                }
            }
        )
    }

    return Promise.reject(error)
}
