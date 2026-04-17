import { Button } from '@/components/ui/button'

import { recoveryGoalsPageTexts } from '@/constants/componentTexts/recoveryGoals'

type GoalActionButtonsProps = {
    onCompleteToday?: () => void
    onEditPlan?: () => void
}

export const GoalActionButtons = ({
    onCompleteToday,
    onEditPlan
}: GoalActionButtonsProps) => (
    <div className={'flex flex-col gap-3 w-full sm:flex-row'}>
        <Button
            onClick={onCompleteToday}
            className={'flex-1 bg-linear-to-r from-orange-400 to-pink-500 text-white font-semibold'}
        >
            {recoveryGoalsPageTexts.actions.completeToday}
        </Button>

        <Button
            onClick={onEditPlan}
            className={'flex-1 bg-surface-section text-foreground hover:bg-surface-section/80'}
        >
            {recoveryGoalsPageTexts.actions.editPlan}
        </Button>
    </div>
)
