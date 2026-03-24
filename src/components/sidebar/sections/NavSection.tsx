'use client'

import {MAIN_NAV_ITEMS} from '@/components/sidebar/config'
import {NavButton} from '@/components/sidebar/sections/NavButton'

export const NavSection = () => (
    <div className={'space-y-1 px-4'}>
        {MAIN_NAV_ITEMS.map((item) => (
            <NavButton
                item={item}
                key={item.href}
            />))}
    </div>
)