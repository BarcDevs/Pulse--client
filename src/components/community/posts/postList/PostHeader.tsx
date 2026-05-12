'use client'

import { useTranslations } from 'next-intl'

import { communityLocales } from '@/locales/communityLocales'

type PostHeaderProps = {
    category: string
    author: string
    timeAgo: string
}

export const PostHeader = ({
    category,
    author,
    timeAgo
}: PostHeaderProps) => {
    const t = useTranslations()

    return (
        <div className={'flex items-center gap-2 mb-2'}>
            <span className={'px-2 py-0.5 rounded-full text-xs font-medium'}>
                {category}
            </span>
            <span className={'text-xs text-muted-foreground'}>
                {t(communityLocales.posts.postedBy)}
                {` ${author} - ${timeAgo}`}
            </span>
        </div>
    )
}
