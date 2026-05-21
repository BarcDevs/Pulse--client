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

import { useAuth } from '@/context/AuthContext'

import { communityLocales } from '@/locales/communityLocales'
import { useSharePost } from '@/hooks/ui/useSharePost'

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
                    text={t(communityLocales.postActions.solidarity)}
                    count={post?.votes.upvotes ?? 0}
                    onClick={() => {}}
                />
                <PostActionButton
                    icon={Share2}
                    text={t(communityLocales.postActions.share)}
                    onClick={sharePost}
                />
                <PostActionButton
                    icon={Bookmark}
                    text={t(communityLocales.posts.save)}
                    onClick={() => {}}
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
