'use client'

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
}: PostTagsProps) => (
    <div
        className={
            'flex items-center'
            + ' gap-2 mt-3 flex-wrap'
        }
    >
        {tags.map((tag) =>
            onTagSelectAction ? (
                <Button
                    key={tag.id}
                    variant={'outline'}
                    onClick={() =>
                        onTagSelectAction(
                            tag.name
                        )
                    }
                    className={cn(
                        'h-auto px-2 py-0.5'
                        + ' text-xs'
                        + ' font-normal'
                        + ' rounded-full',
                        (
                            activeTag
                            === tag.name
                        )
                            ? (
                                'bg-primary/10'
                                + ' text-primary'
                                + ' border-primary'
                            )
                            : (
                                'text-muted-foreground'
                                + ' hover:bg-accent'
                                + ' hover:text-accent-foreground'
                            )
                    )}
                >
                    {tag.name}
                </Button>
            ) : (
                <Badge
                    key={tag.id}
                    variant={'outline'}
                    className={
                        'text-xs'
                        + ' text-muted-foreground'
                        + ' font-normal'
                    }
                >
                    {tag.name}
                </Badge>
            )
        )}
    </div>
)
