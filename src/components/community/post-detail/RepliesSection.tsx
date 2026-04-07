'use client'

import { Reply } from '@/types/community'

import { RepliesEmptyState } from '@/components/community/post-detail/RepliesEmptyState'
import { RepliesList } from '@/components/community/post-detail/RepliesList'
import { UnauthenticatedReplyPrompt } from '@/components/community/post-detail/UnauthenticatedReplyPrompt'
import { PostForm } from '@/components/community/post-form/PostForm'
import { ErrorStateCard } from '@/components/community/shared/ErrorStateCard'
import { Skeleton } from '@/components/ui/skeleton'

import { useForumPostMutations } from '@/hooks/mutations/useForumPostMutations'
import { useForumReplies } from '@/hooks/queries/useForumReplies'

import { communityPageTexts } from '@/constants/componentTexts/community'

import { useAuth } from '@/context/AuthContext'
import { usePostDetail } from '@/context/PostDetailContext'

type RepliesSectionProps = {
    postId: string
}

export const RepliesSection = ({
    postId
}: RepliesSectionProps) => {
    const { user } = useAuth()
    const currentUserId = user?.id
    const isAuthenticated = !!user
    const {
        data: repliesData,
        isLoading,
        isError
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
            communityPageTexts.confirmations.deleteReply
        )
        if (!confirmed) return
        await deleteReply.mutateAsync(replyId)
    }

    const replies: Reply[] = repliesData?.replies ?? []

    return (
        <section className={'space-y-4'}>
            <div className={'flex items-center justify-between'}>
                <h2 className={'text-lg font-semibold'}>
                    {isLoading
                        ? communityPageTexts.postDetail.loading
                        : `${replies.length} ${
                            replies.length === 1
                                ? communityPageTexts.postDetail.reply
                                : communityPageTexts.postDetail.replies
                        }`
                    }
                </h2>
            </div>

            {isError && (
                <ErrorStateCard message={communityPageTexts.postDetail.repliesLoadError}/>
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
        </section>
    )
}