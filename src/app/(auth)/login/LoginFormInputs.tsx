import Link from 'next/link'

import {FormInput} from '@/components/shared/FormInput'

import {LOGIN} from '@/constants/authTexts'

type LoginFormInputsProps = {
    email: string
    password: string
    onEmailChange: (value: string) => void
    onPasswordChange: (value: string) => void
}

export const LoginFormInputs = ({
    email,
    password,
    onEmailChange,
    onPasswordChange,
}: LoginFormInputsProps) => (
    <>
        <FormInput
            id={'email'}
            label={LOGIN.emailLabel}
            type={'email'}
            placeholder={LOGIN.emailPlaceholder}
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
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
                onChange={(e) => onPasswordChange(e.target.value)}
            />
        </div>
    </>
)
