export const authLocales = {
    common: {
        emailLabel: 'auth.common.emailLabel',
        emailPlaceholder: 'auth.common.emailPlaceholder',
        passwordLabel: 'auth.common.passwordLabel',
        backButton: 'auth.common.backButton',
        orContinueWith: 'auth.common.orContinueWith',
        googleButton: 'auth.common.googleButton',
        continueWithGoogle: 'auth.common.continueWithGoogle'
    },
    login: {
        title: 'auth.login.title',
        description: 'auth.login.description',
        forgotPasswordLink: 'auth.login.forgotPasswordLink',
        loginButton: 'auth.login.loginButton',
        loggingInButton: 'auth.login.loggingInButton',
        signupText: 'auth.login.signupText',
        signupLink: 'auth.login.signupLink',
        hipaaText: 'auth.login.hipaaText'
    },
    signup: {
        title: 'auth.signup.title',
        description: 'auth.signup.description',
        firstNameLabel: 'common.fields.firstName',
        firstNamePlaceholder: 'auth.signup.firstNamePlaceholder',
        lastNameLabel: 'common.fields.lastName',
        lastNamePlaceholder: 'auth.signup.lastNamePlaceholder',
        confirmPasswordLabel: 'auth.signup.confirmPasswordLabel',
        signupButton: 'auth.signup.signupButton',
        signingUpButton: 'auth.signup.signingUpButton',
        loginText: 'auth.signup.loginText',
        loginLink: 'auth.signup.loginLink'
    },
    forgotPassword: {
        title: 'auth.forgotPassword.title',
        description: 'auth.forgotPassword.description',
        submitButton: 'auth.forgotPassword.submitButton',
        sendingButton: 'auth.forgotPassword.sendingButton',
        checkEmailTitle: 'auth.forgotPassword.checkEmailTitle',
        checkEmailDesc: 'auth.forgotPassword.checkEmailDesc',
        supportLink: 'auth.forgotPassword.supportLink',
        supportText: 'auth.forgotPassword.supportText',
        supportVerification: 'auth.forgotPassword.supportVerification'
    },
    resetPassword: {
        title: 'auth.resetPassword.title',
        description: 'auth.resetPassword.description',
        passwordLabel: 'auth.resetPassword.passwordLabel',
        confirmPasswordLabel: 'auth.resetPassword.confirmPasswordLabel',
        minLengthText: 'auth.resetPassword.minLengthText',
        specialCharText: 'auth.resetPassword.specialCharText',
        submitButton: 'auth.resetPassword.submitButton',
        resettingButton: 'auth.resetPassword.resettingButton',
        troubleText: 'auth.resetPassword.troubleText',
        supportLink: 'auth.resetPassword.supportLink'
    }
} as const
