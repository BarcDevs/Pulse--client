'use client'

import { useEffect } from 'react'

import { ClipboardPlus, Pencil } from 'lucide-react'

import {
    Dialog,
    DialogContent,
    DialogTitle
} from '@/components/ui/dialog'

import { useGoal } from '@/hooks/queries/useGoal'

import { GoalForm } from './GoalForm'

type GoalFormModalProps = {
    isOpen: boolean
    onCloseAction: () => void
    mode: 'create' | 'edit'
    goalId?: string
}

export const GoalFormModal = ({
    isOpen,
    onCloseAction,
    mode,
    goalId
}: GoalFormModalProps) => {
    const {
        data: goal,
        isLoading
    } = useGoal(
        mode === 'edit' ? goalId : null
    )

    useEffect(() => {
        if (mode === 'edit' && !goal && !isLoading) {
            onCloseAction()
        }
    }, [mode, goal, isLoading, onCloseAction])

    const shouldRenderForm = mode === 'create'
        || (mode === 'edit' && !isLoading)

    const IconComponent = mode === 'create'
        ? ClipboardPlus
        : Pencil

    return (
        <Dialog
            open={isOpen}
            onOpenChange={onCloseAction}
        >
            <DialogContent className={'max-w-xl overflow-hidden p-0'}>
                <DialogTitle className={'sr-only'}>
                    {mode === 'create' ? 'Create New Goal' : 'Edit Goal'}
                </DialogTitle>
                <div
                    className={'h-32 flex items-end px-8 relative'}
                    style={{ background: 'linear-gradient(to right, var(--primary-gradient-start), var(--primary-gradient-end))' }}
                >
                    <div className={'w-16 h-16 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-primary-foreground mb-1 shadow-sm'}>
                        <IconComponent className={'w-8 h-8'}/>
                    </div>
                </div>

                <div className={'px-8 pt-12 pb-8'}>
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
