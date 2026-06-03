'use client'

import {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useRef,
    useState
} from 'react'

import { useTranslations } from 'next-intl'

import type { Reply } from '@/types/community'
import { ContextProps } from '@/types/react'

import { useForumPostMutations } from '@/hooks/mutations/useForumPostMutations'
import { useForumReplies } from '@/hooks/queries/useForumReplies'

import { withOptimisticToast } from '@/utils/optimisticToast'

import { useAuth } from '@/context/AuthContext'

import { communityLocales } from '@/locales/communityLocales'
import { globalLocales } from '@/locales/globalLocales'
import { PostFormSchema } from '@/validations/forms/postFormSchema'

type ForumRepliesContextType = {
    replies: Reply[]
    isLoading: boolean
    isFetching: boolean
    isError: boolean
    error: Error | null
    isPending: boolean
    hasMore: boolean
    loadMore: () => void
    addReply: (data: PostFormSchema) => Promise<void>
    updateReply: (
        replyId: string,
        data: PostFormSchema
    ) => Promise<void>
    deleteReply: (replyId: string) => Promise<void>
}

export const ForumRepliesContext =
    createContext<ForumRepliesContextType | null>(null)

type ForumRepliesStateProviderProps = {
    postId: string
    initialReplies: Reply[]
    isLoading: boolean
    isFetching: boolean
    isError: boolean
    error?: Error
    hasMore: boolean
    loadMore: () => void
} & ContextProps

const ForumRepliesStateProvider = ({
    children,
    postId,
    initialReplies,
    isLoading,
    isFetching,
    isError,
    error,
    hasMore,
    loadMore
}: ForumRepliesStateProviderProps) => {
    const t = useTranslations()
    const { user } = useAuth()
    const {
        createReply,
        updateReply,
        deleteReply
    } = useForumPostMutations({ postId })
    const tempIdRef = useRef(0)

    // Optimistic delta — separate from server state so initialReplies updates
    // (new pages) never wipe in-flight mutations
    const [pendingAdds, setPendingAdds] = useState<Reply[]>([])
    const [pendingBodies, setPendingBodies] = useState<Record<string, string>>({})
    const [deletedIds, setDeletedIds] = useState<Set<string>>(new Set())

    // Derive full list at render time — deduplication filter removes pending
    // adds whose real reply has arrived in initialReplies
    const replies = useMemo(() => [
        ...pendingAdds.filter((pending) =>
            !initialReplies.some((server) => server.id === pending.id)),
        ...initialReplies
            .filter((reply) => !deletedIds.has(reply.id))
            .map((reply) => pendingBodies[reply.id] != null
                ? { ...reply, body: pendingBodies[reply.id] }
                : reply
            )
    ], [
        pendingAdds,
        initialReplies,
        deletedIds,
        pendingBodies
    ])

    const isPending =
        createReply.isPending
        || updateReply.isPending
        || deleteReply.isPending

    const handleAddReply = (data: PostFormSchema): Promise<void> => {
        tempIdRef.current += 1
        const tempId = `temp-reply-${postId}-${tempIdRef.current}`
        const tempReply: Reply = {
            id: tempId,
            body: data.body,
            createdAt: new Date(),
            updatedAt: null,
            authorId: user?.profile?.id ?? '',
            author: user ? {
                id: user.profile?.id ?? '',
                image: null,
                user: {
                    id: user.id,
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName
                }
            } : undefined
        }
        setPendingAdds((prev) => [tempReply, ...prev])

        return withOptimisticToast({
            action: createReply.mutateAsync(data).then((reply) => {
                setPendingAdds((prev) => prev.map((r) =>
                    r.id === tempId
                        ? { ...reply, author: tempReply.author }
                        : r
                ))
            }),
            successMsg: t(communityLocales.toasts.replyPosted),
            errorMsg: t(communityLocales.toasts.replyPostFailed),
            retryLabel: t(globalLocales.shared.retry),
            onRetry: () => void handleAddReply(data),
            onError: () => setPendingAdds((prev) =>
                prev.filter((r) => r.id !== tempId)
            )
        })
    }

    const handleUpdateReply = (
        replyId: string,
        data: PostFormSchema
    ): Promise<void> => {
        const snapshot = pendingBodies[replyId]
        setPendingBodies((prev) => ({ ...prev, [replyId]: data.body }))

        return withOptimisticToast({
            action: updateReply.mutateAsync({ replyId, data }),
            successMsg: t(communityLocales.toasts.replyUpdated),
            errorMsg: t(communityLocales.toasts.replyUpdateFailed),
            retryLabel: t(globalLocales.shared.retry),
            onRetry: () => void handleUpdateReply(replyId, data),
            onError: () => setPendingBodies((prev) => {
                const next = { ...prev }
                if (snapshot !== undefined) next[replyId] = snapshot
                else delete next[replyId]
                return next
            })
        })
    }

    const handleDeleteReply = (replyId: string): Promise<void> => {
        setDeletedIds((prev) => new Set([...prev, replyId]))

        return withOptimisticToast({
            action: deleteReply.mutateAsync(replyId),
            successMsg: t(communityLocales.toasts.replyDeleted),
            errorMsg: t(communityLocales.toasts.replyDeleteFailed),
            retryLabel: t(globalLocales.shared.retry),
            onRetry: () => void handleDeleteReply(replyId),
            onError: () => setDeletedIds((prev) => {
                const next = new Set(prev)
                next.delete(replyId)
                return next
            })
        })
    }

    const value: ForumRepliesContextType = {
        replies,
        isLoading,
        isFetching,
        isError,
        error: error ?? null,
        isPending,
        hasMore,
        loadMore,
        addReply: handleAddReply,
        updateReply: handleUpdateReply,
        deleteReply: handleDeleteReply
    }

    return (
        <ForumRepliesContext.Provider value={value}>
            {children}
        </ForumRepliesContext.Provider>
    )
}

type ForumRepliesProviderProps = {
    postId: string
} & ContextProps

export const ForumRepliesProvider = ({
    children,
    postId
}: ForumRepliesProviderProps) => {
    const {
        data,
        isLoading,
        isFetchingNextPage,
        isError,
        error,
        hasNextPage,
        fetchNextPage
    } = useForumReplies(postId)

    const replies = useMemo(() => {
        const seen = new Set<string>()
        return (data?.pages.flat() ?? []).filter((r) => {
            if (seen.has(r.id)) return false
            seen.add(r.id)
            return true
        })
    }, [data])
    const hasMore = hasNextPage ?? false
    const loadMore = useCallback(
        () => void fetchNextPage(),
        [fetchNextPage]
    )

    return (
        <ForumRepliesStateProvider
            postId={postId}
            initialReplies={replies}
            isLoading={isLoading}
            isFetching={isFetchingNextPage}
            isError={isError}
            error={error ?? undefined}
            hasMore={hasMore}
            loadMore={loadMore}
        >
            {children}
        </ForumRepliesStateProvider>
    )
}

export const useForumRepliesContext = () => {
    const context = useContext(ForumRepliesContext)
    if (!context) {
        throw new Error(
            'useForumRepliesContext must be used within ForumRepliesProvider'
        )
    }
    return context
}
