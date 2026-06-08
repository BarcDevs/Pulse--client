import Link from 'next/link'
import { useTranslations } from 'next-intl'

import { cn } from '@/lib/utils'

import { mainNavItems } from '@/constants/navigationItems'

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
    const Icon = item.icon

    return (
        <Link
            href={item.href}
            onClick={() => onClose()}
            className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-md transition-colors cursor-pointer',
                isActive
                    ? 'bg-primary-50 text-primary-600 font-medium'
                    : 'text-muted-700 hover:bg-surface-muted hover:text-muted-900'
            )}
        >
            <Icon size={20}/>
            <span className={'text-sm'}>
                {t(item.labelKey)}
            </span>
        </Link>
    )
}
