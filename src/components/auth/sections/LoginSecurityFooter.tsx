'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'

import { ROUTES } from '@/constants/routes'

import { authLocales } from '@/locales/authLocales'

type LoginSecurityFooterProps = {
    showSignup?: boolean
}

export const LoginSecurityFooter = ({
    showSignup = true
}: LoginSecurityFooterProps) => {
    const t = useTranslations()

    return (
        <>
            {showSignup && (
                <p className={'text-center text-sm text-muted-foreground'}>
                    {`${t(authLocales.login.signupText)} `}
                    <Link
                        href={ROUTES.SIGNUP}
                        className={'font-medium text-foreground hover:underline'}
                    >
                        {t(authLocales.login.signupLink)}
                    </Link>
                </p>
            )}
        </>
    )
}
