import { useRecoveryGoalsData } from '@/hooks/useRecoveryGoalsData'

import { MilestoneCard } from '../cards/MilestoneCard'

import { MilestonesHeader } from './MilestonesHeader'

type MilestonesSectionProps = {
    onViewAll?: () => void
}

export const MilestonesSection = ({
    onViewAll
}: MilestonesSectionProps) => {
    const {
        activeGoal,
        handleToggleMilestone
    } = useRecoveryGoalsData()

    if (!activeGoal || !activeGoal.milestones)
        return null

    const milestones = activeGoal.milestones

    return (
        <div className={'md:col-span-12'}>
            <MilestonesHeader onViewAll={onViewAll} />

            <div className={'grid grid-cols-1 md:grid-cols-3 gap-6'}>
                {milestones.map((milestone) => (
                    <MilestoneCard
                        key={milestone.id}
                        milestone={milestone}
                        onToggle={(
                            milestoneId,
                            isCompleted
                        ) => handleToggleMilestone(
                            activeGoal.id,
                            milestoneId,
                            isCompleted
                        )}
                    />
                ))}
            </div>
        </div>
    )
}
