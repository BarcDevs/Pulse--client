'use client'

import { useEffect } from 'react'

import type { UseQueryOptions } from '@tanstack/react-query'

import {
    useQueryWithError,
    type UseQueryWithErrorResult
} from '@/hooks/useQueryWithError'

import { isNetworkError } from '@/utils/error'

import { useAuth } from '@/context/AuthContext'

const RETRY_TIMEOUT_MS = 60000

export const useQueryWithNetworkError = <TData,>(
    options: UseQueryOptions<TData>
): UseQueryWithErrorResult<TData> => {
    const query = useQueryWithError(options)
    const { setNetworkError } = useAuth()

    useEffect(() => {
        if (query.error && isNetworkError(query.error)) {
            setNetworkError(query.error)

            const timer = setTimeout(() => {
                query.refetch()
            }, RETRY_TIMEOUT_MS)

            return () => clearTimeout(timer)
        } else if (!query.error) {
            setNetworkError(null)
        }
    }, [query.error, setNetworkError, query])

    return query
}
