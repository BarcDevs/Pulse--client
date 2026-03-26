import {LucideIcon} from 'lucide-react'

import {ActivityTagsList} from './ActivityTagsList'

type ActivityItemProps = {
    icon: LucideIcon
    title: string
    subtitle: string
    tags: string[]
    variant?: 'card' | 'default'
}

export const ActivityItem = ({
    icon: Icon,
    title,
    subtitle,
    tags,
    variant = 'default'
}: ActivityItemProps) => {
    const baseClasses = 'flex items-start gap-4 rounded-xl p-4'
    const containerClasses = variant === 'card' ?
        `${baseClasses} bg-surface-section` :
        `${baseClasses} flex items-center gap-4`

    const iconContainerClasses = variant === 'card' ?
        'flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary-light' :
        'h-12 w-12 rounded-xl bg-surface-card flex items-center justify-center'

    return (
        <div className={containerClasses}>
            <div className={iconContainerClasses}>
                <Icon className={'h-6 w-6 text-primary'}/>
            </div>
            <div className={'flex-1'}>
                <h4 className={'font-medium text-foreground'}>
                    {title}
                </h4>
                <p className={'text-sm text-muted-foreground'}>
                    {subtitle}
                </p>
            </div>
            <ActivityTagsList
                tags={tags}
                variant={variant}
            />
        </div>
    )
}
