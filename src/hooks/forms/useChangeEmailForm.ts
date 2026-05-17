import { useTranslations } from 'next-intl'

import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import { wrapFormSubmit } from '@/lib/forms/handleFormSubmit'

import {
    type ChangeEmailSchema,
    createChangeEmailSchema
} from '@/validations/forms/changeEmailSchema'

type UseChangeEmailFormProps = {
    onSubmit: (data: ChangeEmailSchema) => Promise<void>
}

export const useChangeEmailForm = ({
    onSubmit
}: UseChangeEmailFormProps) => {
    const t = useTranslations()
    const form = useForm<ChangeEmailSchema>({
        resolver: zodResolver(createChangeEmailSchema(t)),
        defaultValues: {
            newEmail: '',
            password: ''
        },
        mode: 'onBlur'
    })

    const handleSubmit = wrapFormSubmit(
        form,
        onSubmit,
        { resetOnSuccess: true }
    )

    return { form, handleSubmit }
}
