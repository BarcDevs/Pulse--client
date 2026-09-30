'use client'

import { LayoutProps } from '@/types/react'

import { AppHeader } from '@/components/AppHeader'
import { MobileNavBar } from '@/components/layout/mobileNav/MobileNavBar'
import { Sidebar } from '@/components/layout/sidebar/Sidebar'

import { useAuth } from '@/context/AuthContext'

export const StandalonePageShell = ({
    children
}: LayoutProps) => {
    const { user } = useAuth()

    return (
        <div className={'flex h-screen flex-col print:h-auto'}>
            <div className={'flex min-h-0 flex-1 overflow-hidden print:overflow-visible'}>
                {user && <Sidebar className={'print:hidden'}/>}
                <div className={'flex min-h-0 flex-1 flex-col'}>
                    {user && (
                        <div className={'print:hidden'}>
                            <AppHeader/>
                        </div>
                    )}
                    {children}
                </div>
            </div>
            {user && (
                <div className={'print:hidden'}>
                    <MobileNavBar/>
                </div>
            )}
        </div>
    )
}
