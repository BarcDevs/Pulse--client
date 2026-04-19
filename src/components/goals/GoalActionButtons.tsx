'use client'

import { useRouter } from 'next/navigation'

import { Pencil } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { recoveryGoalsPageTexts } from '@/constants/componentTexts/recoveryGoals'
import { ROUTES } from '@/constants/routes'

type GoalActionButtonsProps = {
    goalId: string
    onCompleteTodayAction?: () => void
}

export const GoalActionButtons = ({
    goalId,
    onCompleteTodayAction
}: GoalActionButtonsProps) => {
    const router = useRouter()

    return (
        <div className={'flex flex-col gap-3 w-full sm:flex-row'}>
            <Button
                onClick={onCompleteTodayAction}
                className={'flex-1 bg-linear-to-r from-orange-400 to-pink-500 text-white font-semibold'}
            >
                {recoveryGoalsPageTexts.actions.completeToday}
            </Button>

            <Button
                onClick={() =>
                    router.push(ROUTES.recoveryGoalsEdit(goalId))
                }
                variant={'outline'}
                size={'icon'}
                className={'h-11 w-11'}
                title={recoveryGoalsPageTexts.actions.editPlan}
            >
                <Pencil size={18}/>
            </Button>
        </div>
    )
}
