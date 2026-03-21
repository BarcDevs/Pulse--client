'use client'

import {Logo} from '@/components/shared/Logo'
import {
    Sidebar as SidebarBase,
    SidebarContent,
    SidebarHeader
} from '@/components/ui/sidebar'

import {NavSection} from './sections/NavSection'
import {SidebarBottom} from './SidebarBottom'

export const Sidebar = () => (
    <SidebarBase>
        <SidebarHeader className={'p-4'}>
            <Logo />
        </SidebarHeader>
        <SidebarContent className={'flex flex-col'}>
            <div className={'flex-1 space-y-6 py-4'}>
                <NavSection />
            </div>
        </SidebarContent>
        <SidebarBottom />
    </SidebarBase>
)