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
    return response
}

const UNAUTHENTICATED_ENDPOINTS = [
    '/auth/login',
    '/auth/signup',
    '/auth/refresh',
    '/auth/logout'
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

    if (isUnauthorized && !isUnauthEndpoint) {
        if (isCsrfError(error) && !alreadyRetried) {
            originalRequest._retry = true
            const success = await callRefresh()
            if (success) return api(originalRequest)
            await initiateLogout()
            return Promise.reject(error)
        }

        if (alreadyRetried) {
            await initiateLogout()
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

                    performRefresh()
                        .then((success) => {
                            flushQueue(api, success)
                        })
                        .catch(() => {
                            flushQueue(
                                api,
                                false,
                                new AxiosError('Refresh failed')
                            )
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
