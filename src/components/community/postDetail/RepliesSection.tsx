'use client'

import { useTranslations } from 'next-intl'

import { Reply } from '@/types/community'

import { RepliesEmptyState } from '@/components/community/postDetail/RepliesEmptyState'
import { RepliesList } from '@/components/community/postDetail/RepliesList'
import { UnauthenticatedReplyPrompt } from '@/components/community/postDetail/UnauthenticatedReplyPrompt'
import { PostForm } from '@/components/community/postForm/PostForm'
import { ErrorDisplay } from '@/components/shared/ErrorDisplay'
import { Skeleton } from '@/components/ui/skeleton'

import { useForumPostMutations } from '@/hooks/mutations/useForumPostMutations'
import { useForumReplies } from '@/hooks/queries/useForumReplies'

import { useAuth } from '@/context/AuthContext'
import { usePostDetail } from '@/context/PostDetailContext'

import { communityLocales } from '@/locales/communityLocales'

type RepliesSectionProps = {
    postId: string
}

export const RepliesSection = ({
    postId
}: RepliesSectionProps) => {
    const t = useTranslations()
    const { user } = useAuth()
    const currentUserId = user?.id
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
    const { deleteReply } = useForumPostMutations({
        postId
    })

    const handleDeleteReply = async (
        replyId: string
    ) => {
        const confirmed = confirm(
            t(communityLocales.confirmations.deleteReply)
        )
        if (!confirmed) return
        await deleteReply.mutateAsync(replyId)
    }

    const replies: Reply[] = repliesData?.replies ?? []

    return (
        <section className={'space-y-4 pb-6'}>
            <div className={'flex items-center justify-between'}>
                <h2 className={'text-lg font-semibold'}>
                    {isLoading
                        ? t(communityLocales.postDetail.loading)
                        : `${replies.length} ${
                            replies.length === 1
                                ? t(communityLocales.postDetail.reply)
                                : t(communityLocales.postDetail.replies)
                        }`
                    }
                </h2>
            </div>

            {isError && <ErrorDisplay error={error}/>}

            {isAuthenticated && (
                <PostForm
                    isReply={true}
                    postId={postId}
                    isOpen={isReplyFormOpen}
                    onCancelAction={() => setIsReplyFormOpen(false)}
                />
            )}

            {!isAuthenticated && (
                <UnauthenticatedReplyPrompt/>
            )}

            {isLoading && (
                <div className={'space-y-4'}>
                    {Array.from({ length: 2 }).map(
                        (_, i) => (
                            <Skeleton
                                key={i}
                                className={'h-24 rounded-lg'}
                            />
                        )
                    )}
                </div>
            )}

            {
                !isLoading
                && !isError
                && replies.length === 0
                && !isReplyFormOpen && (
                    <RepliesEmptyState/>
                )}

            {!isLoading && replies.length > 0 && (
                <RepliesList
                    replies={replies}
                    currentUserId={currentUserId}
                    onDeleteReply={handleDeleteReply}
                    isDeleting={deleteReply.isPending}
                />
            )}
        </section>
    )
}