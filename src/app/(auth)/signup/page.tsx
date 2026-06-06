'use client'

import { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'
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
        const { ...dataWithoutConfirm } = userData
        const err = await handleSignup(dataWithoutConfirm)
        setError(err)
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
                    error={error}
                />

                <GoogleLoginButton/>
            </CardContent>
        </Card>
    )
}

export default SignupPage
