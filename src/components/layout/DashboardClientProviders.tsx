'use client'

import { ContextProps } from '@/types/react'

import { CheckInProvider } from '@/context/CheckInContext'

export const DashboardClientProviders = ({
    children
}: ContextProps) => (
    <CheckInProvider>
        {children}
    </CheckInProvider>
)
