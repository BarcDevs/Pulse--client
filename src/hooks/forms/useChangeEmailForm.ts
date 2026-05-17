import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import { wrapFormSubmit } from '@/lib/forms/handleFormSubmit'

import {
    type ChangeEmailSchema,
    changeEmailSchema
} from '@/validations/forms/changeEmailSchema'

type UseChangeEmailFormProps = {
    onSubmit: (data: ChangeEmailSchema) => Promise<void>
}

export const useChangeEmailForm = ({
    onSubmit
}: UseChangeEmailFormProps) => {
    const form = useForm<ChangeEmailSchema>({
        resolver: zodResolver(changeEmailSchema),
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
