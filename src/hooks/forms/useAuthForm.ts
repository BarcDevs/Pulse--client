import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import { SetState } from '@/types/utils/react'

import { authFormConfigs } from '@/config/forms/authFormConfigs'

type AuthFormType_Union =
    'login' |
    'signup' |
    'forgotPassword' |
    'resetPassword'

type UseAuthFormProps = {
    formType: AuthFormType_Union
    onSuccessAction: SetState<unknown>
}

export const useAuthForm = ({
    formType,
    onSuccessAction
}: UseAuthFormProps) => {
    const { schema, defaultValues } = authFormConfigs[formType]

    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues,
        mode: 'onBlur'
    })

    const handleSubmit = form.handleSubmit(async (data) => {
        try {
            onSuccessAction(data)
        } catch (error) {
            const message = error instanceof Error
                ? error.message
                : 'Submission failed'
            form.setError('root', {
                type: 'manual',
                message
            })
        }
    })

    return {
        form,
        handleSubmit
    }
}
