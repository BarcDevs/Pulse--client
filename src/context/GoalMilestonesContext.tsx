'use client'

import {
    createContext,
    useOptimistic,
    useRef,
    useTransition
} from 'react'

import { toast } from 'sonner'

import {
    GoalMilestone,
    MilestoneInput,
    MilestoneStatus
} from '@/types/goals'
import {
    ContextProps,
    OptimisticActionMap
} from '@/types/react'

import { useGoalMutations } from '@/hooks/mutations/useGoalMutations'

import { toastMessages } from '@/constants/toasts'

type GoalMilestonesContextType = {
    milestones: GoalMilestone[]
    addMilestoneOptimistic: (data: MilestoneInput) => Promise<void>
    completeMilestoneOptimistic: (milestoneId: string) => void
}

export const GoalMilestonesContext =
    createContext<GoalMilestonesContextType | null>(null)

type GoalMilestonesProviderProps = {
    goalId: string
    initialMilestones: GoalMilestone[]
} & ContextProps

type MilestoneOptimisticAction = OptimisticActionMap<{
    add: { data: MilestoneInput }
    complete: { milestoneId: string }
    replace: {
        tempId: string
        realMilestone: GoalMilestone
    }
}>

export const GoalMilestonesProvider = ({
    children,
    goalId,
    initialMilestones
}: GoalMilestonesProviderProps) => {
    const [, startTransition] = useTransition()
    const {
        createMilestone,
        completeMilestone
    } = useGoalMutations()

    const tempIdCounterRef = useRef(0)

    const [optimisticMilestones, addOptimisticMilestone] = useOptimistic(
        initialMilestones,
        (state, action: MilestoneOptimisticAction) => {
            if (action.type === 'add') {
                tempIdCounterRef.current += 1
                const tempId = `temp-${goalId}-${tempIdCounterRef.current}`
                const lastMilestone = state[state.length - 1]
                const isFirstMilestone = state.length === 0
                const isPreviousCompleted =
                    lastMilestone?.status === MilestoneStatus.COMPLETED
                const newStatus =
                    isFirstMilestone || isPreviousCompleted
                        ? MilestoneStatus.ACTIVE
                        : MilestoneStatus.LOCKED
                const newOrder =
                    state.length === 0
                        ? 0
                        : Math.max(...state.map(m => m.order)) + 1
                return [
                    ...state,
                    {
                        id: tempId,
                        goalId,
                        title: action.data.title,
                        description: action.data.description,
                        status: newStatus,
                        order: newOrder,
                        completedAt: undefined,
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString()
                    }
                ]
            }

            if (action.type === 'complete') {
                const completedIndex = state
                    .findIndex((m) => m.id === action.milestoneId)
                if (completedIndex === -1) return state

                return state.map((m, idx) => {
                    if (m.id === action.milestoneId) {
                        return {
                            ...m,
                            status: MilestoneStatus.COMPLETED,
                            completedAt: new Date().toISOString()
                        }
                    }
                    if (idx === completedIndex + 1
                        && m.status === MilestoneStatus.LOCKED) {
                        return {
                            ...m,
                            status: MilestoneStatus.ACTIVE
                        }
                    }
                    return m
                })
            }

            if (action.type === 'replace') {
                return state.map((m) =>
                    m.id === action.tempId
                        ? action.realMilestone
                        : m
                )
            }

            return state
        }
    )

    const handleAddMilestone = (
        data: MilestoneInput
    ): Promise<void> => {
        return new Promise((resolve, reject) => {
            startTransition(async () => {
                const tempId = `temp-${goalId}-${++tempIdCounterRef.current}`
                addOptimisticMilestone({ type: 'add', data })
                try {
                    const realMilestone = await createMilestone.mutateAsync({
                        goalId,
                        data
                    })

                    addOptimisticMilestone({
                        type: 'replace',
                        tempId,
                        realMilestone
                    })

                    resolve()
                } catch (err) {
                    toast.error(
                        toastMessages.error.create
                    )
                    reject(err)
                }
            })
        })
    }

    const handleCompleteMilestone = (milestoneId: string) => {
        startTransition(async () => {
            addOptimisticMilestone({ type: 'complete', milestoneId })
            try {
                await completeMilestone.mutateAsync({
                    goalId,
                    milestoneId
                })
            } catch (err) {
                console.error(
                    'Failed to complete milestone:',
                    err
                )
            }
        })
    }

    const value: GoalMilestonesContextType = {
        milestones: optimisticMilestones,
        addMilestoneOptimistic: handleAddMilestone,
        completeMilestoneOptimistic: handleCompleteMilestone
    }

    return (
        <GoalMilestonesContext.Provider value={value}>
            {children}
        </GoalMilestonesContext.Provider>
    )
}
