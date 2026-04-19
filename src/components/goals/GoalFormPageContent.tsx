'use client'

import { ErrorDisplay } from '@/components/shared/ErrorDisplay'
import { PageHeader } from '@/components/shared/PageHeader'

import { useGoal } from '@/hooks/queries/useGoal'

import { recoveryGoalsPageTexts } from '@/constants/componentTexts/recoveryGoals'
import { ROUTES } from '@/constants/routes'

import { GoalForm } from './GoalForm'
import { GoalFormPageSkeletons } from './GoalFormPageSkeletons'
import { GoalFormSmartTip } from './GoalFormSmartTip'

type GoalFormPageContentProps = {
    mode: 'create' | 'edit'
    goalId?: string
}

export const GoalFormPageContent = ({
    mode,
    goalId
}: GoalFormPageContentProps) => {
    const {
        data: goal,
        isLoading,
        isError,
        error
    } = useGoal(
        mode === 'edit' ? goalId : null
    )

    const title = mode === 'create'
        ? recoveryGoalsPageTexts.goalForm.createTitle
        : recoveryGoalsPageTexts.goalForm.updateTitle

    const isEditMode = mode === 'edit'
    const shouldShowLoading = isEditMode && isLoading
    const shouldShowError = isEditMode && isError
    const shouldShowNotFound = isEditMode && !goal
    const shouldShowForm = !shouldShowLoading
        && !shouldShowError
        && !shouldShowNotFound

    return (
        <div className={'flex-1 p-4 md:p-6 lg:p-8'}>
            <div className={'mx-auto max-w-4xl'}>
                {shouldShowLoading && (
                    <GoalFormPageSkeletons/>
                )}

                {shouldShowError && (
                    <div className={'mx-auto max-w-2xl'}>
                        <ErrorDisplay error={error}/>
                    </div>
                )}

                {shouldShowNotFound && (
                    <div className={'mx-auto max-w-2xl text-center'}>
                        <p className={'text-on-surface-variant'}>
                            Goal not found.
                        </p>
                    </div>
                )}

                {shouldShowForm && (
                    <>
                        <PageHeader
                            title={title}
                            subtitle={
                                recoveryGoalsPageTexts.goalForm.subtitle
                            }
                            backHref={ROUTES.RECOVERY_GOALS}
                            backLabel={
                                recoveryGoalsPageTexts.goalForm.backLabel
                            }
                        />

                        <div className={'grid grid-cols-1 lg:grid-cols-12 gap-8'}>
                            <div className={'lg:col-span-8 space-y-6'}>
                                <div className={'card-base'}>
                                    <GoalForm
                                        goal={
                                            goal || undefined
                                        }
                                    />
                                </div>
                            </div>

                            <div className={'lg:col-span-4'}>
                                <GoalFormSmartTip/>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
