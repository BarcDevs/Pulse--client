'use client'

import axios from 'axios'

import {
    handleRequestError,
    handleRequestSuccess,
    handleResponseError,
    handleResponseSuccess
} from '@/lib/apiInterceptors'

import config from '@/config'

export const api = axios.create({
    baseURL: `${config.serverUrl}/api/${config.serverApiVersion}`,
    withCredentials: true
})

api.interceptors.request.use(
    handleRequestSuccess,
    handleRequestError
)

api.interceptors.response.use(
    handleResponseSuccess,
    (error) => handleResponseError(error, api)
)
