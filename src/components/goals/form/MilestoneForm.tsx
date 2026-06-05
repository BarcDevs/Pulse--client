'use client'

import { useTranslations } from 'next-intl'

import { Controller } from 'react-hook-form'

import { MilestoneInput } from '@/types/goals'

import { FormInput } from '@/components/shared/inputs/FormInput'
import { FormError } from '@/components/shared/ui/FormError'
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

import { goalsLocales } from '@/locales/goalsLocales'

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
    const t = useTranslations()
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
                                {t(goalsLocales.milestones.formTitleLabel)}
                            </FormLabel>
                            <FormControl>
                                <FormInput
                                    id={'milestone-title'}
                                    placeholder={t(goalsLocales.milestones.formTitlePlaceholder)}
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
                                {t(goalsLocales.milestones.formDescriptionLabel)}
                            </FormLabel>
                            <FormControl>
                                <Textarea
                                    id={'milestone-description'}
                                    placeholder={t(goalsLocales.milestones.formDescriptionPlaceholder)}
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
                <FormError
                    errors={form.formState.errors}
                    className={'mt-4'}
                />
            </Form>
        </form>
    )
}
