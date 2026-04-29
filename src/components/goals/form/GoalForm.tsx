'use client'

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
import { useGoalFormSubmit } from '@/hooks/forms/useGoalFormSubmit'

import { formatByUserPreference } from '@/lib/time'

import { recoveryGoalsPageTexts as pageTexts }
    from '@/constants/componentTexts/recoveryGoals'
import { ROUTES } from '@/constants/routes'

import { CategoryChipSelector } from './CategoryChipSelector'
import { FormHeadline } from './FormHeadline'
import { GoalFormActions } from './GoalFormActions'

type GoalFormProps = {
    goal?: Goal
    onSuccessAction?: () => void
    onCloseAction?: () => void
}

export const GoalForm = ({
    goal,
    onSuccessAction,
    onCloseAction
}: GoalFormProps) => {
    const router = useRouter()
    const isUpdate = Boolean(goal)
    const {
        handleSubmit,
        isSubmitting
    } = useGoalFormSubmit({
        goal,
        onSuccessAction: () => {
            if (onSuccessAction) {
                onSuccessAction()
            } else {
                router.push(ROUTES.RECOVERY_GOALS)
            }
        }
    })

    const { form, handleSubmit: onSubmit } = useGoalForm({
        onSubmit: handleSubmit,
        defaultValues: {
            title: goal?.title || '',
            description: goal?.description || '',
            category: goal?.category,
            targetDate: goal?.targetDate
                ? goal.targetDate.split('T')[0]
                : ''
        }
    })

    return (
        <form
            onSubmit={onSubmit}
            className={'space-y-6'}
        >
            <FormHeadline
                title={isUpdate
                    ? pageTexts.goalForm.updateTitle
                    : pageTexts.goalForm.createTitle
                }
                subtitle={pageTexts.goalForm.subtitle}
            />

            <Form {...form}>
                <Controller
                    control={form.control}
                    name={'title'}
                    render={({ field, fieldState }) => (
                        <FormItem>
                            <FormLabel>
                                {pageTexts.goalForm.fields.titleLabel}
                            </FormLabel>
                            <FormControl>
                                <FormInput
                                    id={'goal-title'}
                                    placeholder={pageTexts.goalForm.fields.titlePlaceholder}
                                    value={field.value}
                                    onChange={field.onChange}
                                    onBlur={field.onBlur}
                                />
                            </FormControl>
                            {fieldState.error && (
                                <FormMessage>
                                    {fieldState.error.message}
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
                                {pageTexts.goalForm.fields.descriptionLabel}
                            </FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder={pageTexts.goalForm.fields.descriptionPlaceholder}
                                    className={'resize-none bg-surface-container-low'}
                                    rows={3}
                                    {...field}
                                    value={field.value || ''}
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <div className={'space-y-6'}>
                    <CategoryChipSelector
                        control={form.control}
                    />

                    {/* todo: reusable FormField */}
                    <FormField
                        control={form.control}
                        name={'targetDate'}
                        render={({ field }) => {
                            const today =
                                new Date()
                                    .toISOString()
                                    .split('T')[0]

                            return (
                                <FormItem>
                                    <FormLabel>
                                        {pageTexts.goalForm.fields.targetDateLabel}
                                    </FormLabel>
                                    <FormControl>
                                        <FormInput
                                            id={'goal-date'}
                                            type={'date'}
                                            min={today}
                                            required={false}
                                            value={field.value || ''}
                                            onChange={field.onChange}
                                            onBlur={field.onBlur}
                                            placeholder={
                                                formatByUserPreference(
                                                    new Date()
                                                )
                                            }
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )
                        }}
                    />
                </div>

                <GoalFormActions
                    isSubmitting={isSubmitting}
                    isUpdate={isUpdate}
                    onCloseAction={onCloseAction}
                />
                {/* todo: reusable ErrorMessage component*/}
                {form.formState.errors.root && (
                    <p className={'text-sm text-destructive mt-4'}>
                        {form.formState.errors.root.message}
                    </p>
                )}
            </Form>
        </form>
    )
}
