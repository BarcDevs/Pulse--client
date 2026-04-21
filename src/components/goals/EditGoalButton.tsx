import { Pencil } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { recoveryGoalsPageTexts } from '@/constants/componentTexts/recoveryGoals'

type EditGoalButtonProps = {
    goalId: string
    onEdit: (goalId: string) => void
}

export const EditGoalButton = ({
    goalId,
    onEdit
}: EditGoalButtonProps) => (
    <Button
        onClick={() => onEdit(goalId)}
        variant={'outline'}
        size={'icon'}
        className={'absolute top-4 right-4 h-9 w-9'}
        title={
            recoveryGoalsPageTexts.actions.editPlan
        }
    >
        <Pencil size={16} />
    </Button>
)
