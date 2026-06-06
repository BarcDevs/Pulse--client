import type { Metadata } from 'next'

import { appMetadata } from '@/config/appMetadata'

interface PageMetadataInput {
    title: string
    description: string
    path?: string
    image?: {
        url: string
        alt: string
        width?: number
        height?: number
    }
}

export const createPageMetadata = (
    input: PageMetadataInput
): Metadata => {
    const siteUrl = appMetadata.metadataBase!.toString()
    const canonicalUrl = input.path
        ? `${siteUrl}${input.path}`
        : siteUrl

    return {
        ...appMetadata,
        title: input.title,
        description: input.description,
        alternates: {
            canonical: canonicalUrl
        },
        openGraph: {
            ...appMetadata.openGraph,
            title: input.title,
            description: input.description,
            url: canonicalUrl,
            images: input.image
                ? [input.image]
                : appMetadata.openGraph?.images
        }
    }
}
