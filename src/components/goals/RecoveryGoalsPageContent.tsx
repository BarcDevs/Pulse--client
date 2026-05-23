'use client'

import { useTranslations } from 'next-intl'

import { GoalsFilter } from '@/components/goals/GoalsFilter'
import { RecoveryGoalsSkeletons } from '@/components/goals/RecoveryGoalsSkeletons'
import { ErrorDisplay } from '@/components/shared/ErrorDisplay'

import { useGoalFiltering } from '@/hooks/useGoalFiltering'
import { useRecoveryGoalsModal } from '@/hooks/useRecoveryGoalsModal'

import { useGoalsContext } from '@/context/GoalsContext'

import { goalsLocales } from '@/locales/goalsLocales'

import { GoalFormModal } from './form/GoalFormModal'
import { GoalInsightsSection } from './GoalInsightsSection'
import { GoalsGrid } from './GoalsGrid'
import { GoalStatsSection } from './GoalStatsSection'

export const RecoveryGoalsPageContent = () => {
    const t = useTranslations()
    const {
        goals,
        isLoading,
        isError,
        error,
        deleteGoal,
        isPending
    } = useGoalsContext()

    const {
        isModalOpen,
        editingGoalId,
        onCloseModal,
        onOpenEditModal,
        modalMode,
        onOpenCreateModal
    } = useRecoveryGoalsModal()

    const {
        selectedStatuses,
        toggleStatus,
        filteredGoals
    } = useGoalFiltering(goals)

    const editingGoal =
        filteredGoals.find((g) => g.id === editingGoalId)

    return (
        <>
            <div className={'p-8 md:p-12 max-w-7xl mx-auto w-full'}>
                <div className={'flex justify-between items-end mb-8'}>
                    <div>
                        <h3 className={'text-3xl font-display font-bold tracking-tight text-on-surface'}>
                            {t(goalsLocales.overview.greeting)}
                        </h3>
                        <p className={'text-on-surface-variant mt-1'}>
                            {t(goalsLocales.overview.subtitle)}
                        </p>
                    </div>
                    <GoalsFilter
                        selectedStatuses={selectedStatuses}
                        toggleStatus={toggleStatus}
                        onOpenCreateModal={onOpenCreateModal}
                    />
                </div>

                {isLoading && (
                    <RecoveryGoalsSkeletons/>
                )}

                {isError && (
                    <ErrorDisplay error={error}/>
                )}

                {!isLoading && !isError && (
                    <div className={'grid grid-cols-1 lg:grid-cols-12 gap-8'}>
                        <div className={'lg:col-span-8'}>
                            <GoalsGrid
                                goals={filteredGoals}
                                onEditAction={onOpenEditModal}
                                onDeleteAction={deleteGoal}
                                isDeleting={isPending}
                                onCreateAction={onOpenCreateModal}
                            />
                        </div>

                        <div className={'lg:col-span-4 space-y-6'}>
                            <GoalInsightsSection/>
                            <GoalStatsSection/>
                        </div>
                    </div>
                )}
            </div>

            <GoalFormModal
                isOpen={isModalOpen}
                onCloseAction={onCloseModal}
                mode={modalMode}
                goal={editingGoal}
            />
        </>
    )
}
