'use client'

import {useState} from 'react'

import Link from 'next/link'
import {useRouter} from 'next/navigation'

import {AuthForm} from '@/components/form/AuthForm'
import {Logo} from '@/components/shared/Logo'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card'

import {RESET_PASSWORD} from '@/constants/authTexts'

import {TIMINGS} from '@/config/timings'

import {PasswordRequirementsList} from './PasswordRequirementsList'

const ResetPasswordPage = () => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [password, setPassword] = useState('')

    const handleResetSuccess = async () => {
        setIsLoading(true)

        setTimeout(() => {
            setIsLoading(false)
            router.push('/login')
        }, TIMINGS.AUTH_API_DELAY)
    }

    return (
        <div className={'w-full max-w-md'}>
            <Logo/>

            <Card className={'border-0 shadow-lg'}>
                <CardHeader>
                    <CardTitle className={'text-2xl font-semibold'}>
                        {RESET_PASSWORD.title}
                    </CardTitle>
                    <CardDescription>
                        {RESET_PASSWORD.description}
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
                        {`${RESET_PASSWORD.troubleText} `}
                        <Link
                            href={'/support'}
                            className={'text-primary hover:underline'}
                        >
                            {RESET_PASSWORD.supportLink}
                        </Link>
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}

export default ResetPasswordPage
