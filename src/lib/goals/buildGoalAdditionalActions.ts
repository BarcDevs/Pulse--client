import {
    Ban,
    Pause,
    Play,
    RotateCcw,
    Undo2
} from 'lucide-react'

import { AdditionalAction } from '@/types/actionMenu'
import {
    Goal,
    GoalStatus
} from '@/types/goals'

import { goalsLocales } from '@/locales/goalsLocales'

export type GoalActionLabels = {
    pause: string
    activate: string
    abandon: string
    abandonConfirm: string
    reopen: string
    restore: string
}

export type GoalActionCallbacks = {
    pauseGoal: (id: string) => void
    activateGoal: (id: string) => void
    abandonGoal: (id: string) => void
    reopenGoal: (id: string) => void
    restoreGoal: (id: string) => void
}

export const buildGoalAdditionalActions = (
    goal: Goal,
    labels: GoalActionLabels,
    callbacks: GoalActionCallbacks
): AdditionalAction[] => {
    const isActive = goal.status === GoalStatus.ACTIVE
    const isPaused = goal.status === GoalStatus.PAUSED
    const isCompleted = goal.status === GoalStatus.COMPLETED
    const isAbandoned = goal.status === GoalStatus.ABANDONED

    return [
        ...(isActive ? [{
            id: 'pause',
            label: labels.pause,
            icon: Pause,
            action: async () => callbacks.pauseGoal(goal.id)
        }] : []),
        ...(isPaused ? [{
            id: 'activate',
            label: labels.activate,
            icon: Play,
            action: async () => callbacks.activateGoal(goal.id)
        }] : []),
        ...((isActive || isPaused) ? [{
            id: 'abandon',
            label: labels.abandon,
            icon: Ban,
            action: async () => callbacks.abandonGoal(goal.id),
            destructive: true,
            requiresConfirmation: true,
            confirmTitle: labels.abandon,
            confirmDescription: labels.abandonConfirm
        }] : []),
        ...(isCompleted ? [{
            id: 'reopen',
            label: labels.reopen,
            icon: RotateCcw,
            action: async () => callbacks.reopenGoal(goal.id)
        }] : []),
        ...(isAbandoned ? [{
            id: 'restore',
            label: labels.restore,
            icon: Undo2,
            action: async () => callbacks.restoreGoal(goal.id)
        }] : [])
    ]
}

export const getGoalCardAdditionalActions = (
    goal: Goal,
    t: (key: string) => string,
    callbacks: GoalActionCallbacks
): AdditionalAction[] => {
    const labels: GoalActionLabels = {
        pause: t(goalsLocales.goalActions.pause),
        activate: t(goalsLocales.goalActions.activate),
        abandon: t(goalsLocales.goalActions.abandon),
        abandonConfirm: t(goalsLocales.goalActions.abandonConfirm),
        reopen: t(goalsLocales.goalActions.reopen),
        restore: t(goalsLocales.goalActions.restore)
    }

    return buildGoalAdditionalActions(
        goal,
        labels,
        callbacks
    )
}
