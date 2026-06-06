import type { Metadata } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL
    || 'https://healease.app'

export const appMetadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: 'HealEase - Recovery Tracking, Support & Wellness',
    description: 'Track your recovery, build healthy routines, connect with a supportive community, and gain meaningful insights throughout your healing journey.',
    applicationName: 'HealEase',
    keywords: ['recovery', 'wellness', 'mental health', 'support', 'community'],
    authors: [{ name: 'HealEase Team' }],
    creator: 'HealEase',
    publisher: 'HealEase',
    formatDetection: {
        email: false,
        address: false,
        telephone: false
    },
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: SITE_URL,
        siteName: 'HealEase',
        title: 'HealEase - Recovery Tracking, Support & Wellness',
        description: 'Track your recovery, build healthy routines, connect with a supportive community, and gain meaningful insights throughout your healing journey.',
        images: [
            {
                url: '/assets/HealEase-OG-Image.webp',
                width: 1200,
                height: 634,
                alt: 'HealEase - Your Recovery Companion',
                type: 'image/webp'
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
        canonical: SITE_URL
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
}