import { NavButton } from '@/components/layout/sidebar/sections/NavButton'

import { mainNavItems } from '@/constants/navigationItems'
import { ROUTES } from '@/constants/routes'

import { FEATURES } from '@/config/features'

export const NavSection = () => (
    <div className={'space-y-1 px-4'}>
        {mainNavItems
            .filter(
                (item) => (
                    (item.href !== '/insights' || FEATURES.insights)
                    && (item.href !== ROUTES.PROGRESS || FEATURES.progressInsights)
                    && (item.href !== ROUTES.RECOVERY_GOALS || FEATURES.recoveryGoals)
                    && (item.href !== '/community' || FEATURES.forumLinking)
                    && (item.href !== '/chat' || FEATURES.chat)
                )
            )
            .map((item) => (
                <NavButton
                    item={item}
                    key={item.href}
                />
            ))}
    </div>
)