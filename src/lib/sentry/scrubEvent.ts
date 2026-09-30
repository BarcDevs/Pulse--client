import type { Event } from '@sentry/nextjs'

import { stripQueryString } from '@/lib/sentry/stripQueryString'

const SPAN_URL_KEYS = [
    'url',
    'http.url',
    'http.query'
]

const stripSpanUrls = (span: NonNullable<Event['spans']>[number]) => {
    const data = { ...span.data }

    SPAN_URL_KEYS.forEach((key) => {
        if (typeof data[key] === 'string')
            data[key] = stripQueryString(data[key])
    })

    return {
        ...span,
        description: span.description
            && stripQueryString(span.description),
        data
    }
}

/** Errors and performance transactions record the page URL and the URLs of
 * the requests made. Keep paths, drop query strings. Used for both
 * `beforeSend` and `beforeSendTransaction` */
export const scrubEvent = <T extends Event>(event: T): T => {
    const { request, spans } = event

    return {
        ...event,
        ...(request && {
            request: {
                ...request,
                url: request.url && stripQueryString(request.url),
                query_string: undefined
            }
        }),
        ...(spans && { spans: spans.map(stripSpanUrls) })
    }
}
