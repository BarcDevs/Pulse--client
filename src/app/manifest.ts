import type { MetadataRoute } from 'next'

import { appSettings } from '@/config/appSettings'

const manifest = (): MetadataRoute.Manifest => ({
    name: appSettings.brandName,
    short_name: appSettings.brandName,
    description: 'Track your recovery, build healthy routines and connect with a supportive community.',
    start_url: '/',
    display: 'standalone',
    background_color: appSettings.themeColor,
    theme_color: appSettings.themeColor,
    icons: [
        {
            src: '/icon-192.png',
            sizes: '192x192',
            type: 'image/png'
        },
        {
            src: '/icon-512.png',
            sizes: '512x512',
            type: 'image/png'
        },
        {
            src: '/icon-maskable-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
        }
    ]
})

export default manifest
