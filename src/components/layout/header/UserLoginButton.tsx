import Link from 'next/link'

import { LogIn } from 'lucide-react'

import { Button } from '@/components/ui/button'

export const UserLoginButton = () => (
    <Button
        asChild
        variant={'ghost'}
        size={'sm'}
    >
        <Link
            href={'/login'}
            className={'flex items-center gap-2'}
        >
            <LogIn className={'size-4'}/>
            <span>Login</span>
        </Link>
    </Button>
)