'use client'

import { useEffect, useState } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'
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

import { useGetMe } from '@/hooks/queries/useGetMe'
import { useAuthHandlers } from '@/hooks/useAuthHandlers'

import { getSafeRedirectUrl } from '@/utils/redirect'

import { ROUTES } from '@/constants/routes'

import { authLocales } from '@/locales/authLocales'
import type { LoginSchema } from '@/validations/forms/loginSchema'

const LoginPage = () => {
    const t = useTranslations()
    const { handleLogin } = useAuthHandlers()
    const router = useRouter()
    const searchParams = useSearchParams()
    const redirect = searchParams.get('redirect')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const { user } = useGetMe()

    useEffect(() => {
        if (user) router.replace(
            getSafeRedirectUrl(redirect, ROUTES.DASHBOARD)
        )
    }, [user, redirect, router])

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

                <GoogleLoginButton redirect={redirect}/>

                <LoginSecurityFooter/>
            </CardContent>
        </Card>
    )
}

export default LoginPage
