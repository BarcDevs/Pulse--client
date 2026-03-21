'use client'

import {LayoutProps} from '@/types'

import {Sidebar} from '@/components/sidebar/Sidebar'
import {
    SidebarInset,
    SidebarProvider,
} from '@/components/ui/sidebar'

type AppShellProps = LayoutProps

export const AppShell = ({ children }: AppShellProps) => (
    <SidebarProvider>
        <Sidebar/>
        <SidebarInset className={'bg-surface-page'}>
            {children}
        </SidebarInset>
    </SidebarProvider>
)
