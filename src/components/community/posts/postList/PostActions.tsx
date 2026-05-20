'use client'

import { useTranslations } from 'next-intl'

import {
    Bookmark,
    MessageSquare,
    Share2
} from 'lucide-react'

import { PostActionButton } from '@/components/community/posts/postList/PostActionButton'

import { communityLocales } from '@/locales/communityLocales'

type PostActionsProps = {
    replies: number
}

export const PostActions = ({ replies }: PostActionsProps) => {
    const t = useTranslations()

    return (
        <div className={'flex items-center gap-4 mt-4'}>
            <PostActionButton
                text={`${replies} ${t(communityLocales.posts.repliesLabel)}`}
                onClick={() => {}}
                icon={MessageSquare}
            />
            <PostActionButton
                text={t(communityLocales.posts.share)}
                onClick={() => {}}
                icon={Share2}
            />
            <PostActionButton
                text={t(communityLocales.posts.save)}
                onClick={() => {}}
                icon={Bookmark}
            />
        </div>
    )
}
