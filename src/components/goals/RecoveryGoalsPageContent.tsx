'use client'

import { Skeleton } from '@/components/ui/skeleton'

import { useGoalMutations } from '@/hooks/mutations/useGoalMutations'
import { useGoals } from '@/hooks/queries/useGoals'

import {
    getBadge,
    getProgressPercentage
} from '@/lib/goals'

import { recoveryGoalsPageTexts } from '@/constants/componentTexts/recoveryGoals'

import { MainProgressCard } from './MainProgressCard'
import { MilestonesSection } from './MilestonesSection'
import { RecoveryGoalsHeader } from './RecoveryGoalsHeader'
import { StatSummaryCard } from './StatSummaryCard'

export const RecoveryGoalsPageContent = () => {
    const { data: goalsResponse, isLoading } = useGoals()
    const { updateMilestone } = useGoalMutations()

    const goals = goalsResponse?.data || []
    const activeGoal = goals[0]
    const overallPercentage = activeGoal
        ? getProgressPercentage(activeGoal) : 0

    const handleToggleMilestone = (
        goalId: string,
        milestoneId: string,
        isCompleted: boolean
    ) => {
        updateMilestone.mutate({
            goalId,
            milestoneId,
            data: { isCompleted }
        })
    }

    return (
        <div className={'p-8 md:p-12 max-w-7xl mx-auto w-full'}>
            <RecoveryGoalsHeader
                description={
                    recoveryGoalsPageTexts.header.description
                }
            />

            {isLoading && (
                <div className={'grid grid-cols-1 md:grid-cols-12 gap-6 mt-8'}>
                    <Skeleton className={'md:col-span-8 h-64 rounded-xl'}/>
                    <Skeleton className={'md:col-span-4 h-64 rounded-xl'}/>
                </div>
            )}

            {!isLoading && !activeGoal && (
                <div className={'text-center py-12 text-on-surface-variant'}>
                    <p className={'text-lg'}>
                        {recoveryGoalsPageTexts.emptyState.message}
                    </p>
                </div>
            )}

            {!isLoading && activeGoal && (
                <div className={'grid grid-cols-1 md:grid-cols-12 gap-6 mt-8'}>
                    <MainProgressCard
                        goal={activeGoal}
                        overallPercentage={overallPercentage}
                        badge={getBadge(overallPercentage)}
                    />

                    <StatSummaryCard
                        data={{
                            title:
                            recoveryGoalsPageTexts.statSummary
                                .title,
                            description:
                            recoveryGoalsPageTexts.statSummary
                                .description,
                            categories: goals.map(
                                (goal) => ({
                                    label: goal.title,
                                    percentage:
                                        getProgressPercentage(goal)
                                })
                            )
                        }}
                    />

                    <MilestonesSection
                        milestones={activeGoal.milestones}
                        onToggleMilestone={(
                            milestoneId,
                            isCompleted
                        ) =>
                            handleToggleMilestone(
                                activeGoal.id,
                                milestoneId,
                                isCompleted
                            )
                        }
                    />
                </div>
            )}
        </div>
    )
}
