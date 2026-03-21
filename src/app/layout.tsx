import type {Metadata} from 'next'
import {Inter} from 'next/font/google'

import {Analytics} from '@vercel/analytics/next'

import {LayoutProps} from '@/types'

import '@/styles/globals.css'

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter'
})

export const metadata: Metadata = {
    title: 'HealEase - Recovery & Wellness Sanctuary',
    description: 'Your digital sanctuary for recovery and wellness. Track your journey, connect with community, and heal with AI-powered insights.',
    generator: 'v0.app',
    icons: {
        icon: [
            {
                url: '/icon-light-32x32.png',
                media: '(prefers-color-scheme: light)'
            },
            {
                url: '/icon-dark-32x32.png',
                media: '(prefers-color-scheme: dark)'
            },
            {
                url: '/icon.svg',
                type: 'image/svg+xml'
            }
        ],
        apple: '/apple-icon.png'
    }
}

const RootLayout = ({children}: Readonly<LayoutProps>) => (
    <html lang={'en'}>
        <body
            className={
                `${inter.variable} font-sans ` +
                'antialiased bg-surface-page'
            }
        >
            {children}
            <Analytics />
        </body>
    </html>
)

export default RootLayout
