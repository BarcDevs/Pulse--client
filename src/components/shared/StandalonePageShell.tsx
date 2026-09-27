'use client'

import { LayoutProps } from '@/types/react'

import { Sidebar } from '@/components/layout/sidebar/Sidebar'

import { useAuth } from '@/context/AuthContext'

export const StandalonePageShell = ({
    children
}: LayoutProps) => {
    const { user } = useAuth()

    return (
        <div className={'flex flex-1 overflow-hidden'}>
            {user && <Sidebar className={'print:hidden'}/>}
            {children}
        </div>
    )
}
