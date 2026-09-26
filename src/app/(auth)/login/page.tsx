'use client'

import { useEffect, useState } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'

import { AuthCard } from '@/components/auth/AuthCard'
import { GoogleLoginButton } from '@/components/auth/forms/GoogleLoginButton'
import { LoginSecurityFooter } from '@/components/auth/sections/LoginSecurityFooter'
import { AuthForm } from '@/components/form/AuthForm'

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
        <AuthCard
            isCentered
            title={t(authLocales.login.title)}
            description={t(authLocales.login.description)}
            className={'w-full max-w-md'}
        >
            <AuthForm
                formType={'login'}
                onSuccessAction={handleLoginSuccess}
                isLoading={isLoading}
                error={error}
            />

            <GoogleLoginButton redirect={redirect}/>

            <LoginSecurityFooter/>
        </AuthCard>
    )
}

export default LoginPage
