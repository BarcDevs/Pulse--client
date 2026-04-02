'use client'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

import {useAuth} from '@/context/AuthContext'
import {getUserFallback} from '@/lib/utils'

import {bottomNavItems} from '@/constants/navigationItems'

import {UserAvatar} from './UserAvatar'
import {UserLoginButton} from './UserLoginButton'
import {UserSkeleton} from './UserSkeleton'
import {UserMenuItem} from './UserMenuItem'

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
