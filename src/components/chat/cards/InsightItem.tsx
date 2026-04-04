import { LucideIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

type InsightItemProps = {
    icon: LucideIcon
    iconBg: string
    label: string
    title: string
    description: string
}

export const InsightItem = ({
    icon: Icon,
    iconBg,
    label,
    title,
    description
}: InsightItemProps) => (
    <div className={'flex gap-3'}>
        <div className={cn(
            'flex size-8 shrink-0 items-center justify-center rounded-lg',
            iconBg
        )}>
            <Icon className={'size-4'}/>
        </div>
        <div>
            <p
                className={'text-xs font-medium uppercase'}
                style={{ color: 'currentColor' }}
            >
                {label}
            </p>
            <p className={'text-sm font-semibold text-foreground'}>
                {title}
            </p>
            <p className={'text-xs text-muted-foreground'}>
                {description}
            </p>
        </div>
    </div>
)
