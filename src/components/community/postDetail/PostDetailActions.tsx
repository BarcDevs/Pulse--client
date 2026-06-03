'use client'

import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

import {
    Bookmark,
    Heart,
    Share2
} from 'lucide-react'

import type { Post } from '@/types/community'

import { PostActionButton }
    from '@/components/community/posts/postList/PostActionButton'
import { ActionsMenu } from '@/components/shared/ActionsMenu'

import { useForumPostMutations } from '@/hooks/mutations/useForumPostMutations'
import { usePostInteractions } from '@/hooks/mutations/usePostInteractions'
import { useSharePost } from '@/hooks/ui/useSharePost'

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
    const { setIsEditingPost } = usePostDetail()
    const { deletePost } = useForumPostMutations({ postId })
    const sharePost = useSharePost(postId)
    const {
        liked,
        likeCount,
        saved,
        toggleLike,
        toggleSave
    } = usePostInteractions({
        postId,
        initialLikes: post?._count?.likes ?? 0
    })

    const isPostOwner = post
        ? user?.profile?.id === post.authorId
        : false

    const handleDeletePost = async () => {
        await deletePost.mutateAsync()
        router.push('/community')
    }

    const solidarityText = liked
        ? t(
            communityLocales
                .postActions
                .solidarityActive
        )
        : t(communityLocales.postActions.solidarity)

    const saveText = saved
        ? t(communityLocales.posts.saved)
        : t(communityLocales.posts.save)

    const shareText = t(
        communityLocales.postActions.share
    )
    const editPostLabel = t(
        communityLocales.postActions.editPost
    )
    const deletePostLabel = t(
        communityLocales.postActions.deletePost
    )
    const cancelLabel = t(
        communityLocales.postForm.cancel
    )
    const deletePostTitle = t(
        communityLocales.confirmations.deletePostTitle
    )
    const deletePostDesc = t(
        communityLocales
            .confirmations
            .deletePostDescription
    )

    return (
        <div className={'flex items-center gap-1 px-7 py-4 border-t border-border'}>
            <PostActionButton
                icon={Heart}
                text={solidarityText}
                count={likeCount}
                isActive={liked}
                activeClassName={'bg-rose-100 text-rose-600 hover:bg-rose-100 hover:text-rose-600 rounded-full px-3'}
                onClick={toggleLike}
            />
            <PostActionButton
                icon={Share2}
                text={shareText}
                onClick={sharePost}
            />
            <PostActionButton
                icon={Bookmark}
                text={saveText}
                isActive={saved}
                onClick={toggleSave}
            />
            {isPostOwner && (
                <div className={'absolute top-3 right-3'}>
                    <ActionsMenu
                        onEditAction={() =>
                            setIsEditingPost(true)
                        }
                        onDeleteAction={handleDeletePost}
                        isLoading={deletePost.isPending}
                        editLabel={editPostLabel}
                        deleteLabel={deletePostLabel}
                        cancelLabel={cancelLabel}
                        confirmTitle={deletePostTitle}
                        confirmDescription={deletePostDesc}
                    />
                </div>
            )}
        </div>
    )
}
