import { GoalMilestone } from '@/types/goals'

import { Button } from '@/components/ui/button'

import { recoveryGoalsPageTexts } from '@/constants/componentTexts/recoveryGoals'

import { MilestoneHeader } from './MilestoneHeader'

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
    <div className={'bg-surface-container-low rounded-xl p-6 border border-surface-variant'}>
        <MilestoneHeader
            title={milestone.title}
            isCompleted={milestone.isCompleted}
        />

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
                    ? recoveryGoalsPageTexts.milestones
                        .markIncomplete
                    : recoveryGoalsPageTexts.milestones
                        .markComplete}
            </Button>
        </div>
    </div>
)
