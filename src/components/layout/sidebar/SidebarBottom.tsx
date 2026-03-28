'use client'

import {NavButton} from '@/components/layout/sidebar/sections/NavButton'
import {
    Avatar,
    AvatarFallback
} from '@/components/ui/avatar'

import {useUser} from '@/hooks/ui/useUser'

import {getUserFallback} from '@/lib/utils'

import {bottomNavItems} from '@/constants/navigationItems'

export const SidebarBottom = () => {
    const { user } = useUser()

    if (!user)
        return null

    const initials = getUserFallback(
        user.firstName,
        user.lastName
    )

    return (
        <div className={'border-t border-border px-4 py-4'}>
            <div className={'mb-4 flex items-center gap-3'}>
                <Avatar className={'size-10'}>
                    <AvatarFallback>
                        {initials}
                    </AvatarFallback>
                </Avatar>
                <div className={'flex-1 text-sm'}>
                    <p className={'font-medium text-foreground'}>
                        {user.firstName} {user.lastName}
                    </p>
                </div>
            </div>
            <div className={'space-y-1'}>
                {bottomNavItems.map((item) => (
                    <NavButton
                        item={item}
                        key={item.href}
                    />
                ))}
            </div>
        </div>
    )
}