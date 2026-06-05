'use client'

import { useTranslations } from 'next-intl'

import { Goal, GoalStatus } from '@/types/goals'

import { EmptyState } from '@/components/shared/EmptyState'
import { Accordion } from '@/components/ui/accordion'

import { goalsLocales } from '@/locales/goalsLocales'

import { GoalStatusSection } from './GoalStatusSection'

const STATUS_ORDER = [
    GoalStatus.ACTIVE,
    GoalStatus.PAUSED,
    GoalStatus.COMPLETED,
    GoalStatus.ABANDONED
] as const

type GoalsGridProps = {
    goals: Goal[]
    onEditAction: (goalId: string) => void
    onCreateAction?: () => void
}

export const GoalsGrid = ({
    goals,
    onEditAction,
    onCreateAction
}: GoalsGridProps) => {
    const t = useTranslations()

    if (goals.length === 0) {
        return (
            <EmptyState message={t(goalsLocales.emptyState.message)}/>
        )
    }

    const goalsByStatus = STATUS_ORDER.reduce<Record<GoalStatus, Goal[]>>(
        (acc, status) => {
            acc[status] = goals.filter((g) => g.status === status)
            return acc
        },
        {} as Record<GoalStatus, Goal[]>
    )

    const visibleSections = STATUS_ORDER.filter(
        (status) => goalsByStatus[status].length > 0 || status === GoalStatus.ACTIVE
    )

    return (
        <Accordion
            type={'multiple'}
            defaultValue={[GoalStatus.ACTIVE]}
            className={'space-y-3'}
        >
            {visibleSections.map((status) => (
                <GoalStatusSection
                    key={status}
                    status={status}
                    goals={goalsByStatus[status]}
                    onEditAction={onEditAction}
                    onCreateAction={onCreateAction}
                />
            ))}
        </Accordion>
    )
}
