'use client'

import { ClassName } from '@/types/react'

import { Logo } from '@/components/shared/brand/Logo'
import { StickySidebar } from '@/components/shared/StickySidebar'

import { cn } from '@/lib/utils'

import { NavSection } from './sections/NavSection'

type SidebarProps = {
    className?: ClassName
}

export const Sidebar = ({
    className
}: SidebarProps) => (
    <StickySidebar className={cn(
        'w-64 border-r border-border bg-surface-card flex flex-col max-lg:hidden',
        className
    )}>
        <div className={'p-4'}>
            <Logo/>
        </div>
        <div className={'flex-1 space-y-6 py-4 flex flex-col'}>
            <div className={'flex-1'}>
                <NavSection/>
            </div>
        </div>
    </StickySidebar>
)
