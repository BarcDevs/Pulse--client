import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'
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
    const { logoutAsync } = useLogout()
    const t = useTranslations()
    const isLogout = item.href === '/logout'

    const handleClick = isLogout
        ? () => logoutAsync()
        : () => router.push(item.href)

    return (
        <DropdownMenuItem
            key={item.href}
            asChild
            variant={isLogout ? 'destructive' : 'default'}
        >
            <Button
                onClick={handleClick}
                className={cn(
                    'w-full flex justify-start px-2 py-1.5 text-sm cursor-pointer hover:bg-surface-section transition-colors',
                    isLogout && 'text-destructive hover:text-destructive'
                )}
                variant={'ghost'}
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
            </Button>
        </DropdownMenuItem>
    )
}
