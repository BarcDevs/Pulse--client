'use client'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

import { getUserFallback } from '@/lib/utils'

import { bottomNavItems } from '@/constants/navigationItems'

import { useAuth } from '@/context/AuthContext'

import { UserAvatar } from './UserAvatar'
import { UserLoginButton } from './UserLoginButton'
import { UserMenuItem } from './UserMenuItem'
import { UserSkeleton } from './UserSkeleton'

export const UserMenu = () => {
    const { user, isLoading } = useAuth()

    if (isLoading)
        return <UserSkeleton/>

    if (!user)
        return <UserLoginButton/>

    const initials = getUserFallback(
        user.firstName,
        user.lastName
    )

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className={'flex items-center gap-3 rounded-lg p-2 hover:bg-surface-section transition-colors'}>
                <UserAvatar initials={initials}/>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align={'end'}
                className={'w-56'}
            >
                <DropdownMenuSeparator/>
                {bottomNavItems.map((item) => (
                        <UserMenuItem
                            key={item.label}
                            item={item}
                        />
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
