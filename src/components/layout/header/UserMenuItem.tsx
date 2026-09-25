import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

import { NavItemButton } from '@/components/shared/buttons/NavItemButton'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'

import { useLogout } from '@/hooks/mutations/useLogout'

import { cn } from '@/lib/utils'

import { userMenuItems } from '@/constants/navigationItems'

type UserMenuItemProps = {
    item: typeof userMenuItems[0]
}

export const UserMenuItem = ({
    item
}: UserMenuItemProps) => {
    const router = useRouter()
    const logout = useLogout()
    const t = useTranslations()
    const isLogout = item.href === '/logout'

    const handleClick = isLogout
        ? () => logout.actions.logoutAsync()
        : () => router.push(item.href)

    return (
        <DropdownMenuItem
            key={item.href}
            asChild
            variant={isLogout ? 'destructive' : 'default'}
        >
            <NavItemButton
                layout={'compact'}
                tone={isLogout ? 'destructive' : 'default'}
                onClick={handleClick}
            >
                <item.icon
                    className={cn(
                        'mr-2 size-4',
                        isLogout
                            ? 'text-destructive'
                            : 'hover:text-accent-light'
                    )}
                />
                <span>
                    {t(item.labelKey)}
                </span>
            </NavItemButton>
        </DropdownMenuItem>
    )
}
