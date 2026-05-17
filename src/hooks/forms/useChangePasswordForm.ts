import { useTranslations } from 'next-intl'

import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import { wrapFormSubmit } from '@/lib/forms/handleFormSubmit'

import {
    type ChangePasswordSchema,
    createChangePasswordSchema
} from '@/validations/forms/changePasswordSchema'

type UseChangePasswordFormProps = {
    onSubmit: (data: ChangePasswordSchema) => Promise<void>
}

export const useChangePasswordForm = ({
    onSubmit
}: UseChangePasswordFormProps) => {
    const t = useTranslations()
    const form = useForm<ChangePasswordSchema>({
        resolver: zodResolver(createChangePasswordSchema(t)),
        defaultValues: {
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
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
