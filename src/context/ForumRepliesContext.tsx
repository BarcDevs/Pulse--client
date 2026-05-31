'use client'

import {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useRef,
    useState
} from 'react'

import { useTranslations } from 'next-intl'

import { Reply } from '@/types/community'

import { useForumPostMutations } from '@/hooks/mutations/useForumPostMutations'
import { useForumReplies } from '@/hooks/queries/useForumReplies'

import { withOptimisticToast } from '@/utils/optimisticToast'

import { appSettings } from '@/config/appSettings'

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
    children: ReactNode
    postId: string
    initialReplies: Reply[]
    isLoading: boolean
    isFetching: boolean
    isError: boolean
    error: Error | null
    hasMore: boolean
    loadMore: () => void
}

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
    const [replies, setReplies] = useState<Reply[]>(initialReplies)

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
        setReplies((prev) => [tempReply, ...prev])

        return withOptimisticToast({
            action: createReply.mutateAsync(data).then((reply) => {
                setReplies((prev) => prev.map((r) =>
                    r.id === tempId
                        ? { ...reply, author: tempReply.author }
                        : r
                ))
            }),
            successMsg: t(communityLocales.toasts.replyPosted),
            errorMsg: t(communityLocales.toasts.replyPostFailed),
            retryLabel: t(globalLocales.shared.retry),
            onRetry: () => void handleAddReply(data),
            onError: () => setReplies((prev) =>
                prev.filter((r) => r.id !== tempId)
            )
        })
    }

    const handleUpdateReply = (
        replyId: string,
        data: PostFormSchema
    ): Promise<void> => {
        const snapshot = replies
        setReplies((prev) => prev.map((r) =>
            r.id === replyId ? { ...r, body: data.body } : r
        ))

        return withOptimisticToast({
            action: updateReply.mutateAsync({ replyId, data }),
            successMsg: t(communityLocales.toasts.replyUpdated),
            errorMsg: t(communityLocales.toasts.replyUpdateFailed),
            retryLabel: t(globalLocales.shared.retry),
            onRetry: () => void handleUpdateReply(replyId, data),
            onError: () => setReplies(snapshot)
        })
    }

    const handleDeleteReply = (replyId: string): Promise<void> => {
        const snapshot = replies
        setReplies((prev) => prev.filter((r) => r.id !== replyId))

        return withOptimisticToast({
            action: deleteReply.mutateAsync(replyId),
            successMsg: t(communityLocales.toasts.replyDeleted),
            errorMsg: t(communityLocales.toasts.replyDeleteFailed),
            retryLabel: t(globalLocales.shared.retry),
            onRetry: () => void handleDeleteReply(replyId),
            onError: () => setReplies(snapshot)
        })
    }

    const value: ForumRepliesContextType = {
        replies,
        isLoading,
        isFetching,
        isError,
        error,
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
    children: ReactNode
    postId: string
}

export const ForumRepliesProvider = ({
    children,
    postId
}: ForumRepliesProviderProps) => {
    const [page, setPage] = useState(1)
    const { repliesPageSize } = appSettings.community
    const currentLimit = repliesPageSize * page

    const {
        data,
        isLoading,
        isFetching,
        isError,
        error
    } = useForumReplies(postId, currentLimit)

    const hasMore = (data?.length ?? 0) === currentLimit
    const loadMore = useCallback(() => setPage((p) => p + 1), [])

    return (
        <ForumRepliesStateProvider
            key={currentLimit}
            postId={postId}
            initialReplies={data ?? []}
            isLoading={isLoading}
            isFetching={isFetching}
            isError={isError}
            error={error ?? null}
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
