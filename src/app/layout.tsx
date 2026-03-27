import type {Metadata} from 'next'
import {Inter} from 'next/font/google'

import {Analytics} from '@vercel/analytics/next'

import {LayoutProps} from '@/types'

import {cn} from '@/lib/utils'

import {meta} from '@/config/meta'

import '@/styles/globals.css'

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter'
})

export const metadata: Metadata = meta

const RootLayout = ({
    children
}: Readonly<LayoutProps>) => (
    <html lang={'en'}>
        <body className={cn(
            inter.variable,
            'font-sans antialiased bg-surface-page'
        )}>
            {children}
            <Analytics/>
        </body>
    </html>
)

export default RootLayout
