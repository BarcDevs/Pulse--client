import { ReactNode } from 'react'

import { Badge } from '@/components/ui/badge'

type ActivityItemProps = {
    icon: ReactNode
    title: string
    subtitle: string
    tags: string[]
    variant?: 'card' | 'default'
}

export const ActivityItem = ({
    icon,
    title,
    subtitle,
    tags,
    variant = 'default',
}: ActivityItemProps) => {
    const baseClasses = 'flex items-start gap-4 rounded-xl p-4'
    const containerClasses = variant === 'card'
        ? `${baseClasses} bg-surface-section`
        : `${baseClasses} flex items-center gap-4`

    const iconContainerClasses = variant === 'card'
        ? 'flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary-light'
        : 'h-12 w-12 rounded-xl bg-surface-card flex items-center justify-center'

    const tagContent = variant === 'card'
        ? (
            <div className={'flex flex-wrap gap-1'}>
                {tags.map((tag) => (
                    <Badge
                        key={tag}
                        variant={'outline'}
                        className={'border-border text-xs'}
                    >
                        {tag}
                    </Badge>
                ))}
            </div>
        )
        : (
            <div className={'flex gap-2'}>
                {tags.map((tag) => (
                    <span
                        key={tag}
                        className={
                            'px-3 py-1 rounded-full bg-surface-card text-xs font-medium text-muted-foreground'
                        }
                    >
                        {tag}
                    </span>
                ))}
            </div>
        )

    return (
        <div className={containerClasses}>
            <div className={iconContainerClasses}>
                {icon}
            </div>
            <div className={'flex-1'}>
                <h4 className={'font-medium text-foreground'}>
                    {title}
                </h4>
                <p className={'text-sm text-muted-foreground'}>
                    {subtitle}
                </p>
            </div>
            {tagContent}
        </div>
    )
}
