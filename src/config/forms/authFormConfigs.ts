import {loginSchema} from '@/validations/forms/loginSchema'
import {signupSchema} from '@/validations/forms/signupSchema'

type AuthFormType =
    'login' |
    'signup' |
    'forgotPassword' |
    'resetPassword'

export const authFormConfigs: Record<
    AuthFormType, {
    schema: any
    defaultValues: Record<string, any>
}> = {
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
