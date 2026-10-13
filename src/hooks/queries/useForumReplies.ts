'use client'

import { useEffect } from 'react'

import type {
    InfiniteData,
    QueryKey
} from '@tanstack/react-query'
import { useInfiniteQuery } from '@tanstack/react-query'

import type { Reply } from '@/types/community'
import type { ListPageParam } from '@/types/responses'

import { useResetOnLostCursor } from '@/hooks/queries/useResetOnLostCursor'

import {
    getFirstListPageParam,
    getNextListPageParam
} from '@/lib/community/listPaging'

import { isNetworkError } from '@/utils/error'

import { forumQueryKeys } from '@/constants/queryKeys'
import { minuteInMs } from '@/constants/time'

import { appSettings } from '@/config/appSettings'

import { useAuth } from '@/context/AuthContext'

import { fetchReplies } from '@/api/forum'

export const useForumReplies = (postId?: string | null) => {
    const { repliesPageSize } = appSettings.community
    const { setNetworkError } = useAuth()

    const queryKey = postId
        ? forumQueryKeys.replies(postId)
        : [
            'forum',
            'replies',
            'disabled'
        ]

    const query = useInfiniteQuery<
        Reply[],
        Error,
        InfiniteData<Reply[]>,
        QueryKey,
        ListPageParam
    >({
        queryKey,
        queryFn: ({ pageParam }) => {
            if (!postId)
                throw new Error('Post ID is required')

            return fetchReplies(postId, {
                limit: repliesPageSize,
                ...pageParam
            }).then((res) => res.items)
        },
        initialPageParam: getFirstListPageParam(true),
        getNextPageParam: (lastPage, allPages) =>
            getNextListPageParam(
                lastPage,
                allPages,
                repliesPageSize,
                true
            ),
        enabled: !!postId,
        staleTime: minuteInMs * 5,
        retry: false
    })

    const { error, refetch } = query

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

    return query
}
