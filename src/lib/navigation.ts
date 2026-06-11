import { mainNavItems } from '@/constants/navigationItems'
import { ROUTES } from '@/constants/routes'

import { FEATURES } from '@/config/features'

type NavItem = typeof mainNavItems[0]

export const filterNavItemsByFeatures =
    <T extends NavItem> (items: T[]): T[] => {
        return items.filter((item) => {
            if (item.href === ROUTES.INSIGHTS && !FEATURES.insights) return false
            if (item.href === ROUTES.PROGRESS && !FEATURES.progressInsights) return false
            if (item.href === ROUTES.RECOVERY_GOALS && !FEATURES.recoveryGoals) return false
            if (item.href === ROUTES.COMMUNITY && !FEATURES.forumLinking) return false
            return !(item.href === ROUTES.CHAT && !FEATURES.chat)
        }) as T[]
    }

export const isRouteActive = (
    pathname: string,
    itemHref: string
): boolean => {
    return pathname === itemHref
        || pathname.startsWith(itemHref + '/')
}
