'use client'

import {NavButton} from '@/components/sidebar/sections/NavButton'
import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from '@/components/ui/avatar'

import {BOTTOM_NAV_ITEMS} from './config'

// todo: add real auth state
export const SidebarBottom = () => (
    <div className={'border-t border-border px-4 py-4'}>
        <div className={'mb-4 flex items-center gap-3'}>
            <Avatar className={'size-10'}>
                <AvatarImage src={'/avatars/alex.jpg'}/>
                <AvatarFallback>
                    AR
                </AvatarFallback>
            </Avatar>
            <div className={'flex-1 text-sm'}>
                <p className={'font-medium text-foreground'}>
                    Alex Rivera
                </p>
                <p className={'text-xs text-muted-foreground'}>
                    Member since 2024
                </p>
            </div>
        </div>
        <div className={'space-y-1'}>
            {BOTTOM_NAV_ITEMS.map((item) => (
                <NavButton
                    item={item}
                    key={item.href}
                />
            ))}
        </div>
    </div>
)