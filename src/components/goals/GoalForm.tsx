'use client'

import { useState } from 'react'

import { useRouter } from 'next/navigation'

import { Goal } from '@/types/goals'

import { Form } from '@/components/ui/form'

import { useGoalForm } from '@/hooks/forms/useGoalForm'
import { useGoalMutations } from '@/hooks/mutations/useGoalMutations'

import { ROUTES } from '@/constants/routes'

import { GoalFormActions } from './GoalFormActions'
import { GoalFormFields } from './GoalFormFields'

type GoalFormProps = {
    goal?: Goal
}

export const GoalForm = ({ goal }: GoalFormProps) => {
    const router = useRouter()
    const [error, setError] = useState<string | null>(null)
    const { createGoal, updateGoal } = useGoalMutations()

    const isUpdate = Boolean(goal)

    const handleSubmit = async (data: any) => {
        try {
            setError(null)
            if (isUpdate && goal) {
                await updateGoal.mutateAsync({
                    goalId: goal.id,
                    data
                })
            } else await createGoal.mutateAsync(data)

            router.push(ROUTES.RECOVERY_GOALS)
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : 'Failed to save goal'
            )
        }
    }

    const { form, handleSubmit: onSubmit } = useGoalForm({
        onSubmit: handleSubmit,
        defaultValues: goal
            ? {
                title: goal.title,
                description: goal.description
            } : undefined
    })

    const isSubmitting = createGoal.isPending
        || updateGoal.isPending

    return (
        <form
            onSubmit={onSubmit}
            className={'space-y-8'}
        >
            <Form {...form}>
                <GoalFormFields form={form}/>
                <GoalFormActions
                    isSubmitting={isSubmitting}
                    isUpdate={isUpdate}
                />
                {error && (
                    <p className={'text-sm text-destructive mt-4'}>
                        {error}
                    </p>
                )}
            </Form>
        </form>
    )
}
