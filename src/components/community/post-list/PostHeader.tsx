import {cn} from '@/lib/utils'

import * as CommunityTexts from '@/constants/communityTexts'

type PostHeaderProps = {
    category: string
    categoryColor: string
    author: string
    timeAgo: string
}

export const PostHeader = ({
    category,
    categoryColor,
    author,
    timeAgo
}: PostHeaderProps) => (
    <div className={'flex items-center gap-2 mb-2'}>
        <span className={cn(
            'px-2 py-0.5 rounded-full text-xs font-medium',
            categoryColor
        )}>
            {category}
        </span>
        <span className={'text-xs text-muted-foreground'}>
            {CommunityTexts.COMMUNITY_POSTED_BY}
            {` ${author} - ${timeAgo}`}
        </span>
    </div>
)
