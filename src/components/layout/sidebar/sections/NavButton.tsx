'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'

import { useLogout } from '@/hooks/mutations/useLogout'

import { cn } from '@/lib/utils'

import { NavItem } from '@/constants/navigationItems'

type NavButtonProps = {
    item: NavItem
}

export const NavButton = ({
    item
}: NavButtonProps) => {
    const pathname = usePathname()
    const router = useRouter()
    const t = useTranslations()
    const { logout } = useLogout()

    const isActive = pathname === item.href
        || pathname.startsWith(item.href + '/')
    const Icon = item.icon
    const isLogout = item.href === '/logout'

    const handleNavigation = () =>
        isLogout ? logout() : router.push(item.href)

    return (
        <Button
            key={item.href}
            onClick={handleNavigation}
            variant={'ghost'}
            className={cn(
                'w-full justify-start gap-3',
                isActive && 'bg-primary text-primary-foreground',
                !isActive && item.href === '/logout' && 'text-destructive'
            )}
        >
            <Icon className={'size-5'}/>
            <span>
                {t(item.labelKey)}
            </span>
        </Button>
    )
}