'use client'

import { useTranslations } from 'next-intl'

import { cn } from '@/lib/utils'

import {
    CATEGORY_GROUP,
    CategoryGroup,
    getCategory
} from '@/data/forum/categories'
import { communityLocales } from '@/locales/communityLocales'

const GROUP_COLORS: Record<CategoryGroup, string> = {
    [CATEGORY_GROUP.InjuryTypes]: 'bg-red-100 text-red-700',
    [CATEGORY_GROUP.Rehabilitation]: 'bg-blue-100 text-blue-700',
    [CATEGORY_GROUP.MentalHealth]: 'bg-purple-100 text-purple-700',
    [CATEGORY_GROUP.PeerSupport]: 'bg-green-100 text-green-700'
}

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
    const tCategories = useTranslations('community.categories')

    const cat = getCategory(category)
    const colorClass = cat?.group
        ? GROUP_COLORS[cat.group]
        : 'bg-secondary text-secondary-foreground'
    const categoryName = tCategories(category)

    return (
        <div className={'flex items-center gap-2 mb-2'}>
            <span className={cn(
                'px-2 py-0.5 rounded-full text-xs font-medium',
                colorClass
            )}>
                {categoryName}
            </span>
            <span className={'text-xs text-muted-foreground'}>
                {t(communityLocales.posts.postedBy)}
                {` ${author} - ${timeAgo}`}
            </span>
        </div>
    )
}
