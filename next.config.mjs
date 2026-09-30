import createNextIntlPlugin from 'next-intl/plugin'

import bundleAnalyzer from '@next/bundle-analyzer'

const withNextIntl = createNextIntlPlugin('./src/lib/language/request.ts')

const withBundleAnalyzer = bundleAnalyzer({
    enabled: process.env.ANALYZE === 'true'
})

// The Content-Security-Policy is not here: it carries a per-request nonce, so
// src/proxy.ts sets it (see src/lib/security/buildContentSecurityPolicy.ts).
// X-Frame-Options covers browsers that ignore the policy's frame-ancestors
const SECURITY_HEADERS = [
    {
        key: 'Strict-Transport-Security',
        value: 'max-age=31536000; includeSubDomains'
    },
    { key: 'X-Frame-Options', value: 'DENY' },
    { key: 'X-Content-Type-Options', value: 'nosniff' },
    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
    // Only share and clipboard-write are used (share buttons); everything
    // else is off so an injected script or embed can't request it
    {
        key: 'Permissions-Policy',
        value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), '
            + 'web-share=(self), clipboard-write=(self)'
    }
]

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    poweredByHeader: false,
    typescript: {
        ignoreBuildErrors: true
    },
    images: {
        unoptimized: true
    },
    experimental: {
        optimizePackageImports: ['radix-ui']
    },
    async headers() {
        return [
            {
                // Not /api: proxied API responses get their headers from the
                // server's helmet(), and two policies on one response conflict
                source: '/((?!api/).*)',
                headers: SECURITY_HEADERS
            }
        ]
    },
    async rewrites() {
        const serverUrl = process.env.SERVER_URL
            || process.env.NEXT_PUBLIC_SERVER_URL
            || 'http://localhost:4001'

        return [
            {
                source: '/api/:path*',
                destination: `${serverUrl}/api/:path*`
            }
        ]
    }
}

export default withBundleAnalyzer(withNextIntl(nextConfig))