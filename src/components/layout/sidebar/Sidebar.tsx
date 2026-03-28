'use client'

import {ClassName} from '@/types/utils/react'

import {Logo} from '@/components/shared/brand/Logo'

import {cn} from '@/lib/utils'

import {NavSection} from './sections/NavSection'
import {SidebarBottom} from './SidebarBottom'
import {SidebarBottomError} from './SidebarBottomError'

type SidebarProps = {
    isErrorPage?: boolean
    className?: ClassName
}

export const Sidebar = ({
    isErrorPage = false,
    className
}: SidebarProps) => (
    <aside className={cn(
        'w-64 border-r border-border bg-surface-card flex flex-col max-sm:hidden',
        className
    )}>
        <div className='p-4'>
            <Logo />
        </div>
        <div className='flex-1 space-y-6 py-4 flex flex-col'>
            <div className='flex-1'>
                <NavSection />
            </div>
        </div>
        {isErrorPage ? (
            <SidebarBottomError />
        ) : (
            <SidebarBottom />
        )}
    </aside>
)