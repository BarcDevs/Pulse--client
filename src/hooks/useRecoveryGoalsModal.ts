'use client'

import { useState } from 'react'

type UseRecoveryGoalsModalReturn = {
    modal: {
        isOpen: boolean
        editingGoalId?: string
        mode: 'create' | 'edit'
    }
    actions: {
        onOpenEditModal: (goalId: string) => void
        onOpenCreateModal: () => void
        onCloseModal: () => void
    }
}

export const useRecoveryGoalsModal =
    (): UseRecoveryGoalsModalReturn => {
        const [isModalOpen, setIsModalOpen] = (
            useState(false)
        )
        const [editingGoalId, setEditingGoalId] = (
            useState<string | undefined>(undefined)
        )

        const modalMode = editingGoalId
            ? 'edit'
            : 'create'

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
            modal: {
                isOpen: isModalOpen,
                editingGoalId,
                mode: modalMode
            },
            actions: {
                onOpenEditModal,
                onOpenCreateModal,
                onCloseModal
            }
        }
    }
