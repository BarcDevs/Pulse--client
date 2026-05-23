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

import { toast } from 'sonner'

import {
    Goal,
    GoalCategory,
    GoalStatus
} from '@/types/goals'

import { useGoalMutations } from '@/hooks/mutations/useGoalMutations'
import { useGoals } from '@/hooks/queries/useGoals'

import { secondInMs } from '@/constants/time'

import { globalLocales } from '@/locales/globalLocales'
import { goalsLocales } from '@/locales/goalsLocales'
import { GoalSchema } from '@/validations/forms/goalSchema'

type OptimisticAction =
    | { type: 'add'; goal: Goal }
    | { type: 'replace'
        tempId: string
        goal: Goal }
    | { type: 'update'
        goalId: string
        partial: Partial<Goal> }
    | { type: 'delete'; goalId: string }

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

export const GoalsContext = createContext<GoalsContextType | null>(null)

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
            addOptimistic({ type: 'add', goal: tempGoal })
            try {
                const realGoal = await createGoal.mutateAsync(data)
                addOptimistic({
                    type: 'replace',
                    tempId,
                    goal: realGoal
                })
                toast.success(
                    t(goalsLocales.toasts.created),
                    { duration: 2.5 * secondInMs }
                )
            } catch {
                toast.error(t(goalsLocales.toasts.createFailed), {
                    action: {
                        label: t(globalLocales.shared.retry),
                        onClick: () => handleAddGoal(data)
                    },
                    duration: 5 * secondInMs
                })
            }
        })
    }

    const handleUpdateGoal = (goalId: string, data: Partial<GoalSchema>) => {
        startTransition(async () => {
            addOptimistic({
                type: 'update',
                goalId,
                partial: data
            })
            try {
                const realGoal = await updateGoal.mutateAsync({ goalId, data })
                addOptimistic({
                    type: 'update',
                    goalId,
                    partial: realGoal
                })
                toast.success(
                    t(goalsLocales.toasts.updated),
                    { duration: 2.5 * secondInMs }
                )
            } catch {
                toast.error(t(goalsLocales.toasts.updateFailed), {
                    action: {
                        label: t(globalLocales.shared.retry),
                        onClick: () => handleUpdateGoal(goalId, data)
                    },
                    duration: 5 * secondInMs
                })
            }
        })
    }

    const handleDeleteGoal = (goalId: string) => {
        startTransition(async () => {
            addOptimistic({ type: 'delete', goalId })
            try {
                await deleteGoal.mutateAsync(goalId)
                toast.success(
                    t(goalsLocales.toasts.deleted),
                    { duration: 2.5 * secondInMs }
                )
            } catch {
                toast.error(t(goalsLocales.toasts.deleteFailed), {
                    action: {
                        label: t(globalLocales.shared.retry),
                        onClick: () => handleDeleteGoal(goalId)
                    },
                    duration: 5 * secondInMs
                })
            }
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

export const GoalsProvider = ({ children }: GoalsProviderProps) => {
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
