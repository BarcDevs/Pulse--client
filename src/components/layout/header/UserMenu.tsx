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
            <DropdownMenuTrigger asChild>
                <UserAvatar
                    firstName={user.firstName}
                    lastName={user.lastName}
                    initials={initials}
                />
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align={'end'}
                className={'w-56'}
            >
                <div className={'px-2 py-1.5'}>
                    <p className={'text-sm font-medium text-foreground'}>
                        {user.firstName} {user.lastName}
                    </p>
                    <p className={'text-xs text-muted-foreground'}>
                        Account
                    </p>
                </div>
                <DropdownMenuSeparator/>
                {bottomNavItems.map((item) => (
                    <DropdownMenuItem
                        key={item.href}
                        asChild
                    >
                        <a href={item.href}>
                            <item.icon className={'mr-2 size-4'}/>
                            <span>{item.label}</span>
                        </a>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
