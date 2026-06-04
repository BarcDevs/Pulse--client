'use client'

import { useState } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

import { PasswordRequirementsList } from '@/components/auth/password/PasswordRequirementsList'
import { AuthForm } from '@/components/form/AuthForm'
import { Logo } from '@/components/shared/brand/Logo'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card'

import { ROUTES } from '@/constants/routes'

import { timings } from '@/config/timings'

import { authLocales } from '@/locales/authLocales'

const ResetPasswordPage = () => {
    const t = useTranslations()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [password, setPassword] = useState('')

    const handleResetSuccess = async () => {
        setIsLoading(true)

        setTimeout(() => {
            setIsLoading(false)
            router.push(ROUTES.LOGIN)
        }, timings.AUTH_API_DELAY)
    }

    return (
        <div className={'w-full max-w-md'}>
            <Logo/>

            <Card className={'border-0 shadow-lg'}>
                <CardHeader>
                    <CardTitle className={'text-2xl font-semibold'}>
                        {t(authLocales.resetPassword.title)}
                    </CardTitle>
                    <CardDescription>
                        {t(authLocales.resetPassword.description)}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <AuthForm
                        formType={'resetPassword'}
                        onSuccessAction={handleResetSuccess}
                        isLoading={isLoading}
                        onPasswordChangeAction={setPassword}
                    />

                    <PasswordRequirementsList password={password}/>

                    <p className={'mt-6 text-center text-xs text-muted-foreground'}>
                        {`${t(authLocales.resetPassword.troubleText)} `}
                        <Link
                            href={ROUTES.SUPPORT}
                            className={'text-primary hover:underline'}
                        >
                            {t(authLocales.resetPassword.supportLink)}
                        </Link>
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}

export default ResetPasswordPage
