'use client'

import { useState } from 'react'

import { useRouter } from 'next/navigation'

import { Controller } from 'react-hook-form'

import { Goal } from '@/types/goals'

import { FormInput } from '@/components/shared/inputs/FormInput'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'

import { useGoalForm } from '@/hooks/forms/useGoalForm'
import { useGoalMutations } from '@/hooks/mutations/useGoalMutations'

import { recoveryGoalsPageTexts } from '@/constants/componentTexts/recoveryGoals'
import { ROUTES } from '@/constants/routes'

import { GoalSchema } from '@/validations/forms/goalSchema'

import { GoalFormActions } from './GoalFormActions'

type GoalFormProps = {
    goal?: Goal
    onSuccess?: () => void
}

export const GoalForm = ({
    goal,
    onSuccess
}: GoalFormProps) => {
    const router = useRouter()
    const [error, setError] = useState<string | null>(null)
    const { createGoal, updateGoal } = useGoalMutations()

    const isUpdate = Boolean(goal)

    const handleSubmit = async (
        data: GoalSchema
    ) => {
        try {
            setError(null)
            if (isUpdate && goal) {
                await updateGoal.mutateAsync({
                    goalId: goal.id,
                    data
                })
            } else await createGoal.mutateAsync(data)

            if (onSuccess) {
                onSuccess()
            } else {
                router.push(ROUTES.RECOVERY_GOALS)
            }
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
                <Controller
                    control={form.control}
                    name={'title'}
                    render={({ field, fieldState }) => (
                        <FormItem>
                            <FormLabel>
                                {recoveryGoalsPageTexts.goalForm.fields.titleLabel}
                            </FormLabel>
                            <FormControl>
                                <FormInput
                                    id={'goal-title'}
                                    placeholder={recoveryGoalsPageTexts.goalForm.fields.titlePlaceholder}
                                    value={field.value}
                                    onChange={field.onChange}
                                    onBlur={field.onBlur}
                                />
                            </FormControl>
                            {fieldState.error && (
                                <FormMessage>
                                    {
                                        fieldState.error
                                            .message
                                    }
                                </FormMessage>
                            )}
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name={'description'}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                {recoveryGoalsPageTexts.goalForm.fields.descriptionLabel}
                            </FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder={recoveryGoalsPageTexts.goalForm.fields.descriptionPlaceholder}
                                    className={'resize-none bg-surface-container-low'}
                                    rows={5}
                                    {...field}
                                    value={field.value || ''}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

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
