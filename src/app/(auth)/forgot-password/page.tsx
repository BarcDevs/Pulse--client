'use client'

import { useState } from 'react'

import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

import { AuthCard } from '@/components/auth/AuthCard'
import { AuthForm } from '@/components/form/AuthForm'
import { Logo } from '@/components/shared/brand/Logo'

import { getLocalizedApiErrorMessage } from '@/utils/error'

import { ROUTES } from '@/constants/routes'

import { requestPasswordReset } from '@/api/auth'
import { authLocales } from '@/locales/authLocales'
import type { EmailInputSchema } from '@/validations/forms/emailInputSchema'

const ForgotPasswordPage = () => {
    const t = useTranslations()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async ({ email }: EmailInputSchema) => {
        setIsLoading(true)
        setError(null)

        try {
            await requestPasswordReset(email)
            router.push(
                `${ROUTES.RESET_PASSWORD}?email=${encodeURIComponent(email)}`
            )
        } catch (err) {
            setError(getLocalizedApiErrorMessage(
                t,
                err,
                t(authLocales.forgotPassword.failed)
            ))
            setIsLoading(false)
        }
    }

    return (
        <div className={'w-full max-w-md'}>
            <Logo/>

            <AuthCard
                title={t(authLocales.forgotPassword.title)}
                description={t(authLocales.forgotPassword.description)}
            >
                <AuthForm
                    formType={'forgotPassword'}
                    onSuccessAction={handleSubmit}
                    isLoading={isLoading}
                    error={error}
                />
            </AuthCard>
        </div>
    )
}

export default ForgotPasswordPage
