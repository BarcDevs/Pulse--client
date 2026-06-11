'use client'

import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'

import { Separator } from '@/components/ui/separator'
import {
    Sheet,
    SheetContent,
    SheetTitle
} from '@/components/ui/sheet'

import {
    filterNavItemsByFeatures,
    isRouteActive
} from '@/lib/navigation'

import {
    mainNavItems,
    userMenuItems
} from '@/constants/navigationItems'

import { globalLocales } from '@/locales/globalLocales'

import { DrawerNavItem } from './DrawerNavItem'

type MobileNavDrawerProps = {
    open: boolean
    onOpenChangeAction: (open: boolean) => void
}

export const MobileNavDrawer = ({
    open,
    onOpenChangeAction
}: MobileNavDrawerProps) => {
    const t = useTranslations()
    const pathname = usePathname()

    const filteredMainItems =
        filterNavItemsByFeatures(mainNavItems)

    return (
        <Sheet
            open={open}
            onOpenChange={onOpenChangeAction}
        >
            <SheetContent
                side={'left'}
                className={'w-64 p-0'}
            >
                <SheetTitle className={'sr-only'}>
                    {t(globalLocales.nav.sidebar.more)}
                </SheetTitle>
                <div className={'flex flex-col h-full'}>
                    <div className={'flex-1 overflow-auto py-4'}>
                        <div className={'space-y-1 px-2'}>
                            {filteredMainItems.map((item) => (
                                <DrawerNavItem
                                    key={item.href}
                                    item={item}
                                    isActive={isRouteActive(pathname, item.href)}
                                    onClose={() => onOpenChangeAction(false)}
                                />
                            ))}
                        </div>
                        {userMenuItems.length > 0 && (
                            <>
                                <Separator className={'my-4'} />
                                <div className={'space-y-1 px-2'}>
                                    {userMenuItems.map((item) => (
                                        <DrawerNavItem
                                            key={item.href}
                                            item={item}
                                            isActive={isRouteActive(pathname, item.href)}
                                            onClose={() => onOpenChangeAction(false)}
                                        />
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}
