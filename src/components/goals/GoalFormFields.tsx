'use client'

import { Controller, UseFormReturn } from 'react-hook-form'

import { FormInput } from '@/components/shared/inputs/FormInput'
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'

import { recoveryGoalsPageTexts } from '@/constants/componentTexts/recoveryGoals'

import { GoalSchema } from '@/validations/forms/goalSchema'

type GoalFormFieldsProps = {
    form: UseFormReturn<GoalSchema>
}

export const GoalFormFields = ({
    form
}: GoalFormFieldsProps) => (
    <>
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
                            placeholder={
                                recoveryGoalsPageTexts.goalForm.fields
                                    .titlePlaceholder
                            }
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
                        {
                            recoveryGoalsPageTexts.goalForm.fields
                                .descriptionLabel
                        }
                    </FormLabel>
                    <FormControl>
                        <Textarea
                            placeholder={
                                recoveryGoalsPageTexts.goalForm.fields
                                    .descriptionPlaceholder
                            }
                            className={'resize-none bg-surface-container-low'}
                            rows={5}
                            {...field}
                            value={field.value || ''}
                        />
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )}
        />
    </>
)
