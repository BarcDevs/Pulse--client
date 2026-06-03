'use client'

import {
    createContext,
    useContext,
    useOptimistic,
    useRef,
    useTransition
} from 'react'

import { useTranslations } from 'next-intl'

import {
    Goal,
    GoalCategory,
    GoalStatus
} from '@/types/goals'
import {
    ContextProps,
    OptimisticActionMap
} from '@/types/react'

import { useGoalMutations } from '@/hooks/mutations/useGoalMutations'
import { useGoals } from '@/hooks/queries/useGoals'

import { sortGoalsByStatus } from '@/lib/goals/sortGoalsByStatus'

import { withOptimisticToast } from '@/utils/optimisticToast'

import { globalLocales } from '@/locales/globalLocales'
import { goalsLocales } from '@/locales/goalsLocales'
import { GoalSchema } from '@/validations/forms/goalSchema'

type OptimisticAction = OptimisticActionMap<{
    add: { goal: Goal }
    replace: {
        tempId: string
        goal: Goal
    }
    update: {
        goalId: string
        partial: Partial<Goal>
    }
    delete: { goalId: string }
}>

type GoalsContextType = {
    goals: Goal[]
    isLoading: boolean
    isError: boolean
    error: Error | null
    isPending: boolean
    addGoal: (data: GoalSchema) => Promise<void>
    updateGoal: (
        goalId: string,
        data: Partial<GoalSchema>
    ) => Promise<void>
    deleteGoal: (goalId: string) => Promise<void>
    activateGoal: (goalId: string) => Promise<void>
    pauseGoal: (goalId: string) => Promise<void>
    abandonGoal: (goalId: string) => Promise<void>
    reopenGoal: (goalId: string) => Promise<void>
    restoreGoal: (goalId: string) => Promise<void>
}

export const GoalsContext =
    createContext<GoalsContextType | null>(null)

type GoalsStateProviderProps = {
    initialGoals: Goal[]
    isLoading: boolean
    isError: boolean
    error: Error | null
} & ContextProps

const GoalsStateProvider = ({
    children,
    initialGoals,
    isLoading,
    isError,
    error
}: GoalsStateProviderProps) => {
    const [isPending, startTransition] = useTransition()
    const t = useTranslations()
    const {
        createGoal,
        updateGoal,
        activateGoal,
        pauseGoal,
        abandonGoal,
        reopenGoal,
        restoreGoal,
        deleteGoal
    } = useGoalMutations()

    const tempIdRef = useRef(0)

    const [optimisticGoals, addOptimistic] = useOptimistic(
        initialGoals,
        (state, action: OptimisticAction) => {
            if (action.type === 'add') return [action.goal, ...state]
            if (action.type === 'replace') return state.map((g) =>
                g.id === action.tempId ? action.goal : g
            )
            if (action.type === 'update') return state.map((g) =>
                g.id === action.goalId ? {
                    ...g,
                    ...action.partial
                } : g
            )
            if (action.type === 'delete') return state.filter((g) =>
                g.id !== action.goalId
            )
            return state
        }
    )

    const handleAddGoal = async (
        data: GoalSchema
    ): Promise<void> => {
        startTransition(async () => {
            tempIdRef.current += 1
            const tempId = `temp-goal-${tempIdRef.current}`
            const tempGoal: Goal = {
                id: tempId,
                profileId: '',
                title: data.title,
                description: data.description ?? null,
                category: data.category ?? GoalCategory.PHYSICAL,
                status: GoalStatus.ACTIVE,
                targetDate: data.targetDate ?? null,
                isPrimary: false,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            }
            addOptimistic({
                type: 'add',
                goal: tempGoal
            })
            await withOptimisticToast({
                action: createGoal.mutateAsync(data).then((realGoal) => {
                    addOptimistic({
                        type: 'replace',
                        tempId,
                        goal: realGoal
                    })
                }),
                successMsg: t(goalsLocales.toasts.created),
                errorMsg: t(goalsLocales.toasts.createFailed),
                retryLabel: t(globalLocales.shared.retry),
                onRetry: () => handleAddGoal(data)
            })
        })
    }

    const handleUpdateGoal = async (
        goalId: string,
        data: Partial<GoalSchema>
    ): Promise<void> => {
        startTransition(async () => {
            addOptimistic({
                type: 'update',
                goalId,
                partial: data
            })
            await withOptimisticToast({
                action: updateGoal.mutateAsync({
                    goalId,
                    data
                }).then((realGoal) => {
                    addOptimistic({
                        type: 'update',
                        goalId,
                        partial: realGoal
                    })
                }),
                successMsg: t(goalsLocales.toasts.updated),
                errorMsg: t(goalsLocales.toasts.updateFailed),
                retryLabel: t(globalLocales.shared.retry),
                onRetry: () => handleUpdateGoal(goalId, data)
            })
        })
    }

    const handleDeleteGoal = async (
        goalId: string
    ): Promise<void> => {
        startTransition(async () => {
            addOptimistic({
                type: 'delete',
                goalId
            })
            await withOptimisticToast({
                action: deleteGoal.mutateAsync(goalId),
                successMsg: t(goalsLocales.toasts.deleted),
                errorMsg: t(goalsLocales.toasts.deleteFailed),
                retryLabel: t(globalLocales.shared.retry),
                onRetry: () => handleDeleteGoal(goalId)
            })
        })
    }

    const handleActivateGoal = async (
        goalId: string
    ): Promise<void> => {
        startTransition(async () => {
            addOptimistic({
                type: 'update',
                goalId,
                partial: { status: GoalStatus.ACTIVE }
            })
            await withOptimisticToast({
                action: activateGoal.mutateAsync(goalId).then((realGoal) => {
                    addOptimistic({
                        type: 'update',
                        goalId,
                        partial: realGoal
                    })
                }),
                successMsg: t(goalsLocales.toasts.activated),
                errorMsg: t(goalsLocales.toasts.activateFailed),
                retryLabel: t(globalLocales.shared.retry),
                onRetry: () => handleActivateGoal(goalId)
            })
        })
    }

    const handlePauseGoal = async (
        goalId: string
    ): Promise<void> => {
        startTransition(async () => {
            addOptimistic({
                type: 'update',
                goalId,
                partial: { status: GoalStatus.PAUSED }
            })
            await withOptimisticToast({
                action: pauseGoal.mutateAsync(goalId).then((realGoal) => {
                    addOptimistic({
                        type: 'update',
                        goalId,
                        partial: realGoal
                    })
                }),
                successMsg: t(goalsLocales.toasts.paused),
                errorMsg: t(goalsLocales.toasts.pauseFailed),
                retryLabel: t(globalLocales.shared.retry),
                onRetry: () => handlePauseGoal(goalId)
            })
        })
    }

    const handleAbandonGoal = async (
        goalId: string
    ): Promise<void> => {
        startTransition(async () => {
            addOptimistic({
                type: 'update',
                goalId,
                partial: { status: GoalStatus.ABANDONED }
            })
            await withOptimisticToast({
                action: abandonGoal.mutateAsync(goalId).then((realGoal) => {
                    addOptimistic({
                        type: 'update',
                        goalId,
                        partial: realGoal
                    })
                }),
                successMsg: t(goalsLocales.toasts.abandoned),
                errorMsg: t(goalsLocales.toasts.abandonFailed),
                retryLabel: t(globalLocales.shared.retry),
                onRetry: () => handleAbandonGoal(goalId)
            })
        })
    }

    const handleReopenGoal = async (
        goalId: string
    ): Promise<void> => {
        startTransition(async () => {
            addOptimistic({
                type: 'update',
                goalId,
                partial: { status: GoalStatus.ACTIVE }
            })
            await withOptimisticToast({
                action: reopenGoal.mutateAsync(goalId).then((realGoal) => {
                    addOptimistic({
                        type: 'update',
                        goalId,
                        partial: realGoal
                    })
                }),
                successMsg: t(goalsLocales.toasts.reopened),
                errorMsg: t(goalsLocales.toasts.reopenFailed),
                retryLabel: t(globalLocales.shared.retry),
                onRetry: () => handleReopenGoal(goalId)
            })
        })
    }

    const handleRestoreGoal = async (
        goalId: string
    ): Promise<void> => {
        startTransition(async () => {
            addOptimistic({
                type: 'update',
                goalId,
                partial: { status: GoalStatus.ACTIVE }
            })
            await withOptimisticToast({
                action: restoreGoal.mutateAsync(goalId).then((realGoal) => {
                    addOptimistic({
                        type: 'update',
                        goalId,
                        partial: realGoal
                    })
                }),
                successMsg: t(goalsLocales.toasts.restored),
                errorMsg: t(goalsLocales.toasts.restoreFailed),
                retryLabel: t(globalLocales.shared.retry),
                onRetry: () => handleRestoreGoal(goalId)
            })
        })
    }

    const value: GoalsContextType = {
        goals: sortGoalsByStatus(optimisticGoals),
        isLoading,
        isError,
        error,
        isPending,
        addGoal: handleAddGoal,
        updateGoal: handleUpdateGoal,
        deleteGoal: handleDeleteGoal,
        activateGoal: handleActivateGoal,
        pauseGoal: handlePauseGoal,
        abandonGoal: handleAbandonGoal,
        reopenGoal: handleReopenGoal,
        restoreGoal: handleRestoreGoal
    }

    return (
        <GoalsContext.Provider value={value}>
            {children}
        </GoalsContext.Provider>
    )
}

export const GoalsProvider = ({
    children
}: ContextProps) => {
    const {
        data,
        isLoading,
        isError,
        error
    } = useGoals()

    return (
        <GoalsStateProvider
            initialGoals={data ?? []}
            isLoading={isLoading}
            isError={isError}
            error={error ?? null}
        >
            {children}
        </GoalsStateProvider>
    )
}

export const useGoalsContext = () => {
    const context = useContext(GoalsContext)
    if (!context) {
        throw new Error(
            'useGoalsContext must be used within GoalsProvider'
        )
    }
    return context
}
