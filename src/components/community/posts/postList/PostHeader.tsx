'use client'

import { useTranslations } from 'next-intl'

import { getCategory } from '@/data/forum/categories'
import { communityLocales } from '@/locales/communityLocales'

type PostHeaderProps = {
    category: string
    author: string
    timeAgo: string
    isEdited?: boolean
}

export const PostHeader = ({
    category,
    author,
    timeAgo,
    isEdited = false
}: PostHeaderProps) => {
    const t = useTranslations()
    const tCategoryNames = useTranslations('community.categories.names')

    const cat = getCategory(category)
    const color = cat?.color ?? {
        bg: '#E2E8F0',
        text: '#334155'
    }

    return (
        <div className={'flex items-center gap-2 mb-2'}>
            <span
                className={'inline-flex items-center justify-center text-center px-2 py-0.5 rounded-full text-xs font-medium'}
                style={{
                    backgroundColor: color.bg,
                    color: color.text
                }}
            >
                {tCategoryNames(category)}
            </span>
            <span className={'text-xs text-muted-foreground'}>
                {`${t(communityLocales.posts.postedBy)} `}
                <span className={'font-semibold text-foreground'}>
                    {author}
                </span>
                {` - ${timeAgo}`}
                {isEdited && (
                    <span className={'italic ml-1'}>
                        {t(communityLocales.posts.edited)}
                    </span>
                )}
            </span>
        </div>
    )
}
