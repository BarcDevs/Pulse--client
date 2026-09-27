'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

import { NavItemButton } from '@/components/shared/buttons/NavItemButton'

import { useLogout } from '@/hooks/mutations/useLogout'

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
    const logout = useLogout()

    const isActive = pathname === item.href
        || pathname.startsWith(item.href + '/')
    const Icon = item.icon
    const isLogout = item.href === '/logout'

    const handleNavigation = () =>
        isLogout ? logout.actions.logout() : router.push(item.href)

    return (
        <NavItemButton
            key={item.href}
            isActive={isActive}
            tone={isLogout ? 'destructive' : 'default'}
            onClick={handleNavigation}
        >
            <Icon className={'size-5'}/>
            <span>
                {t(item.labelKey)}
            </span>
        </NavItemButton>
    )
}