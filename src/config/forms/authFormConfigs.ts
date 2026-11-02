import { TranslatorFn } from '@/types/i18n'

import { createEmailInputSchema } from '@/validations/forms/emailInputSchema'
import { createLoginSchema } from '@/validations/forms/loginSchema'
import { createOtpSchema } from '@/validations/forms/otpSchema'
import { createResetPasswordSchema } from '@/validations/forms/resetPasswordSchema'
import { createSignupSchema } from '@/validations/forms/signupSchema'
import { createUpgradeGuestSchema } from '@/validations/forms/upgradeGuestSchema'

type AuthFormType =
    'login' |
    'signup' |
    'upgradeGuest' |
    'forgotPassword' |
    'verifyResetCode' |
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
            confirmPassword: '',
            acceptTerms: false
        }
    },
    upgradeGuest: {
        schema: createUpgradeGuestSchema(t),
        defaultValues: {
            email: '',
            password: ''
        }
    },
    forgotPassword: {
        schema: createEmailInputSchema(t),
        defaultValues: { email: '' }
    },
    verifyResetCode: {
        schema: createOtpSchema(t),
        defaultValues: { otp: '' }
    },
    resetPassword: {
        schema: createResetPasswordSchema(t),
        defaultValues: {
            password: '',
            confirmPassword: ''
        }
    }
})
