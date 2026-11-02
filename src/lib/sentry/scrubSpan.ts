import type { BrowserOptions } from '@sentry/nextjs'

import { stripQueryString } from '@/lib/sentry/stripQueryString'

type StreamedSpan = Parameters<
    NonNullable<BrowserOptions['beforeSendSpan']>
>[0]

const SPAN_URL_ATTRIBUTES = ['url', 'url.full', 'http.url']

// v11 stores query and fragment without their leading ? or #, so
// stripQueryString would keep them: drop the attributes instead
const SPAN_DROPPED_ATTRIBUTES = [
    'url.query',
    'url.fragment',
    'http.query',
    'http.fragment'
]

/** Streamed spans (default since SDK v11) replace transaction events, so
 * `beforeSendTransaction` no longer runs. Keep paths, drop query strings
 * from the span name and the URL attributes. Same rules as `scrubEvent` */
export const scrubSpan = (
    span: StreamedSpan
): StreamedSpan => {
    const attributes = { ...span.attributes }

    SPAN_URL_ATTRIBUTES.forEach((key) => {
        if (typeof attributes[key] === 'string')
            attributes[key] = stripQueryString(attributes[key])
    })

    SPAN_DROPPED_ATTRIBUTES.forEach((key) => {
        delete attributes[key]
    })

    return {
        ...span,
        name: stripQueryString(span.name),
        attributes
    }
}
