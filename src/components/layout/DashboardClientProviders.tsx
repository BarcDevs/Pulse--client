'use client'

import { ReactNode } from 'react'

import { CheckInProvider } from '@/context/CheckInContext'

type DashboardClientProvidersProps = {
    children: ReactNode
}

export const DashboardClientProviders = ({
    children
}: DashboardClientProvidersProps) => (
    <CheckInProvider>
        {children}
    </CheckInProvider>
)
