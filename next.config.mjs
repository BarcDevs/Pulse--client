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
        optimizePackageImports: ['radix-ui']
    }
}

export default withBundleAnalyzer(withNextIntl(nextConfig))