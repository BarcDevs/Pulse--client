import Link from 'next/link'
import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'

import { useLogout } from '@/hooks/mutations/useLogout'

import { cn } from '@/lib/utils'

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
    const { logoutAsync } = useLogout()
    const Icon = item.icon
    const isLogout = item.href === ROUTES.LOGOUT

    const className = cn(
        'flex w-full items-center justify-start gap-3 px-4 py-3 rounded-md transition-colors text-start',
        isLogout
            ? 'text-destructive hover:text-destructive hover:bg-surface-muted'
            : isActive
                ? 'bg-primary-50 text-primary-600 font-medium'
                : 'text-muted-700 hover:bg-surface-muted hover:text-muted-900'
    )

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
            void logoutAsync()
        }

        return (
            <Button
                onClick={handleLogout}
                variant={'ghost'}
                className={className}
            >
                {content}
            </Button>
        )
    }

    return (
        <Button
            asChild
            variant={'ghost'}
            className={className}
        >
            <Link
                href={item.href}
                onClick={onClose}
            >
                {content}
            </Link>
        </Button>
    )
}
