'use client'

import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'

import { recoveryGoalsPageTexts } from '@/constants/componentTexts/recoveryGoals'
import { ROUTES } from '@/constants/routes'

type GoalFormActionsProps = {
    isSubmitting: boolean
    isUpdate: boolean
}

export const GoalFormActions = ({
    isSubmitting,
    isUpdate
}: GoalFormActionsProps) => {
    const router = useRouter()

    const handleCancel = () => {
        router.push(ROUTES.RECOVERY_GOALS)
    }

    return (
        <div className={'flex flex-col sm:flex-row gap-4 pt-4'}>
            <Button
                type={'submit'}
                disabled={isSubmitting}
                className={'flex-1 sm:flex-initial bg-primary hover:bg-primary/90 text-white'}
            >
                {isSubmitting
                    ? (isUpdate
                        ? recoveryGoalsPageTexts.goalForm.buttons.updating
                        : recoveryGoalsPageTexts.goalForm.buttons.creating)
                    : (isUpdate
                        ? recoveryGoalsPageTexts.goalForm.buttons.update
                        : recoveryGoalsPageTexts.goalForm.buttons.create)}
            </Button>

            <Button
                type={'button'}
                variant={'outline'}
                onClick={handleCancel}
                disabled={isSubmitting}
                className={'flex-1 sm:flex-initial'}
            >
                {recoveryGoalsPageTexts.goalForm.buttons.cancel}
            </Button>
        </div>
    )
}
