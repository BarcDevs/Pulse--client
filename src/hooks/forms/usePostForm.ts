import { useTranslations } from 'next-intl'

import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import { wrapFormSubmit } from '@/lib/forms/handleFormSubmit'

import {
    createPostFormSchema,
    type PostFormSchema
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
    const t = useTranslations()
    const form = useForm<PostFormSchema>({
        resolver: zodResolver(
            createPostFormSchema(t)
        ),
        defaultValues: {
            title: '',
            category: '',
            body: '',
            tags: [],
            ...defaultValues
        },
        mode: 'onBlur'
    })

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
