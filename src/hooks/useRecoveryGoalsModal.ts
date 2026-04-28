'use client'

import { useEffect, useState } from 'react'

import { useSearchParams } from 'next/navigation'

type UseRecoveryGoalsModalReturn = {
    isModalOpen: boolean
    editingGoalId?: string
    modalMode: 'create' | 'edit'
    onOpenEditModal: (goalId: string) => void
    onOpenCreateModal: () => void
    onCloseModal: () => void
}

export const useRecoveryGoalsModal =
    (): UseRecoveryGoalsModalReturn => {
        const searchParams = useSearchParams()
        const [isModalOpen, setIsModalOpen] = (
            useState(false)
        )
        const [editingGoalId, setEditingGoalId] = (
            useState<string | undefined>(undefined)
        )

        const modalMode = editingGoalId
            ? 'edit'
            : 'create'

        useEffect(() => {
            const createGoal = (
                searchParams.get('createGoal') === 'true'
            )
            if (createGoal) {
                queueMicrotask(() => {
                    setEditingGoalId(undefined)
                    setIsModalOpen(true)
                })
            }
        }, [searchParams])

        const onOpenEditModal = (goalId: string) => {
            setEditingGoalId(goalId)
            setIsModalOpen(true)
        }

        const onOpenCreateModal = () => {
            setEditingGoalId(undefined)
            setIsModalOpen(true)
        }

        const onCloseModal = () => {
            setIsModalOpen(false)
            setEditingGoalId(undefined)
        }

        return {
            isModalOpen,
            editingGoalId,
            modalMode,
            onOpenEditModal,
            onOpenCreateModal,
            onCloseModal
        }
    }
