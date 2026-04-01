'use client'

import {useState} from 'react'

import {GoogleLoginButton} from '@/components/auth/forms/GoogleLoginButton'
import {AuthForm} from '@/components/form/AuthForm'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card'

import {useAuthHandlers} from '@/hooks/useAuthHandlers'

import {authTexts} from '@/constants/componentTexts/auth'

import type {SignupSchema} from '@/validations/forms/signupSchema'

const SignupPage = () => {
    const { handleSignup } = useAuthHandlers()
    const [isLoading, setIsLoading] = useState(false)

    const handleSignupSuccess = async (
        userData: SignupSchema
    ) => {
        setIsLoading(true)
        const { ...dataWithoutConfirm } = userData
        await handleSignup(dataWithoutConfirm)
        setIsLoading(false)
    }

    return (
        <Card className={'w-full max-w-md border-0 shadow-lg'}>
            <CardHeader className={'text-center'}>
                <CardTitle className={'text-2xl font-semibold'}>
                    {authTexts.signup.title}
                </CardTitle>
                <CardDescription>
                    {authTexts.signup.description}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <AuthForm
                    formType={'signup'}
                    onSuccessAction={handleSignupSuccess}
                    isLoading={isLoading}
                />

                <GoogleLoginButton/>
            </CardContent>
        </Card>
    )
}

export default SignupPage
