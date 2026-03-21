'use client'

import {
    SyntheticEvent,
    useState,
} from 'react'

import Link from 'next/link'
import {useRouter} from 'next/navigation'

import {Shield} from 'lucide-react'

import {FormInput} from '@/components/shared/FormInput'
import {Button} from '@/components/ui/button'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card'

import {LOGIN} from '@/constants/authTexts'

import {TIMINGS} from '@/config/timings'

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
                <form onSubmit={handleSubmit} className={'space-y-4'}>
                    <FormInput
                        id={'email'}
                        label={LOGIN.emailLabel}
                        type={'email'}
                        placeholder={LOGIN.emailPlaceholder}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <div className={'space-y-2'}>
                        <div className={'flex items-center justify-between'}>
                            <label
                                htmlFor={'password'}
                                className={'text-xs font-medium uppercase tracking-wider text-muted-foreground'}
                            >
                                {LOGIN.passwordLabel}
                            </label>
                            <Link
                                href={'/forgot-password'}
                                className={'text-sm text-primary hover:underline'}
                            >
                                {LOGIN.forgotPasswordLink}
                            </Link>
                        </div>
                        <FormInput
                            id={'password'}
                            label={''}
                            type={'password'}
                            placeholder={'********'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <Button
                        type={'submit'}
                        className={'h-11 w-full bg-primary text-white hover:bg-primary/90'}
                        disabled={isLoading}
                    >
                        {isLoading
                            ? LOGIN.loggingInButton
                            : LOGIN.loginButton}
                    </Button>

                    <div className={'relative'}>
                        <div className={'absolute inset-0 flex items-center'}>
                            <span className={'w-full border-t border-border'}/>
                        </div>
                        <div className={'relative flex justify-center text-xs uppercase'}>
              <span className={'bg-card px-2 text-muted-foreground'}>
                {LOGIN.orContinueWith}
              </span>
                        </div>
                    </div>

                    <Button
                        type={'button'}
                        variant={'outline'}
                        className={'h-11 w-full border-border'}
                    >
                        <svg className={'mr-2 size-5'} viewBox={'0 0 24 24'}>
                            <path
                                d={'M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'}
                                fill={'#4285F4'}
                            />
                            <path
                                d={'M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'}
                                fill={'#34A853'}
                            />
                            <path
                                d={'M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'}
                                fill={'#FBBC05'}
                            />
                            <path
                                d={'M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'}
                                fill={'#EA4335'}
                            />
                        </svg>
                        {LOGIN.googleButton}
                    </Button>

                    <p className={'text-center text-sm text-muted-foreground'}>
                        {LOGIN.signupText}{' '}
                        <Link
                            href={'/signup'}
                            className={'font-medium text-foreground hover:underline'}
                        >
                            {LOGIN.signupLink}
                        </Link>
                    </p>
                </form>

                <div className={'mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground'}>
                    <Shield className={'size-4'}/>
                    {LOGIN.hipaaText}
                </div>
            </CardContent>
        </Card>
    )
}

export default LoginPage
