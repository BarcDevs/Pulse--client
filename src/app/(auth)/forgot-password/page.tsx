'use client'

import { useState } from 'react'

import { useTranslations } from 'next-intl'

import { EmailVerificationView } from '@/components/auth/views/EmailVerificationView'
import { AuthForm } from '@/components/form/AuthForm'
import { Logo } from '@/components/shared/brand/Logo'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card'

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

            <Card className={'border-0 shadow-lg'}>
                <CardHeader>
                    <CardTitle className={'text-2xl font-semibold'}>
                        {t(authLocales.forgotPassword.title)}
                    </CardTitle>
                    <CardDescription>
                        {t(authLocales.forgotPassword.description)}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <AuthForm
                        formType={'forgotPassword'}
                        onSuccessAction={handleSubmit}
                        isLoading={isLoading}
                    />
                </CardContent>
            </Card>
        </div>
    )
}

export default ForgotPasswordPage
