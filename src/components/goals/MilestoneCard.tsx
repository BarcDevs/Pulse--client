import { Check, Clock } from 'lucide-react'

import { GoalMilestone } from '@/types/goals'

import { Button } from '@/components/ui/button'

import { cn } from '@/lib/utils'

type MilestoneCardProps = {
    milestone: GoalMilestone
    onToggle?: (
        milestoneId: string,
        isCompleted: boolean
    ) => void
}

export const MilestoneCard = ({
    milestone,
    onToggle
}: MilestoneCardProps) => (
    <div className={'bg-surface-section rounded-xl p-6'}>
        <div className={'flex items-start justify-between gap-3'}>
            <div className={'flex-1'}>
                <h3 className={'font-semibold text-sm text-foreground'}>
                    {milestone.title}
                </h3>
            </div>

            <div
                className={
                    cn(
                        'flex-shrink-0',
                        milestone.isCompleted
                            ? 'text-emerald-500'
                            : 'text-amber-500'
                    )
                }
            >
                {milestone.isCompleted ? (
                    <Check className={'h-5 w-5'}/>
                ) : (
                    <Clock className={'h-5 w-5'}/>
                )}
            </div>
        </div>

        <div className={'mt-4'}>
            <Button
                onClick={() =>
                    onToggle?.(
                        milestone.id,
                        !milestone.isCompleted
                    )
                }
                variant={
                    milestone.isCompleted
                        ? 'default'
                        : 'outline'
                }
                size={'sm'}
                className={'w-full'}
            >
                {milestone.isCompleted
                    ? 'Mark Incomplete'
                    : 'Mark Complete'}
            </Button>
        </div>
    </div>
)
