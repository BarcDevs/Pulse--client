'use client'

import { ErrorDisplay }
    from '@/components/shared/ErrorDisplay'

import { useGoal } from '@/hooks/queries/useGoal'

import { GoalMilestonesProvider } from '@/context/GoalMilestonesContext'

import { MilestonesSection }
    from './milestones/MilestonesSection'
import { GoalDetailHeader } from './GoalDetailHeader'
import { GoalDetailPageSkeletons }
    from './GoalDetailPageSkeletons'

type GoalDetailPageContentProps = {
    goalId: string
}

export const GoalDetailPageContent = ({
    goalId
}: GoalDetailPageContentProps) => {
    const {
        data: goal,
        isLoading,
        isError,
        error
    } = useGoal(goalId)

    if (isLoading) return <GoalDetailPageSkeletons/>

    if (isError)
        return (
            <div className={'p-8 md:p-12 max-w-6xl mx-auto w-full'}>
                <ErrorDisplay error={error}/>
            </div>
        )

    if (!goal) return null

    return (
        <GoalMilestonesProvider
            goalId={goal.id}
            initialMilestones={goal.milestones || []}
        >
            <div className={'p-8 md:p-12 max-w-6xl mx-auto w-full'}>
                <GoalDetailHeader goal={goal}/>
                <MilestonesSection/>
            </div>
        </GoalMilestonesProvider>
    )
}