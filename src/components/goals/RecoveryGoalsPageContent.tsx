'use client'

import { EmptyState } from '@/components/shared/EmptyState'
import { ErrorDisplay } from '@/components/shared/ErrorDisplay'
import { Skeleton } from '@/components/ui/skeleton'

import { useRecoveryGoalsData } from '@/hooks/useRecoveryGoalsData'
import { useRecoveryGoalsModal } from '@/hooks/useRecoveryGoalsModal'

import { getProgressPercentage } from '@/lib/goals'

import { recoveryGoalsPageTexts } from '@/constants/componentTexts/recoveryGoals'

import { MainProgressCard } from './cards/MainProgressCard'
import { StatSummaryCard } from './cards/StatSummaryCard'
import { GoalFormModal } from './form/GoalFormModal'
import { MilestonesSection } from './milestones/MilestonesSection'
import { RecoveryGoalsHeader } from './RecoveryGoalsHeader'

export const RecoveryGoalsPageContent = () => {
    const {
        goals,
        activeGoal,
        isLoading,
        isError,
        error
    } = useRecoveryGoalsData()

    const {
        isModalOpen,
        editingGoalId,
        onCloseModal,
        onOpenEditModal,
        modalMode
    } = useRecoveryGoalsModal()

    return (
        <>
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
                        <ErrorDisplay error={error}/>
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
                            onEditGoal={onOpenEditModal}
                        />

                        <StatSummaryCard
                            data={{
                                title: recoveryGoalsPageTexts.statSummary.title,
                                description: recoveryGoalsPageTexts.statSummary.description,
                                goal: goals.map((goal) => ({
                                    label: goal.title,
                                    percentage: getProgressPercentage(goal)
                                }))
                            }}
                        />

                        <MilestonesSection/>
                    </div>
                )}
            </div>

            <GoalFormModal
                isOpen={isModalOpen}
                onClose={onCloseModal}
                mode={modalMode}
                goalId={editingGoalId}
            />
        </>
    )
}
