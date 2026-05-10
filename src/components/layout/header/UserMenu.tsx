'use client'

import { UserAvatar } from '@/components/shared/UserAvatar'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

import { getUserFallback } from '@/lib/utils'

import { userMenuItems } from '@/constants/navigationItems'

import { FEATURES } from '@/config/features'

import { useAuth } from '@/context/AuthContext'

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
                <UserAvatar
                    initials={initials}
                    imageSrc={user.profile?.image ?? undefined}
                />
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align={'end'}
                className={'w-56'}
            >
                <DropdownMenuSeparator/>
                {userMenuItems
                    .filter((item) =>
                        item.href !== '/profile/settings'
                        || FEATURES.profilePreferences
                    )
                    .map((item) => (
                        <UserMenuItem
                            key={item.labelKey}
                            item={item}
                        />
                    ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
