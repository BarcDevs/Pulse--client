'use client'

import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'

import { ROUTES } from '@/constants/routes'

import { goalsLocales } from '@/locales/goalsLocales'

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
    const t = useTranslations()
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
                {t(goalsLocales.goalForm.buttons.cancel)}
            </Button>

            <Button
                type={'submit'}
                disabled={isSubmitting}
                className={'bg-linear-to-br from-primary to-primary/80 text-primary-foreground'}
            >
                {isSubmitting
                    ? (isUpdate
                        ? t(goalsLocales.goalForm.buttons.updating)
                        : t(goalsLocales.goalForm.buttons.creating))
                    : (isUpdate
                        ? t(goalsLocales.goalForm.buttons.update)
                        : t(goalsLocales.goalForm.buttons.create))}
            </Button>
        </div>
    )
}
