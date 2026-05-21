'use client'

import { useLocale } from 'next-intl'

import type { PartialTag, Tag } from '@/types/community'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

import { useForumTags } from '@/hooks/queries/useForumTags'

import { cn } from '@/lib/utils'

import { getTagName } from '@/utils/tag'

type PostTagsProps = {
    tags: Tag[] | PartialTag[]
    onTagSelectAction?: (tag: string | null) => void
    activeTag?: string | null
}

export const PostTags = ({
    tags,
    onTagSelectAction,
    activeTag
}: PostTagsProps) => {
    const locale = useLocale()
    const lang = locale.split('-')[0] as 'en' | 'he'
    const { data: fullTags = [] } = useForumTags()

    const tagMap = new Map(fullTags.map(ft => [ft.slug, ft]))

    return (
        <div className={'flex items-center gap-2 mt-3 flex-wrap'}>
            {tags.map((tag) => {
                const enriched = tagMap.get(tag.slug) ?? tag
                const name = getTagName(enriched, lang)

                return onTagSelectAction ? (
                    <Button
                        key={tag.id}
                        variant={'outline'}
                        onClick={() => onTagSelectAction(tag.slug)}
                        className={cn('h-auto px-2 py-0.5 text-xs font-normal rounded-full',
                            activeTag === tag.slug
                                ? 'bg-primary/10 text-primary border-primary'
                                : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                        )}
                    >
                        {name}
                    </Button>
                ) : (
                    <Badge
                        key={tag.id}
                        variant={'outline'}
                        className={'text-xs text-muted-foreground font-normal'}
                    >
                        {name}
                    </Badge>
                )
            })}
        </div>
    )
}
