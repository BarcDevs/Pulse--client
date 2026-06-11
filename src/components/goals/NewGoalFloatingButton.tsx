'use client'

import { useTranslations } from 'next-intl'

import { Sparkles } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { goalsLocales } from '@/locales/goalsLocales'

type NewGoalFloatingButtonProps = {
    onClickAction: () => void
}

export const NewGoalFloatingButton = ({
    onClickAction
}: NewGoalFloatingButtonProps) => {
    const t = useTranslations()

    return (
        <Button
            onClick={onClickAction}
            size={'icon'}
            aria-label={t(goalsLocales.overview.newGoalButton)}
            className={'fixed bottom-24 end-4 sm:hidden size-14 rounded-full bg-linear-to-r from-primary-gradient-start to-primary-gradient-end text-primary-foreground shadow-lg shadow-blue-500/30 z-40'}
        >
            <Sparkles className={'size-6'}/>
        </Button>
    )
}
