'use client'

import { useTranslations } from 'next-intl'

import { Sparkles } from 'lucide-react'

import { FabButton } from '@/components/shared/buttons/FabButton'

import { goalsLocales } from '@/locales/goalsLocales'

type NewGoalFloatingButtonProps = {
    onClickAction: () => void
}

export const NewGoalFloatingButton = ({
    onClickAction
}: NewGoalFloatingButtonProps) => {
    const t = useTranslations()

    return (
        <FabButton
            onClick={onClickAction}
            aria-label={t(goalsLocales.overview.newGoalButton)}
        >
            <Sparkles className={'size-6'}/>
        </FabButton>
    )
}
