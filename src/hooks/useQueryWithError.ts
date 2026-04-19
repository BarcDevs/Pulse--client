'use client'

import {
    useQuery,
    type UseQueryOptions,
    type UseQueryResult
} from '@tanstack/react-query'

export type UseQueryWithErrorResult<TData> = Omit<
    UseQueryResult<TData>,
    'error'
> & {
    isError: boolean
    error: Error | null
}

export const useQueryWithError = <TData,>(
    options: UseQueryOptions<TData>
): UseQueryWithErrorResult<TData> => {
    const query = useQuery(options)

    return {
        ...query,
        isError: query.isError,
        error: (query.error as Error) || null
    }
}
