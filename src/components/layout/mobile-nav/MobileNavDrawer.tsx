'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'

import { Separator } from '@/components/ui/separator'
import { Sheet, SheetContent } from '@/components/ui/sheet'

import { cn } from '@/lib/utils'

import { mainNavItems, userMenuItems } from '@/constants/navigationItems'
import { ROUTES } from '@/constants/routes'

import { FEATURES } from '@/config/features'

type DrawerNavItemProps = {
    item: typeof mainNavItems[0]
    isActive: boolean
    onClose: () => void
}

const DrawerNavItem = ({
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
                'flex items-center gap-3 px-4 py-3 rounded-md transition-colors',
                isActive
                    ? 'bg-primary-50 text-primary-600 font-medium'
                    : 'text-muted-700 hover:bg-surface-muted'
            )}
        >
            <Icon size={20} />
            <span className={'text-sm'}>{t(item.labelKey)}</span>
        </Link>
    )
}

type MobileNavDrawerProps = {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export const MobileNavDrawer = ({ open, onOpenChange }: MobileNavDrawerProps) => {
    const pathname = usePathname()

    const filteredMainItems = mainNavItems.filter((item) => {
        if (item.href === ROUTES.INSIGHTS && !FEATURES.insights) return false
        if (item.href === ROUTES.PROGRESS && !FEATURES.progressInsights) return false
        if (item.href === ROUTES.RECOVERY_GOALS && !FEATURES.recoveryGoals) return false
        if (item.href === ROUTES.COMMUNITY && !FEATURES.forumLinking) return false
        if (item.href === ROUTES.CHAT && !FEATURES.chat) return false
        return true
    })

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent side={'left'} className={'w-64 p-0'}>
                <div className={'flex flex-col h-full'}>
                    {/* Main navigation */}
                    <div className={'flex-1 overflow-auto py-4'}>
                        <div className={'space-y-1 px-2'}>
                            {filteredMainItems.map((item) => (
                                <DrawerNavItem
                                    key={item.href}
                                    item={item}
                                    isActive={pathname === item.href || pathname.startsWith(item.href + '/')}
                                    onClose={() => onOpenChange(false)}
                                />
                            ))}
                        </div>

                        {/* User menu section */}
                        {userMenuItems.length > 0 && (
                            <>
                                <Separator className={'my-4'} />
                                <div className={'space-y-1 px-2'}>
                                    {userMenuItems.map((item) => (
                                        <DrawerNavItem
                                            key={item.href}
                                            item={item}
                                            isActive={pathname === item.href || pathname.startsWith(item.href + '/')}
                                            onClose={() => onOpenChange(false)}
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
