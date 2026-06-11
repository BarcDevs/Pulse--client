'use client'

import { useState } from 'react'

import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'

import { MoreHorizontal } from 'lucide-react'

import { Button } from '@/components/ui/button'

import {
    filterNavItemsByFeatures,
    isRouteActive
} from '@/lib/navigation'

import { MOBILE_NAV_ITEMS } from '@/constants/mobileNavItems'

import { globalLocales } from '@/locales/globalLocales'

import { MobileNavDrawer } from './MobileNavDrawer'
import { MobileNavItem } from './MobileNavItem'

export const MobileNavBar = () => {
    const pathname = usePathname()
    const t = useTranslations()
    const [drawerOpen, setDrawerOpen] = useState(false)

    const filteredItems = filterNavItemsByFeatures(MOBILE_NAV_ITEMS)

    return (
        <>
            <nav className={'fixed bottom-0 left-0 right-0 border-t border-border bg-surface-card sm:hidden z-40'}>
                <div className={'flex items-center justify-between h-20 px-1'}>
                    {filteredItems.map((item) => (
                        <MobileNavItem
                            key={item.id}
                            item={item}
                            isActive={isRouteActive(pathname, item.href)}
                        />
                    ))}
                    <Button
                        onClick={() => setDrawerOpen(true)}
                        variant={'ghost'}
                        className={'flex flex-1 min-w-0 flex-col items-center justify-center py-2 px-1 h-auto rounded-lg text-muted-600 hover:text-muted-700 hover:bg-transparent gap-0.5'}
                    >
                        <MoreHorizontal
                            size={20}
                            className={'shrink-0'}
                        />
                        <span className={'w-full text-[10px] font-medium text-center leading-tight'}>
                            {t(globalLocales.nav.sidebar.more)}
                        </span>
                    </Button>
                </div>
            </nav>
            <MobileNavDrawer
                open={drawerOpen}
                onOpenChangeAction={setDrawerOpen}
            />
        </>
    )
}
