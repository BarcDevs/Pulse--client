'use client'

import { useEffect, useState } from 'react'

import Link from 'next/link'
import { useTranslations } from 'next-intl'

import { toast } from 'sonner'

import { AuthCard } from '@/components/auth/AuthCard'
import { AuthForm } from '@/components/form/AuthForm'

import { getApiErrorStatus, getLocalizedApiErrorMessage } from '@/utils/error'

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
        // Reset up front: closes the double-click window where two resends
        // would each burn one of the shared 5-per-15-min rate-limit slots
        setResendIn(RESEND_COOLDOWN_SECONDS)

        try {
            await requestPasswordReset(email)
            toast.success(t(authLocales.resetPassword.resendSuccessToast))
        } catch (err) {
            if (getApiErrorStatus(err) === 429) {
                // The old code wasn't touched — don't invite a retry that'll just 429 again
                setError(t(authLocales.resetPassword.resendRateLimited))
                return
            }

            // Can't tell whether the old code was replaced before this failed, so
            // keep the cooldown running either way — repeated failed resends still
            // count against the per-IP budget shared with verify/reset
            setError(getLocalizedApiErrorMessage(
                t,
                err,
                t(authLocales.resetPassword.resendFailed)
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
