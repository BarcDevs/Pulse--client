'use client'

import { usePathname } from 'next/navigation'

import {
    Sidebar as SidebarBase,
    SidebarContent
} from '@/components/ui/sidebar'

import { ChatSection } from './sections/ChatSection'
import { CommunitySection } from './sections/CommunitySection'
import { NavSection } from './sections/NavSection'
import { useSidebarSections } from './config'
import { SidebarBottom } from './SidebarBottom'

export const Sidebar = () => {
    const pathname = usePathname()
    const sections = useSidebarSections(pathname ?? '')

    return (
        <SidebarBase>
            <SidebarContent className={'flex flex-col'}>
                <div className={'flex-1 space-y-6 py-4'}>
                    <NavSection />
                    {sections.includes('chat') && (
                        <ChatSection />
                    )}
                    {sections.includes('community') && (
                        <CommunitySection />
                    )}
                </div>
            </SidebarContent>
            <SidebarBottom />
        </SidebarBase>
    )
}