import type { Metadata } from 'next'
import { Inter, Noto_Sans_Hebrew } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'

import { Analytics } from '@vercel/analytics/next'

import type { LayoutProps } from '@/types'

import { DirectionProvider } from '@/components/ui/direction'
import { Toaster } from '@/components/ui/sonner'

import { cn } from '@/lib/utils'

import { getAppMetadata } from '@/config/appMetadata'

import { AuthProvider } from '@/context/AuthProvider'

import { QueryProvider } from '@/app/providers/QueryProvider'

import '@/styles/globals.css'

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter'
})

const notoSansHebrew = Noto_Sans_Hebrew({
    subsets: ['hebrew'],
    variable: '--font-noto-sans-hebrew'
})

export const metadata: Metadata = getAppMetadata()

const RootLayout = async ({
    children
}: Readonly<LayoutProps>) => {
    const locale = await getLocale()
    const messages = await getMessages()
    const dir = locale === 'he-IL' ? 'rtl' : 'ltr'

    return (
        <html
            lang={locale}
            dir={dir}
            className={cn(
                inter.variable,
                notoSansHebrew.variable
            )}
        >
        <body className={'font-sans antialiased bg-surface-page'}>
        <DirectionProvider
            dir={dir}
            direction={dir}
        >
            <NextIntlClientProvider
                locale={locale}
                messages={messages}
            >
                <QueryProvider>
                    <AuthProvider>
                        {children}
                    </AuthProvider>
                </QueryProvider>
            </NextIntlClientProvider>
        </DirectionProvider>
        <Toaster/>
        <Analytics/>
        </body>
        </html>
    )
}

export default RootLayout
