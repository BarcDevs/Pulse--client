import type {Metadata} from 'next'

export const meta: Metadata = {
    title: 'HealEase - Recovery & Wellness Sanctuary',
    description: 'Your digital sanctuary for recovery and wellness. Track your journey, connect with community, and heal with AI-powered insights.',
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