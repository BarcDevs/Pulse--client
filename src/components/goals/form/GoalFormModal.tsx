'use client'

import { Goal } from '@/types/goals'

import {
    Dialog,
    DialogContent,
    DialogTitle
} from '@/components/ui/dialog'

import { recoveryGoalsPageTexts as pageTexts }
    from '@/constants/componentTexts/recoveryGoals'

import { GoalForm } from './GoalForm'
import { GoalFormHeader } from './GoalFormHeader'

type GoalFormModalProps = {
    isOpen: boolean
    onCloseAction: () => void
    mode: 'create' | 'edit'
    goal?: Goal
}

export const GoalFormModal = ({
    isOpen,
    onCloseAction,
    mode,
    goal
}: GoalFormModalProps) => {
    const shouldRenderForm = mode === 'create' || (mode === 'edit' && goal)

    const title = mode === 'create'
        ? pageTexts.goalForm.createTitle
        : pageTexts.goalForm.updateTitle

    return (
        <Dialog
            open={isOpen}
            onOpenChange={onCloseAction}
        >
            <DialogContent className={'max-w-xl overflow-hidden p-0'}>
                <DialogTitle className={'sr-only'}>
                    {mode === 'create' ? 'Create New Goal' : 'Edit Goal'}
                </DialogTitle>
                <GoalFormHeader
                    mode={mode}
                    title={title}
                    subtitle={pageTexts.goalForm.subtitle}
                />

                <div className={'px-8 pt-8 pb-8'}>
                    {shouldRenderForm && (
                        <GoalForm
                            goal={goal || undefined}
                            onSuccessAction={onCloseAction}
                            onCloseAction={onCloseAction}
                        />
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
}
