import Link from 'next/link'
import { useTranslations } from 'next-intl'

import { cn } from '@/lib/utils'

import { MOBILE_NAV_ITEMS } from '@/constants/mobileNavItems'

type MobileNavItemProps = {
    item: typeof MOBILE_NAV_ITEMS[0]
    isActive: boolean
}

export const MobileNavItem = ({
    item,
    isActive
}: MobileNavItemProps) => {
    const t = useTranslations()
    const Icon = item.icon

    return (
        <Link
            href={item.href}
            className={cn(
                'flex flex-1 min-w-0 flex-col items-center justify-center py-2 px-1 rounded-lg transition-colors gap-0.5 cursor-pointer',
                isActive
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-muted-600 hover:text-muted-700'
            )}
        >
            <Icon
                size={20}
                className={'shrink-0'}
            />
            <span className={'w-full text-[10px] font-medium text-center leading-tight'}>
                {t(item.labelKey)}
            </span>
        </Link>
    )
}
