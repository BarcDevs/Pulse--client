'use client'

import { useTranslations } from 'next-intl'

import { Goal } from '@/types/goals'

import {
    Dialog,
    DialogContent,
    DialogTitle
} from '@/components/ui/dialog'

import { goalsLocales } from '@/locales/goalsLocales'

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
    const t = useTranslations()
    const shouldRenderForm = mode === 'create'
        || (mode === 'edit' && goal)

    const title = mode === 'create'
        ? t(goalsLocales.goalForm.createTitle)
        : t(goalsLocales.goalForm.updateTitle)

    return (
        <Dialog
            open={isOpen}
            onOpenChange={onCloseAction}
        >
            <DialogContent
                className={'max-w-xl overflow-hidden p-0'}
                showCloseButton={false}
            >
                <DialogTitle className={'sr-only'}>
                    {title}
                </DialogTitle>
                <GoalFormHeader
                    mode={mode}
                    title={title}
                    subtitle={t(goalsLocales.goalForm.subtitle)}
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
