import Link from 'next/link'

import {ArrowLeft, Mail} from 'lucide-react'

import {Card, CardContent} from '@/components/ui/card'

import {FORGOT_PASSWORD} from '@/constants/authTexts'

type EmailVerificationViewProps = {
    email: string
}

export const EmailVerificationView = ({
    email,
}: EmailVerificationViewProps) => (
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
