import {ComponentType} from 'react'

import {cn} from '@/lib/utils'

type MilestoneCardProps = {
    icon: ComponentType<{className?: string}>
    title: string
    description: string
    achieved: boolean
    iconBg: string
    iconColor: string
}

export const MilestoneCard = ({
    icon: Icon,
    title,
    description,
    achieved,
    iconBg,
    iconColor
}: MilestoneCardProps) => (
    <div
        className={cn(
            'flex flex-col items-center rounded-xl p-6 text-center',
            achieved ?
                'bg-surface-section' :
                'bg-muted opacity-60'
        )}
    >
        <div
            className={cn(
                'flex size-12 items-center justify-center rounded-xl',
                iconBg
            )}
        >
            <Icon className={cn('size-6', iconColor)}/>
        </div>
        <h4 className={'mt-3 font-semibold text-foreground'}>
            {title}
        </h4>
        <p className={'mt-1 text-sm text-muted-foreground'}>
            {description}
        </p>
    </div>
)
