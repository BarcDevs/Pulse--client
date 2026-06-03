'use client'

import { useEffect } from 'react'

import type {
    InfiniteData,
    QueryKey
} from '@tanstack/react-query'
import { useInfiniteQuery } from '@tanstack/react-query'

import type { Reply } from '@/types/community'

import { isNetworkError } from '@/utils/error'

import { forumQueryKeys } from '@/constants/queryKeys'
import { minuteInMs } from '@/constants/time'

import { appSettings } from '@/config/appSettings'

import { useAuth } from '@/context/AuthContext'

import { fetchReplies } from '@/api/forum'

export const useForumReplies = (postId?: string | null) => {
    const { repliesPageSize } = appSettings.community
    const { setNetworkError } = useAuth()

    const query = useInfiniteQuery<
        Reply[],
        Error,
        InfiniteData<Reply[]>,
        QueryKey,
        number
    >({
        queryKey: postId
            ? forumQueryKeys.replies(postId)
            : [
                'forum',
                'replies',
                'disabled'
            ],
        queryFn: ({ pageParam }) => {
            if (!postId)
                throw new Error('Post ID is required')

            return fetchReplies(postId, {
                limit: repliesPageSize,
                page: pageParam
            })
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) =>
            lastPage.length === repliesPageSize
                ? allPages.length + 1
                : undefined,
        enabled: !!postId,
        staleTime: minuteInMs * 5,
        retry: false
    })

    const { error, refetch } = query

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
