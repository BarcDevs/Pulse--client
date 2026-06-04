import Link from 'next/link'

import { LogIn } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { ROUTES } from '@/constants/routes'

export const UserLoginButton = () => (
    <Button
        asChild
        variant={'ghost'}
        size={'sm'}
    >
        <Link
            href={ROUTES.LOGIN}
            className={'flex items-center gap-2'}
        >
            <LogIn className={'size-4'}/>
            <span>Login</span>
        </Link>
    </Button>
)