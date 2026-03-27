'use client'

import {useState} from 'react'

import {EmailVerificationView} from '@/components/auth/views/EmailVerificationView'
import {AuthForm} from '@/components/form/AuthForm'
import {Logo} from '@/components/shared/Logo'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card'

import {authTexts} from '@/constants/componentTexts/auth'

import {timings} from '@/config/timings'

const ForgotPasswordPage = () => {
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
                        {authTexts.forgotPassword.title}
                    </CardTitle>
                    <CardDescription>
                        {authTexts.forgotPassword.description}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <AuthForm
                        formType={'forgotPassword'}
                        onSuccess={handleSubmit}
                        isLoading={isLoading}
                    />
                </CardContent>
            </Card>
        </div>
    )
}

export default ForgotPasswordPage
