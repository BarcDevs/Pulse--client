'use client'

import { useState } from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'

import { MoreVertical } from 'lucide-react'

import { cn } from '@/lib/utils'

import { mainNavItems } from '@/constants/navigationItems'
import { ROUTES } from '@/constants/routes'

import { FEATURES } from '@/config/features'

import { MobileNavDrawer } from './MobileNavDrawer'

const MOBILE_NAV_ITEMS = [
    {
        ...mainNavItems[0],
        id: 'dashboard'
    }, // Home
    {
        ...mainNavItems[1],
        id: 'checkin'
    }, // Check-In
    {
        ...mainNavItems[2],
        id: 'progress'
    }, // Progress
    {
        ...mainNavItems[5],
        id: 'community'
    }, // Community
    {
        ...mainNavItems[3],
        id: 'goals'
    } // Goals (TODO: swap with Chat)
]

const MobileNavItem = ({ item, isActive }: { item: typeof MOBILE_NAV_ITEMS[0]; isActive: boolean }) => {
    const t = useTranslations()
    const Icon = item.icon

    return (
        <Link
            href={item.href}
            className={cn(
                'flex flex-col items-center justify-center py-2 px-2 rounded-lg transition-colors gap-0.5',
                isActive
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-muted-600 hover:text-muted-700'
            )}
        >
            <Icon size={20} className={'flex-shrink-0'} />
            <span className={'text-xs font-medium text-center leading-tight'}>{t(item.labelKey)}</span>
        </Link>
    )
}

export const MobileNavBar = () => {
    const pathname = usePathname()
    const [drawerOpen, setDrawerOpen] = useState(false)

    const filteredItems = MOBILE_NAV_ITEMS.filter((item) => {
        if (item.href === ROUTES.INSIGHTS && !FEATURES.insights) return false
        if (item.href === ROUTES.PROGRESS && !FEATURES.progressInsights) return false
        if (item.href === ROUTES.RECOVERY_GOALS && !FEATURES.recoveryGoals) return false
        if (item.href === ROUTES.COMMUNITY && !FEATURES.forumLinking) return false
        if (item.href === ROUTES.CHAT && !FEATURES.chat) return false
        return true
    })

    return (
        <>
            <nav className={'fixed bottom-0 left-0 right-0 border-t border-border bg-surface-card sm:hidden z-40'}>
                <div className={'flex items-center justify-between h-20 px-1'}>
                    {filteredItems.map((item) => (
                        <MobileNavItem
                            key={item.id}
                            item={item}
                            isActive={pathname === item.href || pathname.startsWith(item.href + '/')}
                        />
                    ))}
                    <button
                        onClick={() => setDrawerOpen(true)}
                        className={'flex flex-col items-center justify-center py-2 px-2 rounded-lg transition-colors text-muted-600 hover:text-muted-700 gap-0.5'}
                    >
                        <MoreVertical size={20} className={'flex-shrink-0'} />
                        <span className={'text-xs font-medium text-center'}>More</span>
                    </button>
                </div>
            </nav>
            <MobileNavDrawer open={drawerOpen} onOpenChange={setDrawerOpen} />
        </>
    )
}
