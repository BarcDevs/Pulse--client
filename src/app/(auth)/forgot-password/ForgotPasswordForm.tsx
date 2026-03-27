import {SyntheticEvent} from 'react'

import Link from 'next/link'

import {
    ArrowLeft,
    ArrowRight,
    Mail
} from 'lucide-react'

import {FormInput} from '@/components/shared/FormInput'
import {Button} from '@/components/ui/button'

import {FORGOT_PASSWORD} from '@/constants/authTexts'

type ForgotPasswordFormProps = {
    email: string
    isLoading: boolean
    onEmailChange: (value: string) => void
    onSubmit: (e: SyntheticEvent<HTMLFormElement>) => void
}

export const ForgotPasswordForm = ({
    email,
    isLoading,
    onEmailChange,
    onSubmit,
}: ForgotPasswordFormProps) => (
    <form
        onSubmit={onSubmit}
        className={'space-y-4'}
    >
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
                    onChange={(e) => onEmailChange(e.target.value)}
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
    </form>
)
