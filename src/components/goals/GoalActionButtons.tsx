'use client'

import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'

import { goalsLocales } from '@/locales/goalsLocales'

type GoalActionButtonsProps = {
    onCompleteTodayAction?: () => void
}

export const GoalActionButtons = ({
    onCompleteTodayAction
}: GoalActionButtonsProps) => {
    const t = useTranslations()

    return (
        <div className={'w-full'}>
            <Button
                onClick={onCompleteTodayAction}
                className={'w-full bg-linear-to-r from-orange-400 to-pink-500 text-white font-semibold'}
            >
                {t(goalsLocales.actions.completeToday)}
            </Button>
        </div>
    )
}
