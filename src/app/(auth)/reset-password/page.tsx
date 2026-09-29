'use client'

import { useEffect, useState } from 'react'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'

import { toast } from 'sonner'

import { AuthCard } from '@/components/auth/AuthCard'
import { PasswordRequirementsList } from '@/components/auth/password/PasswordRequirementsList'
import { AuthForm } from '@/components/form/AuthForm'
import { Logo } from '@/components/shared/brand/Logo'

import { getLocalizedApiErrorMessage } from '@/utils/error'

import { ROUTES } from '@/constants/routes'

import { resetPassword } from '@/api/auth'
import { authLocales } from '@/locales/authLocales'
import type { ResetPasswordSchema } from '@/validations/forms/resetPasswordSchema'

const ResetPasswordPage = () => {
    const t = useTranslations()
    const router = useRouter()
    const email = useSearchParams().get('email')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [password, setPassword] = useState('')

    // The code is tied to an email; without one, start from the request step
    useEffect(() => {
        if (!email) router.replace(ROUTES.FORGOT_PASSWORD)
    }, [email, router])

    const handleSubmit = async ({
        otp,
        password: newPassword
    }: ResetPasswordSchema) => {
        if (!email) return

        setIsLoading(true)
        setError(null)

        try {
            await resetPassword({
                email,
                newPassword,
                userOTP: Number(otp)
            })
            toast.success(t(authLocales.resetPassword.successToast))
            router.push(ROUTES.LOGIN)
        } catch (err) {
            setError(getLocalizedApiErrorMessage(
                t,
                err,
                t(authLocales.resetPassword.failed)
            ))
            setIsLoading(false)
        }
    }

    if (!email) return null

    return (
        <div className={'w-full max-w-md'}>
            <Logo/>

            <AuthCard
                title={t(authLocales.resetPassword.title)}
                description={t(
                    authLocales.resetPassword.codeSentTo,
                    { email }
                )}
            >
                <AuthForm
                    formType={'resetPassword'}
                    onSuccessAction={handleSubmit}
                    isLoading={isLoading}
                    error={error}
                    onPasswordChangeAction={setPassword}
                />

                <PasswordRequirementsList password={password}/>

                <p className={'mt-6 text-center text-xs text-muted-foreground'}>
                    {`${t(authLocales.resetPassword.resendText)} `}
                    <Link
                        href={ROUTES.FORGOT_PASSWORD}
                        className={'text-primary hover:underline'}
                    >
                        {t(authLocales.resetPassword.resendLink)}
                    </Link>
                </p>

                <p className={'mt-2 text-center text-xs text-muted-foreground'}>
                    {`${t(authLocales.resetPassword.troubleText)} `}
                    <Link
                        href={ROUTES.SUPPORT}
                        className={'text-primary hover:underline'}
                    >
                        {t(authLocales.resetPassword.supportLink)}
                    </Link>
                </p>
            </AuthCard>
        </div>
    )
}

export default ResetPasswordPage
