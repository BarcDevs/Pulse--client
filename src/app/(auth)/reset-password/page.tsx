'use client'

import {useState} from 'react'

import Link from 'next/link'
import {useRouter} from 'next/navigation'

import {PasswordRequirementsList} from '@/components/auth/password/PasswordRequirementsList'
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

const ResetPasswordPage = () => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [password, setPassword] = useState('')

    const handleResetSuccess = async () => {
        setIsLoading(true)

        setTimeout(() => {
            setIsLoading(false)
            router.push('/login')
        }, timings.AUTH_API_DELAY)
    }

    return (
        <div className={'w-full max-w-md'}>
            <Logo/>

            <Card className={'border-0 shadow-lg'}>
                <CardHeader>
                    <CardTitle className={'text-2xl font-semibold'}>
                        {authTexts.resetPassword.title}
                    </CardTitle>
                    <CardDescription>
                        {authTexts.resetPassword.description}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <AuthForm
                        formType={'resetPassword'}
                        onSuccess={handleResetSuccess}
                        isLoading={isLoading}
                        onPasswordChange={setPassword}
                    />

                    <PasswordRequirementsList password={password}/>

                    <p className={'mt-6 text-center text-xs text-muted-foreground'}>
                        {`${authTexts.resetPassword.troubleText} `}
                        <Link
                            href={'/support'}
                            className={'text-primary hover:underline'}
                        >
                            {authTexts.resetPassword.supportLink}
                        </Link>
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}

export default ResetPasswordPage
