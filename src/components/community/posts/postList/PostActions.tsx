'use client'

import { useTranslations } from 'next-intl'

import {
    Bookmark,
    MessageSquare,
    Share2
} from 'lucide-react'

import { PostActionButton } from '@/components/community/posts/postList/PostActionButton'

import { usePostInteractions } from '@/hooks/mutations/usePostInteractions'
import { useSharePost } from '@/hooks/ui/useSharePost'

import { communityLocales } from '@/locales/communityLocales'

type PostActionsProps = {
    postId: string
    replies: number
}

export const PostActions = ({
    postId,
    replies
}: PostActionsProps) => {
    const t = useTranslations()
    const sharePost = useSharePost(postId)
    const {
        saved,
        toggleSave
    } = usePostInteractions({ postId })

    const saveText = saved
        ? t(communityLocales.posts.saved)
        : t(communityLocales.posts.save)

    return (
        <div className={'flex items-center gap-4 mt-4'}>
            <PostActionButton
                text={`${replies} ${t(communityLocales.posts.repliesLabel)}`}
                onClick={() => {}}
                icon={MessageSquare}
            />
            <PostActionButton
                text={t(communityLocales.posts.share)}
                onClick={sharePost}
                icon={Share2}
            />
            <PostActionButton
                text={saveText}
                isActive={saved}
                onClick={toggleSave}
                icon={Bookmark}
            />
        </div>
    )
}
