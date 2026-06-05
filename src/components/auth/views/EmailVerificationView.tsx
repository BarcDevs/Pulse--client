'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'

import { ArrowLeft, Mail } from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'

import { ROUTES } from '@/constants/routes'

import { authLocales } from '@/locales/authLocales'

type EmailVerificationViewProps = {
    email: string
}

export const EmailVerificationView = ({
    email
}: EmailVerificationViewProps) => {
    const t = useTranslations()

    return (
        <Card className={'w-full max-w-md border-0 shadow-lg'}>
            <CardContent className={'pt-8 text-center'}>
                <div className={'mx-auto flex size-16 items-center justify-center rounded-full bg-secondary-light'}>
                    <Mail className={'size-8 text-secondary'}/>
                </div>
                <h2 className={'mt-6 text-2xl font-semibold text-foreground'}>
                    {t(authLocales.forgotPassword.checkEmailTitle)}
                </h2>
                <p className={'mt-2 text-muted-foreground'}>
                    {`${t(authLocales.forgotPassword.checkEmailDesc)} `}
                    <span className={'font-medium text-foreground'}>
                        {email}
                    </span>
                </p>
                <Link
                    href={ROUTES.LOGIN}
                    className={'mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline'}
                >
                    <ArrowLeft className={'size-4'}/>
                    {t(authLocales.common.backButton)}
                </Link>
            </CardContent>
        </Card>
    )
}
