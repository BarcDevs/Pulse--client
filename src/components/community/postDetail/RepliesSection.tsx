'use client'

import {
    useEffect,
    useRef,
    useState
} from 'react'

import { useTranslations } from 'next-intl'

import { Loader2 } from 'lucide-react'

import { RepliesEmptyState } from '@/components/community/postDetail/RepliesEmptyState'
import { RepliesList } from '@/components/community/postDetail/RepliesList'
import { RepliesSectionSkeletons } from '@/components/community/postDetail/RepliesSectionSkeletons'
import { ReplyInputSection } from '@/components/community/postDetail/ReplyInputSection'
import { UnauthenticatedReplyPrompt } from '@/components/community/postDetail/UnauthenticatedReplyPrompt'
import { PostForm } from '@/components/community/postForm/PostForm'
import { ErrorDisplay } from '@/components/shared/ErrorDisplay'
import { Skeleton } from '@/components/ui/skeleton'

import {
    DRAFT_KEYS,
    getDraft
} from '@/utils/communityDraft'

import { useAuth } from '@/context/AuthContext'
import { useForumRepliesContext } from '@/context/ForumRepliesContext'
import { usePostDetail } from '@/context/PostDetailContext'

import { communityLocales } from '@/locales/communityLocales'
import { PostFormSchema } from '@/validations/forms/postFormSchema'

type RepliesSectionProps = {
    postId: string
    postAuthorId?: string
}

export const RepliesSection = ({
    postId,
    postAuthorId
}: RepliesSectionProps) => {
    const t = useTranslations()
    const { user } = useAuth()
    const isAuthenticated = !!user
    const {
        isReplyFormOpen,
        setIsReplyFormOpen
    } = usePostDetail()

    const [replyDraft] = useState(() => getDraft(DRAFT_KEYS.newReply(postId))?.data)
    const sentinelRef = useRef<HTMLDivElement>(null)

    const {
        replies,
        isLoading,
        isError,
        error,
        isPending,
        isFetching,
        hasMore,
        loadMore,
        addReply,
        updateReply,
        deleteReply
    } = useForumRepliesContext()

    const handleReplySubmit = (
        data: PostFormSchema
    ): Promise<void> => {
        void addReply(data)
        setIsReplyFormOpen(false)
        return Promise.resolve()
    }

    const replyLabel = replies.length === 1
        ? t(communityLocales.postDetail.reply)
        : t(communityLocales.postDetail.replies)
    const replyCount = `${replies.length} ${replyLabel}`

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (
                    entries[0].isIntersecting
                    && hasMore
                    && !isFetching
                ) {
                    loadMore()
                }
            },
            { threshold: 0.1 }
        )

        if (sentinelRef.current) {
            observer.observe(sentinelRef.current)
        }

        return () => observer.disconnect()
    }, [
        hasMore,
        isFetching,
        loadMore
    ])

    return (
        <div className={'rounded-2xl bg-surface-card shadow-sm p-4 sm:p-6 space-y-3 sm:space-y-4'}>
            {isLoading
                ? <Skeleton className={'h-6 w-28'}/>
                : <h2 className={'text-lg font-semibold'}>
                    {replyCount}
                </h2>
            }

            {isError && <ErrorDisplay error={error}/>}

            {isAuthenticated && !isReplyFormOpen && (
                <ReplyInputSection
                    onOpenAction={() => setIsReplyFormOpen(true)}
                />
            )}

            {isAuthenticated && (
                <PostForm
                    isReply={true}
                    isOpen={isReplyFormOpen}
                    isLoading={isPending}
                    onSubmitAction={handleReplySubmit}
                    onCancelAction={() => setIsReplyFormOpen(false)}
                    defaultValues={replyDraft}
                />
            )}

            {!isAuthenticated && (
                <UnauthenticatedReplyPrompt/>
            )}

            {isLoading && <RepliesSectionSkeletons/>}

            {!isLoading
                && !isError
                && replies.length === 0
                && !isReplyFormOpen && (
                    <RepliesEmptyState/>
                )}

            {!isLoading && replies.length > 0 && (
                <RepliesList
                    replies={replies}
                    postId={postId}
                    currentUserId={user?.profile?.id}
                    postAuthorId={postAuthorId}
                    onDeleteReplyAction={deleteReply}
                    onUpdateReplyAction={updateReply}
                    isDeleting={isPending}
                />
            )}

            {hasMore && (
                <div
                    ref={sentinelRef}
                    className={'flex--center py-2'}
                >
                    {isFetching && (
                        <Loader2 className={'animate-spin h-4 w-4'}/>
                    )}
                </div>
            )}
        </div>
    )
}
