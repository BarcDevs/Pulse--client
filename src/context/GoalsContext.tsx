'use client'

import {
    createContext,
    ReactNode,
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
import { OptimisticActionMap } from '@/types/react'

import { useGoalMutations } from '@/hooks/mutations/useGoalMutations'
import { useGoals } from '@/hooks/queries/useGoals'

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
    addGoal: (data: GoalSchema) => void
    updateGoal: (
        goalId: string,
        data: Partial<GoalSchema>
    ) => void
    deleteGoal: (goalId: string) => void
}

export const GoalsContext =
    createContext<GoalsContextType | null>(null)

type GoalsStateProviderProps = {
    children: ReactNode
    initialGoals: Goal[]
    isLoading: boolean
    isError: boolean
    error: Error | null
}

const GoalsStateProvider = ({
    children,
    initialGoals,
    isLoading,
    isError,
    error
}: GoalsStateProviderProps) => {
    const [, startTransition] = useTransition()
    const t = useTranslations()
    const {
        createGoal,
        updateGoal,
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

    const handleAddGoal = (data: GoalSchema) => {
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

    const handleUpdateGoal = (
        goalId: string,
        data: Partial<GoalSchema>
    ) => {
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

    const handleDeleteGoal = (goalId: string) => {
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

    const value: GoalsContextType = {
        goals: optimisticGoals,
        isLoading,
        isError,
        error,
        addGoal: handleAddGoal,
        updateGoal: handleUpdateGoal,
        deleteGoal: handleDeleteGoal
    }

    return (
        <GoalsContext.Provider value={value}>
            {children}
        </GoalsContext.Provider>
    )
}

type GoalsProviderProps = {
    children: ReactNode
}

export const GoalsProvider = ({
    children
}: GoalsProviderProps) => {
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
