'use client'

import {
    Avatar,
    AvatarFallback
} from '@/components/ui/avatar'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

import {useUser} from '@/hooks/ui/useUser'

import {getUserFallback} from '@/lib/utils'

import {BOTTOM_NAV_ITEMS} from '@/constants/navigationItems'

export const UserMenu = () => {
    const { user, isLoading } = useUser()

    if (isLoading)
        return (
            <div className={'flex items-center gap-3 rounded-lg p-2'}>
                <div className={'size-9 rounded-full bg-surface-section animate-pulse'}/>
            </div>
        )

    if (!user)
        return null

    const initials = getUserFallback(
        user.firstName,
        user.lastName
    )

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className={'flex items-center gap-3 rounded-lg p-2 hover:bg-surface-section transition-colors'}>
                    <Avatar className={'size-9'}>
                        <AvatarFallback className={'bg-primary-light text-primary'}>
                            {initials}
                        </AvatarFallback>
                    </Avatar>
                    <div className={'hidden md:flex flex-col items-start'}>
                        <p className={'text-sm font-medium text-foreground'}>
                            {user.firstName}
                        </p>
                        <p className={'text-xs text-muted-foreground'}>
                            {user.firstName} {user.lastName}
                        </p>
                    </div>
                </button>
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
                {BOTTOM_NAV_ITEMS.map((item) => (
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
