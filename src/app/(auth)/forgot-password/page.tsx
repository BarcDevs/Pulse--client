'use client'

import { useState } from 'react'

import { useTranslations } from 'next-intl'

import { AuthCard } from '@/components/auth/AuthCard'
import { EmailVerificationView } from '@/components/auth/views/EmailVerificationView'
import { AuthForm } from '@/components/form/AuthForm'
import { Logo } from '@/components/shared/brand/Logo'

import { timings } from '@/config/timings'

import { authLocales } from '@/locales/authLocales'

const ForgotPasswordPage = () => {
    const t = useTranslations()
    const [email, setEmail] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)

    const handleSubmit = async (data: {email: string}) => {
        setEmail(data.email)
        setIsLoading(true)

        setTimeout(() => {
            setIsLoading(false)
            setIsSubmitted(true)
        }, timings.AUTH_API_DELAY)
    }

    if (isSubmitted)
        return <EmailVerificationView email={email}/>

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
                />
            </AuthCard>
        </div>
    )
}

export default ForgotPasswordPage
