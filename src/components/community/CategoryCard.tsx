import {ReactNode} from 'react'

import {cn} from '@/lib/utils'

type CategoryCardProps = {
    id: string
    icon: ReactNode
    color: string
    title: string
    description: string
    count: string
}

export const CategoryCard = ({
    icon,
    color,
    title,
    description,
    count
}: CategoryCardProps) => (
    <div className={'rounded-2xl bg-surface-card p-5 hover:shadow-md transition-shadow cursor-pointer'}>
        <div className={cn(
            'inline-flex h-12 w-12 items-center justify-center rounded-xl',
            color
        )}>
            {icon}
        </div>
        <h3 className={'mt-3 font-medium text-foreground'}>
            {title}
        </h3>
        <p className={'mt-1 text-sm text-muted-foreground'}>
            {description}
        </p>
        <p className={'mt-2 text-xs text-primary font-medium'}>
            {count}
        </p>
    </div>
)
