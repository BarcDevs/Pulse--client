import { Milestone } from '@/types/goals'

import { MilestoneProgressBar } from './MilestoneProgressBar'

type MilestoneCardProps = {
    milestone: Milestone
}

export const MilestoneCard = ({
    milestone
}: MilestoneCardProps) => (
    <div className={'bg-surface-section rounded-xl p-6'}>
        <div className={'flex flex-col gap-2 mb-4'}>
            <h3 className={'font-semibold text-sm text-foreground'}>
                {milestone.title}
            </h3>

            <p className={'text-xs text-foreground/60'}>
                {milestone.description}
            </p>
        </div>

        <div className={'flex items-center gap-2'}>
            <MilestoneProgressBar
                percentage={milestone.progressPercentage}
                color={milestone.progressColor}
            />

            <span className={'text-xs font-semibold text-foreground min-w-fit'}>
                {milestone.progressPercentage}%
            </span>
        </div>
    </div>
)
