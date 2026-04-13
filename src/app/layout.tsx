import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { Analytics } from '@vercel/analytics/next'

import { LayoutProps } from '@/types'

import { cn } from '@/lib/utils'

import { appMetadata } from '@/config/appMetadata'

import { AuthProvider } from '@/context/AuthProvider'

import { QueryProvider } from '@/app/providers/QueryProvider'

import '@/styles/globals.css'

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter'
})

export const metadata: Metadata = appMetadata

const RootLayout = ({
    children
}: Readonly<LayoutProps>) => (
    <html lang={'en'}>
        <body className={cn(
            inter.variable,
            'font-sans antialiased bg-surface-page'
        )}>
            <QueryProvider>
                <AuthProvider>
                    {children}
                </AuthProvider>
            </QueryProvider>
            <Analytics/>
        </body>
    </html>
)

export default RootLayout
