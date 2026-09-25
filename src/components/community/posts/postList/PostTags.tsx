'use client'

import { useLocale } from 'next-intl'

import type { PartialTag, Tag } from '@/types/community'

import { ChipButton } from '@/components/shared/buttons/ChipButton'
import { Badge } from '@/components/ui/badge'

import { useForumTags } from '@/hooks/queries/useForumTags'

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
                    <ChipButton
                        key={tag.id}
                        isSelected={activeTag === tag.slug}
                        onClick={() => onTagSelectAction(tag.slug)}
                    >
                        {name}
                    </ChipButton>
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
