import { AuthFormType, FormConfig } from '@/types/forms'

import { authLocales } from '@/locales/authLocales'

type AuthFormConfigs = Record<
    AuthFormType,
    FormConfig
>

const authFormConfigs: AuthFormConfigs = {
    login: {
        fields: {
            email: {
                type: 'email',
                label: authLocales.common.emailLabel,
                placeholder: 'name@example.com',
                required: true
            },
            password: {
                type: 'password',
                label: authLocales.common.passwordLabel,

                placeholder: '••••••••',
                required: true
            },
            remember: {
                type: 'checkbox',
                label: 'auth.login.rememberMe',
                required: false
            }
        },
        buttons: {
            primary: {
                label: authLocales.login.loginButton,
                loadingLabel: authLocales.login.loggingInButton
            }
        },
        links: [
            {
                label: authLocales.login.forgotPasswordLink,
                href: '/forgot-password'
            }
        ]
    },

    signup: {
        fields: {
            firstName: {
                type: 'text',
                label: authLocales.signup.firstNameLabel,
                placeholder: authLocales.signup.firstNamePlaceholder,
                required: true
            },
            lastName: {
                type: 'text',
                label: authLocales.signup.lastNameLabel,
                placeholder: authLocales.signup.lastNamePlaceholder,
                required: true
            },
            email: {
                type: 'email',
                label: authLocales.common.emailLabel,
                placeholder: 'name@example.com',
                required: true
            },
            password: {
                type: 'password',
                label: authLocales.common.passwordLabel,

                placeholder: '••••••••',
                required: true,
                description: 'auth.signup.passwordDescription'
            },
            confirmPassword: {
                type: 'password',
                label: authLocales.signup.confirmPasswordLabel,
                placeholder: '••••••••',
                required: true
            }
        },
        buttons: {
            primary: {
                label: authLocales.signup.signupButton,
                loadingLabel: authLocales.signup.signingUpButton
            }
        },
        links: [
            {
                label: authLocales.signup.loginLink,
                href: '/login'
            }
        ]
    },

    forgotPassword: {
        fields: {
            email: {
                type: 'email',
                label: authLocales.common.emailLabel,
                placeholder: 'name@example.com',
                required: true
            }
        },
        buttons: {
            primary: {
                label: authLocales.forgotPassword.submitButton,
                loadingLabel: authLocales.forgotPassword.sendingButton
            }
        },
        links: [
            {
                label: authLocales.common.backButton,
                href: '/login'
            }
        ]
    },

    resetPassword: {
        fields: {
            password: {
                type: 'password',
                label: authLocales.resetPassword.passwordLabel,
                placeholder: '••••••••',
                required: true
            },
            confirmPassword: {
                type: 'password',
                label: authLocales.resetPassword.confirmPasswordLabel,
                placeholder: '••••••••',
                required: true
            }
        },
        buttons: {
            primary: {
                label: authLocales.resetPassword.submitButton,
                loadingLabel: authLocales.resetPassword.resettingButton
            }
        },
        links: [
            {
                label: authLocales.common.backButton,
                href: '/login'
            }
        ]
    }
}

export default authFormConfigs
