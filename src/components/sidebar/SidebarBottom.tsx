'use client'

import {useRouter} from 'next/navigation'

import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar'
import {Button} from '@/components/ui/button'

import {BOTTOM_NAV_ITEMS} from './config'

export const SidebarBottom = () => {
    const router = useRouter()

    return (
        <div className={'border-t border-border px-4 py-4'}>
            <div className={'mb-4 flex items-center gap-3'}>
                <Avatar className={'size-10'}>
                    <AvatarImage src={'/avatars/alex.jpg'}/>
                    <AvatarFallback>AR</AvatarFallback>
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
            <div className={'space-y-2'}>
                {BOTTOM_NAV_ITEMS.map((item) => {
                    const Icon = item.icon
                    return (
                        <Button
                            key={item.href}
                            onClick={() => router.push(item.href)}
                            variant={'ghost'}
                            className={'w-full justify-start gap-3'}
                        >
                            <Icon className={'size-4'}/>
                            <span className={'text-sm'}>
                                {item.label}
                            </span>
                        </Button>
                    )
                })}
            </div>
        </div>
    )
}