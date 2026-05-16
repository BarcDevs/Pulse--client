'use client'

import { useState } from 'react'

import { useTranslations } from 'next-intl'

import { GoogleLoginButton } from '@/components/auth/forms/GoogleLoginButton'
import { LoginSecurityFooter } from '@/components/auth/sections/LoginSecurityFooter'
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
import type { LoginSchema } from '@/validations/forms/loginSchema'

const LoginPage = () => {
    const t = useTranslations()
    const { handleLogin } = useAuthHandlers()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleLoginSuccess = async (
        credentials: LoginSchema
    ) => {
        setIsLoading(true)
        setError(null)
        const err = await handleLogin(credentials)
        setError(err)
        setIsLoading(false)
    }

    return (
        <Card className={'w-full max-w-md border-0 shadow-lg'}>
            <CardHeader className={'text-center'}>
                <CardTitle className={'text-2xl font-semibold'}>
                    {t(authLocales.login.title)}
                </CardTitle>
                <CardDescription>
                    {t(authLocales.login.description)}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <AuthForm
                    formType={'login'}
                    onSuccessAction={handleLoginSuccess}
                    isLoading={isLoading}
                    error={error}
                />

                <GoogleLoginButton/>

                <LoginSecurityFooter/>
            </CardContent>
        </Card>
    )
}

export default LoginPage
