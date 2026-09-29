'use client'

import { useState } from 'react'

import Link from 'next/link'
import { useTranslations } from 'next-intl'

import { AuthCard } from '@/components/auth/AuthCard'
import { AuthForm } from '@/components/form/AuthForm'

import { getLocalizedApiErrorMessage } from '@/utils/error'

import { ROUTES } from '@/constants/routes'

import { resetPassword } from '@/api/auth'
import { authLocales } from '@/locales/authLocales'
import type { ResetPasswordSchema } from '@/validations/forms/resetPasswordSchema'

type NewPasswordStepProps = {
    email: string
    otp: string
    onCodeRejectedAction: () => void
    onSuccessAction: () => void
}

export const NewPasswordStep = ({
    email,
    otp,
    onCodeRejectedAction,
    onSuccessAction
}: NewPasswordStepProps) => {
    const t = useTranslations()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async ({
        password: newPassword
    }: ResetPasswordSchema) => {
        setIsLoading(true)
        setError(null)

        try {
            await resetPassword({
                email,
                newPassword,
                userOTP: Number(otp)
            })
            onSuccessAction()
        } catch (err) {
            setIsLoading(false)
            const detailCode = (err as any)?.response?.data?.error?.[0]?.code
            if (detailCode === 'AUTH_RESET_PASSWORD') {
                onCodeRejectedAction()
                return
            }
            setError(getLocalizedApiErrorMessage(
                t,
                err,
                t(authLocales.resetPassword.failed)
            ))
        }
    }

    return (
        <AuthCard
            title={t(authLocales.resetPassword.title)}
            description={t(authLocales.resetPassword.newPasswordDesc)}
        >
            <AuthForm
                formType={'resetPassword'}
                onSuccessAction={handleSubmit}
                isLoading={isLoading}
                error={error}
            />

            <p className={'mt-6 text-center text-xs text-muted-foreground'}>
                {`${t(authLocales.resetPassword.troubleText)} `}
                <Link
                    href={ROUTES.SUPPORT}
                    className={'cursor-pointer text-primary hover:underline'}
                >
                    {t(authLocales.resetPassword.supportLink)}
                </Link>
            </p>

            <Link
                href={ROUTES.LOGIN}
                className={'mt-6 block cursor-pointer text-center text-sm text-primary hover:underline'}
            >
                {t(authLocales.common.backButton)}
            </Link>
        </AuthCard>
    )
}
