'use client'

import { useEffect } from 'react'

import type { QueryKey } from '@tanstack/react-query'
import { hashKey, useQueryClient } from '@tanstack/react-query'

import { isCursorNotFoundError } from '@/utils/error'

// The cursor item was deleted while scrolling: start the list over from the first page
export const useResetOnLostCursor = (
    error: Error | null,
    queryKey: QueryKey
) => {
    const queryClient = useQueryClient()
    const queryHash = hashKey(queryKey)

    useEffect(() => {
        if (!isCursorNotFoundError(error)) return

        void queryClient.resetQueries({
            predicate: (query) => query.queryHash === queryHash
        })
    }, [
        error,
        queryClient,
        queryHash
    ])
}
