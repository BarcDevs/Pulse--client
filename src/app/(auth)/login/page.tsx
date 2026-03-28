'use client'

import {useState} from 'react'

import {useRouter} from 'next/navigation'

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

import {authTexts} from '@/constants/componentTexts/auth'

import {timings} from '@/config/timings'

const LoginPage = () => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const handleLoginSuccess = async () => {
        setIsLoading(true)

        setTimeout(() => {
            setIsLoading(false)
            router.push('/dashboard')
        }, timings.AUTH_API_DELAY)
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
