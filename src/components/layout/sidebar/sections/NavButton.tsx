'use client'

import {usePathname, useRouter} from 'next/navigation'

import {NavItem} from '@/components/layout/sidebar/config'
import {Button} from '@/components/ui/button'

import {cn} from '@/lib/utils'

type NavButtonProps = {
    item: NavItem
}

export const NavButton = ({
    item
}: NavButtonProps) => {
    const pathname = usePathname()
    const router = useRouter()

    const isActive = pathname === item.href ||
        pathname.startsWith(item.href + '/')
    const Icon = item.icon

    return (
        <Button
            key={item.href}
            onClick={() => router.push(item.href)}
            variant={'ghost'}
            className={cn(
                'w-full justify-start gap-3',
                isActive && 'bg-primary text-primary-foreground',
                !isActive && item.href === '/logout' && 'text-destructive'
            )}
        >
            <Icon className={'size-5'}/>
            <span>
                {item.label}
            </span>
        </Button>
    )
}