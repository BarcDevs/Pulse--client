'use client'

import { useContext } from 'react'

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

import { MilestoneForm } from './MilestoneForm'

type AddMilestoneModalProps = {
    open: boolean
    onOpenChange: (open: boolean) => void
    goalId: string
}

export const AddMilestoneModal = ({
    open,
    onOpenChange
}: AddMilestoneModalProps) => {
    const milestonesCtx = useContext(
        GoalMilestonesContext
    )

    const handleSubmit = async (
        data: MilestoneInput
    ) => {
        onOpenChange(false)
        await milestonesCtx
            ?.addMilestoneOptimistic(data)
            .catch(() => {})
    }

    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Add a New Milestone
                    </DialogTitle>
                </DialogHeader>
                <div className={'mt-6'}>
                    <MilestoneForm
                        onSubmit={handleSubmit}
                        onCloseAction={
                            () => onOpenChange(false)
                        }
                    />
                </div>
            </DialogContent>
        </Dialog>
    )
}
