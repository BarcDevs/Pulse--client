import { useEffect } from 'react'

import { useTranslations } from 'next-intl'

import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import { wrapFormSubmit } from '@/lib/forms/handleFormSubmit'

import {
    createGoalSchema,
    type GoalSchema
} from '@/validations/forms/goalSchema'

type UseGoalFormProps = {
    onSubmit: (
        data: GoalSchema
    ) => Promise<void>
    defaultValues?: Partial<GoalSchema>
}

export const useGoalForm = ({
    onSubmit,
    defaultValues
}: UseGoalFormProps) => {
    const t = useTranslations()
    const form = useForm<GoalSchema>({
        resolver: zodResolver(
            createGoalSchema(t)
        ),
        defaultValues: {
            title: defaultValues?.title || '',
            description:
                defaultValues?.description || '',
            category: defaultValues?.category,
            targetDate:
                defaultValues?.targetDate || ''
        },
        mode: 'onBlur'
    })

    useEffect(() => {
        form.reset({
            title: defaultValues?.title || '',
            description:
                defaultValues?.description || '',
            category: defaultValues?.category,
            targetDate:
                defaultValues?.targetDate || ''
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        defaultValues?.title,
        defaultValues?.category
    ])

    const handleSubmit = wrapFormSubmit(
        form,
        onSubmit,
        { resetOnSuccess: true }
    )

    return {
        form,
        handleSubmit
    }
}
