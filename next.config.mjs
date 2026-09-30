import createNextIntlPlugin from 'next-intl/plugin'

import bundleAnalyzer from '@next/bundle-analyzer'

const withNextIntl = createNextIntlPlugin('./src/lib/language/request.ts')

const withBundleAnalyzer = bundleAnalyzer({
    enabled: process.env.ANALYZE === 'true'
})

// Report-Only for now: it logs violations without blocking, so Google
// login, Sentry and fonts can't break silently. Tighten, then enforce,
// after reviewing reports
const CONTENT_SECURITY_POLICY_REPORT_ONLY = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https://lh3.googleusercontent.com",
    "font-src 'self' data:",
    "connect-src 'self' https://*.ingest.sentry.io https://*.ingest.de.sentry.io https://nominatim.openstreetmap.org",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "object-src 'none'"
].join('; ')

const SECURITY_HEADERS = [
    {
        key: 'Strict-Transport-Security',
        value: 'max-age=31536000; includeSubDomains'
    },
    // frame-ancestors is enforced on its own; X-Frame-Options covers
    // browsers that ignore CSP
    { key: 'Content-Security-Policy', value: "frame-ancestors 'none'" },
    { key: 'X-Frame-Options', value: 'DENY' },
    { key: 'X-Content-Type-Options', value: 'nosniff' },
    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
    // Only share and clipboard-write are used (share buttons); everything
    // else is off so an injected script or embed can't request it
    {
        key: 'Permissions-Policy',
        value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), '
            + 'web-share=(self), clipboard-write=(self)'
    },
    {
        key: 'Content-Security-Policy-Report-Only',
        value: CONTENT_SECURITY_POLICY_REPORT_ONLY
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