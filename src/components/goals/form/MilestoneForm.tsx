'use client'

import { Controller } from 'react-hook-form'

import { MilestoneInput } from '@/types/goals'

import { FormInput } from '@/components/shared/inputs/FormInput'
import {
    Form,
    FormControl,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'

import { useMilestoneForm } from '@/hooks/forms/useMilestoneForm'

import { milestoneFormSchema } from '@/config/schema/milestoneForm'

import { MilestoneFormActions } from './MilestoneFormActions'

type MilestoneFormProps = {
    onSubmit: (data: MilestoneInput) => Promise<void>
    isSubmitting?: boolean
    onCloseAction?: () => void
}

export const MilestoneForm = ({
    onSubmit,
    isSubmitting = false,
    onCloseAction
}: MilestoneFormProps) => {
    const { form, handleSubmit } = useMilestoneForm({
        onSubmit
    })

    return (
        <form
            onSubmit={handleSubmit}
            className={'space-y-6'}
        >
            <Form {...form}>
                <Controller
                    control={form.control}
                    name={'title'}
                    render={({ field, fieldState }) => (
                        <FormItem>
                            <FormLabel>
                                Milestone Title
                            </FormLabel>
                            <FormControl>
                                <FormInput
                                    id={'milestone-title'}
                                    placeholder={'Describe your milestone'}
                                    value={field.value}
                                    onChange={field.onChange}
                                    onBlur={field.onBlur}
                                    maxLength={
                                        milestoneFormSchema
                                            .title.maxLength
                                    }
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

                <Controller
                    control={form.control}
                    name={'description'}
                    render={({ field, fieldState }) => (
                        <FormItem>
                            <FormLabel>
                                Description (Optional)
                            </FormLabel>
                            <FormControl>
                                <Textarea
                                    id={'milestone-description'}
                                    placeholder={'Add more details about this milestone'}
                                    value={field.value}
                                    onChange={field.onChange}
                                    onBlur={field.onBlur}
                                    maxLength={
                                        milestoneFormSchema
                                            .description.maxLength
                                    }
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

                <MilestoneFormActions
                    isSubmitting={isSubmitting}
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
