'use client'

import { useEffect } from 'react'

import type {
    InfiniteData,
    QueryKey
} from '@tanstack/react-query'
import { useInfiniteQuery } from '@tanstack/react-query'

import type { FilterType, Post } from '@/types/community'
import type { ListPageParam } from '@/types/responses'

import { useResetOnLostCursor } from '@/hooks/queries/useResetOnLostCursor'

import {
    getFirstListPageParam,
    getNextListPageParam,
    usesCursorPaging
} from '@/lib/community/listPaging'

import { isNetworkError } from '@/utils/error'

import { forumQueryKeys } from '@/constants/queryKeys'
import { minuteInMs } from '@/constants/time'

import { useAuth } from '@/context/AuthContext'

import { fetchPosts } from '@/api/forum'

type ForumQuery = {
    category?: string
    search?: string
    limit?: number
    filter?: FilterType
    tag?: string
}

export const useForumPosts = (
    query?: ForumQuery,
    options?: {
        enabled?: boolean
    }
) => {
    const { setNetworkError } = useAuth()
    const useCursor = usesCursorPaging(query?.filter)
    const limit = query?.limit ?? 20
    const queryKey = query
        ? [
            ...forumQueryKeys.posts,
            query.filter ?? 'newest',
            limit,
            query.tag,
            query.category,
            query.search
        ] : forumQueryKeys.posts

    const result = useInfiniteQuery<
        Post[],
        Error,
        InfiniteData<Post[]>,
        QueryKey,
        ListPageParam
    >({
        queryKey,
        queryFn: ({ pageParam }) =>
            fetchPosts({ ...query, ...pageParam })
                .then((res) => res.items),
        initialPageParam: getFirstListPageParam(useCursor),
        getNextPageParam: (lastPage, allPages) =>
            getNextListPageParam(
                lastPage,
                allPages,
                limit,
                useCursor
            ),
        staleTime: 5 * minuteInMs,
        enabled: options?.enabled !== false,
        retry: false
    })

    const { error, refetch } = result

    useResetOnLostCursor(error, queryKey)

    useEffect(() => {
        if (!error) {
            setNetworkError(null)
            return
        }
        if (isNetworkError(error)) {
            setNetworkError(error as Error)
            const timer = setTimeout(() =>
                void refetch(), minuteInMs)
            return () => clearTimeout(timer)
        }
    }, [
        error,
        refetch,
        setNetworkError
    ])

    return result
}
