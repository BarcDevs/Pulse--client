import Link from 'next/link'
import { useTranslations } from 'next-intl'

import { NavItemButton } from '@/components/shared/buttons/NavItemButton'

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
        <NavItemButton
            asChild
            soft
            layout={'stacked'}
            isActive={isActive}
        >
            <Link href={item.href}>
                <Icon className={'size-5 shrink-0'}/>
                <span className={'w-full text-[10px] font-medium text-center leading-tight'}>
                    {t(item.labelKey)}
                </span>
            </Link>
        </NavItemButton>
    )
}
