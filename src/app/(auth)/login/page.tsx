'use client'

import {useState} from 'react'

import {GoogleLoginButton} from '@/components/auth/forms/GoogleLoginButton'
import {LoginSecurityFooter} from '@/components/auth/sections/LoginSecurityFooter'
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

import type {LoginSchema} from '@/validations/forms/loginSchema'

const LoginPage = () => {
    const { handleLogin } = useAuthHandlers()
    const [isLoading, setIsLoading] = useState(false)

    const handleLoginSuccess = async (
        credentials: LoginSchema
    ) => {
        setIsLoading(true)
        await handleLogin(credentials)
        setIsLoading(false)
    }

    return (
        <Card className={'w-full max-w-md border-0 shadow-lg'}>
            <CardHeader className={'text-center'}>
                <CardTitle className={'text-2xl font-semibold'}>
                    {authTexts.login.title}
                </CardTitle>
                <CardDescription>
                    {authTexts.login.description}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <AuthForm
                    formType={'login'}
                    onSuccessAction={handleLoginSuccess}
                    isLoading={isLoading}
                />

                <GoogleLoginButton/>

                <LoginSecurityFooter/>
            </CardContent>
        </Card>
    )
}

export default LoginPage
