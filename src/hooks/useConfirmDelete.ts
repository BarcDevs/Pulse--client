import { useTranslations } from 'next-intl'

import { useGoalsContext } from '@/context/GoalsContext'

import { goalsLocales } from '@/locales/goalsLocales'

export const useConfirmDelete = () => {
    const t = useTranslations()
    const { deleteGoal } = useGoalsContext()

    const handleConfirmDelete = (goalId: string) => {
        const confirmed =
            confirm(t(goalsLocales.goalActions.deleteConfirm))
        if (confirmed)
            deleteGoal(goalId)
    }

    return { handleConfirmDelete }
}
