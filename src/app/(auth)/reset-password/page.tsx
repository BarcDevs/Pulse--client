'use client'

import {
    SyntheticEvent,
    useState,
} from 'react'

import Link from 'next/link'
import {useRouter} from 'next/navigation'

import {ArrowLeft, ArrowRight} from 'lucide-react'

import {FormInput} from '@/components/shared/FormInput'
import {Logo} from '@/components/shared/Logo'
import {Button} from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'

import {RESET_PASSWORD} from '@/constants/authTexts'

import authFormConfig from '@/config/schema/authForm'
import {TIMINGS} from '@/config/timings'

import {PasswordRequirementsList} from './PasswordRequirementsList'

const ResetPasswordPage = () => {
    const router = useRouter()
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const hasMinLength =
        password.length >=
        authFormConfig.password.minLength
    const hasSpecialChar = authFormConfig
        .password.specialCharPattern.test(password)
    const passwordsMatch =
        password === confirmPassword &&
        password.length > 0

    const handleSubmit = async (
        e: SyntheticEvent<HTMLFormElement>
    ) => {
        e.preventDefault()
        if (
            !hasMinLength ||
            !hasSpecialChar ||
            !passwordsMatch
        ) return

        setIsLoading(true)

        // Simulate API call. todo: add real api call
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
                    <form
                        onSubmit={handleSubmit}
                        className={'space-y-4'}
                    >
                        <FormInput
                            id={'password'}
                            label={RESET_PASSWORD.passwordLabel}
                            type={'password'}
                            placeholder={RESET_PASSWORD.passwordPlaceholder}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <FormInput
                            id={'confirmPassword'}
                            label={RESET_PASSWORD.confirmPasswordLabel}
                            type={'password'}
                            placeholder={RESET_PASSWORD.passwordPlaceholder}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />

                        <PasswordRequirementsList
                            hasMinLength={hasMinLength}
                            hasSpecialChar={hasSpecialChar}
                        />

                        <Button
                            type={'submit'}
                            className={'h-11 w-full bg-primary text-white hover:bg-primary/90'}
                            disabled={isLoading || !hasMinLength || !hasSpecialChar || !passwordsMatch}
                        >
                            {isLoading
                                ? RESET_PASSWORD.resettingButton
                                : RESET_PASSWORD.submitButton}
                            {!isLoading && <ArrowRight className={'ml-2 size-4'}/>}
                        </Button>

                        <Link
                            href={'/login'}
                            className={'flex items-center justify-center gap-2 text-sm font-medium text-foreground hover:underline'}
                        >
                            <ArrowLeft className={'size-4'}/>
                            {RESET_PASSWORD.backButton}
                        </Link>
                    </form>

                    <p className={'mt-6 text-center text-xs text-muted-foreground'}>
                        {`${RESET_PASSWORD.troubleText} `}
                        <Link href={'/support'} className={'text-primary hover:underline'}>
                            {RESET_PASSWORD.supportLink}
                        </Link>
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}

export default ResetPasswordPage
