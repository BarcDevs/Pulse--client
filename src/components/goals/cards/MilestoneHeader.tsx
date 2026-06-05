import { Check, Clock } from 'lucide-react'

import { cn } from '@/lib/utils'

type MilestoneHeaderProps = {
    title: string
    isCompleted: boolean
}

export const MilestoneHeader = ({
    title,
    isCompleted
}: MilestoneHeaderProps) => (
    <div className={'flex items-start justify-between gap-3'}>
        <div className={'flex-1'}>
            <h3 className={'font-semibold text-sm text-foreground'}>
                {title}
            </h3>
        </div>

        <div
            className={cn(
                'shrink-0',
                isCompleted
                    ? 'text-emerald-500'
                    : 'text-amber-500'
            )
            }
        >
            {isCompleted ? (
                <Check className={'h-5 w-5'}/>
            ) : (
                <Clock className={'h-5 w-5'}/>
            )}
        </div>
    </div>
)
