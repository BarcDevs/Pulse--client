'use client'

import { useContext } from 'react'

import { useTranslations } from 'next-intl'

import { MilestoneInput } from '@/types/goals'

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog'

import {
    GoalMilestonesContext
} from '@/context/GoalMilestonesContext'

import { goalsLocales } from '@/locales/goalsLocales'

import { MilestoneForm } from './MilestoneForm'

type AddMilestoneModalProps = {
    open: boolean
    onOpenChangeAction: (open: boolean) => void
    goalId: string
}

export const AddMilestoneModal = ({
    open,
    onOpenChangeAction
}: AddMilestoneModalProps) => {
    const t = useTranslations()
    const milestonesCtx = useContext(
        GoalMilestonesContext
    )

    const handleSubmit = async (
        data: MilestoneInput
    ) => {
        onOpenChangeAction(false)
        await milestonesCtx
            ?.addMilestoneOptimistic(data)
            .catch(() => {})
    }

    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChangeAction}
        >
            <DialogContent showCloseButton={false}>
                <DialogHeader>
                    <DialogTitle>
                        {t(goalsLocales.milestones.formTitle)}
                    </DialogTitle>
                </DialogHeader>
                <div className={'mt-6'}>
                    <MilestoneForm
                        onSubmit={handleSubmit}
                        onCloseAction={
                            () => onOpenChangeAction(false)
                        }
                    />
                </div>
            </DialogContent>
        </Dialog>
    )
}
