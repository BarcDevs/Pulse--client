'use client'

import { useEffect } from 'react'

import type {
    InfiniteData,
    QueryKey
} from '@tanstack/react-query'
import { useInfiniteQuery } from '@tanstack/react-query'

import type { FilterType, Post } from '@/types/community'

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

    const result = useInfiniteQuery<
        Post[],
        Error,
        InfiniteData<Post[]>,
        QueryKey,
        number
    >({
        queryKey: query
            ? [
                ...forumQueryKeys.posts,
                query.filter ?? 'newest',
                query.limit ?? 20,
                query.tag,
                query.category,
                query.search
            ] : forumQueryKeys.posts,
        queryFn: ({ pageParam }) =>
            fetchPosts({ ...query, page: pageParam })
                .then((res) => res.items),
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) =>
            lastPage.length === (query?.limit ?? 20)
                ? allPages.length + 1
                : undefined,
        staleTime: 5 * minuteInMs,
        enabled: options?.enabled !== false,
        retry: false
    })

    const { error, refetch } = result

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
