'use client'

import { useTranslations } from 'next-intl'

import { Pencil } from 'lucide-react'

import { Button } from '@/components/ui/button'

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
        <Button
            onClick={() => onEdit(goalId)}
            variant={'outline'}
            size={'icon'}
            className={'absolute top-4 right-4 h-9 w-9'}
            title={t(goalsLocales.actions.editPlan)}
        >
            <Pencil size={16} />
        </Button>
    )
}
