'use client'

import { EmptyState } from '@/components/shared/EmptyState'
import { ErrorStateCard } from '@/components/shared/ErrorStateCard'
import { Skeleton } from '@/components/ui/skeleton'

import { useRecoveryGoalsData } from '@/hooks/useRecoveryGoalsData'

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
    const {
        goals,
        activeGoal,
        overallPercentage,
        isLoading,
        isError,
        error,
        handleToggleMilestone
    } = useRecoveryGoalsData()

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

            {isError && (
                <div className={'mt-8 max-w-md mx-auto'}>
                    <ErrorStateCard error={error}/>
                </div>
            )}

            {!isLoading && !isError && !activeGoal && (
                <EmptyState
                    message={
                        recoveryGoalsPageTexts.emptyState.message
                    }
                    className={'py-12'}
                />
            )}

            {!isLoading && !isError && activeGoal && (
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
