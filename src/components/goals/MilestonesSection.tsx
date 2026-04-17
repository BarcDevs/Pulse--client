import { ChevronRight } from 'lucide-react'

import { GoalMilestone } from '@/types/goals'

import { Button } from '@/components/ui/button'

import { recoveryGoalsPageTexts } from '@/constants/componentTexts/recoveryGoals'

import { MilestoneCard } from './MilestoneCard'

type MilestonesSectionProps = {
    milestones: GoalMilestone[]
    onViewAll?: () => void
    onToggleMilestone?: (
        milestoneId: string,
        isCompleted: boolean
    ) => void
}

export const MilestonesSection = ({
    milestones,
    onViewAll,
    onToggleMilestone
}: MilestonesSectionProps) => (
    <div className={'md:col-span-12'}>
        <div className={'flex items-center justify-between mb-6'}>
            <div>
                <h2 className={'text-xl font-bold text-white'}>
                    {recoveryGoalsPageTexts.milestones.title}
                </h2>

                <p className={'text-sm text-white/60 mt-1'}>
                    {recoveryGoalsPageTexts.milestones.subtitle}
                </p>
            </div>

            <Button
                variant={'ghost'}
                onClick={onViewAll}
                className={'text-white/70 hover:text-white'}
            >
                {recoveryGoalsPageTexts.milestones.viewAll}

                <ChevronRight className={'ml-2 h-4 w-4'}/>
            </Button>
        </div>

        <div className={'grid grid-cols-1 md:grid-cols-3 gap-6'}>
            {milestones.map((milestone) => (
                <MilestoneCard
                    key={milestone.id}
                    milestone={milestone}
                    onToggle={onToggleMilestone}
                />
            ))}
        </div>
    </div>
)
