import { AuthFormType, FormConfig } from '@/types/forms/forms'

import { authTexts } from '@/constants/componentTexts/auth'

type AuthFormConfigs = Record<
    AuthFormType,
    FormConfig
>

const authFormConfigs: AuthFormConfigs = {
    login: {
        fields: {
            email: {
                type: 'email',
                label: authTexts.login.emailLabel,
                placeholder: authTexts.login.emailPlaceholder,
                required: true
            },
            password: {
                type: 'password',
                label: authTexts.login.passwordLabel,
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
                label: authTexts.login.loginButton,
                loadingLabel: authTexts.login.loggingInButton
            }
        },
        links: [
            {
                label: authTexts.login.forgotPasswordLink,
                href: '/forgot-password'
            }
        ]
    },

    signup: {
        fields: {
            firstName: {
                type: 'text',
                label: authTexts.signup.firstNameLabel,
                placeholder: authTexts.signup.firstNamePlaceholder,
                required: true
            },
            lastName: {
                type: 'text',
                label: authTexts.signup.lastNameLabel,
                placeholder: authTexts.signup.lastNamePlaceholder,
                required: true
            },
            email: {
                type: 'email',
                label: authTexts.signup.emailLabel,
                placeholder: authTexts.signup.emailPlaceholder,
                required: true
            },
            password: {
                type: 'password',
                label: authTexts.signup.passwordLabel,
                placeholder: authTexts.signup.passwordPlaceholder,
                required: true,
                description: 'Min 8 characters with letters and numbers'
            },
            confirmPassword: {
                type: 'password',
                label: authTexts.signup.confirmPasswordLabel,
                placeholder: authTexts.signup.confirmPasswordPlaceholder,
                required: true
            }
        },
        buttons: {
            primary: {
                label: authTexts.signup.signupButton,
                loadingLabel: authTexts.signup.signingUpButton
            }
        },
        links: [
            {
                label: `${authTexts.signup.loginText} ${authTexts.signup.loginLink}`,
                href: '/login'
            }
        ]
    },

    forgotPassword: {
        fields: {
            email: {
                type: 'email',
                label: authTexts.forgotPassword.emailLabel,
                placeholder: authTexts.forgotPassword.emailPlaceholder,
                required: true
            }
        },
        buttons: {
            primary: {
                label: authTexts.forgotPassword.submitButton,
                loadingLabel: authTexts.forgotPassword.sendingButton
            }
        },
        links: [
            {
                label: authTexts.forgotPassword.backButton,
                href: '/login'
            }
        ]
    },

    resetPassword: {
        fields: {
            password: {
                type: 'password',
                label: authTexts.resetPassword.passwordLabel,
                placeholder: authTexts.resetPassword.passwordPlaceholder,
                required: true
            },
            confirmPassword: {
                type: 'password',
                label: authTexts.resetPassword.confirmPasswordLabel,
                placeholder: authTexts.resetPassword.passwordPlaceholder,
                required: true
            }
        },
        buttons: {
            primary: {
                label: authTexts.resetPassword.submitButton,
                loadingLabel: authTexts.resetPassword.resettingButton
            }
        },
        links: [
            {
                label: authTexts.resetPassword.backButton,
                href: '/login'
            }
        ]
    }
}

export default authFormConfigs
