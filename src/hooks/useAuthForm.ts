import {useForm} from 'react-hook-form'

import {zodResolver} from '@hookform/resolvers/zod'

import {loginSchema} from '@/validations/forms/loginSchema'
import {signupSchema} from '@/validations/forms/signupSchema'

type AuthFormType_Union =
    'login' |
    'signup' |
    'forgotPassword' |
    'resetPassword'

type UseAuthFormProps = {
    formType: AuthFormType_Union
    onSuccess: (data: any) => void | Promise<void>
}

const formConfigs: Record<
    AuthFormType_Union,
    {
        schema: any
        defaultValues: Record<string, any>
    }
> = {
    login: {
        schema: loginSchema,
        defaultValues: {
            email: '',
            password: '',
            remember: false
        }
    },
    signup: {
        schema: signupSchema,
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    },
    forgotPassword: {
        schema: loginSchema,
        defaultValues: {
            email: ''
        }
    },
    resetPassword: {
        schema: signupSchema,
        defaultValues: {
            password: '',
            confirmPassword: ''
        }
    }
}

export const useAuthForm = ({
    formType,
    onSuccess
}: UseAuthFormProps) => {
    const {schema, defaultValues} = formConfigs[formType]

    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues,
        mode: 'onBlur'
    })

    const handleSubmit = form.handleSubmit(async (data) => {
        try {
            await onSuccess(data)
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
