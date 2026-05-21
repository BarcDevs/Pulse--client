'use client'

import { useLocale } from 'next-intl'

import type { PartialTag, Tag } from '@/types/community'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

import { cn } from '@/lib/utils'

type PostTagsProps = {
    tags: Tag[] | PartialTag[]
    onTagSelectAction?: (
        tag: string | null
    ) => void
    activeTag?: string | null
}

export const PostTags = ({
    tags,
    onTagSelectAction,
    activeTag
}: PostTagsProps) => {
    const locale = useLocale()
    const lang = locale.split('-')[0] as 'en' | 'he'

    return (
        <div className={'flex items-center gap-2 mt-3 flex-wrap'}>
            {tags.map((tag) =>
                onTagSelectAction ? (
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
                        {tag.label?.[lang] ?? tag.slug}
                    </Button>
                ) : (
                    <Badge
                        key={tag.id}
                        variant={'outline'}
                        className={'text-xs text-muted-foreground font-normal'}
                    >
                        {tag.label?.[lang] ?? tag.slug}
                    </Badge>
                )
            )}
        </div>
    )
}
