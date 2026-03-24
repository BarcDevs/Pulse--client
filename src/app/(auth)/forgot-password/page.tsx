'use client'

import {
    SyntheticEvent,
    useState,
} from 'react'

import Link from 'next/link'

import {ArrowLeft, ArrowRight, Mail} from 'lucide-react'

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

import {FORGOT_PASSWORD} from '@/constants/authTexts'

import {TIMINGS} from '@/config/timings'

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)

    const handleSubmit = async (
        e: SyntheticEvent<HTMLFormElement>
    ) => {
        e.preventDefault()
        setIsLoading(true)

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false)
            setIsSubmitted(true)
        }, TIMINGS.AUTH_API_DELAY)
    }

    if (isSubmitted) {
        return (
            <Card className={'w-full max-w-md border-0 shadow-lg'}>
                <CardContent className={'pt-8 text-center'}>
                    <div className={'mx-auto flex size-16 items-center justify-center rounded-full bg-secondary-light'}>
                        <Mail className={'size-8 text-secondary'}/>
                    </div>
                    <h2 className={'mt-6 text-2xl font-semibold text-foreground'}>
                        {FORGOT_PASSWORD.checkEmailTitle}
                    </h2>
                    <p className={'mt-2 text-muted-foreground'}>
                        {`${FORGOT_PASSWORD.checkEmailDesc} `}
                        <span className={'font-medium text-foreground'}>
                            {email}
                        </span>
                    </p>
                    <Link
                        href={'/login'}
                        className={'mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline'}
                    >
                        <ArrowLeft className={'size-4'}/>
                        {FORGOT_PASSWORD.backButton}
                    </Link>
                </CardContent>
            </Card>
        )
    }

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
                    <form onSubmit={handleSubmit} className={'space-y-4'}>
                        <div className={'space-y-2'}>
                            <label
                                htmlFor={'email'}
                                className={'text-xs font-medium uppercase tracking-wider text-muted-foreground'}
                            >
                                {FORGOT_PASSWORD.emailLabel}
                            </label>
                            <div className={'relative'}>
                                <FormInput
                                    id={'email'}
                                    label={''}
                                    type={'email'}
                                    placeholder={FORGOT_PASSWORD.emailPlaceholder}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <Mail className={'absolute right-3 top-1/2 size-5 -translate-y-1/2 text-muted-foreground'}/>
                            </div>
                        </div>

                        <Button
                            type={'submit'}
                            className={'h-11 w-full bg-primary text-white hover:bg-primary/90'}
                            disabled={isLoading}
                        >
                            {isLoading
                                ? FORGOT_PASSWORD.sendingButton
                                : FORGOT_PASSWORD.submitButton}
                            {!isLoading && (
                                <ArrowRight className={'ml-2 size-4'}/>
                            )}
                        </Button>

                        <Link
                            href={'/login'}
                            className={'flex items-center justify-center gap-2 text-sm font-medium text-foreground hover:underline'}
                        >
                            <ArrowLeft className={'size-4'}/>
                            {FORGOT_PASSWORD.backButton}
                        </Link>
                    </form>

                    <p className={'mt-6 text-center text-xs text-muted-foreground'}>
                        {`${FORGOT_PASSWORD.supportText} `}
                        <Link
                            href={'/support'}
                            className={'text-primary hover:underline'}
                        >
                            {FORGOT_PASSWORD.supportLink}
                        </Link>
                        {` ${FORGOT_PASSWORD.supportVerification}`}
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}

export default ForgotPasswordPage
