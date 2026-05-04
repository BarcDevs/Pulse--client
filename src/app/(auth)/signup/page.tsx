'use client'

import { useState } from 'react'

import { useTranslations } from 'next-intl'

import { GoogleLoginButton } from '@/components/auth/forms/GoogleLoginButton'
import { AuthForm } from '@/components/form/AuthForm'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card'

import { useAuthHandlers } from '@/hooks/useAuthHandlers'

import { authLocales } from '@/locales/authLocales'
import type { SignupSchema } from '@/validations/forms/signupSchema'

const SignupPage = () => {
    const t = useTranslations()
    const { handleSignup } = useAuthHandlers()
    const [isLoading, setIsLoading] = useState(false)

    const handleSignupSuccess = async (
        userData: SignupSchema
    ) => {
        setIsLoading(true)
        const { ...dataWithoutConfirm } = userData
        await handleSignup(dataWithoutConfirm)
        setIsLoading(false)
    }

    return (
        <Card className={'w-full max-w-md border-0 shadow-lg'}>
            <CardHeader className={'text-center'}>
                <CardTitle className={'text-2xl font-semibold'}>
                    {t(authLocales.signup.title)}
                </CardTitle>
                <CardDescription>
                    {t(authLocales.signup.description)}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <AuthForm
                    formType={'signup'}
                    onSuccessAction={handleSignupSuccess}
                    isLoading={isLoading}
                />

                <GoogleLoginButton/>
            </CardContent>
        </Card>
    )
}

export default SignupPage
