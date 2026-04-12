import { Badge } from '@/components/ui/badge'

type ActivityTagsListProps = {
    tags: string[]
    variant?: 'card' | 'default'
}

export const ActivityTagsList = ({
    tags,
    variant = 'default'
}: ActivityTagsListProps) => {
    const isCard = variant === 'card'

    return (
        <div className={isCard
            ? 'flex--wrap gap-1'
            : 'flex gap-2'
        }>
            {tags.map((tag) =>
                isCard
                    ? <Badge
                        key={tag}
                        variant={'outline'}
                        className={'border-border text-xs'}
                    >
                        {tag}
                    </Badge>
                    : <span
                        key={tag}
                        className={'px-3 py-1 rounded-full bg-surface-card text-xs font-medium text-muted-foreground'}
                    >
                        {tag}
                    </span>
            )}
        </div>
    )
}
