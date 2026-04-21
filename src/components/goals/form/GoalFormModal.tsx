'use client'

import { useEffect } from 'react'

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog'

import { useGoal } from '@/hooks/queries/useGoal'

import { recoveryGoalsPageTexts } from '@/constants/componentTexts/recoveryGoals'

import { GoalForm } from './GoalForm'

type GoalFormModalProps = {
    isOpen: boolean
    onClose: () => void
    mode: 'create' | 'edit'
    goalId?: string
}

export const GoalFormModal = ({
    isOpen,
    onClose,
    mode,
    goalId
}: GoalFormModalProps) => {
    const {
        data: goal,
        isLoading
    } = useGoal(
        mode === 'edit' ? goalId : null
    )

    const title = mode === 'create'
        ? recoveryGoalsPageTexts.goalForm.createTitle
        : recoveryGoalsPageTexts.goalForm.updateTitle

    useEffect(() => {
        if (mode === 'edit' && !goal && !isLoading) {
            onClose()
        }
    }, [mode, goal, isLoading, onClose])

    const shouldRenderForm = mode === 'create'
        || (mode === 'edit' && !isLoading)

    return (
        <Dialog
            open={isOpen}
            onOpenChange={onClose}
        >
            <DialogContent className={'max-w-xl data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0'}>
                <DialogHeader>
                    <DialogTitle>
                        {title}
                    </DialogTitle>
                </DialogHeader>

                {shouldRenderForm && (
                    <div className={'mt-2'}>
                        <GoalForm
                            goal={goal || undefined}
                            onSuccess={onClose}
                        />
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}
