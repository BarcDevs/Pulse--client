'use client'

import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

import {
    Bookmark,
    Heart,
    Share2
} from 'lucide-react'

import { Post } from '@/types/community'

import { PostActionButton }
    from '@/components/community/posts/postList/PostActionButton'
import { DeleteMenu } from '@/components/shared/DeleteMenu'

import { useForumPostMutations } from '@/hooks/mutations/useForumPostMutations'
import { usePostInteractions } from '@/hooks/mutations/usePostInteractions'
import { useSharePost } from '@/hooks/ui/useSharePost'

import { useAuth } from '@/context/AuthContext'

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
        ? user?.id === post.authorId
        : false

    const handleDeletePost = async () => {
        await deletePost.mutateAsync()
        router.push('/community')
    }

    return (
        <div className={'flex items-center justify-between px-7 py-4 border-t border-border'}>
            <div className={'flex items-center gap-1'}>
                <PostActionButton
                    icon={Heart}
                    text={liked ? t(communityLocales.postActions.solidarityActive) : t(communityLocales.postActions.solidarity)}
                    count={likeCount}
                    isActive={liked}
                    activeClassName={'bg-rose-100 text-rose-600 hover:bg-rose-100 hover:text-rose-600 rounded-full px-3'}
                    onClick={toggleLike}
                />
                <PostActionButton
                    icon={Share2}
                    text={t(communityLocales.postActions.share)}
                    onClick={sharePost}
                />
                <PostActionButton
                    icon={Bookmark}
                    text={saved ? t(communityLocales.posts.saved) : t(communityLocales.posts.save)}
                    isActive={saved}
                    onClick={toggleSave}
                />
            </div>
            {isPostOwner && (
                <DeleteMenu
                    onDeleteAction={handleDeletePost}
                    confirmMessage={t(communityLocales.confirmations.deletePost)}
                    isLoading={deletePost.isPending}
                    iconSize={18}
                />
            )}
        </div>
    )
}
