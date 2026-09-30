'use client'

import { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

import { AuthCard } from '@/components/auth/AuthCard'
import { GoogleLoginButton } from '@/components/auth/forms/GoogleLoginButton'
import { AuthForm } from '@/components/form/AuthForm'

import { useGetMe } from '@/hooks/queries/useGetMe'
import { useAuthHandlers } from '@/hooks/useAuthHandlers'

import { ROUTES } from '@/constants/routes'

import { authLocales } from '@/locales/authLocales'
import type { SignupSchema } from '@/validations/forms/signupSchema'

const SignupPage = () => {
    const t = useTranslations()
    const { handleSignup } = useAuthHandlers()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const { user } = useGetMe()

    useEffect(() => {
        if (user) router.replace(ROUTES.DASHBOARD)
    }, [user, router])

    const handleSignupSuccess = async (
        userData: SignupSchema
    ) => {
        setIsLoading(true)
        setError(null)
        // The terms tick only gates the form, the server is not told
        const err = await handleSignup({
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            password: userData.password
        })
        setError(err)
        setIsLoading(false)
    }

    return (
        <AuthCard
            isCentered
            title={t(authLocales.signup.title)}
            description={t(authLocales.signup.description)}
            className={'w-full max-w-md'}
        >
            <AuthForm
                formType={'signup'}
                onSuccessAction={handleSignupSuccess}
                isLoading={isLoading}
                error={error}
            />

            <GoogleLoginButton/>
        </AuthCard>
    )
}

export default SignupPage
