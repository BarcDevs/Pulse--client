import createNextIntlPlugin from 'next-intl/plugin'

import bundleAnalyzer from '@next/bundle-analyzer'

const withNextIntl = createNextIntlPlugin('./src/lib/language/request.ts')

const withBundleAnalyzer = bundleAnalyzer({
    enabled: process.env.ANALYZE === 'true'
})

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    typescript: {
        ignoreBuildErrors: true
    },
    images: {
        unoptimized: true
    },
    experimental: {
        optimizePackageImports: ['radix-ui'],
        instrumentationHook: true
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