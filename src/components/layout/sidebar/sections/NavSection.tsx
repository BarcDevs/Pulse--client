import {NavButton} from '@/components/layout/sidebar/sections/NavButton'

import {MAIN_NAV_ITEMS} from '@/constants/navigationItems'

export const NavSection = () => (
    <div className={'space-y-1 px-4'}>
        {MAIN_NAV_ITEMS.map((item) => (
            <NavButton
                item={item}
                key={item.href}
            />
        ))}
    </div>
)