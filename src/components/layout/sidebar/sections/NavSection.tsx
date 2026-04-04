import { NavButton } from '@/components/layout/sidebar/sections/NavButton'

import { mainNavItems } from '@/constants/navigationItems'

export const NavSection = () => (
    <div className={'space-y-1 px-4'}>
        {mainNavItems.map((item) => (
            <NavButton
                item={item}
                key={item.href}
            />
        ))}
    </div>
)