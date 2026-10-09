import type {
    Metadata,
    Viewport
} from 'next'
import { Inter, Noto_Sans_Hebrew } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'

import type { LayoutProps } from '@/types'

import { AppShell } from '@/components/layout/AppShell'
import { ServiceWorkerRegister } from '@/components/pwa/ServiceWorkerRegister'
import { DirectionProvider } from '@/components/ui/direction'
import { Toaster } from '@/components/ui/sonner'

import { cn } from '@/lib/utils'

import { getAppMetadata } from '@/config/appMetadata'
import { appSettings } from '@/config/appSettings'

import { AuthProvider } from '@/context/AuthProvider'

import { QueryProvider } from '@/app/providers/QueryProvider'

import '@/styles/globals.css'

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    adjustFontFallback: false
})

const notoSansHebrew = Noto_Sans_Hebrew({
    subsets: ['hebrew'],
    variable: '--font-noto-sans-hebrew',
    adjustFontFallback: false
})

export const metadata: Metadata = getAppMetadata()

export const viewport: Viewport = {
    themeColor: appSettings.themeColor
}

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
                        <AppShell>
                            {children}
                        </AppShell>
                    </AuthProvider>
                </QueryProvider>
            </NextIntlClientProvider>
        </DirectionProvider>
        <Toaster/>
        <ServiceWorkerRegister/>
        </body>
        </html>
    )
}

export default RootLayout
