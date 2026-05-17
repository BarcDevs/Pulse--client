import { TranslatorFn } from '@/types/i18n'

import { createLoginSchema } from '@/validations/forms/loginSchema'
import { createSignupSchema } from '@/validations/forms/signupSchema'

type AuthFormType =
    'login' |
    'signup' |
    'forgotPassword' |
    'resetPassword'

export const createAuthFormConfigs = (
    t: TranslatorFn
): Record<
    AuthFormType,
    {
        schema: any
        defaultValues: Record<string, any>
    }
> => ({
    login: {
        schema: createLoginSchema(t),
        defaultValues: {
            email: '',
            password: '',
            remember: false
        }
    },
    signup: {
        schema: createSignupSchema(t),
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    },
    forgotPassword: {
        schema: createLoginSchema(t),
        defaultValues: { email: '' }
    },
    resetPassword: {
        schema: createSignupSchema(t),
        defaultValues: {
            password: '',
            confirmPassword: ''
        }
    }
})
