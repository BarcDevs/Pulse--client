import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import {
    PostFormSchema,
    postFormSchema
} from '@/validations/forms/postFormSchema'

type UsePostFormProps = {
    onSubmit: (
        data: PostFormSchema
    ) => Promise<void>
    defaultValues?: Partial<PostFormSchema>
}

export const usePostForm = ({
    onSubmit,
    defaultValues
}: UsePostFormProps) => {
    const form = useForm<PostFormSchema>({
        resolver: zodResolver(postFormSchema),
        defaultValues: {
            title: '',
            category: '',
            body: '',
            tags: [],
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
