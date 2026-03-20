import axios from 'axios'

import {queryClient} from '@/lib/queryClient'

import config from '@/config'

import {
    getCsrfTokenFromStore,
    refreshAuthData
} from '@/handlers/auth'

import {store} from '@/store'
import {logoutAction} from '@/store/authSlice'
import {removeTokenAction} from '@/store/tokenSlice'

let isRefreshing = false
let refreshPromise: Promise<boolean> | null = null

const getRefreshPromise = async () => {
    if (isRefreshing && refreshPromise) {
        return refreshPromise
    }

    isRefreshing = true
    refreshPromise = refreshAuthData().finally(() => {
        isRefreshing = false
        refreshPromise = null
    })

    return refreshPromise
}

export const api = axios.create({
    baseURL: `${config.serverUrl}/api/${config.serverApiVersion}`,
    withCredentials: true
})

api.interceptors.request.use(config => {
    const csrfToken = getCsrfTokenFromStore()

    if (
        csrfToken &&
        ['post', 'put', 'patch', 'delete']
            .includes((config.method || '').toLowerCase())
    ) {
        config.headers['x-csrf-token'] = csrfToken
    }

    return config
})

api.interceptors.response.use(undefined, async error => {
    const originalRequest = error.config
    const status = error.response?.status
    const isAuthEndpoint = originalRequest.url?.includes('/auth/')

    const isCsrfError =
        status === 403 &&
        error.response?.data?.message?.toLowerCase().includes('csrf')
    const isAuthError = status === 401

    if (
        (isCsrfError || isAuthError) &&
        !originalRequest._retry &&
        !isAuthEndpoint
    ) {
        originalRequest._retry = true
        const refreshed = await getRefreshPromise()

        if (refreshed)
            return api(originalRequest)
    }

    if (isAuthError && isAuthEndpoint) {
        store.dispatch(removeTokenAction())
        store.dispatch(logoutAction())
        await queryClient.invalidateQueries()
    }

    return Promise.reject(error)
})

