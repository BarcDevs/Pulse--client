import {AuthFormType, FormConfig} from '@/types/forms'

import {
    FORGOT_PASSWORD,
    LOGIN,
    RESET_PASSWORD,
    SIGNUP
} from '@/constants/authTexts'

type AuthFormConfigs = Record<
    AuthFormType,
    FormConfig
>

const authFormConfigs: AuthFormConfigs = {
    login: {
        fields: {
            email: {
                type: 'email',
                label: LOGIN.emailLabel,
                placeholder: LOGIN.emailPlaceholder,
                required: true
            },
            password: {
                type: 'password',
                label: LOGIN.passwordLabel,
                placeholder: '••••••••',
                required: true
            },
            remember: {
                type: 'checkbox',
                label: 'Remember me',
                required: false
            }
        },
        buttons: {
            primary: {
                label: LOGIN.loginButton,
                loadingLabel: LOGIN.loggingInButton
            }
        },
        links: [
            {
                label: LOGIN.forgotPasswordLink,
                href: '/forgot-password'
            }
        ]
    },

    signup: {
        fields: {
            firstName: {
                type: 'text',
                label: SIGNUP.firstNameLabel,
                placeholder: SIGNUP.firstNamePlaceholder,
                required: true
            },
            lastName: {
                type: 'text',
                label: SIGNUP.lastNameLabel,
                placeholder: SIGNUP.lastNamePlaceholder,
                required: true
            },
            email: {
                type: 'email',
                label: SIGNUP.emailLabel,
                placeholder: SIGNUP.emailPlaceholder,
                required: true
            },
            password: {
                type: 'password',
                label: SIGNUP.passwordLabel,
                placeholder: SIGNUP.passwordPlaceholder,
                required: true,
                description: 'Min 8 characters with letters and numbers'
            },
            confirmPassword: {
                type: 'password',
                label: SIGNUP.confirmPasswordLabel,
                placeholder: SIGNUP.confirmPasswordPlaceholder,
                required: true
            }
        },
        buttons: {
            primary: {
                label: SIGNUP.signupButton,
                loadingLabel: SIGNUP.signingUpButton
            }
        },
        links: [
            {
                label: `${SIGNUP.loginText} ${SIGNUP.loginLink}`,
                href: '/login'
            }
        ]
    },

    forgotPassword: {
        fields: {
            email: {
                type: 'email',
                label: FORGOT_PASSWORD.emailLabel,
                placeholder: FORGOT_PASSWORD.emailPlaceholder,
                required: true
            }
        },
        buttons: {
            primary: {
                label: FORGOT_PASSWORD.submitButton,
                loadingLabel: FORGOT_PASSWORD.sendingButton
            }
        },
        links: [
            {
                label: FORGOT_PASSWORD.backButton,
                href: '/login'
            }
        ]
    },

    resetPassword: {
        fields: {
            password: {
                type: 'password',
                label: RESET_PASSWORD.passwordLabel,
                placeholder: RESET_PASSWORD.passwordPlaceholder,
                required: true
            },
            confirmPassword: {
                type: 'password',
                label: RESET_PASSWORD.confirmPasswordLabel,
                placeholder: RESET_PASSWORD.passwordPlaceholder,
                required: true
            }
        },
        buttons: {
            primary: {
                label: RESET_PASSWORD.submitButton,
                loadingLabel: RESET_PASSWORD.resettingButton
            }
        },
        links: [
            {
                label: RESET_PASSWORD.backButton,
                href: '/login'
            }
        ]
    }
}

export default authFormConfigs
