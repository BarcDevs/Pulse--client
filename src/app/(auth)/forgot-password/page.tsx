'use client'

import {
    SyntheticEvent,
    useState,
} from 'react'

import {Logo} from '@/components/shared/Logo'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'

import {FORGOT_PASSWORD} from '@/constants/authTexts'

import {TIMINGS} from '@/config/timings'

import {EmailVerificationView} from './EmailVerificationView'
import {ForgotPasswordForm} from './ForgotPasswordForm'

const ForgotPasswordPage = () => {
    //todo: move form out of page as a reusable form
    const [email, setEmail] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)

    const handleSubmit = async (
        e: SyntheticEvent<HTMLFormElement>
    ) => {
        e.preventDefault()
        setIsLoading(true)

        // Simulate todo: API call
        setTimeout(() => {
            setIsLoading(false)
            setIsSubmitted(true)
        }, TIMINGS.AUTH_API_DELAY)
    }

    if (isSubmitted)
        return <EmailVerificationView email={email}/>

    return (
        <div className={'w-full max-w-md'}>
            <Logo/>

            <Card className={'border-0 shadow-lg'}>
                <CardHeader>
                    <CardTitle className={'text-2xl font-semibold'}>
                        {FORGOT_PASSWORD.title}
                    </CardTitle>
                    <CardDescription>
                        {FORGOT_PASSWORD.description}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ForgotPasswordForm
                        email={email}
                        isLoading={isLoading}
                        onEmailChange={setEmail}
                        onSubmit={handleSubmit}
                    />
                </CardContent>
            </Card>
        </div>
    )
}

export default ForgotPasswordPage
