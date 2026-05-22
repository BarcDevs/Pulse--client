'use client'

import { useTranslations } from 'next-intl'

import { Reply } from '@/types/community'

import { RepliesEmptyState }
    from '@/components/community/postDetail/RepliesEmptyState'
import { RepliesList }
    from '@/components/community/postDetail/RepliesList'
import { ReplyInputSection }
    from '@/components/community/postDetail/ReplyInputSection'
import { UnauthenticatedReplyPrompt }
    from '@/components/community/postDetail/UnauthenticatedReplyPrompt'
import { PostForm } from '@/components/community/postForm/PostForm'
import { ErrorDisplay } from '@/components/shared/ErrorDisplay'
import { Skeleton } from '@/components/ui/skeleton'

import { useForumPostMutations } from '@/hooks/mutations/useForumPostMutations'
import { useForumReplies } from '@/hooks/queries/useForumReplies'

import { useAuth } from '@/context/AuthContext'
import { usePostDetail } from '@/context/PostDetailContext'

import { communityLocales } from '@/locales/communityLocales'
import { PostFormSchema } from '@/validations/forms/postFormSchema'

type RepliesSectionProps = {
    postId: string
}

export const RepliesSection = ({
    postId
}: RepliesSectionProps) => {
    const t = useTranslations()
    const { user } = useAuth()
    const isAuthenticated = !!user
    const {
        data: repliesData,
        isLoading,
        isError,
        error
    } = useForumReplies(postId)
    const {
        isReplyFormOpen,
        setIsReplyFormOpen
    } = usePostDetail()
    const {
        deleteReply,
        createReply
    } = useForumPostMutations({ postId })

    const handleDeleteReply = async (replyId: string) => {
        const confirmed = confirm(
            t(communityLocales.confirmations.deleteReply)
        )
        if (!confirmed) return
        await deleteReply.mutateAsync(replyId)
    }

    const handleReplySubmit = async (data: PostFormSchema) => {
        await createReply.mutateAsync(data)
        setIsReplyFormOpen(false)
    }

    const replies: Reply[] = repliesData ?? []
    const replyCount = isLoading
        ? t(communityLocales.postDetail.loading)
        : `${replies.length} ${
            replies.length === 1
                ? t(communityLocales.postDetail.reply)
                : t(communityLocales.postDetail.replies)
        }`

    return (
        <div className={'rounded-2xl bg-surface-card shadow-sm p-6 space-y-4'}>
            <h2 className={'text-lg font-semibold'}>
                {replyCount}
            </h2>

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
                    isLoading={createReply.isPending}
                    onSubmitAction={handleReplySubmit}
                    onCancelAction={() => setIsReplyFormOpen(false)}
                />
            )}

            {!isAuthenticated && (
                <UnauthenticatedReplyPrompt/>
            )}

            {isLoading && (
                <div className={'space-y-4'}>
                    {['reply-skeleton-1', 'reply-skeleton-2'].map(
                        (id) => (
                            <Skeleton
                                key={id}
                                className={'h-24 rounded-lg'}
                            />
                        )
                    )}
                </div>
            )}

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
                    currentUserId={user?.id}
                    onDeleteReplyAction={handleDeleteReply}
                    isDeleting={deleteReply.isPending}
                />
            )}
        </div>
    )
}
