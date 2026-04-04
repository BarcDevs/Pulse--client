import Link from 'next/link'

import { authTexts } from '@/constants/componentTexts/auth'

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
    </>
)
