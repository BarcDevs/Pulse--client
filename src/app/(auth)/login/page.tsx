'use client'

import {
    SyntheticEvent,
    useState,
} from 'react'

import {useRouter} from 'next/navigation'

import {Button} from '@/components/ui/button'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card'

import {LOGIN} from '@/constants/authTexts'

import {TIMINGS} from '@/config/timings'

import {LoginFormInputs} from './LoginFormInputs'
import {LoginOAuthSection} from './LoginOAuthSection'
import {LoginSecurityFooter} from './LoginSecurityFooter'

const LoginPage = () => {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (
        e: SyntheticEvent<HTMLFormElement>
    ) => {
        e.preventDefault()
        setIsLoading(true)

        // Simulate login
        setTimeout(() => {
            setIsLoading(false)
            router.push('/dashboard')
        }, TIMINGS.AUTH_API_DELAY)
    }

    return (
        <Card className={'w-full max-w-md border-0 shadow-lg'}>
            <CardHeader className={'text-center'}>
                <CardTitle className={'text-2xl font-semibold'}>
                    {LOGIN.title}
                </CardTitle>
                <CardDescription>
                    {LOGIN.description}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form
                    onSubmit={handleSubmit}
                    className={'space-y-4'}
                >
                    <LoginFormInputs
                        email={email}
                        password={password}
                        onEmailChange={setEmail}
                        onPasswordChange={setPassword}
                    />

                    <Button
                        type={'submit'}
                        className={'h-11 w-full bg-primary text-white hover:bg-primary/90'}
                        disabled={isLoading}
                    >
                        {isLoading
                            ? LOGIN.loggingInButton
                            : LOGIN.loginButton}
                    </Button>

                    <LoginOAuthSection/>

                    <LoginSecurityFooter/>
                </form>
            </CardContent>
        </Card>
    )
}

export default LoginPage
