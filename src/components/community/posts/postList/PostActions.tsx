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
    shareCount?: number
}

export const PostActions = ({
    postId,
    replies,
    shareCount = 0
}: PostActionsProps) => {
    const t = useTranslations()
    const {
        share,
        shareCount: liveShareCount
    } = useSharePost(postId, shareCount)
    const interactions = usePostInteractions({ postId })

    const saveText = interactions.save.isActive
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
                count={liveShareCount}
                onClick={share}
                icon={Share2}
            />
            <PostActionButton
                text={saveText}
                isActive={interactions.save.isActive}
                onClick={interactions.save.toggle}
                icon={Bookmark}
            />
        </div>
    )
}
