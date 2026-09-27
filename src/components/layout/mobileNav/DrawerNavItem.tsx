import Link from 'next/link'
import { useTranslations } from 'next-intl'

import { NavItemButton } from '@/components/shared/buttons/NavItemButton'

import { useLogout } from '@/hooks/mutations/useLogout'

import { mainNavItems } from '@/constants/navigationItems'
import { ROUTES } from '@/constants/routes'

type DrawerNavItemProps = {
    item: typeof mainNavItems[0]
    isActive: boolean
    onClose: () => void
}

export const DrawerNavItem = ({
    item,
    isActive,
    onClose
}: DrawerNavItemProps) => {
    const t = useTranslations()
    const logout = useLogout()
    const Icon = item.icon
    const isLogout = item.href === ROUTES.LOGOUT

    const tone = isLogout ? 'destructive' : 'default'

    const content = (
        <>
            <Icon size={20}/>
            <span className={'text-sm'}>
                {t(item.labelKey)}
            </span>
        </>
    )

    if (isLogout) {
        const handleLogout = () => {
            onClose()
            void logout.actions.logoutAsync()
        }

        return (
            <NavItemButton
                soft
                tone={tone}
                onClick={handleLogout}
            >
                {content}
            </NavItemButton>
        )
    }

    return (
        <NavItemButton
            asChild
            soft
            isActive={isActive}
            tone={tone}
        >
            <Link
                href={item.href}
                onClick={onClose}
            >
                {content}
            </Link>
        </NavItemButton>
    )
}
