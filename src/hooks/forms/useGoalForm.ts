import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import {
    GoalSchema,
    goalSchema
} from '@/validations/forms/goalSchema'

type UseGoalFormProps = {
    onSubmit: (data: GoalSchema) => Promise<void>
    defaultValues?: Partial<GoalSchema>
}

export const useGoalForm = ({
    onSubmit,
    defaultValues
}: UseGoalFormProps) => {
    const form = useForm<GoalSchema>({
        resolver: zodResolver(goalSchema),
        defaultValues: {
            title: '',
            description: '',
            ...defaultValues
        },
        mode: 'onBlur'
    })

    const handleSubmit = form.handleSubmit(
        async (data) => {
            try {
                await onSubmit(data)
                form.reset()
            } catch (error) {
                const message = error instanceof Error
                    ? error.message
                    : 'Submission failed'
                form.setError('root', {
                    type: 'manual',
                    message
                })
            }
        }
    )

    return {
        form,
        handleSubmit
    }
}
