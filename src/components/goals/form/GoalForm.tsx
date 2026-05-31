'use client'

import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

import { Controller } from 'react-hook-form'

import { Goal } from '@/types/goals'

import { DatePickerInput } from '@/components/shared/inputs/DatePickerInput'
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

import { ROUTES } from '@/constants/routes'

import { goalsLocales } from '@/locales/goalsLocales'

import { CategoryChipSelector } from './CategoryChipSelector'
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
    const t = useTranslations()
    const router = useRouter()
    const isUpdate = Boolean(goal)
    const { handleSubmit } = useGoalFormSubmit({
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
            <Form {...form}>
                <Controller
                    control={form.control}
                    name={'title'}
                    render={({ field, fieldState }) => (
                        <FormItem>
                            <FormLabel>
                                {t(goalsLocales.goalForm.fields.titleLabel)}
                            </FormLabel>
                            <FormControl>
                                <FormInput
                                    id={'goal-title'}
                                    placeholder={t(
                                        goalsLocales
                                            .goalForm
                                            .fields
                                            .titlePlaceholder
                                    )}
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
                                {t(goalsLocales.goalForm.fields.descriptionLabel)}
                            </FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder={t(
                                        goalsLocales
                                            .goalForm
                                            .fields
                                            .descriptionPlaceholder
                                    )}
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

                    <FormField
                        control={form.control}
                        name={'targetDate'}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    {t(goalsLocales.goalForm.fields.targetDateLabel)}
                                </FormLabel>
                                <FormControl>
                                    <DatePickerInput
                                        value={field.value}
                                        onChangeAction={field.onChange}
                                        onBlur={field.onBlur}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                </div>

                <GoalFormActions
                    isUpdate={isUpdate}
                    onCloseAction={onCloseAction}
                />
                {form.formState.errors.root && (
                    <p className={'text-sm text-destructive mt-4'}>
                        {form.formState.errors.root.message}
                    </p>
                )}
            </Form>
        </form>
    )
}
