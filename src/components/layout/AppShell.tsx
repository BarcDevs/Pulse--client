'use client'

import { usePathname } from 'next/navigation'

import { LayoutProps } from '@/types/react'

import { AppHeader } from '@/components/AppHeader'
import { DashboardClientProviders } from '@/components/layout/DashboardClientProviders'
import { MobileNavBar } from '@/components/layout/mobileNav/MobileNavBar'
import { Sidebar } from '@/components/layout/sidebar/Sidebar'
import { Footer } from '@/components/shared/footer/Footer'

import { getAppShellMode } from '@/lib/appShell'

import { useAuth } from '@/context/AuthContext'

export const AppShell = ({
    children
}: LayoutProps) => {
    const pathname = usePathname()
    const { user } = useAuth()
    const mode = getAppShellMode(pathname, !!user)

    if (mode === 'none') {
        return children
    }

    if (mode === 'bare') {
        return (
            <div className={'flex min-h-screen flex-col'}>
                <main className={'flex flex-1 flex-col bg-surface-page'}>
                    {children}
                </main>
                <Footer className={'print:hidden'}/>
            </div>
        )
    }

    return (
        <DashboardClientProviders>
            <div className={'flex min-h-screen overflow-clip'}>
                <Sidebar className={'top-0 h-screen self-start print:hidden'}/>
                <div className={'flex min-w-0 flex-1 flex-col'}>
                    <AppHeader/>
                    <main className={'flex flex-1 flex-col overflow-x-clip bg-surface-page'}>
                        {children}
                    </main>
                    <Footer className={'pb-20 sm:pb-0 print:hidden'}/>
                </div>
            </div>
            <MobileNavBar/>
        </DashboardClientProviders>
    )
}
