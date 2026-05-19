'use client'

import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

import {
    MessageSquare,
    Share2,
    ThumbsUp
} from 'lucide-react'

import { Post } from '@/types/community'

import { PostActionButton } from '@/components/community/posts/postList/PostActionButton'
import { DeleteMenu } from '@/components/shared/DeleteMenu'

import { useForumPostMutations } from '@/hooks/mutations/useForumPostMutations'

import { useAuth } from '@/context/AuthContext'
import { usePostDetail } from '@/context/PostDetailContext'

import { communityLocales } from '@/locales/communityLocales'

type PostDetailActionsProps = {
    postId: string
    post: Post | undefined
}

export const PostDetailActions = ({
    postId,
    post
}: PostDetailActionsProps) => {
    const router = useRouter()
    const t = useTranslations()
    const { user } = useAuth()
    const { deletePost } = useForumPostMutations({
        postId
    })
    const {
        isReplyFormOpen,
        setIsReplyFormOpen
    } = usePostDetail()

    const currentUserId = user?.id
    const isPostOwner = post
        ? currentUserId === post.authorId
        : false
    const isAuthenticated = !!currentUserId

    const handleDeletePost = async () => {
        await deletePost.mutateAsync()
        router.push('/community')
    }

    return (
        <div className={'flex items-center justify-between py-3 px-6 bg-white border border-border rounded-b-lg shadow-sm'}>
            <div className={'flex items-center gap-3'}>
                <span className={'flex items-center gap-1 text-sm text-muted-foreground'}>
                    <ThumbsUp className={'h-4 w-4'}/>
                    {`${post?.votes.upvotes ?? 0}`}
                </span>
            </div>

            {/* todo: make upvotes click as upvote button */}
            <div className={'flex items-center gap-2'}>
                <PostActionButton
                    icon={ThumbsUp}
                    text={t(communityLocales.postActions.solidarity)}
                    onClick={() => {
                    }}
                />

                <PostActionButton
                    icon={MessageSquare}
                    text={t(communityLocales.postActions.reply)}
                    onClick={() => {
                        if (!isAuthenticated) {
                            return router.push('/login')
                        }
                        setIsReplyFormOpen(!isReplyFormOpen)
                    }}
                />

                <PostActionButton
                    icon={Share2}
                    text={t(communityLocales.postActions.share)}
                    onClick={() => {
                    }}
                />

                {isPostOwner && (
                    <DeleteMenu
                        onDeleteAction={handleDeletePost}
                        confirmMessage={t(communityLocales.confirmations.deletePost)}
                        isLoading={deletePost.isPending}
                        iconSize={18}
                    />
                )}
            </div>
        </div>
    )
}
