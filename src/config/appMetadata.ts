import type { Metadata } from 'next'

import config from '@/config'
import { appSettings } from '@/config/appSettings'

export const getAppMetadata = (): Metadata => ({
    metadataBase: new URL(config.appDomain),
    title: `${appSettings.brandName} - Recovery Tracking, Support & Wellness`,
    description: 'Track your recovery, build healthy routines, connect with a supportive community, and gain meaningful insights throughout your healing journey.',
    applicationName: appSettings.brandName,
    keywords: ['recovery', 'wellness', 'mental health', 'support', 'community'],
    authors: [{ name: `${appSettings.brandName} Team` }],
    creator: appSettings.brandName,
    publisher: appSettings.brandName,
    formatDetection: {
        email: false,
        address: false,
        telephone: false
    },
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: config.appDomain,
        siteName: appSettings.brandName,
        title: `${appSettings.brandName} - Recovery Tracking, Support & Wellness`,
        description: 'Track your recovery, build healthy routines, connect with a supportive community, and gain meaningful insights throughout your healing journey.',
        images: [
            {
                url: '/assets/Pulse-OG-Image.png',
                width: 1200,
                height: 634,
                alt: `${appSettings.brandName} - Your Recovery Companion`,
                type: 'image/png'
            }
        ]
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1
        }
    },
    alternates: {
        canonical: config.appDomain
    },
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
    },
    manifest: '/site.webmanifest'
})