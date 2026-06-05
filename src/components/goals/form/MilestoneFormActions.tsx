'use client'

import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'

import { goalsLocales } from '@/locales/goalsLocales'

type MilestoneFormActionsProps = {
    isSubmitting?: boolean
    onCloseAction?: () => void
}

export const MilestoneFormActions = ({
    isSubmitting = false,
    onCloseAction
}: MilestoneFormActionsProps) => {
    const t = useTranslations()

    return (
        <div className={'flex gap-3'}>
            <Button
                type={'submit'}
                disabled={isSubmitting}
                className={'flex-1'}
            >
                {isSubmitting
                    ? t(goalsLocales.milestones.addingButton)
                    : t(goalsLocales.milestones.addButton)}
            </Button>
            {onCloseAction && (
                <Button
                    type={'button'}
                    variant={'outline'}
                    disabled={isSubmitting}
                    onClick={onCloseAction}
                    className={'flex-1'}
                >
                    {t(goalsLocales.goalForm.buttons.cancel)}
                </Button>
            )}
        </div>
    )
}
