import Link from 'next/link'

import {Shield} from 'lucide-react'

import {authTexts} from '@/constants/componentTexts/auth'

type LoginSecurityFooterProps = {
    showSignup?: boolean
}

export const LoginSecurityFooter = ({
    showSignup = true
}: LoginSecurityFooterProps) => (
    <>
        {showSignup && (
            <p className={'text-center text-sm text-muted-foreground'}>
                {`${authTexts.login.signupText} `}
                <Link
                    href={'/signup'}
                    className={'font-medium text-foreground hover:underline'}
                >
                    {authTexts.login.signupLink}
                </Link>
            </p>
        )}

        <div className={'flex items-center justify-center gap-2 text-xs text-muted-foreground'}>
            <Shield className={'size-4'}/>
            {authTexts.login.hipaaText}
        </div>
    </>
)
