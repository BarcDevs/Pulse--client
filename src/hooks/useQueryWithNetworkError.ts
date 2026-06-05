'use client'

import { useEffect } from 'react'

import type { UseQueryOptions } from '@tanstack/react-query'

import {
    useQueryWithError,
    type UseQueryWithErrorResult
} from '@/hooks/useQueryWithError'

import { isNetworkError } from '@/utils/error'

import { minuteInMs } from '@/constants/time'

import { useAuth } from '@/context/AuthContext'

const RETRY_TIMEOUT_MS = minuteInMs

export const useQueryWithNetworkError = <TData,>(
    options: UseQueryOptions<TData>
): UseQueryWithErrorResult<TData> => {
    const query = useQueryWithError(options)
    const { setNetworkError } = useAuth()

    useEffect(() => {
        if (query.error && isNetworkError(query.error)) {
            setNetworkError(query.error)

            const timer = setTimeout(
                query.refetch,
                RETRY_TIMEOUT_MS
            )

            return () => clearTimeout(timer)
        } else {
            setNetworkError(null)
        }
    }, [
        query.error,
        query.refetch,
        setNetworkError
    ])

    return query
}
