'use client'

import {
    createContext,
    ReactNode,
    useContext,
    useRef,
    useState
} from 'react'

import { useTranslations } from 'next-intl'

import { toast } from 'sonner'

import { Reply } from '@/types/community'

import { useForumPostMutations } from '@/hooks/mutations/useForumPostMutations'
import { useForumReplies } from '@/hooks/queries/useForumReplies'

import { secondInMs } from '@/constants/time'

import { useAuth } from '@/context/AuthContext'

import { communityLocales } from '@/locales/communityLocales'
import { globalLocales } from '@/locales/globalLocales'
import { PostFormSchema } from '@/validations/forms/postFormSchema'

type ForumRepliesContextType = {
    replies: Reply[]
    isLoading: boolean
    isError: boolean
    error: Error | null
    isPending: boolean
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
    isError: boolean
    error: Error | null
}

const ForumRepliesStateProvider = ({
    children,
    postId,
    initialReplies,
    isLoading,
    isError,
    error
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
            authorId: user?.id ?? '',
            author: user ? {
                id: user.id,
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

        return createReply.mutateAsync(data)
            .then((reply) => {
                setReplies((prev) => prev.map((r) =>
                    r.id === tempId
                        ? { ...reply, author: tempReply.author }
                        : r
                ))
                toast.success(
                    t(communityLocales.toasts.replyPosted),
                    { duration: 2.5 * secondInMs }
                )
            })
            .catch(() => {
                setReplies((prev) => prev.filter((r) => r.id !== tempId))
                toast.error(t(communityLocales.toasts.replyPostFailed), {
                    action: {
                        label: t(globalLocales.shared.retry),
                        onClick: () => void handleAddReply(data)
                    },
                    duration: 5 * secondInMs
                })
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

        return updateReply.mutateAsync({ replyId, data })
            .then(() => {
                toast.success(
                    t(communityLocales.toasts.replyUpdated),
                    { duration: 2.5 * secondInMs }
                )
            })
            .catch(() => {
                setReplies(snapshot)
                toast.error(t(communityLocales.toasts.replyUpdateFailed), {
                    action: {
                        label: t(globalLocales.shared.retry),
                        onClick: () => void handleUpdateReply(replyId, data)
                    },
                    duration: 5 * secondInMs
                })
            })
    }

    const handleDeleteReply = (replyId: string): Promise<void> => {
        const snapshot = replies
        setReplies((prev) => prev.filter((r) => r.id !== replyId))

        return deleteReply.mutateAsync(replyId)
            .then(() => {
                toast.success(
                    t(communityLocales.toasts.replyDeleted),
                    { duration: 2.5 * secondInMs }
                )
            })
            .catch(() => {
                setReplies(snapshot)
                toast.error(t(communityLocales.toasts.replyDeleteFailed), {
                    action: {
                        label: t(globalLocales.shared.retry),
                        onClick: () => void handleDeleteReply(replyId)
                    },
                    duration: 5 * secondInMs
                })
            })
    }

    const value: ForumRepliesContextType = {
        replies,
        isLoading,
        isError,
        error,
        isPending,
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
    const {
        data,
        isLoading,
        isError,
        error
    } = useForumReplies(postId)

    return (
        <ForumRepliesStateProvider
            key={isLoading ? 'loading' : 'loaded'}
            postId={postId}
            initialReplies={data ?? []}
            isLoading={isLoading}
            isError={isError}
            error={error ?? null}
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
