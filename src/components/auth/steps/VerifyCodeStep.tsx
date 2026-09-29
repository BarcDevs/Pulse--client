'use client'

import { useEffect, useState } from 'react'

import Link from 'next/link'
import { useTranslations } from 'next-intl'

import { AuthCard } from '@/components/auth/AuthCard'
import { AuthForm } from '@/components/form/AuthForm'

import { getLocalizedApiErrorMessage } from '@/utils/error'

import { ROUTES } from '@/constants/routes'

import { requestPasswordReset, verifyResetCode } from '@/api/auth'
import { authLocales } from '@/locales/authLocales'
import type { OtpSchema } from '@/validations/forms/otpSchema'

const RESEND_COOLDOWN_SECONDS = 30

type VerifyCodeStepProps = {
    email: string
    onVerifiedAction: (otp: string) => void
}

export const VerifyCodeStep = ({
    email,
    onVerifiedAction
}: VerifyCodeStepProps) => {
    const t = useTranslations()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [resendIn, setResendIn] = useState(RESEND_COOLDOWN_SECONDS)

    useEffect(() => {
        if (resendIn <= 0) return
        const timer = setTimeout(() => setResendIn(resendIn - 1), 1000)
        return () => clearTimeout(timer)
    }, [resendIn])

    const handleSubmit = async ({ otp }: OtpSchema) => {
        setIsLoading(true)
        setError(null)

        try {
            await verifyResetCode({ email, userOTP: Number(otp) })
            onVerifiedAction(otp)
        } catch (err) {
            setError(getLocalizedApiErrorMessage(
                t,
                err,
                t(authLocales.resetPassword.codeFailed)
            ))
            setIsLoading(false)
        }
    }

    const handleResend = async () => {
        setError(null)

        try {
            await requestPasswordReset(email)
            setResendIn(RESEND_COOLDOWN_SECONDS)
        } catch (err) {
            setError(getLocalizedApiErrorMessage(
                t,
                err,
                t(authLocales.resetPassword.codeFailed)
            ))
        }
    }

    return (
        <AuthCard
            title={t(authLocales.resetPassword.verifyTitle)}
            description={t(
                authLocales.resetPassword.codeSentTo,
                { email }
            )}
        >
            <AuthForm
                formType={'verifyResetCode'}
                onSuccessAction={handleSubmit}
                isLoading={isLoading}
                error={error}
            />

            <p className={'mt-6 text-center text-sm text-muted-foreground'}>
                {`${t(authLocales.resetPassword.resendPrompt)} `}
                {resendIn > 0
                    ? (
                        <span className={'font-semibold'}>
                            {`${t(
                                authLocales.resetPassword.resendCountdown,
                                { seconds: String(resendIn) }
                            )}.`}
                        </span>
                    )
                    : (
                        <button
                            type={'button'}
                            onClick={handleResend}
                            className={'cursor-pointer font-semibold text-primary hover:underline'}
                        >
                            {`${t(authLocales.resetPassword.resendLink)}.`}
                        </button>
                    )
                }
            </p>

            <Link
                href={ROUTES.FORGOT_PASSWORD}
                className={'mt-2 block cursor-pointer text-center text-xs text-primary hover:underline'}
            >
                {t(authLocales.resetPassword.differentEmailLink)}
            </Link>

            <Link
                href={ROUTES.LOGIN}
                className={'mt-6 block cursor-pointer text-center text-sm text-primary hover:underline'}
            >
                {t(authLocales.common.backButton)}
            </Link>
        </AuthCard>
    )
}
