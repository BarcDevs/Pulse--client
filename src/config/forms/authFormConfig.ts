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
                label: authLocales.login.emailLabel,
                placeholder: authLocales.login.emailPlaceholder,
                required: true
            },
            password: {
                type: 'password',
                label: authLocales.login.passwordLabel,
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
                label: authLocales.signup.emailLabel,
                placeholder: authLocales.signup.emailPlaceholder,
                required: true
            },
            password: {
                type: 'password',
                label: authLocales.signup.passwordLabel,
                placeholder: authLocales.signup.passwordPlaceholder,
                required: true,
                description: 'auth.signup.passwordDescription'
            },
            confirmPassword: {
                type: 'password',
                label: authLocales.signup.confirmPasswordLabel,
                placeholder: authLocales.signup.confirmPasswordPlaceholder,
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
                label: `${authLocales.signup.loginText} ${authLocales.signup.loginLink}`,
                href: '/login'
            }
        ]
    },

    forgotPassword: {
        fields: {
            email: {
                type: 'email',
                label: authLocales.forgotPassword.emailLabel,
                placeholder: authLocales.forgotPassword.emailPlaceholder,
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
                label: authLocales.forgotPassword.backButton,
                href: '/login'
            }
        ]
    },

    resetPassword: {
        fields: {
            password: {
                type: 'password',
                label: authLocales.resetPassword.passwordLabel,
                placeholder: authLocales.resetPassword.passwordPlaceholder,
                required: true
            },
            confirmPassword: {
                type: 'password',
                label: authLocales.resetPassword.confirmPasswordLabel,
                placeholder: authLocales.resetPassword.passwordPlaceholder,
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
                label: authLocales.resetPassword.backButton,
                href: '/login'
            }
        ]
    }
}

export default authFormConfigs
