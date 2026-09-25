'use client'

import { useTranslations } from 'next-intl'

import { Pencil } from 'lucide-react'

import { IconButton } from '@/components/shared/buttons/IconButton'

import { goalsLocales } from '@/locales/goalsLocales'

type EditGoalButtonProps = {
    goalId: string
    onEdit: (goalId: string) => void
}

export const EditGoalButton = ({
    goalId,
    onEdit
}: EditGoalButtonProps) => {
    const t = useTranslations()

    return (
        <IconButton
            outlined
            onClick={() => onEdit(goalId)}
            className={'absolute top-4 end-4'}
            title={t(goalsLocales.actions.editPlan)}
        >
            <Pencil size={16} />
        </IconButton>
    )
}
