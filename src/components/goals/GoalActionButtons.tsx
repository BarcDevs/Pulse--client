import { Button } from '@/components/ui/button'

import { recoveryGoalsPageTexts } from '@/constants/componentTexts/recoveryGoals'

type GoalActionButtonsProps = {
    onCompleteTodayAction?: () => void
}

export const GoalActionButtons = ({
    onCompleteTodayAction
}: GoalActionButtonsProps) => (
    <div className={'w-full'}>
        <Button
            onClick={onCompleteTodayAction}
            className={'w-full bg-linear-to-r from-orange-400 to-pink-500 text-white font-semibold'}
        >
            {recoveryGoalsPageTexts.actions.completeToday}
        </Button>
    </div>
)
