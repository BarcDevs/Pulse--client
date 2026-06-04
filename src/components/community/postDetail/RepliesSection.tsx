'use client'

import { useTranslations } from 'next-intl'

import { Loader2 } from 'lucide-react'

import { RepliesEmptyState } from '@/components/community/postDetail/RepliesEmptyState'
import { RepliesList } from '@/components/community/postDetail/RepliesList'
import { RepliesSectionSkeletons } from '@/components/community/postDetail/RepliesSectionSkeletons'
import { ReplyInputSection } from '@/components/community/postDetail/ReplyInputSection'
import { UnauthenticatedReplyPrompt } from '@/components/community/postDetail/UnauthenticatedReplyPrompt'
import { PostForm } from '@/components/community/postForm/PostForm'
import { ErrorDisplay } from '@/components/shared/ErrorDisplay'
import { Button } from '@/components/ui/button'
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
    totalReplies?: number
}

export const RepliesSection = ({
    postId,
    postAuthorId,
    totalReplies
}: RepliesSectionProps) => {
    const t = useTranslations()
    const { user } = useAuth()
    const isAuthenticated = !!user
    const {
        isReplyFormOpen,
        setIsReplyFormOpen
    } = usePostDetail()

    const replyDraft = getDraft(DRAFT_KEYS.newReply(postId))

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
    const remainingCount = Math.max(
        0,
        (totalReplies ?? 0) - replies.length
    )
    const showMoreLabel = t(
        communityLocales
            .postDetail
            .showMoreRepliesWithCount,
        { count: remainingCount }
    )

    return (
        <div className={'rounded-2xl bg-surface-card shadow-sm p-6 space-y-4'}>
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
                    defaultValues={replyDraft?.data}
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
                <Button
                    variant={'ghost'}
                    size={'sm'}
                    onClick={loadMore}
                    disabled={isFetching}
                >
                    {isFetching
                        ? <Loader2 className={'animate-spin h-4 w-4'}/>
                        : showMoreLabel
                    }
                </Button>
            )}
        </div>
    )
}
