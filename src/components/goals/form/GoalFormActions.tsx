'use client'

import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'

import  { recoveryGoalsPageTexts as pageTexts }
    from '@/constants/componentTexts/recoveryGoals'
import { ROUTES } from '@/constants/routes'

type GoalFormActionsProps = {
    isSubmitting: boolean
    isUpdate: boolean
    onCloseAction?: () => void
}

export const GoalFormActions = ({
    isSubmitting,
    isUpdate,
    onCloseAction
}: GoalFormActionsProps) => {
    const router = useRouter()

    const handleCancel = () => {
        if (onCloseAction) {
            onCloseAction()
        } else {
            router.push(ROUTES.RECOVERY_GOALS)
        }
    }

    return (
        <div className={'flex items-center justify-end gap-4 pt-8'}>
            <Button
                type={'button'}
                variant={'ghost'}
                onClick={handleCancel}
                disabled={isSubmitting}
            >
                {pageTexts.goalForm.buttons.cancel}
            </Button>

            <Button
                type={'submit'}
                disabled={isSubmitting}
                className={'bg-linear-to-br from-primary to-primary-container text-primary-foreground'}
            >
                {isSubmitting
                    ? (isUpdate
                        ? pageTexts.goalForm.buttons.updating
                        : pageTexts.goalForm.buttons.creating)
                    : (isUpdate
                        ? pageTexts.goalForm.buttons.update
                        : pageTexts.goalForm.buttons.create)}
            </Button>
        </div>
    )
}
