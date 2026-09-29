import { TranslatorFn } from '@/types/i18n'

import { createEmailInputSchema } from '@/validations/forms/emailInputSchema'
import { createLoginSchema } from '@/validations/forms/loginSchema'
import { createResetPasswordSchema } from '@/validations/forms/resetPasswordSchema'
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
        schema: createEmailInputSchema(t),
        defaultValues: { email: '' }
    },
    resetPassword: {
        schema: createResetPasswordSchema(t),
        defaultValues: {
            otp: '',
            password: '',
            confirmPassword: ''
        }
    }
})
