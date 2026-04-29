'use client'

import {
    GoalMilestone,
    MilestoneStatus
} from '@/types/goals'

import { useGoalMutations } from '@/hooks/mutations/useGoalMutations'

import { MilestoneCard } from '../cards/MilestoneCard'

type MilestonesSectionProps = {
    goalId: string
    milestones: GoalMilestone[]
}

export const MilestonesSection = ({
    goalId,
    milestones
}: MilestonesSectionProps) => {
    const { updateMilestone } = useGoalMutations()

    const handleCompleteMilestone = async (
        milestoneId: string
    ) => {
        try {
            await updateMilestone.mutateAsync({
                goalId,
                milestoneId,
                data: { status: MilestoneStatus.COMPLETED }
            })
        } catch (err) {
            console.error('Failed to complete milestone:', err)
        }
    }

    const sortedMilestones = [...milestones]
        .sort((a, b) => a.order - b.order)

    return (
        <section className={'space-y-4 mb-16 relative'}>
            <div className={'absolute left-10 top-8 bottom-8 w-0.5 bg-surface-container-highest z-0'}/>

            <div className={'space-y-4'}>
                {sortedMilestones.map((milestone) => (
                    <MilestoneCard
                        key={milestone.id}
                        milestone={milestone}
                        onCompleteAction={() => handleCompleteMilestone(milestone.id)}
                    />
                ))}
            </div>
        </section>
    )
}
